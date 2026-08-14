(function () {
  "use strict";

  const groups = window.GAME_CARD_GROUPS;
  if (!groups) throw new Error("GAME_CARD_GROUPS is not loaded");

  const categoryOrder = ["events", "distortions", "chains", "stories"];
  const cards = categoryOrder.flatMap((category) => groups[category] || []);

  const resources = {
    personnel: { label: "Персонал", short: "П", iconSrc: "assets/icons/personnel.png", danger: "low" },
    budget: { label: "Бюджет", short: "Б", iconSrc: "assets/icons/budget.png", danger: "low" },
    secrecy: { label: "Секретность", short: "С", iconSrc: "assets/icons/secrecy.png", danger: "low" },
    anomaly: { label: "Аномальность", short: "А", iconSrc: "assets/icons/anomaly.png", danger: "high" }
  };

  window.GAME_CONTENT = {
    version: 4,
    config: {
      minResource: 0,
      maxResource: 1,
      recentWindow: 3,
      criticalThreshold: 0.24,
      dangerThreshold: 0.76,
      exhaustionStoryCard: "last_shift_01",
      exhaustionEnding: {
        kind: "ending",
        title: "Смена пережита",
        text: "Телефоны наконец замолчали. Все доступные дела закрыты, город всё ещё существует, а ваше имя осталось в утреннем табеле. Для этой смены этого достаточно."
      },
      start: {
        turn: 1,
        resources: { personnel: 0.58, budget: 0.58, secrecy: 0.58, anomaly: 0.24 },
        flags: {},
        counters: {},
        queue: ["orientation_call"]
      }
    },
    resources,
    categories: {
      events: {
        label: "События",
        description: "Самостоятельные ситуации без обязательного продолжения."
      },
      distortions: {
        label: "Искажения",
        description: "События с ненадёжным прогнозом: фактические последствия могут нарушить обещанную логику."
      },
      chains: {
        label: "Цепочки",
        description: "Короткие связанные истории об одной аномалии, не ведущие к глобальной концовке."
      },
      stories: {
        label: "Сюжеты",
        description: "Ветвящиеся линии, способные завершить всё прохождение."
      }
    },
    catalogCounts: { events: 42, distortions: 3, chains: 4, stories: 7 },
    resourceLessonCounts: { personnel: 4, budget: 4, secrecy: 4 },
    cardGroups: groups,
    tagRules: [
      {
        conditions: [{ type: "resource", key: "budget", op: "lte", value: 0.3 }],
        tags: ["budget"],
        multiplier: 2.4
      },
      {
        conditions: [{ type: "resource", key: "personnel", op: "lte", value: 0.3 }],
        tags: ["personnel"],
        multiplier: 2.4
      },
      {
        conditions: [{ type: "resource", key: "secrecy", op: "lte", value: 0.3 }],
        tags: ["secrecy"],
        multiplier: 2.1
      },
      {
        conditions: [{ type: "resource", key: "anomaly", op: "gte", value: 0.72 }],
        tags: ["anomaly"],
        multiplier: 2.2
      },
      {
        conditions: [{ type: "flag", key: "glass_arc_active", equals: true }],
        tags: ["glass"],
        multiplier: 3
      }
    ],
    failures: [
      {
        id: "anomaly_failure",
        condition: { type: "resource", key: "anomaly", op: "gte", value: 1 },
        title: "Реальность не выдержала",
        text: "Аномалии перестали быть исключением. К утру никто уже не помнил, каким мир был раньше."
      },
      {
        id: "personnel_failure",
        condition: { type: "resource", key: "personnel", op: "lte", value: 0 },
        title: "Некому отвечать",
        text: "Последняя оперативная группа не вернулась. Телефоны продолжают звонить в пустой диспетчерской."
      },
      {
        id: "budget_failure",
        condition: { type: "resource", key: "budget", op: "lte", value: 0 },
        title: "Служба закрыта",
        text: "Счета заморожены, склады опечатаны. Аномалии, к сожалению, не получили уведомления о ликвидации управления."
      },
      {
        id: "secrecy_failure",
        condition: { type: "resource", key: "secrecy", op: "lte", value: 0 },
        title: "Всё стало публичным",
        text: "Прямые эфиры идут со всех объектов. Паника распространяется быстрее любых аномалий."
      }
    ],
    endings: [],
    cards
  };
})();
