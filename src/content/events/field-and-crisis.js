(function () {
  "use strict";

  const reactions = (left, right) => ({
    left: { label: left },
    right: { label: right }
  });

  window.registerGameCards("events", [
    {
      id: "mirror_tip",
      speaker: "Приёмник в зеркальной комнате",
      title: "Совет отражения",
      text: "Отражение передало координаты прорыва за сорок минут до вызова. Оно просит только оставить приёмник включённым после возвращения группы.",
      palette: ["#657481", "#14191c"],
      tags: ["glass", "personnel", "anomaly"],
      weight: 5,
      conditions: [{ type: "flag", key: "mirror_adviser", equals: true }],
      choices: {
        left: {
          label: "Довериться координатам",
          effects: [
            { type: "resource", key: "personnel", amount: 0.07 },
            { type: "resource", key: "anomaly", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: -0.03 }
          ]
        },
        right: {
          label: "Заглушить приёмник",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: 0.04 }
          ]
        }
      },
      results: {
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
      }
    },
    {
      id: "audit",
      speaker: "Внеплановая комиссия",
      title: "Проверка расходов",
      text: "Инспекторы требуют показать, куда исчезли средства на бетон, амнезиаки и посмертные премии. Один из них уже знает дорогу к хранилищу.",
      palette: ["#74694f", "#18150f"],
      tags: ["budget", "secrecy", "office"],
      weight: 5,
      conditions: [{ type: "turn", op: "gte", value: 4 }],
      choices: {
        left: {
          label: "Подделать расходные акты",
          effects: [
            { type: "resource", key: "budget", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: 0.09 },
            { type: "resource", key: "anomaly", amount: 0.03 }
          ]
        },
        right: {
          label: "Провести комиссию в хранилище",
          effects: [
            { type: "resource", key: "budget", amount: 0.08 },
            { type: "resource", key: "secrecy", amount: -0.1 },
            { type: "resource", key: "personnel", amount: -0.04 }
          ]
        }
      },
      results: {
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
    },
    {
      id: "underground_bell",
      speaker: "Метрополитен, ночная смена",
      title: "Колокол под путями",
      text: "Под закрытой платформой звонит колокол. После каждого удара на табло появляется поезд с именами недавно пропавших сотрудников.",
      palette: ["#4e5c58", "#101514"],
      tags: ["field", "personnel", "anomaly"],
      weight: 6,
      conditions: [{ type: "turn", op: "gte", value: 3 }],
      choices: {
        left: {
          label: "Залить шахту бетоном",
          effects: [
            { type: "resource", key: "budget", amount: -0.09 },
            { type: "resource", key: "anomaly", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: 0.04 }
          ]
        },
        right: {
          label: "Встретить следующий поезд",
          effects: [
            { type: "resource", key: "personnel", amount: -0.08 },
            { type: "resource", key: "anomaly", amount: -0.1 },
            { type: "resource", key: "secrecy", amount: -0.04 }
          ]
        }
      },
      results: {
        left: {
          title: "Звон в бетоне",
          text: "Шахту заполнили до краёв. Теперь колокол слышен внутри каждой колонны метро, но поезда с именами больше не останавливаются.",
          reactions: reactions("Мы распределили звук по городу", "По крайней мере двери не откроются")
        },
        right: {
          title: "Состав без машиниста",
          text: "Поезд привёз троих пропавших. Они не старели и уверены, что отсутствовали пять минут; ещё четыре вагона отказались открыть двери.",
          reactions: reactions("Там остались остальные", "Троих мы всё-таки вернули")
        }
      }
    },
    {
      id: "borrowed_sun",
      speaker: "Обсерватория ведомства",
      title: "Заёмное солнце",
      text: "Над промышленной зоной взошло маленькое второе солнце. Оно освещает только государственные здания и каждый час становится ближе.",
      palette: ["#8a7043", "#21190c"],
      tags: ["public", "budget", "anomaly"],
      weight: 5,
      conditions: [{ type: "turn", op: "gte", value: 6 }],
      choices: {
        left: {
          label: "Накрыть здания светомаскировкой",
          effects: [
            { type: "resource", key: "budget", amount: -0.11 },
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: 0.05 }
          ]
        },
        right: {
          label: "Передать ему пустое ведомство",
          effects: [
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "budget", amount: -0.04 },
            { type: "resource", key: "anomaly", amount: -0.1 }
          ]
        }
      },
      results: {
        left: {
          title: "Свет ищет вход",
          text: "Чехлы почернели, но выдержали. Маленькое солнце теперь заглядывает в вентиляцию и оставляет на столах тёплые служебные записки.",
          reactions: reactions("Оно знает структуру ведомства", "Усилить светомаскировку")
        },
        right: {
          title: "Филиал принят",
          text: "Солнцу уступили списанное управление. Здание выгорело до белого силуэта, после чего лишний рассвет свернулся и упал в его почтовый ящик.",
          reactions: reactions("Проверить, что осталось внутри", "Списать филиал окончательно")
        }
      }
    },
    {
      id: "common_sea_dream",
      speaker: "Городская поликлиника",
      title: "Общий сон о море",
      text: "Три тысячи жителей видят одно море и просыпаются с мокрыми ногами. Уровень воды во сне уже поднялся до окон второго этажа.",
      palette: ["#42636a", "#0e1719"],
      tags: ["public", "secrecy", "anomaly"],
      weight: 5,
      conditions: [{ type: "turn", op: "gte", value: 7 }],
      choices: {
        left: {
          label: "Разбудить город сиренами",
          effects: [
            { type: "resource", key: "secrecy", amount: -0.12 },
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: -0.08 }
          ]
        },
        right: {
          label: "Отправить водолазов во сон",
          effects: [
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "personnel", amount: -0.09 },
            { type: "resource", key: "anomaly", amount: -0.11 }
          ]
        }
      },
      results: {
        left: {
          title: "Город проснулся",
          text: "Сирены вырвали людей из сна. Улицы остались сухими, но во всех квартирах на потолке колышутся отражения невидимых волн.",
          reactions: reactions("Море осталось над ними", "Главное, они проснулись")
        },
        right: {
          title: "Берег найден",
          text: "Водолазы вернулись с песком в лёгких и картой берега. На карте диспетчерская обозначена маяком, который должен погаснуть последним.",
          reactions: reactions("Мы тоже часть этого сна", "Сохранить карту в сейфе")
        }
      }
    },
    {
      id: "breathing_archive",
      speaker: "Хранилище Б-12",
      title: "Дышащий архив",
      text: "Стеллажи в архиве медленно сходятся и расходятся, словно рёбра. При каждом вдохе пропадает одно закрытое дело.",
      palette: ["#665d4b", "#15120e"],
      tags: ["office", "budget", "anomaly"],
      weight: 6,
      conditions: [{ type: "turn", op: "gte", value: 4 }],
      choices: {
        left: {
          label: "Подпереть стеллажи людьми",
          effects: [
            { type: "resource", key: "personnel", amount: -0.09 },
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: -0.04 }
          ]
        },
        right: {
          label: "Скармливать ему копии дел",
          effects: [
            { type: "resource", key: "budget", amount: -0.07 },
            { type: "resource", key: "secrecy", amount: -0.03 },
            { type: "resource", key: "anomaly", amount: -0.07 }
          ]
        }
      },
      results: {
        left: {
          title: "Архив задержал дыхание",
          text: "Сотрудники удерживали стеллажи до рассвета. Теперь на их рентгеновских снимках вместо лёгких видны аккуратно подшитые папки.",
          reactions: reactions("Освободите их от дежурства", "Дела сохранены")
        },
        right: {
          title: "Бумажная диета",
          text: "Архив насытился копиями и уснул. Утром оригиналы содержали другие фамилии, зато каждое происшествие числилось успешно ликвидированным.",
          reactions: reactions("Кого он переписал?", "Отчётность стала чище")
        }
      }
    },
    {
      id: "boiler_heart",
      speaker: "Теплосеть",
      title: "Сердце котельной",
      text: "В котле обнаружили огромное сердце. Оно гонит по батареям тёплую кровь и останавливается, когда жильцы перестают платить.",
      palette: ["#774c3d", "#1a0f0c"],
      tags: ["public", "budget", "anomaly"],
      weight: 5,
      conditions: [{ type: "turn", op: "gte", value: 6 }],
      choices: {
        left: {
          label: "Оплатить долги всего района",
          effects: [
            { type: "resource", key: "budget", amount: -0.13 },
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: -0.06 }
          ]
        },
        right: {
          label: "Остановить котельную",
          effects: [
            { type: "resource", key: "personnel", amount: -0.07 },
            { type: "resource", key: "secrecy", amount: -0.08 },
            { type: "resource", key: "anomaly", amount: -0.09 }
          ]
        }
      },
      results: {
        left: {
          title: "Ритм восстановлен",
          text: "После оплаты сердце успокоилось. В платёжках появилась новая строка: содержание органа муниципального значения.",
          reactions: reactions("Мы стали его кровью", "Тепло в домах сохранено")
        },
        right: {
          title: "Холодная остановка",
          text: "Группа перекрыла клапаны. Сердце замерло, но ещё неделю в трубах слышался стук из квартир тех, кто исчез во время операции.",
          reactions: reactions("Они всё ещё там", "Объект остановлен")
        }
      }
    },
    {
      id: "missing_shadows",
      speaker: "Патруль центрального района",
      title: "Пропавшие тени",
      text: "У прохожих исчезают тени. Через несколько часов тени появляются отдельно и пытаются попасть в здания раньше хозяев.",
      palette: ["#464d50", "#0d1011"],
      tags: ["public", "personnel", "secrecy"],
      weight: 5,
      conditions: [{ type: "turn", op: "gte", value: 8 }],
      choices: {
        left: {
          label: "Задерживать людей без теней",
          effects: [
            { type: "resource", key: "personnel", amount: -0.08 },
            { type: "resource", key: "secrecy", amount: -0.1 },
            { type: "resource", key: "anomaly", amount: -0.05 }
          ]
        },
        right: {
          label: "Впустить тени в пустой склад",
          effects: [
            { type: "resource", key: "budget", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: -0.08 }
          ]
        }
      },
      results: {
        left: {
          title: "Слишком светлые камеры",
          text: "Задержанных собрали под прожекторами. Ночью их тени пришли к участку и предъявили документы, оказавшиеся подлиннее человеческих.",
          reactions: reactions("Мы задержали не ту половину", "Никого не выпускать до рассвета")
        },
        right: {
          title: "Склад заполнен темнотой",
          text: "Тени вошли внутрь и улеглись на полу. Утром склад оказался глубже на несколько километров, зато люди снова отбрасывают правильные силуэты.",
          reactions: reactions("Не открывать дальнюю дверь", "Горожане возвращены себе")
        }
      }
    },
    {
      id: "extra_corridor",
      speaker: "Хозяйственный отдел",
      title: "Лишний коридор",
      text: "Между кабинетами 214 и 215 появился коридор длиной в несколько часов. Из него выходят сотрудники, ещё не начавшие смену.",
      palette: ["#5c604f", "#12140f"],
      tags: ["office", "personnel", "anomaly"],
      weight: 6,
      conditions: [{ type: "turn", op: "gte", value: 5 }],
      choices: {
        left: {
          label: "Замуровать оба входа",
          effects: [
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: -0.07 }
          ]
        },
        right: {
          label: "Использовать как ночную смену",
          effects: [
            { type: "resource", key: "personnel", amount: 0.1 },
            { type: "resource", key: "secrecy", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: 0.08 }
          ]
        }
      },
      results: {
        left: {
          title: "Стена между минутами",
          text: "Проход закрыли, но пятеро сотрудников остались внутри. Их заявления на отпуск продолжают поступать каждые несколько часов.",
          reactions: reactions("Мы должны найти другой вход", "Коридор локализован")
        },
        right: {
          title: "Удвоенная смена",
          text: "Будущие сотрудники исправно работают, пока настоящие спят. Некоторые начинают увольняться за день до того, как узнают причину.",
          reactions: reactions("Мы крадём их время", "Табель наконец закрыт")
        }
      }
    },
    {
      id: "dead_minister_order",
      speaker: "Правительственная линия",
      title: "Приказ покойного министра",
      text: "Факс печатает распоряжение министра, умершего двадцать лет назад: немедленно открыть объект, существование которого он сам запретил.",
      palette: ["#675748", "#15110e"],
      tags: ["office", "secrecy", "anomaly"],
      weight: 4,
      conditions: [{ type: "turn", op: "gte", value: 10 }],
      choices: {
        left: {
          label: "Исполнить приказ",
          effects: [
            { type: "resource", key: "budget", amount: 0.09 },
            { type: "resource", key: "secrecy", amount: -0.11 },
            { type: "resource", key: "anomaly", amount: 0.12 }
          ]
        },
        right: {
          label: "Потребовать живую подпись",
          effects: [
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "secrecy", amount: 0.07 },
            { type: "resource", key: "anomaly", amount: 0.04 }
          ]
        }
      },
      results: {
        left: {
          title: "Объект снова существует",
          text: "Дверь хранилища открылась в кабинет покойного министра. Он поблагодарил за исполнительность и перечислил деньги со счёта будущего правительства.",
          reactions: reactions("Закрыть дверь, пока он занят", "Приказ исполнен")
        },
        right: {
          title: "Подпись доставлена",
          text: "К рассвету курьер принёс тёплый лист с отпечатком руки. Сам курьер записан умершим в том же году, что и министр.",
          reactions: reactions("Мы сами запросили доказательство", "Передать в экспертизу")
        }
      }
    },
    {
      id: "reservoir_choir",
      speaker: "Водоканал",
      title: "Хор водохранилища",
      text: "Вода поёт голосами пропавших жителей. Песня просит открыть шлюзы и обещает вернуть всех на берег.",
      palette: ["#3e5e66", "#0c1518"],
      tags: ["public", "personnel", "anomaly"],
      weight: 4,
      conditions: [{ type: "turn", op: "gte", value: 10 }],
      choices: {
        left: {
          label: "Спустить водохранилище",
          effects: [
            { type: "resource", key: "budget", amount: -0.14 },
            { type: "resource", key: "secrecy", amount: -0.11 },
            { type: "resource", key: "anomaly", amount: -0.09 }
          ]
        },
        right: {
          label: "Заглушить песню бетоном",
          effects: [
            { type: "resource", key: "personnel", amount: -0.1 },
            { type: "resource", key: "budget", amount: -0.09 },
            { type: "resource", key: "anomaly", amount: -0.07 }
          ]
        }
      },
      results: {
        left: {
          title: "Берег отступил",
          text: "На дне стояли сотни людей, сухих и улыбающихся. Когда вода ушла полностью, оказалось, что их лица принадлежат ещё живым горожанам.",
          reactions: reactions("Не подпускайте к ним родственников", "Мы получили шанс выяснить правду")
        },
        right: {
          title: "Песня под плитой",
          text: "Водолазы уложили бетон и не поднялись. Теперь хор поёт их голосами через водопровод каждой казённой квартиры.",
          reactions: reactions("Мы добавили новые голоса", "Шлюзы остаются закрыты")
        }
      }
    },
    {
      id: "elevator_minus_one",
      speaker: "Бизнес-центр «Меридиан»",
      title: "Этаж минус один",
      text: "Лифт начал останавливаться между подвалом и фундаментом. Кнопки там нет, но каждое открытие дверей уменьшает число людей в кабине.",
      palette: ["#51575a", "#101315"],
      tags: ["field", "personnel", "secrecy"],
      weight: 5,
      conditions: [{ type: "turn", op: "gte", value: 8 }],
      choices: {
        left: {
          label: "Оборвать тросы",
          effects: [
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "secrecy", amount: -0.07 },
            { type: "resource", key: "anomaly", amount: -0.06 }
          ]
        },
        right: {
          label: "Отправить группу вниз",
          effects: [
            { type: "resource", key: "personnel", amount: -0.11 },
            { type: "resource", key: "anomaly", amount: -0.1 },
            { type: "resource", key: "secrecy", amount: 0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Кабина не упала",
          text: "Тросы перерезали, но лифт остался висеть. Теперь он открывается на минус первом прямо из стен соседних зданий.",
          reactions: reactions("Мы освободили его от шахты", "Закрыть все двери одновременно")
        },
        right: {
          title: "Схема нижнего города",
          text: "Вернулся один сотрудник из шести. Он принёс схему метро города, построенного под нашим, и не помнит, что когда-либо работал в службе.",
          reactions: reactions("Пятеро всё ещё внизу", "Схема может оказаться полезной")
        }
      }
    }
  ]);
})();
