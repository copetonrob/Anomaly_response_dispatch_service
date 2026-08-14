(function () {
  "use strict";

  window.registerGameCards("chains", [
  {
    "id": "glass_signal_01",
    "kind": "chain",
    "speaker": "Неизвестный источник",
    "title": "Звонок из стекла",
    "text": "Отключённый телефон звонит. В трубке ваш голос просит не смотреть в окна после 03:17.",
    "image": "assets/cards/glass-signal.webp",
    "imagePosition": "center 52%",
    "palette": [
      "#674f70",
      "#18121b"
    ],
    "tags": [
      "story",
      "glass",
      "anomaly"
    ],
    "weight": 2.5,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 6
      },
      {
        "type": "flag",
        "key": "glass_arc_done",
        "equals": false
      }
    ],
    "choices": {
      "left": {
        "label": "Отключить линию",
        "effects": [
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.04
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.05
          },
          {
            "type": "flag",
            "key": "glass_arc_done",
            "value": true
          }
        ]
      },
      "right": {
        "label": "Записать предупреждение",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.03
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.03
          },
          {
            "type": "flag",
            "key": "glass_arc_active",
            "value": true
          },
          {
            "type": "enqueue",
            "cards": [
              "glass_signal_02"
            ]
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Линия мертва",
        "text": "Провод перерезали. Телефон продолжал звонить ещё сорок минут, а затем ваш голос заговорил из вентиляции: «Теперь вы не узнаете, какое окно».",
        "reactions": {
          "left": {
            "label": "Нужно было выслушать"
          },
          "right": {
            "label": "Некоторые предупреждения опаснее угроз"
          }
        }
      },
      "right": {
        "title": "Предупреждение записано",
        "text": "Плёнка приняла ваш голос, но при воспроизведении он звучит снаружи закрытого окна. Ночная группа уже поднимается к вам.",
        "reactions": {
          "left": {
            "label": "Остановите группу"
          },
          "right": {
            "label": "Пусть увидят это своими глазами"
          }
        }
      }
    },
    "arc": "glass_signal"
  },
  {
    "id": "glass_signal_02",
    "kind": "chain",
    "speaker": "Ночная группа",
    "title": "03:16",
    "text": "Во всех окнах напротив горит ваш кабинет. В каждом из них кто-то поднимает трубку на секунду раньше вас.",
    "palette": [
      "#76577e",
      "#17101a"
    ],
    "tags": [
      "story",
      "glass"
    ],
    "weight": 0,
    "conditions": [
      {
        "type": "flag",
        "key": "glass_arc_active",
        "equals": true
      }
    ],
    "choices": {
      "left": {
        "label": "Задёрнуть шторы",
        "effects": [
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.05
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.08
          },
          {
            "type": "enqueue",
            "cards": [
              "glass_signal_03_hide"
            ]
          }
        ]
      },
      "right": {
        "label": "Ответить отражению",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.05
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.04
          },
          {
            "type": "enqueue",
            "cards": [
              "glass_signal_03_answer"
            ]
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "За шторами",
        "text": "Шторы закрыли окна, но отражения остались на ткани. Они повернулись к сотрудникам спиной и продолжили работу без вас.",
        "reactions": {
          "left": {
            "label": "Мы спрятались слишком поздно"
          },
          "right": {
            "label": "Не смотреть — тоже протокол"
          }
        }
      },
      "right": {
        "title": "Связь установлена",
        "text": "Отражение подняло трубку первым. Пятеро сотрудников услышали собственные последние слова и больше не смогли произнести ни звука.",
        "reactions": {
          "left": {
            "label": "Прекратить разговор"
          },
          "right": {
            "label": "Нам всё ещё нужны ответы"
          }
        }
      }
    },
    "arc": "glass_signal"
  },
  {
    "id": "glass_signal_03_hide",
    "kind": "chain",
    "speaker": "Дежурный куратор",
    "title": "После 03:17",
    "text": "Окна снова темны, но теперь отражения сотрудников запаздывают на несколько секунд.",
    "palette": [
      "#584865",
      "#151118"
    ],
    "tags": [
      "story",
      "glass"
    ],
    "weight": 0,
    "choices": {
      "left": {
        "label": "Опечатать этаж",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.1
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.06
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.08
          },
          {
            "type": "flag",
            "key": "glass_arc_done",
            "value": true
          },
          {
            "type": "flag",
            "key": "glass_arc_active",
            "value": false
          }
        ]
      },
      "right": {
        "label": "Считать это нормой",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": 0.04
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.1
          },
          {
            "type": "flag",
            "key": "glass_arc_done",
            "value": true
          },
          {
            "type": "flag",
            "key": "glass_arc_active",
            "value": false
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Этаж №9 опечатан",
        "text": "Двери залили бетоном. Ночью лифт всё равно останавливается на девятом, хотя в здании только восемь этажей.",
        "reactions": {
          "left": {
            "label": "Мы замуровали не ту сторону"
          },
          "right": {
            "label": "Пломба пока держится"
          }
        }
      },
      "right": {
        "title": "Новая норма",
        "text": "Сотрудникам приказали не обращать внимания на запаздывающие отражения. Через неделю отраже…6177 tokens truncated…вник из шести. Он принёс схему метро города, построенного под нашим, и не помнит, что когда-либо работал в службе.",
        "reactions": {
          "left": {
            "label": "Пятеро всё ещё внизу"
          },
          "right": {
            "label": "Схема может оказаться полезной"
          }
        }
      }
    },
    "arc": "glass_signal"
  },
  {
    "id": "glass_signal_03_answer",
    "speaker": "Ваш голос",
    "title": "Разговор снаружи",
    "text": "Отражение знает будущие вызовы. Оно предлагает помогать, если вы никогда не спросите, где находится настоящее управление.",
    "palette": ["#855f89", "#1b121e"],
    "tags": ["story", "glass"],
    "weight": 0,
    "choices": {
      "left": {
        "label": "Разбить стекло",
        "effects": [
          { "type": "resource", "key": "personnel", "amount": -0.07 },
          { "type": "resource", "key": "budget", "amount": -0.07 },
          { "type": "resource", "key": "anomaly", "amount": -0.12 },
          { "type": "flag", "key": "glass_arc_done", "value": true },
          { "type": "flag", "key": "glass_arc_active", "value": false }
        ]
      },
      "right": {
        "label": "Принять помощь",
        "effects": [
          { "type": "resource", "key": "budget", "amount": 0.09 },
          { "type": "resource", "key": "secrecy", "amount": 0.09 },
          { "type": "resource", "key": "anomaly", "amount": 0.12 },
          { "type": "flag", "key": "mirror_adviser", "value": true },
          { "type": "flag", "key": "glass_arc_done", "value": true },
          { "type": "flag", "key": "glass_arc_active", "value": false }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Осколки без отражений",
        "text": "Стекло разбили. Ни в одном осколке нет вашего лица, зато в каждом виден пустой кабинет куратора с открытой дверью.",
        "reactions": {
          "left": { "label": "Кто теперь смотрит нашими глазами?" },
          "right": { "label": "Соберите каждый осколок" }
        }
      },
      "right": {
        "title": "Новый советник",
        "text": "Отражение выполняет обещание: вызовы теперь приходят заранее. Иногда оно просит отправить группы туда, где ничего ещё не произошло.",
        "reactions": {
          "left": { "label": "Мы кормим его будущим" },
          "right": { "label": "Предупреждён — значит вооружён" }
        }
      }
    },
    "arc": "glass_signal"
  }
]);
})();
