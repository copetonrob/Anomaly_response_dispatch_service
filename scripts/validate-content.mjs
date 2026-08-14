import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { loadGameContent } from "./lib/load-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const content = await loadGameContent(root);
const errors = [];
const resourceIds = new Set(Object.keys(content?.resources || {}));
const baseResourceIds = new Set(["personnel", "budget", "secrecy"]);
const cards = content?.cards || [];
const ids = new Set();
const categoryIds = new Set(Object.keys(content?.categories || {}));

function error(message) {
  errors.push(message);
}

function validateCondition(condition, owner) {
  if (!condition?.type) return error(`${owner}: condition has no type`);
  if (condition.type === "resource" && !resourceIds.has(condition.key)) {
    error(`${owner}: unknown resource '${condition.key}' in condition`);
  }
  if (condition.type === "resource" && (!Number.isFinite(condition.value) || condition.value < 0 || condition.value > 1)) {
    error(`${owner}: resource condition value must be within 0..1`);
  }
  if (["all", "any"].includes(condition.type)) {
    (condition.conditions || []).forEach((item) => validateCondition(item, owner));
  }
  if (condition.type === "not") validateCondition(condition.condition, owner);
}

function validateEffect(effect, owner) {
  if (!effect?.type) return error(`${owner}: effect has no type`);
  if (effect.type === "resource" && !resourceIds.has(effect.key)) {
    error(`${owner}: unknown resource '${effect.key}' in effect`);
  }
  if (effect.type === "resource" && (!Number.isFinite(effect.amount) || Math.abs(effect.amount) > 1)) {
    error(`${owner}: resource effect amount must be within -1..1`);
  }
  if (effect.type === "enqueue" && (!Array.isArray(effect.cards) || !effect.cards.length)) {
    error(`${owner}: enqueue effect needs at least one card id`);
  }
  if (effect.type === "end" && (!effect.title || !effect.text)) {
    error(`${owner}: end effect needs title and text`);
  }
}

if (!content) error("GAME_CONTENT was not created");
if (!Number.isInteger(content?.version)) error("version must be an integer");

for (const card of cards) {
  if (!card.id) error("A card has no id");
  else if (ids.has(card.id)) error(`Duplicate card id '${card.id}'`);
  else ids.add(card.id);

  if (!card.title || !card.text) error(`${card.id}: title and text are required`);
  if (!categoryIds.has(card.category)) error(`${card.id}: unknown category '${card.category}'`);
  if (card.lessonResource && !baseResourceIds.has(card.lessonResource)) {
    error(`${card.id}: unknown lesson resource '${card.lessonResource}'`);
  }
  if (card.lessonResource && card.category !== "events") {
    error(`${card.id}: resource lesson must be an event`);
  }
  if (["chains", "stories"].includes(card.category) && !card.arc) {
    error(`${card.id}: ${card.category} card needs an arc id`);
  }
  if (card.image && !existsSync(resolve(root, card.image))) {
    error(`${card.id}: image '${card.image}' does not exist`);
  }
  for (const condition of card.conditions || []) validateCondition(condition, card.id);

  for (const direction of ["left", "right"]) {
    const choice = card.choices?.[direction];
    if (!choice?.label) error(`${card.id}: missing ${direction} choice label`);
    if (choice?.preview) error(`${card.id}: obsolete preview field; impact is derived from effects`);
    for (const effect of choice?.effects || []) validateEffect(effect, `${card.id}.${direction}`);
    for (const effect of choice?.forecastEffects || []) {
      validateEffect(effect, `${card.id}.${direction}.forecast`);
      if (effect.type !== "resource") error(`${card.id}.${direction}: forecastEffects may contain only resources`);
    }
    if (card.category === "distortions" && !choice?.forecastEffects?.length) {
      error(`${card.id}.${direction}: distortion choice needs forecastEffects`);
    }

    const result = card.results?.[direction];
    if (!result?.title || !result?.text) {
      error(`${card.id}: missing ${direction} result title or text`);
    }
    for (const reactionDirection of ["left", "right"]) {
      const reaction = result?.reactions?.[reactionDirection];
      if (!reaction?.label) {
        error(`${card.id}.${direction}: missing ${reactionDirection} reaction label`);
      }
      for (const effect of reaction?.effects || []) {
        validateEffect(effect, `${card.id}.${direction}.reaction.${reactionDirection}`);
      }
    }
  }
}

const references = [];
for (const id of content?.config?.start?.queue || []) references.push(["start queue", id]);
if (content?.config?.exhaustionStoryCard) {
  references.push(["exhaustion story", content.config.exhaustionStoryCard]);
}
for (const card of cards) {
  for (const direction of ["left", "right"]) {
    const effects = [
      ...(card.choices?.[direction]?.effects || []),
      ...(card.results?.[direction]?.reactions?.left?.effects || []),
      ...(card.results?.[direction]?.reactions?.right?.effects || [])
    ];
    for (const effect of effects) {
      if (effect.type === "enqueue") {
        for (const id of effect.cards || []) references.push([`${card.id}.${direction}`, id]);
      }
    }
  }
}
for (const [owner, id] of references) {
  if (!ids.has(id)) error(`${owner}: queued card '${id}' does not exist`);
}

const groupedCards = Object.values(content?.cardGroups || {}).flat();
if (groupedCards.length !== cards.length) {
  error(`Aggregated pool has ${cards.length} cards, but category files contain ${groupedCards.length}`);
}
for (const category of categoryIds) {
  const group = content?.cardGroups?.[category];
  if (!Array.isArray(group)) {
    error(`Category '${category}' has no registered card array`);
    continue;
  }
  const expected = content?.catalogCounts?.[category];
  if (!Number.isInteger(expected)) {
    error(`Category '${category}' has no catalog count`);
  } else if (group.length !== expected) {
    error(`Category '${category}' expected ${expected} cards, got ${group.length}`);
  }
}

for (const [resource, expected] of Object.entries(content?.resourceLessonCounts || {})) {
  const lessons = cards.filter((card) => card.lessonResource === resource);
  if (lessons.length !== expected) {
    error(`Resource lesson '${resource}' expected ${expected} cards, got ${lessons.length}`);
  }
  for (const card of lessons) {
    const choices = Object.values(card.choices || {});
    const hasStrongGain = choices.some((choice) =>
      (choice.effects || []).some((effect) =>
        effect.type === "resource" && effect.key === resource && effect.amount >= 0.14
      )
    );
    const hasAlternativeGain = choices.some((choice) =>
      (choice.effects || []).some((effect) =>
        effect.type === "resource" && effect.key !== resource && effect.amount > 0
      )
    );
    if (!hasStrongGain) error(`${card.id}: lesson needs a strong gain for '${resource}'`);
    if (!hasAlternativeGain) error(`${card.id}: lesson needs an alternative gain outside '${resource}'`);
  }
}

for (const rule of content?.tagRules || []) {
  for (const condition of rule.conditions || []) validateCondition(condition, "tagRule");
}
for (const item of content?.failures || []) validateCondition(item.condition, item.id);
for (const item of content?.endings || []) {
  for (const condition of item.conditions || []) validateCondition(condition, item.id);
}

for (const key of resourceIds) {
  const value = content?.config?.start?.resources?.[key];
  if (!Number.isFinite(value)) {
    error(`Start value for resource '${key}' is missing`);
  } else if (value < 0 || value > 1) {
    error(`Start value for resource '${key}' must be within 0..1`);
  }
}

if (content?.config?.minResource !== 0 || content?.config?.maxResource !== 1) {
  error("Resource bounds must be normalized to 0..1");
}

if (errors.length) {
  console.error(`Content validation failed (${errors.length}):`);
  for (const item of errors) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  const distribution = Object.entries(content.cardGroups)
    .map(([category, group]) => `${category}=${group.length}`)
    .join(", ");
  console.log(`Content valid: ${cards.length} cards (${distribution}), ${references.length} queue references`);
}
