(function () {
  "use strict";

  const resources = {
    personnel: { label: "Персонал", short: "П", iconSrc: "assets/icons/personnel.png", danger: "low" },
    budget: { label: "Бюджет", short: "Б", iconSrc: "assets/icons/budget.png", danger: "low" },
    secrecy: { label: "Секретность", short: "С", iconSrc: "assets/icons/secrecy.png", danger: "low" },
    anomaly: { label: "Аномальность", short: "А", iconSrc: "assets/icons/anomaly.png", danger: "high" }
  };

  const reactions = (left, right) => ({
    left: { label: left },
    right: { label: right }
  });

  const cards = [
    {
      id: "orientation_call",
      kind: "story",
      speaker: "Дежурный куратор",
      title: "Первая смена",
      text: "Телефон уже звонит. Куратор напоминает: спасайте людей, берегите смету и не позволяйте городу узнать лишнее.",
      palette: ["#40515b", "#10181d"],
      weight: 0,
      maxPlays: 1,
      choices: {
        left: {
          label: "Попросить инструкцию",
          effects: [
            { type: "resource", key: "personnel", amount: 0.08 },
            { type: "resource", key: "budget", amount: -0.04 },
            { type: "flag", key: "read_manual", value: true }
          ]
        },
        right: {
          label: "Сразу принять вызов",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: 0.04 },
            { type: "flag", key: "improvised", value: true }
          ]
        }
      }
    },
    {
      id: "whispering_basement",
      kind: "incident",
      speaker: "Участковый, линия 2",
      title: "Шёпот под домом",
      text: "Жильцы слышат из подвала собственные голоса. Голоса просят открыть дверь до полуночи.",
      palette: ["#4f665b", "#101a18"],
      tags: ["field", "secrecy", "anomaly"],
      weight: 7,
      cooldown: 5,
      choices: {
        left: {
          label: "Замуровать вход",
          effects: [
            { type: "resource", key: "budget", amount: -0.09 },
            { type: "resource", key: "secrecy", amount: 0.07 },
            { type: "resource", key: "anomaly", amount: -0.05 }
          ]
        },
        right: {
          label: "Послать группу внутрь",
          effects: [
            { type: "resource", key: "personnel", amount: -0.07 },
            { type: "resource", key: "anomaly", amount: -0.1 }
          ]
        }
      }
    },
    {
      id: "duplicate_bus",
      kind: "incident",
      speaker: "Транспортный отдел",
      title: "Лишний маршрут",
      text: "На кольцевой появился автобус №0. Пассажиры выходят из него на три года старше.",
      image: "assets/cards/duplicate-bus.webp",
      imagePosition: "center 52%",
      palette: ["#815b42", "#1c1512"],
      tags: ["public", "secrecy", "personnel"],
      weight: 6,
      cooldown: 4,
      choices: {
        left: {
          label: "Перекрыть кольцевую",
          effects: [
            { type: "resource", key: "personnel", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: -0.04 },
            { type: "resource", key: "anomaly", amount: -0.07 }
          ]
        },
        right: {
          label: "Выкупить все билеты",
          effects: [
            { type: "resource", key: "budget", amount: -0.1 },
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "flag", key: "owns_zero_bus_tickets", value: true }
          ]
        }
      }
    },
    {
      id: "rain_upstairs",
      kind: "incident",
      speaker: "Хозяйственный корпус",
      title: "Дождь на девятом",
      text: "В одной квартире дождь идёт вверх. Соседи снизу уже снимают это на телефоны.",
      image: "assets/cards/rain-upstairs.webp",
      imagePosition: "center 43%",
      palette: ["#496b80", "#101a20"],
      tags: ["public", "secrecy", "anomaly"],
      weight: 7,
      cooldown: 4,
      choices: {
        left: {
          label: "Объявить съёмки кино",
          effects: [
            { type: "resource", key: "budget", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: 0.09 },
            { type: "resource", key: "anomaly", amount: 0.05 }
          ]
        },
        right: {
          label: "Эвакуировать подъезд",
          effects: [
            { type: "resource", key: "personnel", amount: -0.08 },
            { type: "resource", key: "secrecy", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: -0.09 }
          ]
        }
      }
    },
    {
      id: "camera_footage",
      kind: "incident",
      speaker: "Архивист",
      title: "Запись завтрашнего дня",
      text: "Камера в холле прислала запись на сутки вперёд. На ней к утру в управлении не осталось людей.",
      palette: ["#676779", "#15151b"],
      tags: ["office", "personnel", "anomaly"],
      weight: 5,
      cooldown: 6,
      choices: {
        left: {
          label: "Распустить смену по домам",
          effects: [
            { type: "resource", key: "personnel", amount: 0.07 },
            { type: "resource", key: "secrecy", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: 0.06 }
          ]
        },
        right: {
          label: "Пусть всё идёт как на записи",
          effects: [
            { type: "resource", key: "personnel", amount: -0.09 },
            { type: "resource", key: "budget", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: -0.05 }
          ]
        }
      }
    },
    {
      id: "foundation_grant",
      kind: "incident",
      speaker: "Фонд перспективных наук",
      title: "Щедрое пожертвование",
      text: "Частный фонд готов закрыть дыру в смете. Взамен ему нужен один запечатанный контейнер из хранилища.",
      palette: ["#78643d", "#1d1910"],
      tags: ["budget", "secrecy", "anomaly"],
      weight: 4,
      cooldown: 7,
      conditions: [{ type: "resource", key: "budget", op: "lte", value: 0.55 }],
      choices: {
        left: {
          label: "Отказать фонду",
          effects: [{ type: "resource", key: "secrecy", amount: 0.04 }]
        },
        right: {
          label: "Передать контейнер",
          effects: [
            { type: "resource", key: "budget", amount: 0.15 },
            { type: "resource", key: "secrecy", amount: -0.08 },
            { type: "resource", key: "anomaly", amount: 0.07 },
            { type: "counter", key: "containers_released", amount: 1 }
          ]
        }
      }
    },
    {
      id: "volunteer_unit",
      kind: "incident",
      speaker: "Отдел кадров",
      title: "Добровольцы",
      text: "Группа энтузиастов просится на стажировку. Они крепкие, мотивированные и задают слишком много вопросов.",
      palette: ["#5f7150", "#151b12"],
      tags: ["personnel", "secrecy"],
      weight: 4,
      cooldown: 7,
      conditions: [{ type: "resource", key: "personnel", op: "lte", value: 0.55 }],
      choices: {
        left: {
          label: "Отправить домой",
          effects: [{ type: "resource", key: "secrecy", amount: 0.04 }]
        },
        right: {
          label: "Выдать временные пропуска",
          effects: [
            { type: "resource", key: "personnel", amount: 0.14 },
            { type: "resource", key: "budget", amount: -0.05 },
            { type: "resource", key: "secrecy", amount: -0.08 }
          ]
        }
      }
    },
    {
      id: "quiet_week",
      kind: "incident",
      speaker: "Аналитический отдел",
      title: "Подозрительно тихо",
      text: "За неделю не зарегистрировано ни одной аномалии. Аналитики уверены, что это статистически невозможно.",
      palette: ["#4a6465", "#101818"],
      tags: ["budget", "personnel", "anomaly"],
      weight: 3,
      cooldown: 8,
      conditions: [
        { type: "turn", op: "gte", value: 5 },
        { type: "resource", key: "anomaly", op: "lte", value: 0.55 }
      ],
      choices: {
        left: {
          label: "Провести учения",
          effects: [
            { type: "resource", key: "personnel", amount: -0.04 },
            { type: "resource", key: "budget", amount: -0.06 },
            { type: "resource", key: "anomaly", amount: -0.04 }
          ]
        },
        right: {
          label: "Дать всем отдохнуть",
          effects: [
            { type: "resource", key: "personnel", amount: 0.09 },
            { type: "resource", key: "budget", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: 0.08 }
          ]
        }
      }
    },
    {
      id: "glass_signal_01",
      kind: "story",
      speaker: "Неизвестный источник",
      title: "Звонок из стекла",
      text: "Отключённый телефон звонит. В трубке ваш голос просит не смотреть в окна после 03:17.",
      image: "assets/cards/glass-signal.webp",
      imagePosition: "center 52%",
      palette: ["#674f70", "#18121b"],
      tags: ["story", "glass", "anomaly"],
      weight: 2.5,
      maxPlays: 1,
      conditions: [
        { type: "turn", op: "gte", value: 6 },
        { type: "flag", key: "glass_arc_done", equals: false }
      ],
      choices: {
        left: {
          label: "Отключить линию",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: 0.05 },
            { type: "flag", key: "glass_arc_done", value: true }
          ]
        },
        right: {
          label: "Записать предупреждение",
          effects: [
            { type: "resource", key: "personnel", amount: -0.03 },
            { type: "resource", key: "anomaly", amount: -0.03 },
            { type: "flag", key: "glass_arc_active", value: true },
            { type: "enqueue", cards: ["glass_signal_02"] }
          ]
        }
      }
    },
    {
      id: "glass_signal_02",
      kind: "story",
      speaker: "Ночная группа",
      title: "03:16",
      text: "Во всех окнах напротив горит ваш кабинет. В каждом из них кто-то поднимает трубку на секунду раньше вас.",
      palette: ["#76577e", "#17101a"],
      tags: ["story", "glass"],
      weight: 0,
      maxPlays: 1,
      conditions: [{ type: "flag", key: "glass_arc_active", equals: true }],
      choices: {
        left: {
          label: "Задёрнуть шторы",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: 0.08 },
            { type: "enqueue", cards: ["glass_signal_03_hide"] }
          ]
        },
        right: {
          label: "Ответить отражению",
          effects: [
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: -0.04 },
            { type: "enqueue", cards: ["glass_signal_03_answer"] }
          ]
        }
      }
    },
    {
      id: "glass_signal_03_hide",
      kind: "story",
      speaker: "Дежурный куратор",
      title: "После 03:17",
      text: "Окна снова темны, но теперь отражения сотрудников запаздывают на несколько секунд.",
      palette: ["#584865", "#151118"],
      tags: ["story", "glass"],
      weight: 0,
      maxPlays: 1,
      choices: {
        left: {
          label: "Опечатать этаж",
          effects: [
            { type: "resource", key: "budget", amount: -0.1 },
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: -0.08 },
            { type: "flag", key: "glass_arc_done", value: true },
            { type: "flag", key: "glass_arc_active", value: false }
          ]
        },
        right: {
          label: "Считать это нормой",
          effects: [
            { type: "resource", key: "personnel", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: 0.1 },
            { type: "flag", key: "glass_arc_done", value: true },
            { type: "flag", key: "glass_arc_active", value: false }
          ]
        }
      }
    },
    {
      id: "glass_signal_03_answer",
      kind: "story",
      speaker: "Ваш голос",
      title: "Разговор снаружи",
      text: "Отражение знает будущие вызовы. Оно предлагает помогать, если вы никогда не спросите, где находится настоящее управление.",
      palette: ["#855f89", "#1b121e"],
      tags: ["story", "glass"],
      weight: 0,
      maxPlays: 1,
      choices: {
        left: {
          label: "Разбить стекло",
          effects: [
            { type: "resource", key: "personnel", amount: -0.07 },
            { type: "resource", key: "budget", amount: -0.07 },
            { type: "resource", key: "anomaly", amount: -0.12 },
            { type: "flag", key: "glass_arc_done", value: true },
            { type: "flag", key: "glass_arc_active", value: false }
          ]
        },
        right: {
          label: "Принять помощь",
          effects: [
            { type: "resource", key: "budget", amount: 0.09 },
            { type: "resource", key: "secrecy", amount: 0.09 },
            { type: "resource", key: "anomaly", amount: 0.12 },
            { type: "flag", key: "mirror_adviser", value: true },
            { type: "flag", key: "glass_arc_done", value: true },
            { type: "flag", key: "glass_arc_active", value: false }
          ]
        }
      }
    },
    {
      id: "mirror_tip",
      kind: "incident",
      speaker: "Отражение",
      title: "Совет из окна",
      text: "Отражение называет координаты следующего прорыва и просит оставить возле стекла включённый радиоприёмник.",
      palette: ["#7b6684", "#17131a"],
      tags: ["glass", "anomaly", "personnel"],
      weight: 5,
      cooldown: 6,
      conditions: [{ type: "flag", key: "mirror_adviser", equals: true }],
      choices: {
        left: {
          label: "Последовать совету",
          effects: [
            { type: "resource", key: "personnel", amount: 0.09 },
            { type: "resource", key: "anomaly", amount: 0.05 }
          ]
        },
        right: {
          label: "Заглушить приёмник",
          effects: [
            { type: "resource", key: "secrecy", amount: -0.03 },
            { type: "resource", key: "anomaly", amount: -0.06 }
          ]
        }
      }
    },
    {
      id: "audit",
      kind: "incident",
      speaker: "Финансовая инспекция",
      title: "Внеплановая проверка",
      text: "Инспекторы хотят увидеть, на что ушла статья «неевклидова логистика». Они уже в приёмной.",
      palette: ["#6f624c", "#1b1711"],
      tags: ["budget", "secrecy", "office"],
      weight: 5,
      cooldown: 6,
      conditions: [{ type: "turn", op: "gte", value: 4 }],
      choices: {
        left: {
          label: "Показать чистые отчёты",
          effects: [
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "secrecy", amount: 0.07 }
          ]
        },
        right: {
          label: "Провести в хранилище",
          effects: [
            { type: "resource", key: "budget", amount: 0.07 },
            { type: "resource", key: "secrecy", amount: -0.1 },
            { type: "resource", key: "anomaly", amount: 0.05 }
          ]
        }
      }
    }
  ];

  cards.push(
    {
      id: "underground_bell",
      kind: "incident",
      speaker: "Сейсмическая станция",
      title: "Колокол под землёй",
      text: "Под спальным районом каждые тринадцать минут звонит колокол. Звук слышат только дети и сотрудники с группой допуска выше третьей.",
      palette: ["#5c5848", "#141512"],
      tags: ["public", "personnel", "anomaly"],
      weight: 6,
      cooldown: 6,
      conditions: [{ type: "turn", op: "gte", value: 3 }],
      choices: {
        left: {
          label: "Эвакуировать квартал",
          effects: [
            { type: "resource", key: "personnel", amount: -0.1 },
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "secrecy", amount: -0.07 },
            { type: "resource", key: "anomaly", amount: -0.06 }
          ]
        },
        right: {
          label: "Залить шахту бетоном",
          effects: [
            { type: "resource", key: "budget", amount: -0.05 },
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: 0.11 }
          ]
        }
      },
      results: {
        left: {
          title: "Тринадцать пустых домов",
          text: "Квартал вывели до полуночи. Колокол замолчал, но эвакуированные дети теперь рисуют один и тот же город под землёй — с окнами, обращёнными вниз.",
          reactions: reactions("Нельзя позволить им вернуться", "Рисунки не являются доказательством")
        },
        right: {
          title: "Бетон принял форму",
          text: "В шахту ушло четыреста тонн смеси. Утром застывший бетон бился изнутри с частотой человеческого сердца, а звон стал слышен взрослым.",
          reactions: reactions("Мы сделали ему тело", "Заказать ещё бетона")
        }
      }
    },
    {
      id: "borrowed_sun",
      kind: "incident",
      speaker: "Метеорологический отдел",
      title: "Рассвет не наступил",
      text: "Над пригородом уже девятый час висит ночь. За административной границей светло, но солнечный свет отказывается пересекать дорожные знаки.",
      palette: ["#394753", "#11151a"],
      tags: ["public", "budget", "anomaly"],
      weight: 5,
      cooldown: 7,
      conditions: [{ type: "turn", op: "gte", value: 5 }],
      choices: {
        left: {
          label: "Развернуть прожекторные батареи",
          effects: [
            { type: "resource", key: "budget", amount: -0.14 },
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: -0.08 }
          ]
        },
        right: {
          label: "Объявить полярную ночь",
          effects: [
            { type: "resource", key: "budget", amount: 0.08 },
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "personnel", amount: -0.09 },
            { type: "resource", key: "anomaly", amount: 0.1 }
          ]
        }
      },
      results: {
        left: {
          title: "Искусственное утро",
          text: "Прожекторы заставили тьму отступить. Все тени в пригороде легли в сторону настоящего солнца — кроме теней оперативников, которые тянулись к лесу.",
          reactions: reactions("Не следовать за тенями", "Свет вернулся — этого достаточно")
        },
        right: {
          title: "Ведомственная ночь",
          text: "Жителям выдали памятки о редком климатическом явлении. На третьи сутки из темноты начали выходить люди, пропавшие здесь задолго до постройки пригорода.",
          reactions: reactions("Мы открыли им дорогу", "Пока они числятся жителями")
        }
      }
    },
    {
      id: "common_sea_dream",
      kind: "incident",
      speaker: "Медицинская часть",
      title: "Сон о чёрном море",
      text: "Сорок три сотрудника видят один сон: берег без звёзд и нечто огромное под неподвижной водой. Каждую ночь оно становится ближе.",
      palette: ["#344e58", "#0d1418"],
      tags: ["office", "personnel", "anomaly"],
      weight: 6,
      cooldown: 7,
      choices: {
        left: {
          label: "Не давать им спать",
          effects: [
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "personnel", amount: -0.11 },
            { type: "resource", key: "anomaly", amount: -0.07 }
          ]
        },
        right: {
          label: "Записывать их сны",
          effects: [
            { type: "resource", key: "budget", amount: 0.05 },
            { type: "resource", key: "personnel", amount: 0.04 },
            { type: "resource", key: "secrecy", amount: -0.06 },
            { type: "resource", key: "anomaly", amount: 0.12 }
          ]
        }
      },
      results: {
        left: {
          title: "Пятая бессонная ночь",
          text: "Сотрудники перестали видеть море во сне. Теперь они видят его наяву в тёмных мониторах, чашках кофе и зрачках друг друга.",
          reactions: reactions("Мы только разбудили сон", "Усталость пройдёт")
        },
        right: {
          title: "Карта прилива",
          text: "Все сорок три человека нарисовали одну береговую линию. Аналитик наложил её на план города: вода уже дошла до здания управления.",
          reactions: reactions("Сжечь карту", "Продолжить наблюдение до берега")
        }
      }
    },
    {
      id: "breathing_archive",
      kind: "incident",
      speaker: "Хранитель фонда 6",
      title: "Дело без номера",
      text: "В архиве появилась папка, которой нет в описи. Она тёплая, медленно дышит и содержит протокол вашего вскрытия.",
      palette: ["#685642", "#17130f"],
      tags: ["office", "secrecy", "anomaly"],
      weight: 5,
      cooldown: 7,
      choices: {
        left: {
          label: "Сжечь вместе с архивом",
          effects: [
            { type: "resource", key: "budget", amount: -0.12 },
            { type: "resource", key: "secrecy", amount: -0.08 },
            { type: "resource", key: "anomaly", amount: -0.09 }
          ]
        },
        right: {
          label: "Присвоить номер и подшить",
          effects: [
            { type: "resource", key: "budget", amount: 0.05 },
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: 0.1 }
          ]
        }
      },
      results: {
        left: {
          title: "Пожар по описи",
          text: "Огонь уничтожил три зала. Папка не сгорела: пожарные нашли её в вашем запертом столе, покрытую свежим пеплом изнутри.",
          reactions: reactions("Протокол всё ещё можно изменить", "Опечатать стол вместе с кабинетом")
        },
        right: {
          title: "Дело 6-0-0",
          text: "После регистрации папка перестала дышать. Зато дыхание появилось у стеллажа, а в описи возникли личные дела всех ещё не родившихся сотрудников.",
          reactions: reactions("Не открывать новые дела", "Архив наконец полон")
        }
      }
    },
    {
      id: "boiler_heart",
      kind: "incident",
      speaker: "Городская котельная",
      title: "Тепло из глубины",
      text: "Котлы работают без топлива и греют половину города. В топках обнаружена пульсирующая ткань, уходящая корнями в грунт.",
      palette: ["#6f4937", "#1a100d"],
      tags: ["budget", "public", "anomaly"],
      weight: 6,
      cooldown: 6,
      choices: {
        left: {
          label: "Остановить котельную",
          effects: [
            { type: "resource", key: "budget", amount: -0.13 },
            { type: "resource", key: "personnel", amount: -0.07 },
            { type: "resource", key: "secrecy", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: -0.08 }
          ]
        },
        right: {
          label: "Подключить ещё два района",
          effects: [
            { type: "resource", key: "budget", amount: 0.13 },
            { type: "resource", key: "secrecy", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: 0.14 }
          ]
        }
      },
      results: {
        left: {
          title: "Холодные батареи",
          text: "Котлы остановили, перерезав живые корни. В городе погасло отопление, а под землёй что-то огромное впервые за много лет перевернулось во сне.",
          reactions: reactions("Оно знает, где мы", "До весны ещё далеко")
        },
        right: {
          title: "Бесплатное тепло",
          text: "Счета снизились, жители довольны. В каждом подключённом доме младенцы начали засыпать, приложив ухо к батарее, и шептать одинаковые молитвы.",
          reactions: reactions("Отключить детские корпуса", "Тепло необходимо городу")
        }
      }
    },
    {
      id: "missing_shadows",
      kind: "incident",
      speaker: "Отдел внутренней безопасности",
      title: "Недостача теней",
      text: "У двенадцати сотрудников пропали тени. Камеры фиксируют тени отдельно: они спускаются ночью в закрытый сектор.",
      palette: ["#4c5050", "#111313"],
      tags: ["office", "personnel", "secrecy"],
      weight: 5,
      cooldown: 6,
      choices: {
        left: {
          label: "Осветить все коридоры",
          effects: [
            { type: "resource", key: "budget", amount: -0.1 },
            { type: "resource", key: "personnel", amount: -0.04 },
            { type: "resource", key: "anomaly", amount: -0.06 }
          ]
        },
        right: {
          label: "Оформить тени как ночную смену",
          effects: [
            { type: "resource", key: "budget", amount: 0.08 },
            { type: "resource", key: "personnel", amount: 0.07 },
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: 0.11 }
          ]
        }
      },
      results: {
        left: {
          title: "Свет без углов",
          text: "Прожекторы не оставили теням места. К утру двенадцать сотрудников стали плоскими на фотографиях и больше не отражаются в служебных удостоверениях.",
          reactions: reactions("Мы выжгли часть их самих", "Зато сектор снова закрыт")
        },
        right: {
          title: "Штат укомплектован",
          text: "Тени получили табельные номера и выполняют план на сто сорок процентов. Они просят перевести владельцев в дневную смену навсегда.",
          reactions: reactions("Уволить тени", "Отдел кадров возражений не имеет")
        }
      }
    },
    {
      id: "extra_corridor",
      kind: "incident",
      speaker: "Комендант здания",
      title: "Коридор длиной в ночь",
      text: "Между кабинетами 214 и 215 появился новый коридор. Шагомер насчитал в нём сорок километров, но снаружи стена короче трёх метров.",
      palette: ["#596057", "#121512"],
      tags: ["office", "budget", "anomaly"],
      weight: 6,
      cooldown: 6,
      choices: {
        left: {
          label: "Снести крыло здания",
          effects: [
            { type: "resource", key: "budget", amount: -0.14 },
            { type: "resource", key: "personnel", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: -0.1 }
          ]
        },
        right: {
          label: "Передать коридор архиву",
          effects: [
            { type: "resource", key: "budget", amount: 0.09 },
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: 0.12 }
          ]
        }
      },
      results: {
        left: {
          title: "Здание стало короче",
          text: "Крыло обрушили контролируемым взрывом. Коридор исчез, а вместе с ним кабинет 215 и все воспоминания о людях, которые там работали.",
          reactions: reactions("У них должны быть семьи", "В штатном расписании пробелов нет")
        },
        right: {
          title: "Новое хранилище",
          text: "Архивисты заполнили первые семь километров стеллажами. Курьер, отправленный с делом на восьмой километр, вернулся седым и утверждает, что видел конец управления.",
          reactions: reactions("Закрыть проход после седьмого", "Место хранения найдено")
        }
      }
    },
    {
      id: "dead_minister_order",
      kind: "incident",
      speaker: "Правительственная линия",
      title: "Приказ покойного министра",
      text: "Пришла директива за подписью министра, умершего двадцать лет назад. Он требует передать ему список всех живых оперативников.",
      palette: ["#625548", "#17130f"],
      tags: ["budget", "secrecy", "personnel"],
      weight: 5,
      cooldown: 8,
      conditions: [{ type: "turn", op: "gte", value: 7 }],
      choices: {
        left: {
          label: "Исполнить директиву",
          effects: [
            { type: "resource", key: "budget", amount: 0.12 },
            { type: "resource", key: "secrecy", amount: 0.08 },
            { type: "resource", key: "personnel", amount: -0.1 },
            { type: "resource", key: "anomaly", amount: 0.09 }
          ]
        },
        right: {
          label: "Вернуть без исполнения",
          effects: [
            { type: "resource", key: "budget", amount: -0.09 },
            { type: "resource", key: "secrecy", amount: -0.07 },
            { type: "resource", key: "anomaly", amount: -0.04 }
          ]
        }
      },
      results: {
        left: {
          title: "Список принят",
          text: "Казначейство восстановило старую статью финансирования. Десять имён в кадровой базе сразу сменили статус на «ожидается прибытие к месту захоронения».",
          reactions: reactions("Предупредить этих людей", "Приказ имеет высшую подпись")
        },
        right: {
          title: "Входящий номер аннулирован",
          text: "Директива вернулась через минуту с пометкой «получатель умер». Под пометкой стоит ваше имя и завтрашняя дата.",
          reactions: reactions("У меня ещё есть время", "Документ составлен с нарушениями")
        }
      }
    },
    {
      id: "reservoir_choir",
      kind: "incident",
      speaker: "Водоканал",
      title: "Хор в резервуаре",
      text: "Из городского резервуара по ночам слышно детское пение. Записи подтверждают: хор исполняет гимн службе на языке, которого нет в архивах.",
      palette: ["#3f5960", "#0f1618"],
      tags: ["public", "budget", "secrecy", "anomaly"],
      weight: 6,
      cooldown: 7,
      choices: {
        left: {
          label: "Осушить резервуар",
          effects: [
            { type: "resource", key: "budget", amount: -0.13 },
            { type: "resource", key: "personnel", amount: -0.08 },
            { type: "resource", key: "secrecy", amount: -0.09 },
            { type: "resource", key: "anomaly", amount: -0.07 }
          ]
        },
        right: {
          label: "Добавить звукопоглощающий реагент",
          effects: [
            { type: "resource", key: "budget", amount: -0.04 },
            { type: "resource", key: "secrecy", amount: 0.08 },
            { type: "resource", key: "anomaly", amount: 0.1 }
          ]
        }
      },
      results: {
        left: {
          title: "На дне никого",
          text: "Резервуар осушили. На дне лежат тысячи молочных зубов, сложенных в эмблему управления. Хор теперь звучит из городских кранов.",
          reactions: reactions("Не пускайте воду в школы", "Анализ воды в пределах нормы")
        },
        right: {
          title: "Тишина в трубах",
          text: "Пение прекратилось. Жители жалуются, что вода стала густой и иногда произносит их имена, если оставить кран открытым в темноте.",
          reactions: reactions("Мы заставили их шептать", "Главное, никто больше не слышит хор")
        }
      }
    },
    {
      id: "elevator_minus_one",
      kind: "incident",
      speaker: "Диспетчер лифтов",
      title: "Кнопка минус один",
      text: "Во всех лифтах центрального района появилась кнопка «−1». Нажавшие возвращаются с мокрой землёй на обуви и забывают одного близкого человека.",
      palette: ["#525b58", "#111513"],
      tags: ["public", "personnel", "anomaly"],
      weight: 6,
      cooldown: 6,
      choices: {
        left: {
          label: "Заварить двери лифтов",
          effects: [
            { type: "resource", key: "budget", amount: -0.11 },
            { type: "resource", key: "personnel", amount: -0.07 },
            { type: "resource", key: "secrecy", amount: -0.08 },
            { type: "resource", key: "anomaly", amount: -0.06 }
          ]
        },
        right: {
          label: "Отправить группу на минус первый",
          effects: [
            { type: "resource", key: "personnel", amount: -0.13 },
            { type: "resource", key: "secrecy", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: -0.1 }
          ]
        }
      },
      results: {
        left: {
          title: "Вертикаль перекрыта",
          text: "Двери заварили в сорока домах. Ночью жильцы слышат, как лифты ездят за стенами, останавливаясь на этажах с отрицательными номерами.",
          reactions: reactions("Мы заперли их вместе с домами", "Доступ граждан прекращён")
        },
        right: {
          title: "Отчёт с нижнего этажа",
          text: "Вернулся один оперативник из шести. Он принёс схему метро города, построенного под нашим, и не помнит, что когда-либо работал в службе.",
          reactions: reactions("Пятеро всё ещё внизу", "Схема может оказаться полезной")
        }
      }
    }
  );

  cards.push(
    {
      id: "complaining_stamp",
      kind: "incident",
      speaker: "Общий отдел",
      title: "Недовольная печать",
      text: "Гербовая печать отказывается заверять приказы и тихо вздыхает при виде каждой новой формы. Делопроизводство встало на сорок минут.",
      palette: ["#74624a", "#1b1711"],
      tags: ["office", "budget"],
      weight: 7,
      cooldown: 5,
      choices: {
        left: {
          label: "Заказать новую печать",
          effects: [
            { type: "resource", key: "budget", amount: -0.03 },
            { type: "resource", key: "secrecy", amount: 0.02 }
          ]
        },
        right: {
          label: "Уговорить старую",
          effects: [
            { type: "resource", key: "personnel", amount: -0.02 },
            { type: "resource", key: "budget", amount: 0.02 },
            { type: "resource", key: "anomaly", amount: 0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Печать списана",
          text: "Новую печать доставили к обеду. Старую заперли в сейфе, откуда она всю ночь ставила оттиски на внутренней стенке дверцы.",
          reactions: reactions("Не открывать сейф", "Списание оформлено правильно")
        },
        right: {
          title: "Компромисс достигнут",
          text: "Секретарь пообещал печати меньше сверхурочной работы. Она снова заверяет документы, но добавляет к каждому оттиску едва заметный отпечаток зубов.",
          reactions: reactions("Проверить секретаря", "Главное, бумаги идут дальше")
        }
      }
    },
    {
      id: "office_plant_minutes",
      kind: "incident",
      speaker: "Секретариат",
      title: "Фикус ведёт протокол",
      text: "Кабинетный фикус научился печатать на машинке. Его протоколы совещаний точнее официальных, хотя растение не присутствовало ни на одном из них.",
      palette: ["#5d6b4f", "#151a12"],
      tags: ["office", "secrecy"],
      weight: 7,
      cooldown: 6,
      choices: {
        left: {
          label: "Назначить внештатным стенографистом",
          effects: [
            { type: "resource", key: "budget", amount: 0.04 },
            { type: "resource", key: "personnel", amount: 0.03 },
            { type: "resource", key: "secrecy", amount: -0.04 },
            { type: "resource", key: "anomaly", amount: 0.03 }
          ]
        },
        right: {
          label: "Утилизировать как макулатуру",
          effects: [
            { type: "resource", key: "personnel", amount: -0.02 },
            { type: "resource", key: "secrecy", amount: 0.03 },
            { type: "resource", key: "anomaly", amount: -0.02 }
          ]
        }
      },
      results: {
        left: {
          title: "Сотрудник Ф. И. Кус",
          text: "Растению выдали пропуск и половину ставки. В первом служебном отчёте оно дословно записало завтрашнее закрытое совещание.",
          reactions: reactions("Отменить совещание", "Положить протокол в папку к остальным")
        },
        right: {
          title: "Зелёная стружка",
          text: "Фикус пропустили через уничтожитель бумаг. Утром из вентиляции выросли тонкие побеги, шепчущие повестку дня.",
          reactions: reactions("Мы поступили жестоко", "Провести обработку вентиляции")
        }
      }
    },
    {
      id: "wrong_number_room",
      kind: "incident",
      speaker: "Телефонная станция",
      title: "Номер не существует",
      text: "Горожане звонят в службу и просят соединить их с кабинетом 404. Такого кабинета нет, но по внутренней линии кто-то отвечает.",
      palette: ["#4c5d63", "#111719"],
      tags: ["office", "secrecy", "anomaly"],
      weight: 6,
      cooldown: 6,
      conditions: [{ type: "turn", op: "gte", value: 3 }],
      choices: {
        left: {
          label: "Отключить номер",
          effects: [
            { type: "resource", key: "budget", amount: -0.04 },
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: 0.04 }
          ]
        },
        right: {
          label: "Назначить оператора слушать",
          effects: [
            { type: "resource", key: "personnel", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: -0.04 },
            { type: "resource", key: "anomaly", amount: -0.05 }
          ]
        }
      },
      results: {
        left: {
          title: "Линия отключена",
          text: "Кабель физически вырезали из щитка. Звонки прекратились, но на дверях всех пустых кабинетов появилась табличка «404».",
          reactions: reactions("Не входить в пустые кабинеты", "Таблички можно снять утром")
        },
        right: {
          title: "Дежурство у пустой линии",
          text: "Оператор слушал восемь часов. В трубке зачитывали список всех звонков, которые он совершит до конца жизни; последний был в кабинет 404.",
          reactions: reactions("Снять его со смены", "Попросить записать список")
        }
      }
    },
    {
      id: "museum_mask",
      kind: "incident",
      speaker: "Городской музей",
      title: "Маска просит лицо",
      text: "Каменная маска из закрытой экспозиции называет посетителей по имени и предлагает показать, кем они были до рождения.",
      palette: ["#6a5e4f", "#181410"],
      tags: ["public", "secrecy", "personnel", "anomaly"],
      weight: 5,
      cooldown: 7,
      conditions: [{ type: "turn", op: "gte", value: 5 }],
      choices: {
        left: {
          label: "Закрыть музей на реставрацию",
          effects: [
            { type: "resource", key: "budget", amount: -0.07 },
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: 0.04 }
          ]
        },
        right: {
          label: "Допросить маску",
          effects: [
            { type: "resource", key: "personnel", amount: -0.08 },
            { type: "resource", key: "secrecy", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: -0.07 }
          ]
        }
      },
      results: {
        left: {
          title: "Экспозиция закрыта",
          text: "Посетителей вывели. Ночью маска продолжила называть имена — теперь сотрудников службы и даты, когда их лица станут свободны.",
          reactions: reactions("Никому не показывать список", "К утру она замолчит")
        },
        right: {
          title: "Свидетель из известняка",
          text: "Маска ответила на вопросы голосами оперативников. Трое сорвали с себя лица; под ними оказались гладкие поверхности с инвентарными номерами.",
          reactions: reactions("Это были наши люди", "Номера занести в протокол")
        }
      }
    },
    {
      id: "snow_inside_radio",
      kind: "incident",
      speaker: "Радиомониторинг",
      title: "Снег внутри приёмника",
      text: "Из настроенных на пустую частоту радиоприёмников сыплется настоящий снег. Он не тает и складывается в контуры неизвестного побережья.",
      palette: ["#596a71", "#11171a"],
      tags: ["office", "budget", "anomaly"],
      weight: 5,
      cooldown: 7,
      conditions: [{ type: "turn", op: "gte", value: 5 }],
      choices: {
        left: {
          label: "Изъять все приёмники",
          effects: [
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: -0.05 }
          ]
        },
        right: {
          label: "Продать частоту метеослужбе",
          effects: [
            { type: "resource", key: "budget", amount: 0.09 },
            { type: "resource", key: "secrecy", amount: -0.06 },
            { type: "resource", key: "anomaly", amount: 0.08 }
          ]
        }
      },
      results: {
        left: {
          title: "Частота очищена",
          text: "Приёмники собрали в экранированном складе. Снег перестал идти, но внутри сугроба радиолокатор фиксирует медленно движущийся тёплый объект.",
          reactions: reactions("Не раскапывать", "Усилить охлаждение склада")
        },
        right: {
          title: "Доход от осадков",
          text: "Метеослужба оплатила эксклюзивный доступ. На следующий день её прогноз показал снегопад вверх и температуру ниже абсолютного нуля.",
          reactions: reactions("Вернуть деньги", "Прогноз не является фактом")
        }
      }
    },
    {
      id: "sleeping_station",
      kind: "incident",
      speaker: "Метрополитен",
      title: "Станция спит",
      text: "Закрытая станция метро расширяется и сжимается, будто дышит. Поезда замедляются рядом с ней, а пассажиры одновременно засыпают.",
      palette: ["#4a5855", "#101513"],
      tags: ["public", "personnel", "budget", "anomaly"],
      weight: 5,
      cooldown: 7,
      conditions: [{ type: "turn", op: "gte", value: 7 }],
      choices: {
        left: {
          label: "Изменить маршрут тоннелей",
          effects: [
            { type: "resource", key: "budget", amount: -0.12 },
            { type: "resource", key: "personnel", amount: -0.08 },
            { type: "resource", key: "secrecy", amount: -0.06 },
            { type: "resource", key: "anomaly", amount: -0.08 }
          ]
        },
        right: {
          label: "Снизить скорость поездов",
          effects: [
            { type: "resource", key: "budget", amount: 0.05 },
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "personnel", amount: -0.07 },
            { type: "resource", key: "anomaly", amount: 0.1 }
          ]
        }
      },
      results: {
        left: {
          title: "Обходной тоннель",
          text: "Пути проложили в стороне. Старая станция вздохнула так глубоко, что провалилась на тридцать метров и утащила с собой проходческую бригаду.",
          reactions: reactions("Они ещё могут быть живы", "Новый тоннель уже принят комиссией")
        },
        right: {
          title: "Не будить станцию",
          text: "Поезда проходят бесшумно. Спящие пассажиры просыпаются на своей остановке, но каждый оставляет на пустой станции один и тот же сон.",
          reactions: reactions("Однажды она проснётся полной", "Расписание соблюдается")
        }
      }
    },
    {
      id: "names_in_concrete",
      kind: "incident",
      speaker: "Строительное управление",
      title: "Имена в бетоне",
      text: "На свежих стенах нового квартала проступают имена жильцов. Некоторые перечёркнуты красной линией ещё до заселения домов.",
      palette: ["#67645d", "#171614"],
      tags: ["public", "budget", "secrecy", "anomaly"],
      weight: 5,
      cooldown: 8,
      conditions: [{ type: "turn", op: "gte", value: 8 }],
      choices: {
        left: {
          label: "Снести квартал",
          effects: [
            { type: "resource", key: "budget", amount: -0.15 },
            { type: "resource", key: "personnel", amount: -0.07 },
            { type: "resource", key: "secrecy", amount: -0.1 },
            { type: "resource", key: "anomaly", amount: -0.09 }
          ]
        },
        right: {
          label: "Заселять только неперечёркнутых",
          effects: [
            { type: "resource", key: "budget", amount: 0.12 },
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: 0.13 }
          ]
        }
      },
      results: {
        left: {
          title: "Адреса уничтожены",
          text: "Дома снесли до фундамента. Имена появились на бетонных обломках снова — к списку добавились фамилии подрывников.",
          reactions: reactions("Мы не остановили список", "Обломки вывезти за город")
        },
        right: {
          title: "Образцовый квартал",
          text: "Квартиры получили только неперечёркнутые. После заселения красные линии начали медленно появляться на стенах изнутри, по одной каждую ночь.",
          reactions: reactions("Эвакуировать их сейчас", "Списки иногда меняются")
        }
      }
    },
    {
      id: "sky_ledger",
      kind: "incident",
      speaker: "Астрономическая комиссия",
      title: "Бухгалтерия неба",
      text: "Между облаками появились гигантские строки ведомости. В графе «остаток» указано население города, и число уменьшается каждый час.",
      palette: ["#3d4b5c", "#0e1218"],
      tags: ["public", "budget", "secrecy", "anomaly"],
      weight: 4,
      cooldown: 9,
      conditions: [{ type: "turn", op: "gte", value: 10 }],
      choices: {
        left: {
          label: "Погасить городскую электросеть",
          effects: [
            { type: "resource", key: "budget", amount: -0.14 },
            { type: "resource", key: "personnel", amount: -0.09 },
            { type: "resource", key: "secrecy", amount: -0.11 },
            { type: "resource", key: "anomaly", amount: -0.1 }
          ]
        },
        right: {
          label: "Скорректировать цифру прожекторами",
          effects: [
            { type: "resource", key: "budget", amount: -0.07 },
            { type: "resource", key: "secrecy", amount: -0.08 },
            { type: "resource", key: "anomaly", amount: 0.14 }
          ]
        }
      },
      results: {
        left: {
          title: "Город списан со света",
          text: "После отключения ведомость исчезла. Утром перепись не смогла найти девять тысяч человек: квартиры обставлены, еда тёплая, но родственники не помнят, кто там жил.",
          reactions: reactions("Мы позволили их списать", "Остаток перестал уменьшаться")
        },
        right: {
          title: "Исправление принято",
          text: "Прожекторы добавили к остатку лишний ноль. Небо приняло поправку, но теперь в городе живёт в десять раз больше теней, чем людей.",
          reactions: reactions("Это не было населением", "Баланс формально восстановлен")
        }
      }
    },
    {
      id: "city_under_skin",
      kind: "incident",
      speaker: "Санитарная комиссия",
      title: "Город под кожей",
      text: "У тысяч жителей под кожей проступила одинаковая карта улиц. По ночам на ней зажигаются огни, а неизвестный проспект ведёт прямо к сердцу.",
      palette: ["#684b48", "#1a1010"],
      tags: ["public", "personnel", "secrecy", "anomaly"],
      weight: 3.5,
      cooldown: 10,
      conditions: [{ type: "turn", op: "gte", value: 12 }],
      choices: {
        left: {
          label: "Изолировать всех носителей",
          effects: [
            { type: "resource", key: "budget", amount: -0.16 },
            { type: "resource", key: "personnel", amount: -0.14 },
            { type: "resource", key: "secrecy", amount: -0.13 },
            { type: "resource", key: "anomaly", amount: -0.11 }
          ]
        },
        right: {
          label: "Нанести карты в городской реестр",
          effects: [
            { type: "resource", key: "budget", amount: 0.15 },
            { type: "resource", key: "secrecy", amount: 0.08 },
            { type: "resource", key: "anomaly", amount: 0.17 }
          ]
        }
      },
      results: {
        left: {
          title: "Карантинный мегаполис",
          text: "Носителей свезли на стадион. В полночь карты на их телах соединились в один город, и тысячи сердец забились как его центральная площадь.",
          reactions: reactions("Мы собрали его целиком", "Периметр ещё удерживается")
        },
        right: {
          title: "Новый генеральный план",
          text: "Реестр принял неизвестные улицы. Наутро они появились в городе физически, прорезав дома и людей; в конце проспекта пульсирует здание без дверей.",
          reactions: reactions("Стереть реестр любой ценой", "Новый район требует финансирования")
        }
      }
    },
    {
      id: "world_knocking",
      kind: "incident",
      speaker: "Все линии одновременно",
      title: "Кто-то стучит снаружи",
      text: "Стук слышен в каждом окне города, независимо от этажа. Звук идёт не с улицы: он приходит с той стороны неба, где не должно быть пространства.",
      palette: ["#4f3d46", "#120d11"],
      tags: ["public", "personnel", "budget", "secrecy", "anomaly"],
      weight: 3,
      cooldown: 12,
      maxPlays: 1,
      conditions: [{ type: "turn", op: "gte", value: 14 }],
      choices: {
        left: {
          label: "Заколотить все окна города",
          effects: [
            { type: "resource", key: "budget", amount: -0.18 },
            { type: "resource", key: "personnel", amount: -0.15 },
            { type: "resource", key: "secrecy", amount: -0.16 },
            { type: "resource", key: "anomaly", amount: -0.12 }
          ]
        },
        right: {
          label: "Ответить одним окном",
          effects: [
            { type: "resource", key: "budget", amount: 0.1 },
            { type: "resource", key: "personnel", amount: -0.12 },
            { type: "resource", key: "secrecy", amount: 0.07 },
            { type: "resource", key: "anomaly", amount: 0.18 }
          ]
        }
      },
      results: {
        left: {
          title: "Город без окон",
          text: "К рассвету стук затих. Жители сняли доски и обнаружили за окнами не улицы, а бесконечную чёрную воду, в которой отражается город без людей.",
          reactions: reactions("Мы опоздали закрыть их", "Не позволять никому смотреть наружу")
        },
        right: {
          title: "Окно открыто",
          text: "В пустом доме открыли одну створку. Стук прекратился повсюду, а из комнаты исчезли двенадцать оперативников, само окно и понятие направления, в котором они ушли.",
          reactions: reactions("Мы впустили его", "Один проём спас остальные")
        }
      }
    }
  );

  const resultsByCard = {
    orientation_call: {
      left: {
        title: "Инструкция №7-Б",
        text: "Куратор прислал триста страниц поправок. Между актом о списании фонарей и формой посмертного найма обнаружилась полезная схема эвакуации. Смена чувствует себя увереннее; бухгалтерия — нет.",
        reactions: reactions("Надо было читать мелкий шрифт", "Теперь мы хотя бы вооружены")
      },
      right: {
        title: "Вызов принят",
        text: "Вы ответили раньше, чем оператор успел назвать адрес. В журнале уже стояла ваша подпись, поставленная завтрашней датой.",
        reactions: reactions("Мне это не нравится", "Работа не ждёт объяснений")
      }
    },
    whispering_basement: {
      left: {
        title: "Стена шепчет",
        text: "К рассвету вход заложили тремя слоями кирпича. Голоса не исчезли — теперь они доносятся из стен квартир и знают имена каменщиков.",
        reactions: reactions("Мы только разнесли это дальше", "Печать поставлена. Дело закрыто")
      },
      right: {
        title: "Семеро вошли",
        text: "Группа вернулась без двух сотрудников и с лишней каской. На записи внутри подвала всё время слышно, как кто-то восьмой дышит рядом с камерой.",
        reactions: reactions("О боже, что мы наделали", "Они знали, на что шли")
      }
    },
    duplicate_bus: {
      left: {
        title: "Последний круг",
        text: "Автобус загнали между бетонными блоками. Когда двигатель заглох, пассажиры рассыпались в мокрую билетную пыль. Двое оперативников постарели на одиннадцать лет.",
        reactions: reactions("Запишите их имена", "Главное, маршрут закрыт")
      },
      right: {
        title: "Все места оплачены",
        text: "Автобус принял пачку выкупленных билетов и уехал пустым. Ночью билеты вернулись в кассу; на каждом напечатана дата смерти сотрудника управления.",
        reactions: reactions("Спрячьте билеты от персонала", "Мы купили городу ещё одну ночь")
      }
    },
    rain_upstairs: {
      left: {
        title: "Съёмочная площадка",
        text: "Легенда сработала. Зеваки разошлись, решив, что дождь дорисуют на монтаже. К утру вода собралась под потолком в тяжёлое чёрное озеро.",
        reactions: reactions("Мы оставили их под этим", "Вернёмся, когда будет смета")
      },
      right: {
        title: "Пустой подъезд",
        text: "Жильцов вывели, но квартира не отпустила троих оперативников. Теперь их голоса слышны в каплях, ползущих по потолку вверх.",
        reactions: reactions("Мы не можем их там бросить", "Других жильцов мы спасли")
      }
    },
    camera_footage: {
      left: {
        title: "Самоисполняющаяся запись",
        text: "Смена ушла домой. Утром камеры действительно показали пустое управление — кроме фигуры в вашем кабинете, которая всю ночь просматривала личные дела сотрудников.",
        reactions: reactions("Найдите, кто остался", "Предсказание хотя бы сбылось не полностью")
      },
      right: {
        title: "Как было показано",
        text: "Вы повторили запись кадр в кадр. Девять сотрудников исчезли в слепой зоне камеры. На их зарплатные счета ещё долго будут приходить премии.",
        reactions: reactions("Мы принесли их в жертву расписанию", "Несоответствий с записью нет")
      }
    },
    foundation_grant: {
      left: {
        title: "Отказ зарегистрирован",
        text: "Фонд принял отказ спокойно. Через час его представитель позвонил изнутри запечатанного контейнера и попросил пересмотреть решение.",
        reactions: reactions("Проверьте пломбы", "Не отвечайте на второй звонок")
      },
      right: {
        title: "Контейнер передан",
        text: "Деньги поступили мгновенно. Грузовик фонда уехал без водителя, а на окраине города появилась улица, которой нет ни на одной карте.",
        reactions: reactions("Мы продали им часть города", "Служба продолжит работу")
      }
    },
    volunteer_unit: {
      left: {
        title: "Отказ в допуске",
        text: "Добровольцы ушли разочарованными. Один оставил анкету: в графе «предыдущий опыт» перечислены происшествия, которые ещё не случились.",
        reactions: reactions("Мы ещё увидим эти фамилии", "Правила допуска существуют не зря")
      },
      right: {
        title: "Временные сотрудники",
        text: "Пропуска выдали двадцати добровольцам. В конце смены табель насчитал двадцать одного, и никто не смог вспомнить лицо лишнего.",
        reactions: reactions("Пересчитать их ещё раз", "Лишние руки сейчас не помешают")
      }
    },
    quiet_week: {
      left: {
        title: "Учебная тревога",
        text: "Во время учений манекен изоляционного костюма попросил выпустить его из горящего макета. Персонал отработал процедуру, не задавая вопросов.",
        reactions: reactions("Манекены не должны просить", "Учения выявили слабое место")
      },
      right: {
        title: "Выходной",
        text: "Управление опустело. Пока все отдыхали, журнал происшествий заполнил себя сам: двенадцать вызовов отмечены как успешно проигнорированные.",
        reactions: reactions("Мы ещё заплатим за эту тишину", "Людям был нужен отдых")
      }
    },
    glass_signal_01: {
      left: {
        title: "Линия мертва",
        text: "Провод перерезали. Телефон продолжал звонить ещё сорок минут, а затем ваш голос заговорил из вентиляции: «Теперь вы не узнаете, какое окно».",
        reactions: reactions("Нужно было выслушать", "Некоторые предупреждения опаснее угроз")
      },
      right: {
        title: "Предупреждение записано",
        text: "Плёнка приняла ваш голос, но при воспроизведении он звучит снаружи закрытого окна. Ночная группа уже поднимается к вам.",
        reactions: reactions("Остановите группу", "Пусть увидят это своими глазами")
      }
    },
    glass_signal_02: {
      left: {
        title: "За шторами",
        text: "Шторы закрыли окна, но отражения остались на ткани. Они повернулись к сотрудникам спиной и продолжили работу без вас.",
        reactions: reactions("Мы спрятались слишком поздно", "Не смотреть — тоже протокол")
      },
      right: {
        title: "Связь установлена",
        text: "Отражение подняло трубку первым. Пятеро сотрудников услышали собственные последние слова и больше не смогли произнести ни звука.",
        reactions: reactions("Прекратить разговор", "Нам всё ещё нужны ответы")
      }
    },
    glass_signal_03_hide: {
      left: {
        title: "Этаж №9 опечатан",
        text: "Двери залили бетоном. Ночью лифт всё равно останавливается на девятом, хотя в здании только восемь этажей.",
        reactions: reactions("Мы замуровали не ту сторону", "Пломба пока держится")
      },
      right: {
        title: "Новая норма",
        text: "Сотрудникам приказали не обращать внимания на запаздывающие отражения. Через неделю отражения начали приходить на работу раньше людей.",
        reactions: reactions("Это больше не наши отражения", "Производительность выросла")
      }
    },
    glass_signal_03_answer: {
      left: {
        title: "Осколки без отражений",
        text: "Стекло разбили. Ни в одном осколке нет вашего лица, зато в каждом виден пустой кабинет куратора с открытой дверью.",
        reactions: reactions("Кто теперь смотрит нашими глазами?", "Соберите каждый осколок")
      },
      right: {
        title: "Новый советник",
        text: "Отражение выполняет обещание: вызовы теперь приходят заранее. Иногда оно просит отправить группы туда, где ничего ещё не произошло.",
        reactions: reactions("Мы кормим его будущим", "Предупреждён — значит вооружён")
      }
    },
    mirror_tip: {
      left: {
        title: "Координаты верны",
        text: "Группа прибыла до прорыва и спасла людей. На обратном пути каждый оперативник видел в зеркале заднего вида пустой автобус, следующий за ними без фар.",
        reactions: reactions("Цена совета ещё не уплачена", "Сегодня все вернулись")
      },
      right: {
        title: "Белый шум",
        text: "Приёмник заглушили. Из белого шума ещё долго доносился ваш голос, называющий адреса будущих братских могил.",
        reactions: reactions("Снова включить частоту", "Некоторые знания должны умереть")
      }
    },
    audit: {
      left: {
        title: "Отчёт сошёлся",
        text: "Инспекторы приняли подложные документы. Последняя страница ведомости оказалась сделана из тонкой человеческой кожи, но печати были правильными.",
        reactions: reactions("Сжечь копию", "Форма важнее материала")
      },
      right: {
        title: "Открытая экскурсия",
        text: "Инспекторы увидели хранилище и одобрили расходы. Один вернулся наверх наизнанку, но продолжил заполнять акт приёмки ровным почерком.",
        reactions: reactions("Вызовите медицинский отдел", "Подпись получена")
      }
    }
  };

  for (const card of cards) card.results = card.results || resultsByCard[card.id];

  window.GAME_CONTENT = {
    version: 3,
    config: {
      minResource: 0,
      maxResource: 1,
      recentWindow: 3,
      criticalThreshold: 0.24,
      dangerThreshold: 0.76,
      start: {
        turn: 1,
        resources: { personnel: 0.58, budget: 0.58, secrecy: 0.58, anomaly: 0.24 },
        flags: {},
        counters: {},
        queue: ["orientation_call"]
      }
    },
    resources,
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
    endings: [
      {
        id: "mirror_director",
        conditions: [
          { type: "turn", op: "gte", value: 28 },
          { type: "flag", key: "mirror_adviser", equals: true }
        ],
        title: "Идеальная смена",
        text: "Вы научились отвечать на вызов до того, как звонит телефон. Остаётся один вопрос: с какой стороны стекла вы теперь работаете?"
      },
      {
        id: "veteran_dispatcher",
        conditions: [{ type: "turn", op: "gte", value: 32 }],
        title: "Смена окончена",
        text: "Город пережил самую длинную ночь в истории службы. Утром вам выдают ключ от кабинета куратора — и новый телефон."
      }
    ],
    cards
  };
})();
