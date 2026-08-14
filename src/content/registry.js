(function () {
  "use strict";

  const categoryNames = ["events", "distortions", "chains", "stories"];
  const groups = Object.fromEntries(categoryNames.map((name) => [name, []]));

  window.GAME_CARD_GROUPS = groups;
  window.registerGameCards = function registerGameCards(category, cards) {
    if (!Object.hasOwn(groups, category)) {
      throw new Error(`Unknown card category '${category}'`);
    }
    if (!Array.isArray(cards)) {
      throw new Error(`Card category '${category}' must be an array`);
    }

    const singularKind = {
      events: "event",
      distortions: "distortion",
      chains: "chain",
      stories: "story"
    }[category];

    for (const card of cards) {
      groups[category].push({
        ...card,
        kind: singularKind,
        category
      });
    }
  };
})();

