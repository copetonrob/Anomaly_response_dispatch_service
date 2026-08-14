(function () {
  "use strict";

  const reactions = (left, right) => ({
    left: { label: left },
    right: { label: right }
  });

  window.registerGameCards("events", [
    {
      id: "reserve_department",
      lessonResource: "personnel",
      speaker: "Кадровое управление",
      title: "Расформированный отдел",
      text: "Соседнее управление закрывают. Сорок обученных оперативников можно немедленно перевести к нам — вместе с их зарплатами, семьями и вопросами о нашей работе.",
      palette: ["#536556", "#121813"],
      tags: ["personnel", "budget", "secrecy", "resource_lesson"],
      weight: 5.4,
      conditions: [{ type: "turn", op: "gte", value: 2 }],
      choices: {
        left: {
          label: "Принять весь отдел",
          effects: [
            { type: "resource", key: "personnel", amount: 0.17 },
            { type: "resource", key: "budget", amount: -0.07 },
            { type: "resource", key: "secrecy", amount: -0.04 }
          ]
        },
        right: {
          label: "Продать им наши учебные курсы",
          effects: [
            { type: "resource", key: "budget", amount: 0.06 },
            { type: "resource", key: "secrecy", amount: 0.04 }
          ]
        }
      },
      results: {
        left: {
          title: "Сорок новых удостоверений",
          text: "Оперативные группы укомплектованы, и теперь службе есть кем действовать сразу на нескольких объектах. Персонал заметно вырос, но зарплаты съели часть бюджета, а новые семьи узнали слишком много.",
          reactions: reactions("Надеюсь, им объяснили риски", "Наконец у нас достаточно людей")
        },
        right: {
          title: "Методические услуги",
          text: "Отдел ушёл в другое ведомство, зато оплатил наши курсы и подписал обязательство о неразглашении. Новых рук мы не получили, но бюджет и секретность немного укрепились.",
          reactions: reactions("Людей всё равно не хватает", "Зато смета и легенда целы")
        }
      }
    },
    {
      id: "returned_unit",
      lessonResource: "personnel",
      speaker: "Проходная управления",
      title: "Вернувшаяся группа",
      text: "Группа, пропавшая в 1987 году, пришла на службу в прежнем возрасте. Все помнят протоколы, но ни один сотрудник не числится среди живых.",
      palette: ["#50635e", "#101715"],
      tags: ["personnel", "secrecy", "anomaly", "resource_lesson"],
      weight: 4.8,
      conditions: [{ type: "turn", op: "gte", value: 5 }],
      choices: {
        left: {
          label: "Восстановить группу в штате",
          effects: [
            { type: "resource", key: "personnel", amount: 0.16 },
            { type: "resource", key: "budget", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: 0.05 }
          ]
        },
        right: {
          label: "Опечатать их старые дела",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.07 },
            { type: "resource", key: "anomaly", amount: -0.04 }
          ]
        }
      },
      results: {
        left: {
          title: "Старая форма снова в строю",
          text: "Группа заняла свободные машины и сразу приняла три вызова. Персонал службы резко пополнился, но пришлось восстановить денежное довольствие, а само возвращение слегка расшатало нормальность.",
          reactions: reactions("Они точно вернулись одни?", "Опытные люди нужнее ответов")
        },
        right: {
          title: "Дело закрыто повторно",
          text: "Вернувшихся отправили на карантин, а документы спрятали глубже прежнего. Людей в строю не прибавилось, зато утечку пресекли и аномальный след стал слабее.",
          reactions: reactions("Мы снова оставили их ждать", "Город не узнает об этом")
        }
      }
    },
    {
      id: "night_watch_volunteers",
      lessonResource: "personnel",
      speaker: "Городской штаб добровольцев",
      title: "Ночная дружина",
      text: "Сотня горожан сама патрулирует районы и уже научилась отличать обычный туман от голодного. Они просят форму, допуск и место в оперативных группах.",
      palette: ["#5a6c4c", "#141a10"],
      tags: ["personnel", "budget", "secrecy", "resource_lesson"],
      weight: 5.2,
      conditions: [{ type: "turn", op: "gte", value: 4 }],
      choices: {
        left: {
          label: "Нанять лучших добровольцев",
          effects: [
            { type: "resource", key: "personnel", amount: 0.18 },
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "secrecy", amount: -0.05 }
          ]
        },
        right: {
          label: "Платить только за сообщения",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "budget", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: -0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Резерв укомплектован",
          text: "После ускоренной подготовки появились новые патрули и сменные группы: персонал вырос особенно сильно. Экипировка потребовала денег, а посвящённые добровольцы сделали тайну менее герметичной.",
          reactions: reactions("Они слишком быстро привыкли", "Теперь каждый вызов получит группу")
        },
        right: {
          title: "Сеть наблюдателей",
          text: "Горожане остались за периметром и передают сведения анонимно. Штат не вырос, зато ранние сообщения немного снизили аномальность, ложные вызовы сократились, а легенду стало легче сохранять.",
          reactions: reactions("Лучше держать их на расстоянии", "Полезные глаза без служебных пропусков")
        }
      }
    },
    {
      id: "duplicate_shift",
      lessonResource: "personnel",
      speaker: "Табельная система",
      title: "Вторая дневная смена",
      text: "Утром на работу пришли точные копии сотрудников дневной смены. Они знают пароли, любят тех же людей и требуют считать себя оригиналами.",
      palette: ["#596762", "#111716"],
      tags: ["personnel", "budget", "secrecy", "anomaly", "resource_lesson"],
      weight: 4.5,
      conditions: [{ type: "turn", op: "gte", value: 8 }],
      choices: {
        left: {
          label: "Оставить обе смены",
          effects: [
            { type: "resource", key: "personnel", amount: 0.19 },
            { type: "resource", key: "budget", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: -0.04 },
            { type: "resource", key: "anomaly", amount: 0.05 }
          ]
        },
        right: {
          label: "Объединить выплаты и воспоминания",
          effects: [
            { type: "resource", key: "budget", amount: 0.07 },
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: -0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Удвоенный личный состав",
          text: "В каждом экипаже теперь есть резервная копия, поэтому персонал почти удвоил доступные силы. Двойные оклады ударили по бюджету, домашние заметили подмену, а реальность приняла решение неохотно.",
          reactions: reactions("Нельзя делить людей на оригиналы и копии", "Две смены закроют больше вызовов")
        },
        right: {
          title: "Один табель на двоих",
          text: "Копии слились с оригиналами в бухгалтерских записях и семейной памяти. Новых работников не осталось, зато исчезли двойные зарплаты, укрепились бюджет и секретность, а аномальный разрыв сузился.",
          reactions: reactions("Кто именно вернулся домой?", "В отчёте снова правильное число людей")
        }
      }
    },
    {
      id: "emergency_appropriation",
      lessonResource: "budget",
      speaker: "Министерство особых расходов",
      title: "Чрезвычайное финансирование",
      text: "Министерство готово открыть аварийный кредит: денег хватит на десятки операций. Взамен оно требует публично объяснить, зачем городу бетон с серебряной арматурой.",
      palette: ["#756442", "#1a160e"],
      tags: ["budget", "secrecy", "anomaly", "resource_lesson"],
      weight: 5.3,
      conditions: [{ type: "turn", op: "gte", value: 3 }],
      choices: {
        left: {
          label: "Принять аварийный кредит",
          effects: [
            { type: "resource", key: "budget", amount: 0.18 },
            { type: "resource", key: "secrecy", amount: -0.06 },
            { type: "resource", key: "anomaly", amount: 0.03 }
          ]
        },
        right: {
          label: "Провести закрытую ревизию",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "personnel", amount: 0.04 }
          ]
        }
      },
      results: {
        left: {
          title: "Смета снова дышит",
          text: "Средства поступили на счета, склады закупили снаряжение и горючее: бюджет заметно пополнился. Публичное обоснование породило слухи, поэтому секретность немного просела.",
          reactions: reactions("Министерство ещё выставит счёт", "Теперь мы можем оплачивать операции")
        },
        right: {
          title: "Резервы найдены внутри",
          text: "Кредит не понадобился. Ревизоры закрыли лишние договоры и вернули нескольких списанных специалистов; главное, наружу не ушло ни одного объяснения.",
          reactions: reactions("Больших денег всё равно нет", "Зато люди и тайна сохранены")
        }
      }
    },
    {
      id: "confiscated_curiosities",
      lessonResource: "budget",
      speaker: "Склад вещественных доказательств",
      title: "Аукцион конфиската",
      text: "На складе лежат безопасные аномальные безделушки: самопишущие ручки, часы без четверга и золото, видимое только бухгалтерам. Коллекционеры предлагают огромную сумму.",
      palette: ["#7b6848", "#1a160f"],
      tags: ["budget", "personnel", "secrecy", "anomaly", "resource_lesson"],
      weight: 4.8,
      conditions: [{ type: "turn", op: "gte", value: 6 }],
      choices: {
        left: {
          label: "Провести тайный аукцион",
          effects: [
            { type: "resource", key: "budget", amount: 0.19 },
            { type: "resource", key: "personnel", amount: -0.04 },
            { type: "resource", key: "secrecy", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: 0.04 }
          ]
        },
        right: {
          label: "Разобрать предметы на оснащение",
          effects: [
            { type: "resource", key: "personnel", amount: 0.06 },
            { type: "resource", key: "anomaly", amount: -0.05 },
            { type: "resource", key: "secrecy", amount: 0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Доход особого происхождения",
          text: "Продажа принесла крупнейшее пополнение бюджета за всю смену. Охрана устала ловить покупателей, часть тайны разошлась по частным коллекциям, а несколько предметов снова проявили свойства.",
          reactions: reactions("Мы выпустили сувениры наружу", "На эти деньги можно спасти район")
        },
        right: {
          title: "Склад стал мастерской",
          text: "Инженеры превратили конфискат в защитные приборы. Денег служба не получила, зато оснащённый персонал стал эффективнее, а число активных аномальных предметов уменьшилось.",
          reactions: reactions("Не хочу знать, как работают эти приборы", "Пусть ресурсы служат службе")
        }
      }
    },
    {
      id: "tomorrow_unspent_fund",
      lessonResource: "budget",
      speaker: "Казначейство, линия завтрашнего дня",
      title: "Неизрасходованный остаток",
      text: "На счетах появилась сумма из бюджета следующего года. Если принять её сейчас, завтра в документах придётся закрыть управление на один день.",
      palette: ["#746846", "#19160e"],
      tags: ["budget", "personnel", "anomaly", "resource_lesson"],
      weight: 4.6,
      conditions: [{ type: "turn", op: "gte", value: 7 }],
      choices: {
        left: {
          label: "Забрать деньги из завтра",
          effects: [
            { type: "resource", key: "budget", amount: 0.17 },
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: 0.05 }
          ]
        },
        right: {
          label: "Потратить остаток на убежища сегодня",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.06 },
            { type: "resource", key: "personnel", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: -0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Будущее профинансировало настоящее",
          text: "Бюджет получил крупный резерв, и неоплаченных заявок почти не осталось. Несколько сотрудников уже не вышли на завтрашнюю смену, а календарь управления приобрёл лишнюю дату.",
          reactions: reactions("Мы заняли не только деньги", "Сегодня операции будут оплачены")
        },
        right: {
          title: "Средства освоены вовремя",
          text: "Остаток ушёл на скрытые убежища и защиту оперативников. Свободных денег не прибавилось, зато персонал стал немного устойчивее, легенда укрепилась, а аномальный риск снизился.",
          reactions: reactions("Правильная трата лучше большого остатка", "Завтра останется на своём месте")
        }
      }
    },
    {
      id: "erased_district_insurance",
      lessonResource: "budget",
      speaker: "Государственный страховщик",
      title: "Страховка исчезнувшего района",
      text: "Страховая компания признаёт исчезновение квартала обычным имущественным случаем. Выплата огромна, но для неё нужно подписать акт о том, что жителей никогда не существовало.",
      palette: ["#77644b", "#19140f"],
      tags: ["budget", "secrecy", "anomaly", "resource_lesson"],
      weight: 4.4,
      conditions: [{ type: "turn", op: "gte", value: 9 }],
      choices: {
        left: {
          label: "Получить страховую выплату",
          effects: [
            { type: "resource", key: "budget", amount: 0.18 },
            { type: "resource", key: "secrecy", amount: -0.07 },
            { type: "resource", key: "anomaly", amount: 0.04 }
          ]
        },
        right: {
          label: "Сохранить списки жителей",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: -0.05 },
            { type: "resource", key: "personnel", amount: 0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Выплата произведена",
          text: "Страховые деньги сильно пополнили бюджет службы. Но родственники заметили исчезновение фамилий из реестров, а пустое место на карте стало чуть реальнее самого города.",
          reactions: reactions("Мы продали память о них", "Эти средства защитят оставшихся")
        },
        right: {
          title: "Имена остались",
          text: "Выплаты не будет, зато архив удержал квартал в истории. Свидетельства удалось спрятать от публики, а несколько выживших согласились помогать службе искать дорогу домой.",
          reactions: reactions("Пусть хотя бы имена существуют", "Деньги не заменяют свидетелей")
        }
      }
    },
    {
      id: "citywide_cover_story",
      lessonResource: "secrecy",
      speaker: "Отдел общественного спокойствия",
      title: "Единая версия событий",
      text: "После ночного свечения городу нужна правдоподобная история. Отдел предлагает дорогую кампанию о метеозондах, съёмках фильма и массовой бессоннице.",
      palette: ["#455f63", "#101719"],
      tags: ["secrecy", "budget", "personnel", "resource_lesson"],
      weight: 5.3,
      conditions: [{ type: "turn", op: "gte", value: 3 }],
      choices: {
        left: {
          label: "Запустить большую легенду",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.18 },
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "personnel", amount: -0.03 }
          ]
        },
        right: {
          label: "Опубликовать памятку безопасности",
          effects: [
            { type: "resource", key: "personnel", amount: 0.05 },
            { type: "resource", key: "anomaly", amount: -0.05 },
            { type: "resource", key: "budget", amount: 0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Город поверил объяснению",
          text: "Новости повторили легенду, свидетели начали сомневаться в себе, а улицы успокоились. Это и есть высокий запас секретности: последствия скрыты, но кампания стоила денег и рабочего времени.",
          reactions: reactions("Неприятно, как легко они поверили", "Спокойный город не мешает операции")
        },
        right: {
          title: "Люди предупреждены",
          text: "Часть правды стала публичной, зато жители перестали подходить к свечению и разгрузили оперативные группы. Секретность не выросла, но персонал и бюджет немного восстановились, а аномалия получила меньше внимания.",
          reactions: reactions("Иногда знание защищает", "Главное — не рассказать лишнего")
        }
      }
    },
    {
      id: "witness_resettlement",
      lessonResource: "secrecy",
      speaker: "Бюро защиты свидетелей",
      title: "Автобус очевидцев",
      text: "Двадцать семь свидетелей видели, как улица сложилась пополам. Их можно переселить под новыми именами или оставить в городе наблюдателями службы.",
      palette: ["#496268", "#101719"],
      tags: ["secrecy", "budget", "personnel", "resource_lesson"],
      weight: 5,
      conditions: [{ type: "turn", op: "gte", value: 5 }],
      choices: {
        left: {
          label: "Переселить всех свидетелей",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.17 },
            { type: "resource", key: "budget", amount: -0.07 },
            { type: "resource", key: "personnel", amount: -0.05 }
          ]
        },
        right: {
          label: "Нанять их районными наблюдателями",
          effects: [
            { type: "resource", key: "personnel", amount: 0.08 },
            { type: "resource", key: "anomaly", amount: -0.04 },
            { type: "resource", key: "budget", amount: -0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Двадцать семь новых биографий",
          text: "Очевидцы исчезли из города вместе с фотографиями и слухами. Секретность сильно выросла, потому что некому подтверждать невозможное; оплата переселения отняла бюджет и заняла сотрудников.",
          reactions: reactions("Они потеряли прежнюю жизнь", "Зато паника не началась")
        },
        right: {
          title: "Свидетели на связи",
          text: "Очевидцы остались и научились сообщать о новых складках улицы. Тайна не стала крепче, зато служба получила много полезных глаз и немного снизила аномальный риск.",
          reactions: reactions("Мы сделали граждан частью периметра", "Лучшие наблюдатели — те, кто уже видел")
        }
      }
    },
    {
      id: "controlled_blackout",
      lessonResource: "secrecy",
      speaker: "Управление связи",
      title: "Ночь без эфира",
      text: "По городу расходятся записи говорящих фонарей. Связисты могут на час отключить телевидение и мобильные сети, пока группы сотрут копии.",
      palette: ["#3e555d", "#0d1518"],
      tags: ["secrecy", "budget", "personnel", "anomaly", "resource_lesson"],
      weight: 4.8,
      conditions: [{ type: "turn", op: "gte", value: 6 }],
      choices: {
        left: {
          label: "Погасить весь городской эфир",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.19 },
            { type: "resource", key: "budget", amount: -0.06 },
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: 0.03 }
          ]
        },
        right: {
          label: "Показать безопасную часть записи",
          effects: [
            { type: "resource", key: "budget", amount: 0.05 },
            { type: "resource", key: "personnel", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: -0.05 }
          ]
        }
      },
      results: {
        left: {
          title: "Информационная темнота",
          text: "За час записи исчезли из сетей, а большинство горожан решило, что связь дала обычный сбой. Секретность выросла очень сильно; цена — работа связистов, компенсации операторам и час, когда фонари оставались без надзора.",
          reactions: reactions("Мы ослепили город вместе с собой", "Записи больше никто не увидит")
        },
        right: {
          title: "Официальная демонстрация",
          text: "Безобидный фрагмент продали как вирусную рекламу. Секретность не увеличилась, зато поступили лицензионные деньги, группы не тратили силы на зачистку, а интерес к опасным записям угас.",
          reactions: reactions("Мы превратили улику в развлечение", "Публика сама забудет вчерашнюю сенсацию")
        }
      }
    },
    {
      id: "archive_sanitization",
      lessonResource: "secrecy",
      speaker: "Центральный архив",
      title: "Слишком точные документы",
      text: "Городские архивы содержат настоящие фотографии всех ликвидаций за тридцать лет. Можно провести полную зачистку или обезличить материалы для закрытых исследований.",
      palette: ["#52615f", "#111716"],
      tags: ["secrecy", "budget", "personnel", "anomaly", "resource_lesson"],
      weight: 4.6,
      conditions: [{ type: "turn", op: "gte", value: 8 }],
      choices: {
        left: {
          label: "Переписать весь архив",
          effects: [
            { type: "resource", key: "secrecy", amount: 0.18 },
            { type: "resource", key: "personnel", amount: -0.06 },
            { type: "resource", key: "budget", amount: -0.05 }
          ]
        },
        right: {
          label: "Продать обезличенные копии учёным",
          effects: [
            { type: "resource", key: "budget", amount: 0.08 },
            { type: "resource", key: "anomaly", amount: -0.04 },
            { type: "resource", key: "personnel", amount: 0.03 }
          ]
        }
      },
      results: {
        left: {
          title: "Прошлое стало правдоподобным",
          text: "Фотографии заменили авариями, учениями и пустыми улицами. Секретность заметно укрепилась: доказательства исчезли, но архивисты и бюджет заплатили за тысячи часов исправлений.",
          reactions: reactions("Мы переписали чужую память", "Теперь прошлое не выдаст службу")
        },
        right: {
          title: "Исследовательские лицензии",
          text: "Учёные получили безопасные копии и нашли закономерность, облегчившую работу групп. Тайна не стала крепче, зато бюджет пополнился, персонал получил полезный метод, а аномальный риск немного снизился.",
          reactions: reactions("Знание снова покинуло архив", "Пусть хотя бы принесёт пользу")
        }
      }
    }
  ]);
})();
