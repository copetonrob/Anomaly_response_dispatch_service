(function () {
  "use strict";

  const content = window.GAME_CONTENT;
  if (!content) throw new Error("GAME_CONTENT is not loaded");

  const STORAGE_KEY = `anomaly-dispatcher-v${content.version}`;
  const SWIPE_LIMIT = 108;
  const cardById = new Map(content.cards.map((card) => [card.id, card]));

  const ui = {
    turn: document.querySelector("#turn-number"),
    resources: document.querySelector("#resources"),
    card: document.querySelector("#card"),
    cardImage: document.querySelector("#card-image"),
    speaker: document.querySelector("#card-speaker"),
    title: document.querySelector("#card-title"),
    text: document.querySelector("#card-text"),
    leftHint: document.querySelector("#left-hint"),
    rightHint: document.querySelector("#right-hint"),
    result: document.querySelector("#result-overlay"),
    resultKicker: document.querySelector("#result-kicker"),
    resultTitle: document.querySelector("#result-title"),
    resultText: document.querySelector("#result-text"),
    restart: document.querySelector("#restart-button"),
    newRun: document.querySelector("#new-run-button")
  };

  let state = loadState() || freshState();
  let currentCard = null;
  let locked = false;
  let drag = null;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function freshState() {
    const start = clone(content.config.start);
    return {
      ...start,
      history: [],
      playCounts: {},
      lastPlayed: {},
      currentCardId: null,
      phase: "situation",
      aftermath: null,
      pendingOutcome: null,
      authoredOutcome: null,
      ended: null
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || saved.version !== content.version) return null;
      return saved.state;
    } catch (_) {
      return null;
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: content.version, state }));
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

  function testCondition(condition) {
    switch (condition.type) {
      case "resource":
        return compare(state.resources[condition.key] ?? 0, condition.op, condition.value);
      case "turn":
        return compare(state.turn, condition.op, condition.value);
      case "flag":
        return (state.flags[condition.key] ?? false) === condition.equals;
      case "counter":
        return compare(state.counters[condition.key] ?? 0, condition.op, condition.value);
      case "played":
        return compare(state.playCounts[condition.card] ?? 0, condition.op, condition.value);
      case "not":
        return !testCondition(condition.condition);
      case "any":
        return condition.conditions.some(testCondition);
      case "all":
        return condition.conditions.every(testCondition);
      default:
        console.warn("Unknown condition", condition);
        return false;
    }
  }

  function conditionsPass(conditions = []) {
    return conditions.every(testCondition);
  }

  function isEligible(card, options = {}) {
    if (!card || !conditionsPass(card.conditions)) return false;
    const plays = state.playCounts[card.id] || 0;
    if (Number.isFinite(card.maxPlays) && plays >= card.maxPlays) return false;
    if (options.ignoreCooldown) return true;
    const turnsSince = state.turn - (state.lastPlayed[card.id] ?? -999);
    if (plays > 0 && turnsSince <= (card.cooldown ?? content.config.recentWindow)) return false;
    return !state.history.slice(-content.config.recentWindow).includes(card.id);
  }

  function cardWeight(card) {
    let weight = card.weight ?? 1;
    for (const rule of content.tagRules || []) {
      if (conditionsPass(rule.conditions) && rule.tags.some((tag) => card.tags?.includes(tag))) {
        weight *= rule.multiplier;
      }
    }
    for (const modifier of card.weightModifiers || []) {
      if (conditionsPass(modifier.conditions)) weight *= modifier.multiplier;
    }
    return Math.max(0, weight);
  }

  function weightedPick(entries) {
    const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
    if (total <= 0) return entries[0]?.card || null;
    let roll = Math.random() * total;
    for (const entry of entries) {
      roll -= entry.weight;
      if (roll <= 0) return entry.card;
    }
    return entries.at(-1)?.card || null;
  }

  function takeQueuedCard() {
    while (state.queue.length) {
      const queuedId = state.queue.shift();
      const queued = cardById.get(queuedId);
      if (isEligible(queued, { ignoreCooldown: true })) return queued;
      console.warn(`Queued card '${queuedId}' is missing or no longer eligible`);
    }
    return null;
  }

  function selectNextCard() {
    const queued = takeQueuedCard();
    if (queued) return queued;

    let candidates = content.cards
      .filter((card) => card.weight > 0 && isEligible(card))
      .map((card) => ({ card, weight: cardWeight(card) }))
      .filter((entry) => entry.weight > 0);

    // A tiny content set can temporarily exhaust all cooldowns. Relax only
    // recency, never story conditions or maxPlays, so the run cannot deadlock.
    if (!candidates.length) {
      candidates = content.cards
        .filter((card) => card.weight > 0 && isEligible(card, { ignoreCooldown: true }))
        .map((card) => ({ card, weight: cardWeight(card) }))
        .filter((entry) => entry.weight > 0);
    }

    return weightedPick(candidates);
  }

  function applyEffect(effect) {
    switch (effect.type) {
      case "resource": {
        const next = (state.resources[effect.key] ?? 0) + effect.amount;
        const clamped = Math.max(content.config.minResource, Math.min(content.config.maxResource, next));
        state.resources[effect.key] = Math.round(clamped * 10000) / 10000;
        break;
      }
      case "flag":
        state.flags[effect.key] = effect.value;
        break;
      case "counter":
        state.counters[effect.key] = (state.counters[effect.key] ?? 0) + effect.amount;
        break;
      case "enqueue":
        state.queue[effect.position === "back" ? "push" : "unshift"](...effect.cards);
        break;
      case "clearQueue":
        state.queue = [];
        break;
      case "end":
        state.authoredOutcome = { kind: "ending", title: effect.title, text: effect.text };
        break;
      default:
        console.warn("Unknown effect", effect);
    }
  }

  function resolveOutcome() {
    const failure = content.failures.find((item) => testCondition(item.condition));
    if (failure) return { kind: "failure", title: failure.title, text: failure.text };
    if (state.authoredOutcome) return state.authoredOutcome;
    const ending = content.endings.find((item) => conditionsPass(item.conditions));
    if (ending) return { kind: "ending", title: ending.title, text: ending.text };
    return null;
  }

  function choose(direction) {
    if (locked || !currentCard || state.ended) return;
    if (state.phase === "aftermath") {
      acknowledgeAftermath(direction);
      return;
    }
    locked = true;

    const choice = currentCard.choices[direction];
    const exitX = direction === "left" ? -window.innerWidth : window.innerWidth;
    ui.card.style.transition = "transform 260ms ease, opacity 220ms ease";
    ui.card.style.transform = `translate(${exitX}px, -20px) rotate(${direction === "left" ? -18 : 18}deg)`;
    ui.card.style.opacity = "0";

    for (const effect of choice.effects || []) applyEffect(effect);
    state.playCounts[currentCard.id] = (state.playCounts[currentCard.id] || 0) + 1;
    state.lastPlayed[currentCard.id] = state.turn;
    state.history.push(currentCard.id);
    state.history = state.history.slice(-30);
    state.turn += 1;
    state.phase = "aftermath";
    state.pendingOutcome = resolveOutcome();
    const result = currentCard.results?.[direction] || choice.result || {};
    state.aftermath = {
      cardId: currentCard.id,
      direction,
      title: result.title || "Последствия",
      text: result.text || "Решение исполнено. Подробности в сводке отсутствуют.",
      reactions: result.reactions || {
        left: { label: "Принять к сведению" },
        right: { label: "Продолжить смену" }
      }
    };
    saveState();

    window.setTimeout(() => {
      renderAftermath();
      resetCardTransform(false);
      locked = false;
    }, 250);
  }

  function acknowledgeAftermath(direction) {
    locked = true;
    const reaction = state.aftermath?.reactions?.[direction];
    const exitX = direction === "left" ? -window.innerWidth : window.innerWidth;
    ui.card.style.transition = "transform 260ms ease, opacity 220ms ease";
    ui.card.style.transform = `translate(${exitX}px, -20px) rotate(${direction === "left" ? -18 : 18}deg)`;
    ui.card.style.opacity = "0";

    for (const effect of reaction?.effects || []) applyEffect(effect);
    state.counters[`reaction_${direction}`] = (state.counters[`reaction_${direction}`] || 0) + 1;
    state.flags.last_reaction = direction;
    state.phase = "situation";
    state.aftermath = null;
    state.currentCardId = null;
    state.ended = state.pendingOutcome || resolveOutcome();
    state.pendingOutcome = null;
    state.authoredOutcome = null;
    saveState();

    window.setTimeout(() => {
      if (state.ended) {
        renderResources();
        renderResult(state.ended);
      } else {
        showNextCard();
      }
      resetCardTransform(false);
      locked = false;
    }, 250);
  }

  function showNextCard() {
    currentCard = state.currentCardId ? cardById.get(state.currentCardId) : selectNextCard();
    if (!currentCard) {
      state.ended = {
        kind: "ending",
        title: "Тишина в эфире",
        text: "Подходящих вызовов больше нет. Добавьте новые карты или ослабьте их условия."
      };
      saveState();
      renderResult(state.ended);
      return;
    }
    state.currentCardId = currentCard.id;
    saveState();
    if (state.phase === "aftermath" && state.aftermath) renderAftermath();
    else render();
  }

  function resourceTone(key, value) {
    const highIsBad = content.resources[key].danger === "high";
    const isDanger = highIsBad
      ? value >= content.config.dangerThreshold
      : value <= content.config.criticalThreshold;
    return isDanger ? "resource--danger" : "";
  }

  function renderResources() {
    const items = Object.entries(content.resources).map(([key, meta]) => {
      const value = state.resources[key];
      const percent = Math.round(value * 100);
      const isAnomaly = meta.danger === "high";
      const classes = ["resource", resourceTone(key, value), isAnomaly ? "resource--anomaly" : ""]
        .filter(Boolean)
        .join(" ");
      const dangerAlpha = (0.035 + value * 0.28).toFixed(3);
      const dangerGlow = `${3 + value * 10}px`;
      const item = `
        <div class="${classes}" data-resource="${key}" title="${meta.label}: ${percent}%"
          aria-label="${meta.label}: ${percent}%"
          style="--danger-alpha:${dangerAlpha}; --danger-glow:${dangerGlow}">
          <span class="resource__impact" aria-hidden="true"></span>
          <img class="resource__icon" src="${meta.iconSrc}" alt="" draggable="false" />
          <div class="resource__track" aria-hidden="true">
            <span style="height:${percent}%"></span>
          </div>
          ${isAnomaly ? '<span class="resource__warning" aria-hidden="true">!</span>' : ""}
        </div>`;
      return { item, isAnomaly };
    });

    ui.resources.innerHTML = `
      <div class="resources__reserves" aria-label="Запасы">
        ${items.filter(({ isAnomaly }) => !isAnomaly).map(({ item }) => item).join("")}
      </div>
      <div class="resources__threat" aria-label="Главная угроза">
        ${items.find(({ isAnomaly }) => isAnomaly)?.item || ""}
      </div>`;
  }

  function clearImpactPreview() {
    ui.resources.querySelectorAll(".resource--affected").forEach((element) => {
      element.classList.remove("resource--affected");
      element.style.removeProperty("--impact-size");
    });
  }

  function showImpactPreview(direction) {
    clearImpactPreview();
    if (!direction || !currentCard || state.phase === "aftermath") return;

    const impacts = new Map();
    for (const effect of currentCard.choices[direction].effects || []) {
      if (effect.type !== "resource" || !effect.amount) continue;
      impacts.set(effect.key, (impacts.get(effect.key) || 0) + Math.abs(effect.amount));
    }

    for (const [key, strength] of impacts) {
      const element = ui.resources.querySelector(`[data-resource="${key}"]`);
      if (!element) continue;
      const size = Math.min(18, 7 + (strength / 0.15) * 11);
      element.style.setProperty("--impact-size", `${size.toFixed(1)}px`);
      element.classList.add("resource--affected");
    }
  }

  function render() {
    ui.turn.textContent = state.turn;
    renderResources();
    ui.card.classList.remove("card--aftermath");
    renderCardArt(currentCard);
    ui.speaker.textContent = currentCard.speaker;
    ui.title.textContent = currentCard.title;
    ui.text.textContent = currentCard.text;
    ui.leftHint.textContent = currentCard.choices.left.label;
    ui.rightHint.textContent = currentCard.choices.right.label;
    ui.result.hidden = true;
  }

  function renderCardArt(card) {
    const [from, to] = card.palette || ["#52636d", "#101619"];
    ui.cardImage.style.setProperty("--image-from", from);
    ui.cardImage.style.setProperty("--image-to", to);
    ui.cardImage.style.setProperty("--card-image-position", card.imagePosition || "center");
    if (card.image) {
      ui.cardImage.style.setProperty("--card-image", `url(\"${card.image}\")`);
      ui.cardImage.classList.add("card__image--illustrated");
    } else {
      ui.cardImage.style.removeProperty("--card-image");
      ui.cardImage.classList.remove("card__image--illustrated");
    }
    ui.cardImage.setAttribute(
      "aria-label",
      `${card.image ? "Сюжетная" : "Абстрактная"} иллюстрация: ${card.title}`
    );
  }

  function renderAftermath() {
    if (!currentCard || !state.aftermath) return;
    ui.turn.textContent = Math.max(1, state.turn - 1);
    renderResources();
    renderCardArt(currentCard);
    ui.card.classList.add("card--aftermath");
    ui.speaker.textContent = "Сводка последствий";
    ui.title.textContent = state.aftermath.title;
    ui.text.textContent = state.aftermath.text;
    ui.leftHint.textContent = state.aftermath.reactions.left.label;
    ui.rightHint.textContent = state.aftermath.reactions.right.label;
    ui.result.hidden = true;
  }

  function renderResult(result) {
    ui.result.hidden = false;
    ui.resultKicker.textContent = result.kind === "failure" ? "Смена провалена" : "Концовка";
    ui.resultTitle.textContent = result.title;
    ui.resultText.textContent = result.text;
  }

  function resetCardTransform(animate = true) {
    ui.card.style.transition = animate ? "transform 180ms ease, opacity 180ms ease" : "none";
    ui.card.style.transform = "translate(0, 0) rotate(0deg)";
    ui.card.style.opacity = "1";
    ui.leftHint.classList.remove("choice-hint--visible");
    ui.rightHint.classList.remove("choice-hint--visible");
    clearImpactPreview();
  }

  function restart() {
    state = freshState();
    currentCard = null;
    localStorage.removeItem(STORAGE_KEY);
    ui.result.hidden = true;
    ui.card.classList.remove("card--aftermath");
    showNextCard();
  }

  function beginDrag(event) {
    if (locked || state.ended) return;
    drag = { startX: event.clientX, startY: event.clientY, x: 0 };
    ui.card.setPointerCapture?.(event.pointerId);
    ui.card.style.transition = "none";
  }

  function moveDrag(event) {
    if (!drag) return;
    drag.x = event.clientX - drag.startX;
    const y = Math.min(18, Math.abs(drag.x) * 0.04);
    const rotation = Math.max(-12, Math.min(12, drag.x * 0.045));
    ui.card.style.transform = `translate(${drag.x}px, ${y}px) rotate(${rotation}deg)`;
    ui.card.style.opacity = String(1 - Math.min(0.25, Math.abs(drag.x) / 800));
    ui.leftHint.classList.toggle("choice-hint--visible", drag.x < -28);
    ui.rightHint.classList.toggle("choice-hint--visible", drag.x > 28);
    showImpactPreview(Math.abs(drag.x) > 16 ? (drag.x < 0 ? "left" : "right") : null);
  }

  function endDrag() {
    if (!drag) return;
    const direction = drag.x < 0 ? "left" : "right";
    const committed = Math.abs(drag.x) >= SWIPE_LIMIT;
    drag = null;
    if (committed) choose(direction);
    else resetCardTransform();
  }

  ui.restart.addEventListener("click", restart);
  ui.newRun.addEventListener("click", restart);
  ui.card.addEventListener("pointerdown", beginDrag);
  ui.card.addEventListener("pointermove", moveDrag);
  ui.card.addEventListener("pointerup", endDrag);
  ui.card.addEventListener("pointercancel", endDrag);
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") choose("left");
    if (event.key === "ArrowRight") choose("right");
  });

  if (state.ended) {
    renderResources();
    renderResult(state.ended);
  } else {
    showNextCard();
  }
})();
