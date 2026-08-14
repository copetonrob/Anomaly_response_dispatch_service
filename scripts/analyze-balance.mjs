import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadGameContent } from "./lib/load-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const content = await loadGameContent(root);
const cardById = new Map(content.cards.map((card) => [card.id, card]));
const DIRECTIONS = ["left", "right"];
const RESOURCE_KEYS = ["personnel", "budget", "secrecy", "anomaly"];
const SAFETY_KEYS = ["personnel", "budget", "secrecy", "anomalySafety"];

const args = Object.fromEntries(process.argv.slice(2).map((argument) => {
  const [key, value = true] = argument.replace(/^--/, "").split("=");
  return [key, value];
}));
const runsPerPolicy = Math.max(100, Number(args.runs) || 50000);
const baseSeed = Number(args.seed) || 20260812;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mulberry32(seed) {
  let value = seed >>> 0;
  return function random() {
    value += 0x6D2B79F5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function compare(actual, op, expected) {
  switch (op) {
    case "lt": return actual < expected;
    case "lte": return actual <= expected;
    case "gt": return actual > expected;
    case "gte": return actual >= expected;
    case "neq": return actual !== expected;
    case "eq":
    default: return actual === expected;
  }
}

function testCondition(state, condition) {
  switch (condition.type) {
    case "resource": return compare(state.resources[condition.key] ?? 0, condition.op, condition.value);
    case "turn": return compare(state.turn, condition.op, condition.value);
    case "flag": return (state.flags[condition.key] ?? false) === condition.equals;
    case "counter": return compare(state.counters[condition.key] ?? 0, condition.op, condition.value);
    case "played": return compare(state.playCounts[condition.card] ?? 0, condition.op, condition.value);
    case "not": return !testCondition(state, condition.condition);
    case "any": return condition.conditions.some((item) => testCondition(state, item));
    case "all": return condition.conditions.every((item) => testCondition(state, item));
    default: return false;
  }
}

function conditionsPass(state, conditions = []) {
  return conditions.every((condition) => testCondition(state, condition));
}

function isEligible(state, card) {
  return Boolean(card) && conditionsPass(state, card.conditions) && (state.playCounts[card.id] || 0) === 0;
}

function cardWeight(state, card) {
  let weight = card.weight ?? 1;
  for (const rule of content.tagRules || []) {
    if (conditionsPass(state, rule.conditions) && rule.tags.some((tag) => card.tags?.includes(tag))) {
      weight *= rule.multiplier;
    }
  }
  for (const modifier of card.weightModifiers || []) {
    if (conditionsPass(state, modifier.conditions)) weight *= modifier.multiplier;
  }
  return Math.max(0, weight);
}

function weightedPick(entries, random) {
  const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
  if (total <= 0) return entries[0]?.card || null;
  let roll = random() * total;
  for (const entry of entries) {
    roll -= entry.weight;
    if (roll <= 0) return entry.card;
  }
  return entries.at(-1)?.card || null;
}

function selectNextCard(state, random) {
  while (state.queue.length) {
    const queued = cardById.get(state.queue.shift());
    if (isEligible(state, queued)) return queued;
  }

  const candidates = content.cards
    .filter((card) => card.weight > 0 && isEligible(state, card))
    .map((card) => ({ card, weight: cardWeight(state, card) }))
    .filter((entry) => entry.weight > 0);
  const picked = weightedPick(candidates, random);
  if (picked) return picked;

  if (!state.exhaustionStoryStarted && content.config.exhaustionStoryCard) {
    state.exhaustionStoryStarted = true;
    const finale = cardById.get(content.config.exhaustionStoryCard);
    if (isEligible(state, finale)) return finale;
  }
  return null;
}

function headrooms(resources) {
  return [resources.personnel, resources.budget, resources.secrecy, 1 - resources.anomaly];
}

function stability(resources) {
  const values = headrooms(resources).map((value) => Math.max(0, Math.min(1, value)));
  const geometric = Math.pow(values.reduce((product, value) => product * Math.max(0.0001, value), 1), 0.25);
  const bottleneck = Math.min(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return 0.5 * geometric + 0.4 * bottleneck + 0.1 * mean;
}

function resourceVector(effects = []) {
  const vector = { personnel: 0, budget: 0, secrecy: 0, anomaly: 0 };
  for (const effect of effects) {
    if (effect.type === "resource") vector[effect.key] += effect.amount;
  }
  return vector;
}

function safetyVector(resourceChanges) {
  return {
    personnel: resourceChanges.personnel,
    budget: resourceChanges.budget,
    secrecy: resourceChanges.secrecy,
    anomalySafety: -resourceChanges.anomaly
  };
}

function netSafety(vector) {
  return SAFETY_KEYS.reduce((sum, key) => sum + vector[key], 0);
}

function projectResources(resources, effects) {
  const projected = { ...resources };
  for (const effect of effects || []) {
    if (effect.type !== "resource") continue;
    projected[effect.key] = Math.max(
      content.config.minResource,
      Math.min(content.config.maxResource, projected[effect.key] + effect.amount)
    );
  }
  return projected;
}

function chooseDirection(policy, state, card, random) {
  if (policy === "random") return random() < 0.5 ? "left" : "right";
  const scores = DIRECTIONS.map((direction) => {
    const choice = card.choices[direction];
    const effects = policy === "forecast"
      ? (choice.forecastEffects || choice.effects || [])
      : (choice.effects || []);
    return { direction, score: stability(projectResources(state.resources, effects)) };
  });
  const difference = scores[0].score - scores[1].score;
  if (Math.abs(difference) < 1e-12) return random() < 0.5 ? "left" : "right";
  const best = difference > 0 ? scores[0].direction : scores[1].direction;
  const other = best === "left" ? "right" : "left";
  const accuracy = policy === "novice" ? 0.65 : policy === "competent" ? 0.8 : 1;
  return random() < accuracy ? best : other;
}

function applyEffect(state, effect, telemetry) {
  switch (effect.type) {
    case "resource": {
      const before = state.resources[effect.key] ?? 0;
      const after = Math.max(
        content.config.minResource,
        Math.min(content.config.maxResource, before + effect.amount)
      );
      const actual = after - before;
      state.resources[effect.key] = Math.round(after * 10000) / 10000;
      const safetyKey = effect.key === "anomaly" ? "anomalySafety" : effect.key;
      const safetyChange = effect.key === "anomaly" ? -actual : actual;
      telemetry.flow[safetyKey] += safetyChange;
      if (safetyChange > 0) telemetry.positiveFlow += safetyChange;
      if (safetyChange < 0) telemetry.negativeFlow += -safetyChange;
      break;
    }
    case "flag": state.flags[effect.key] = effect.value; break;
    case "counter": state.counters[effect.key] = (state.counters[effect.key] ?? 0) + effect.amount; break;
    case "enqueue": state.queue[effect.position === "back" ? "push" : "unshift"](...effect.cards); break;
    case "clearQueue": state.queue = []; break;
    case "end": state.authoredOutcome = { kind: "ending", id: effect.title, title: effect.title, text: effect.text }; break;
  }
}

function resolveOutcome(state) {
  const failure = content.failures.find((item) => testCondition(state, item.condition));
  if (failure) return { kind: "failure", id: failure.id, title: failure.title };
  if (state.authoredOutcome) return state.authoredOutcome;
  const ending = (content.endings || []).find((item) => conditionsPass(state, item.conditions));
  if (ending) return { kind: "ending", id: ending.id, title: ending.title };
  return null;
}

function freshState() {
  return {
    ...clone(content.config.start),
    playCounts: {},
    exhaustionStoryStarted: false,
    authoredOutcome: null
  };
}

function simulateRun(policy, seed) {
  const random = mulberry32(seed);
  const state = freshState();
  const telemetry = {
    flow: Object.fromEntries(SAFETY_KEYS.map((key) => [key, 0])),
    positiveFlow: 0,
    negativeFlow: 0,
    criticalTurns: 0,
    minimumMargin: Math.min(...headrooms(state.resources)),
    categories: {},
    path: []
  };

  for (let guard = 0; guard < content.cards.length + 20; guard += 1) {
    const card = selectNextCard(state, random);
    if (!card) {
      const fallback = content.config.exhaustionEnding || { kind: "ending", title: "Content exhausted" };
      return finishRun(state, telemetry, { ...fallback, id: "exhaustion_ending" });
    }

    const direction = chooseDirection(policy, state, card, random);
    const choice = card.choices[direction];
    telemetry.path.push(`${card.id}:${direction}`);
    telemetry.categories[card.category] = (telemetry.categories[card.category] || 0) + 1;
    for (const effect of choice.effects || []) applyEffect(state, effect, telemetry);

    state.playCounts[card.id] = 1;
    state.turn += 1;
    const pendingOutcome = resolveOutcome(state);

    const reactionDirection = random() < 0.5 ? "left" : "right";
    const reaction = card.results?.[direction]?.reactions?.[reactionDirection];
    for (const effect of reaction?.effects || []) applyEffect(state, effect, telemetry);

    const margins = headrooms(state.resources);
    telemetry.minimumMargin = Math.min(telemetry.minimumMargin, ...margins);
    if (Math.min(...margins) <= 0.2) telemetry.criticalTurns += 1;

    const outcome = pendingOutcome || resolveOutcome(state);
    state.authoredOutcome = null;
    if (outcome) return finishRun(state, telemetry, outcome);
  }
  throw new Error("Simulation guard exhausted");
}

function finishRun(state, telemetry, outcome) {
  const turns = state.turn - content.config.start.turn;
  return {
    outcome,
    turns,
    resources: { ...state.resources },
    netFlow: SAFETY_KEYS.reduce((sum, key) => sum + telemetry.flow[key], 0),
    ...telemetry
  };
}

function mean(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function percentile(values, fraction) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.floor(fraction * sorted.length));
  return sorted[index];
}

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function distribution(values) {
  const counts = {};
  for (const value of values) counts[value] = (counts[value] || 0) + 1;
  return Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1]));
}

function summarizePolicy(policy, offset) {
  const runs = [];
  for (let index = 0; index < runsPerPolicy; index += 1) {
    runs.push(simulateRun(policy, baseSeed + offset + index * 2654435761));
  }
  const wins = runs.filter((run) => run.outcome.kind === "ending");
  const totalTurns = runs.reduce((sum, run) => sum + run.turns, 0);
  const totalPositive = runs.reduce((sum, run) => sum + run.positiveFlow, 0);
  const totalNegative = runs.reduce((sum, run) => sum + run.negativeFlow, 0);
  const totalFlow = Object.fromEntries(SAFETY_KEYS.map((key) => [
    key,
    runs.reduce((sum, run) => sum + run.flow[key], 0)
  ]));
  const firstWin = wins[0];

  return {
    runs: runs.length,
    winRate: round(wins.length / runs.length),
    turns: {
      mean: round(mean(runs.map((run) => run.turns)), 2),
      median: percentile(runs.map((run) => run.turns), 0.5),
      p10: percentile(runs.map((run) => run.turns), 0.1),
      p90: percentile(runs.map((run) => run.turns), 0.9)
    },
    driftPerTurn: round(runs.reduce((sum, run) => sum + run.netFlow, 0) / totalTurns),
    resourceDriftPerTurn: Object.fromEntries(SAFETY_KEYS.map((key) => [key, round(totalFlow[key] / totalTurns)])),
    recoveryRatio: round(totalPositive / Math.max(0.000001, totalNegative)),
    criticalTurnRate: round(runs.reduce((sum, run) => sum + run.criticalTurns, 0) / totalTurns),
    meanMinimumMargin: round(mean(runs.map((run) => run.minimumMargin))),
    failures: distribution(runs.filter((run) => run.outcome.kind === "failure").map((run) => run.outcome.id)),
    endings: distribution(wins.map((run) => run.outcome.title)),
    discoveredEndings: new Set(wins.map((run) => run.outcome.title)).size,
    meanWinningResources: wins.length ? Object.fromEntries(RESOURCE_KEYS.map((key) => [
      key,
      round(mean(wins.map((run) => run.resources[key])))
    ])) : null,
    exampleWin: firstWin ? {
      seed: baseSeed + offset + runs.indexOf(firstWin) * 2654435761,
      turns: firstWin.turns,
      ending: firstWin.outcome.title,
      path: firstWin.path
    } : null
  };
}

function staticAnalysis() {
  const records = content.cards.flatMap((card) => DIRECTIONS.map((direction) => {
    const actual = safetyVector(resourceVector(card.choices[direction].effects));
    const forecast = safetyVector(resourceVector(card.choices[direction].forecastEffects || card.choices[direction].effects));
    return {
      card: card.id,
      category: card.category,
      direction,
      actual,
      actualNet: netSafety(actual),
      forecastNet: netSafety(forecast)
    };
  }));

  function summarizeRecords(items) {
    const nets = items.map((item) => item.actualNet);
    return {
      choices: items.length,
      meanNet: round(mean(nets)),
      positiveShare: round(nets.filter((value) => value > 0.000001).length / nets.length),
      neutralShare: round(nets.filter((value) => Math.abs(value) <= 0.000001).length / nets.length),
      negativeShare: round(nets.filter((value) => value < -0.000001).length / nets.length),
      resourceMean: Object.fromEntries(SAFETY_KEYS.map((key) => [key, round(mean(items.map((item) => item.actual[key])))]))
    };
  }

  const byCategory = Object.fromEntries(Object.keys(content.categories).map((category) => [
    category,
    summarizeRecords(records.filter((record) => record.category === category))
  ]));
  const distortionRecords = records.filter((record) => record.category === "distortions");
  const invertedForecasts = distortionRecords.filter((record) =>
    Math.sign(record.actualNet) !== Math.sign(record.forecastNet)
  ).length;

  return {
    all: summarizeRecords(records),
    byCategory,
    meanBestChoiceNet: round(mean(content.cards.map((card) => Math.max(
      ...records.filter((record) => record.card === card.id).map((record) => record.actualNet)
    )))),
    meanWorstChoiceNet: round(mean(content.cards.map((card) => Math.min(
      ...records.filter((record) => record.card === card.id).map((record) => record.actualNet)
    )))),
    distortionForecastInversionRate: round(invertedForecasts / distortionRecords.length),
    bestChoices: [...records].sort((a, b) => b.actualNet - a.actualNet).slice(0, 5)
      .map(({ card, direction, actualNet }) => ({ card, direction, net: round(actualNet) })),
    worstChoices: [...records].sort((a, b) => a.actualNet - b.actualNet).slice(0, 5)
      .map(({ card, direction, actualNet }) => ({ card, direction, net: round(actualNet) }))
  };
}

const report = {
  schemaVersion: 1,
  contentVersion: content.version,
  generatedAt: new Date().toISOString(),
  seed: baseSeed,
  runsPerPolicy,
  cardCounts: Object.fromEntries(Object.entries(content.cardGroups).map(([key, cards]) => [key, cards.length])),
  metrics: {
    netDrift: "Δpersonnel + Δbudget + Δsecrecy − Δanomaly; positive is favorable",
    stability: "0.5 × geometric headroom + 0.4 × minimum headroom + 0.1 × mean headroom",
    critical: "at least one safety headroom is 0.20 or lower",
    recoveryRatio: "all positive safety flow divided by absolute negative safety flow"
  },
  static: staticAnalysis(),
  policies: {
    random: summarizePolicy("random", 0),
    novice: summarizePolicy("novice", 500000003),
    competent: summarizePolicy("competent", 1000000007),
    forecast: summarizePolicy("forecast", 1500000001),
    learned: summarizePolicy("learned", 2000000011)
  }
};

if (args.json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const percent = (value) => `${(value * 100).toFixed(1)}%`;
  const points = (value) => `${value >= 0 ? "+" : ""}${(value * 100).toFixed(2)} п.п.`;
  console.log(`# Баланс контента v${report.contentVersion}\n`);
  console.log(`Симуляций: ${runsPerPolicy.toLocaleString("ru-RU")} на политику; seed: ${baseSeed}.`);
  console.log(`Статический случайный выбор: ${points(report.static.all.meanNet)} суммарного запаса на решение.`);
  console.log("\n| Политика | Победа | Ходов | Дрейф/ход | Возврат/ущерб | Критические ходы |");
  console.log("|---|---:|---:|---:|---:|---:|");
  for (const [key, result] of Object.entries(report.policies)) {
    console.log(`| ${key} | ${percent(result.winRate)} | ${result.turns.mean} | ${points(result.driftPerTurn)} | ${result.recoveryRatio.toFixed(2)} | ${percent(result.criticalTurnRate)} |`);
  }
}
