(function () {
  "use strict";

  window.registerGameCards("events", [
  {
    "id": "orientation_call",
    "kind": "event",
    "speaker": "Дежурный куратор",
    "title": "Первая смена",
    "text": "Телефон уже звонит. Куратор напоминает: спасайте людей, берегите смету и не позволяйте городу узнать лишнее.",
    "palette": [
      "#40515b",
      "#10181d"
    ],
    "weight": 0,
    "choices": {
      "left": {
        "label": "Попросить инструкцию",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": 0.08
          },
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.04
          },
          {
            "type": "flag",
            "key": "read_manual",
            "value": true
          }
        ]
      },
      "right": {
        "label": "Сразу принять вызов",
        "effects": [
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.05
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.04
          },
          {
            "type": "flag",
            "key": "improvised",
            "value": true
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Инструкция №7-Б",
        "text": "Куратор прислал триста страниц поправок. Между актом о списании фонарей и формой посмертного найма обнаружилась полезная схема эвакуации. Смена чувствует себя увереннее; бухгалтерия — нет.",
        "reactions": {
          "left": {
            "label": "Надо было читать мелкий шрифт"
          },
          "right": {
            "label": "Теперь мы хотя бы вооружены"
          }
        }
      },
      "right": {
        "title": "Вызов принят",
        "text": "Вы ответили раньше, чем оператор успел назвать адрес. В журнале уже стояла ваша подпись, поставленная завтрашней датой.",
        "reactions": {
          "left": {
            "label": "Мне это не нравится"
          },
          "right": {
            "label": "Работа не ждёт объяснений"
          }
        }
      }
    }
  },
  {
    "id": "whispering_basement",
    "kind": "event",
    "speaker": "Участковый, линия 2",
    "title": "Шёпот под домом",
    "text": "Жильцы слышат из подвала собственные голоса. Голоса просят открыть дверь до полуночи.",
    "palette": [
      "#4f665b",
      "#101a18"
    ],
    "tags": [
      "field",
      "secrecy",
      "anomaly"
    ],
    "weight": 7,
    "choices": {
      "left": {
        "label": "Замуровать вход",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.09
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.07
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.05
          }
        ]
      },
      "right": {
        "label": "Послать группу внутрь",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.07
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.1
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Стена шепчет",
        "text": "К рассвету вход заложили тремя слоями кирпича. Голоса не исчезли — теперь они доносятся из стен квартир и знают имена каменщиков.",
        "reactions": {
          "left": {
            "label": "Мы только разнесли это дальше"
          },
          "right": {
            "label": "Печать поставлена. Дело закрыто"
          }
        }
      },
      "right": {
        "title": "Семеро вошли",
        "text": "Группа вернулась без двух сотрудников и с лишней каской. На записи внутри подвала всё время слышно, как кто-то восьмой дышит рядом с камерой.",
        "reactions": {
          "left": {
            "label": "О боже, что мы наделали"
          },
          "right": {
            "label": "Они знали, на что шли"
          }
        }
      }
    }
  },
  {
    "id": "duplicate_bus",
    "kind": "event",
    "speaker": "Транспортный отдел",
    "title": "Лишний маршрут",
    "text": "На кольцевой появился автобус №0. Пассажиры выходят из него на три года старше.",
    "image": "assets/cards/duplicate-bus.webp",
    "imagePosition": "center 52%",
    "palette": [
      "#815b42",
      "#1c1512"
    ],
    "tags": [
      "public",
      "secrecy",
      "personnel"
    ],
    "weight": 6,
    "choices": {
      "left": {
        "label": "Перекрыть кольцевую",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.06
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.04
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.07
          }
        ]
      },
      "right": {
        "label": "Выкупить все билеты",
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
            "type": "flag",
            "key": "owns_zero_bus_tickets",
            "value": true
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Последний круг",
        "text": "Автобус загнали между бетонными блоками. Когда двигатель заглох, пассажиры рассыпались в мокрую билетную пыль. Двое оперативников постарели на одиннадцать лет.",
        "reactions": {
          "left": {
            "label": "Запишите их имена"
          },
          "right": {
            "label": "Главное, маршрут закрыт"
          }
        }
      },
      "right": {
        "title": "Все места оплачены",
        "text": "Автобус принял пачку выкупленных билетов и уехал пустым. Ночью билеты вернулись в кассу; на каждом напечатана дата смерти сотрудника управления.",
        "reactions": {
          "left": {
            "label": "Спрячьте билеты от персонала"
          },
          "right": {
            "label": "Мы купили городу ещё одну ночь"
          }
        }
      }
    }
  },
  {
    "id": "rain_upstairs",
    "kind": "event",
    "speaker": "Хозяйственный корпус",
    "title": "Дождь на девятом",
    "text": "В одной квартире дождь идёт вверх. Соседи снизу уже снимают это на телефоны.",
    "image": "assets/cards/rain-upstairs.webp",
    "imagePosition": "center 43%",
    "palette": [
      "#496b80",
      "#101a20"
    ],
    "tags": [
      "public",
      "secrecy",
      "anomaly"
    ],
    "weight": 7,
    "choices": {
      "left": {
        "label": "Объявить съёмки кино",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.06
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.09
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.05
          }
        ]
      },
      "right": {
        "label": "Эвакуировать подъезд",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.08
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.05
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.09
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Съёмочная площадка",
        "text": "Легенда сработала. Зеваки разошлись, решив, что дождь дорисуют на монтаже. К утру вода собралась под потолком в тяжёлое чёрное озеро.",
        "reactions": {
          "left": {
            "label": "Мы оставили их под этим"
          },
          "right": {
            "label": "Вернёмся, когда будет смета"
          }
        }
      },
      "right": {
        "title": "Пустой подъезд",
        "text": "Жильцов вывели, но квартира не отпустила троих оперативников. Теперь их голоса слышны в каплях, ползущих по потолку вверх.",
        "reactions": {
          "left": {
            "label": "Мы не можем их там бросить"
          },
          "right": {
            "label": "Других жильцов мы спасли"
          }
        }
      }
    }
  },
  {
    "id": "camera_footage",
    "kind": "event",
    "speaker": "Архивист",
    "title": "Запись завтрашнего дня",
    "text": "Камера в холле прислала запись на сутки вперёд. На ней к утру в управлении не осталось людей.",
    "palette": [
      "#676779",
      "#15151b"
    ],
    "tags": [
      "office",
      "personnel",
      "anomaly"
    ],
    "weight": 5,
    "choices": {
      "left": {
        "label": "Распустить смену по домам",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": 0.07
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.05
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.06
          }
        ]
      },
      "right": {
        "label": "Пусть всё идёт как на записи",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.09
          },
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.06
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.05
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Самоисполняющаяся запись",
        "text": "Смена ушла домой. Утром камеры действительно показали пустое управление — кроме фигуры в вашем кабинете, которая всю ночь просматривала личные дела сотрудников.",
        "reactions": {
          "left": {
            "label": "Найдите, кто остался"
          },
          "right": {
            "label": "Предсказание хотя бы сбылось не полностью"
          }
        }
      },
      "right": {
        "title": "Как было показано",
        "text": "Вы повторили запись кадр в кадр. Девять сотрудников исчезли в слепой зоне камеры. На их зарплатные счета ещё долго будут приходить премии.",
        "reactions": {
          "left": {
            "label": "Мы принесли их в жертву расписанию"
          },
          "right": {
            "label": "Несоответствий с записью нет"
          }
        }
      }
    }
  },
  {
    "id": "foundation_grant",
    "kind": "event",
    "speaker": "Фонд перспективных наук",
    "title": "Щедрое пожертвование",
    "text": "Частный фонд готов закрыть дыру в смете. Взамен ему нужен один запечатанный контейнер из хранилища.",
    "palette": [
      "#78643d",
      "#1d1910"
    ],
    "tags": [
      "budget",
      "secrecy",
      "anomaly"
    ],
    "weight": 4,
    "conditions": [
      {
        "type": "resource",
        "key": "budget",
        "op": "lte",
        "value": 0.55
      }
    ],
    "choices": {
      "left": {
        "label": "Отказать фонду",
        "effects": [
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.04
          }
        ]
      },
      "right": {
        "label": "Передать контейнер",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.15
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.08
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.07
          },
          {
            "type": "counter",
            "key": "containers_released",
            "amount": 1
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Отказ зарегистрирован",
        "text": "Фонд принял отказ спокойно. Через час его представитель позвонил изнутри запечатанного контейнера и попросил пересмотреть решение.",
        "reactions": {
          "left": {
            "label": "Проверьте пломбы"
          },
          "right": {
            "label": "Не отвечайте на второй звонок"
          }
        }
      },
      "right": {
        "title": "Контейнер передан",
        "text": "Деньги поступили мгновенно. Грузовик фонда уехал без водителя, а на окраине города появилась улица, которой нет ни на одной карте.",
        "reactions": {
          "left": {
            "label": "Мы продали им часть города"
          },
          "right": {
            "label": "Служба продолжит работу"
          }
        }
      }
    }
  },
  {
    "id": "volunteer_unit",
    "kind": "event",
    "speaker": "Отдел кадров",
    "title": "Добровольцы",
    "text": "Группа энтузиастов просится на стажировку. Они крепкие, мотивированные и задают слишком много вопросов.",
    "palette": [
      "#5f7150",
      "#151b12"
    ],
    "tags": [
      "personnel",
      "secrecy"
    ],
    "weight": 4,
    "conditions": [
      {
        "type": "resource",
        "key": "personnel",
        "op": "lte",
        "value": 0.55
      }
    ],
    "choices": {
      "left": {
        "label": "Отправить домой",
        "effects": [
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.04
          }
        ]
      },
      "right": {
        "label": "Выдать временные пропуска",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": 0.14
          },
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.05
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.08
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Отказ в допуске",
        "text": "Добровольцы ушли разочарованными. Один оставил анкету: в графе «предыдущий опыт» перечислены происшествия, которые ещё не случились.",
        "reactions": {
          "left": {
            "label": "Мы ещё увидим эти фамилии"
          },
          "right": {
            "label": "Правила допуска существуют не зря"
          }
        }
      },
      "right": {
        "title": "Временные сотрудники",
        "text": "Пропуска выдали двадцати добровольцам. В конце смены табель насчитал двадцать одного, и никто не смог вспомнить лицо лишнего.",
        "reactions": {
          "left": {
            "label": "Пересчитать их ещё раз"
          },
          "right": {
            "label": "Лишние руки сейчас не помешают"
          }
        }
      }
    }
  },
  {
    "id": "quiet_week",
    "kind": "event",
    "speaker": "Аналитический отдел",
    "title": "Подозрительно тихо",
    "text": "За неделю не зарегистрировано ни одной аномалии. Аналитики уверены, что это статистически невозможно.",
    "palette": [
      "#4a6465",
      "#101818"
    ],
    "tags": [
      "budget",
      "personnel",
      "anomaly"
    ],
    "weight": 3,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 5
      },
      {
        "type": "resource",
        "key": "anomaly",
        "op": "lte",
        "value": 0.55
      }
    ],
    "choices": {
      "left": {
        "label": "Провести учения",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.04
          },
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.06
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.04
          }
        ]
      },
      "right": {
        "label": "Дать всем отдохнуть",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": 0.09
          },
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.06
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.08
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Учебная тревога",
        "text": "Во время учений манекен изоляционного костюма попросил выпустить его из горящего макета. Персонал отработал процедуру, не задавая вопросов.",
        "reactions": {
          "left": {
            "label": "Манекены не должны просить"
          },
          "right": {
            "label": "Учения выявили слабое место"
          }
        }
      },
      "right": {
        "title": "Выходной",
        "text": "Управление опустело. Пока все отдыхали, журнал происшествий заполнил себя сам: двенадцать вызовов отмечены как успешно проигнорированные.",
        "reactions": {
          "left": {
            "label": "Мы ещё заплатим за эту тишину"
          },
          "right": {
            "label": "Людям был нужен отдых"
          }
        }
      }
    }
  },
  {
    "id": "complaining_stamp",
    "kind": "event",
    "speaker": "Общий отдел",
    "title": "Недовольная печать",
    "text": "Гербовая печать отказывается заверять приказы и тихо вздыхает при виде каждой новой формы. Делопроизводство встало на сорок минут.",
    "palette": [
      "#74624a",
      "#1b1711"
    ],
    "tags": [
      "office",
      "budget"
    ],
    "weight": 7,
    "choices": {
      "left": {
        "label": "Заказать новую печать",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.03
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.02
          }
        ]
      },
      "right": {
        "label": "Уговорить старую",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.02
          },
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.02
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.03
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Печать списана",
        "text": "Новую печать доставили к обеду. Старую заперли в сейфе, откуда она всю ночь ставила оттиски на внутренней стенке дверцы.",
        "reactions": {
          "left": {
            "label": "Не открывать сейф"
          },
          "right": {
            "label": "Списание оформлено правильно"
          }
        }
      },
      "right": {
        "title": "Компромисс достигнут",
        "text": "Секретарь пообещал печати меньше сверхурочной работы. Она снова заверяет документы, но добавляет к каждому оттиску едва заметный отпечаток зубов.",
        "reactions": {
          "left": {
            "label": "Проверить секретаря"
          },
          "right": {
            "label": "Главное, бумаги идут дальше"
          }
        }
      }
    }
  },
  {
    "id": "office_plant_minutes",
    "kind": "event",
    "speaker": "Секретариат",
    "title": "Фикус ведёт протокол",
    "text": "Кабинетный фикус научился печатать на машинке. Его протоколы совещаний точнее официальных, хотя растение не присутствовало ни на одном из них.",
    "palette": [
      "#5d6b4f",
      "#151a12"
    ],
    "tags": [
      "office",
      "secrecy"
    ],
    "weight": 7,
    "choices": {
      "left": {
        "label": "Назначить внештатным стенографистом",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.04
          },
          {
            "type": "resource",
            "key": "personnel",
            "amount": 0.03
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.04
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.03
          }
        ]
      },
      "right": {
        "label": "Утилизировать как макулатуру",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.02
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.03
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.02
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Сотрудник Ф. И. Кус",
        "text": "Растению выдали пропуск и половину ставки. В первом служебном отчёте оно дословно записало завтрашнее закрытое совещание.",
        "reactions": {
          "left": {
            "label": "Отменить совещание"
          },
          "right": {
            "label": "Положить протокол в папку к остальным"
          }
        }
      },
      "right": {
        "title": "Зелёная стружка",
        "text": "Фикус пропустили через уничтожитель бумаг. Утром из вентиляции выросли тонкие побеги, шепчущие повестку дня.",
        "reactions": {
          "left": {
            "label": "Мы поступили жестоко"
          },
          "right": {
            "label": "Провести обработку вентиляции"
          }
        }
      }
    }
  },
  {
    "id": "wrong_number_room",
    "kind": "event",
    "speaker": "Телефонная станция",
    "title": "Номер не существует",
    "text": "Горожане звонят в службу и просят соединить их с кабинетом 404. Такого кабинета нет, но по внутренней линии кто-то отвечает.",
    "palette": [
      "#4c5d63",
      "#111719"
    ],
    "tags": [
      "office",
      "secrecy",
      "anomaly"
    ],
    "weight": 6,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 3
      }
    ],
    "choices": {
      "left": {
        "label": "Отключить номер",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.04
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.05
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.04
          }
        ]
      },
      "right": {
        "label": "Назначить оператора слушать",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.06
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.04
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.05
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Линия отключена",
        "text": "Кабель физически вырезали из щитка. Звонки прекратились, но на дверях всех пустых кабинетов появилась табличка «404».",
        "reactions": {
          "left": {
            "label": "Не входить в пустые кабинеты"
          },
          "right": {
            "label": "Таблички можно снять утром"
          }
        }
      },
      "right": {
        "title": "Дежурство у пустой линии",
        "text": "Оператор слушал восемь часов. В трубке зачитывали список всех звонков, которые он совершит до конца жизни; последний был в кабинет 404.",
        "reactions": {
          "left": {
            "label": "Снять его со смены"
          },
          "right": {
            "label": "Попросить записать список"
          }
        }
      }
    }
  },
  {
    "id": "museum_mask",
    "kind": "event",
    "speaker": "Городской музей",
    "title": "Маска просит лицо",
    "text": "Каменная маска из закрытой экспозиции называет посетителей по имени и предлагает показать, кем они были до рождения.",
    "palette": [
      "#6a5e4f",
      "#181410"
    ],
    "tags": [
      "public",
      "secrecy",
      "personnel",
      "anomaly"
    ],
    "weight": 5,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 5
      }
    ],
    "choices": {
      "left": {
        "label": "Закрыть музей на реставрацию",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.07
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.06
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.04
          }
        ]
      },
      "right": {
        "label": "Допросить маску",
        "effects": [
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.08
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.05
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.07
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Экспозиция закрыта",
        "text": "Посетителей вывели. Ночью маска продолжила называть имена — теперь сотрудников службы и даты, когда их лица станут свободны.",
        "reactions": {
          "left": {
            "label": "Никому не показывать список"
          },
          "right": {
            "label": "К утру она замолчит"
          }
        }
      },
      "right": {
        "title": "Свидетель из известняка",
        "text": "Маска ответила на вопросы голосами оперативников. Трое сорвали с себя лица; под ними оказались гладкие поверхности с инвентарными номерами.",
        "reactions": {
          "left": {
            "label": "Это были наши люди"
          },
          "right": {
            "label": "Номера занести в протокол"
          }
        }
      }
    }
  },
  {
    "id": "snow_inside_radio",
    "kind": "event",
    "speaker": "Радиомониторинг",
    "title": "Снег внутри приёмника",
    "text": "Из настроенных на пустую частоту радиоприёмников сыплется настоящий снег. Он не тает и складывается в контуры неизвестного побережья.",
    "palette": [
      "#596a71",
      "#11171a"
    ],
    "tags": [
      "office",
      "budget",
      "anomaly"
    ],
    "weight": 5,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 5
      }
    ],
    "choices": {
      "left": {
        "label": "Изъять все приёмники",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.08
          },
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.05
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.06
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.05
          }
        ]
      },
      "right": {
        "label": "Продать частоту метеослужбе",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.09
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.06
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.08
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Частота очищена",
        "text": "Приёмники собрали в экранированном складе. Снег перестал идти, но внутри сугроба радиолокатор фиксирует медленно движущийся тёплый объект.",
        "reactions": {
          "left": {
            "label": "Не раскапывать"
          },
          "right": {
            "label": "Усилить охлаждение склада"
          }
        }
      },
      "right": {
        "title": "Доход от осадков",
        "text": "Метеослужба оплатила эксклюзивный доступ. На следующий день её прогноз показал снегопад вверх и температуру ниже абсолютного нуля.",
        "reactions": {
          "left": {
            "label": "Вернуть деньги"
          },
          "right": {
            "label": "Прогноз не является фактом"
          }
        }
      }
    }
  },
  {
    "id": "sleeping_station",
    "kind": "event",
    "speaker": "Метрополитен",
    "title": "Станция спит",
    "text": "Закрытая станция метро расширяется и сжимается, будто дышит. Поезда замедляются рядом с ней, а пассажиры одновременно засыпают.",
    "palette": [
      "#4a5855",
      "#101513"
    ],
    "tags": [
      "public",
      "personnel",
      "budget",
      "anomaly"
    ],
    "weight": 5,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 7
      }
    ],
    "choices": {
      "left": {
        "label": "Изменить маршрут тоннелей",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.12
          },
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.08
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.06
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.08
          }
        ]
      },
      "right": {
        "label": "Снизить скорость поездов",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.05
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.05
          },
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.07
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.1
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Обходной тоннель",
        "text": "Пути проложили в стороне. Старая станция вздохнула так глубоко, что провалилась на тридцать метров и утащила с собой проходческую бригаду.",
        "reactions": {
          "left": {
            "label": "Они ещё могут быть живы"
          },
          "right": {
            "label": "Новый тоннель уже принят комиссией"
          }
        }
      },
      "right": {
        "title": "Не будить станцию",
        "text": "Поезда проходят бесшумно. Спящие пассажиры просыпаются на своей остановке, но каждый оставляет на пустой станции один и тот же сон.",
        "reactions": {
          "left": {
            "label": "Однажды она проснётся полной"
          },
          "right": {
            "label": "Расписание соблюдается"
          }
        }
      }
    }
  },
  {
    "id": "names_in_concrete",
    "kind": "event",
    "speaker": "Строительное управление",
    "title": "Имена в бетоне",
    "text": "На свежих стенах нового квартала проступают имена жильцов. Некоторые перечёркнуты красной линией ещё до заселения домов.",
    "palette": [
      "#67645d",
      "#171614"
    ],
    "tags": [
      "public",
      "budget",
      "secrecy",
      "anomaly"
    ],
    "weight": 5,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 8
      }
    ],
    "choices": {
      "left": {
        "label": "Снести квартал",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.15
          },
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.07
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.1
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.09
          }
        ]
      },
      "right": {
        "label": "Заселять только неперечёркнутых",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.12
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.06
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.13
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Адреса уничтожены",
        "text": "Дома снесли до фундамента. Имена появились на бетонных обломках снова — к списку добавились фамилии подрывников.",
        "reactions": {
          "left": {
            "label": "Мы не остановили список"
          },
          "right": {
            "label": "Обломки вывезти за город"
          }
        }
      },
      "right": {
        "title": "Образцовый квартал",
        "text": "Квартиры получили только неперечёркнутые. После заселения красные линии начали медленно появляться на стенах изнутри, по одной каждую ночь.",
        "reactions": {
          "left": {
            "label": "Эвакуировать их сейчас"
          },
          "right": {
            "label": "Списки иногда меняются"
          }
        }
      }
    }
  },
  {
    "id": "sky_ledger",
    "kind": "event",
    "speaker": "Астрономическая комиссия",
    "title": "Бухгалтерия неба",
    "text": "Между облаками появились гигантские строки ведомости. В графе «остаток» указано население города, и число уменьшается каждый час.",
    "palette": [
      "#3d4b5c",
      "#0e1218"
    ],
    "tags": [
      "public",
      "budget",
      "secrecy",
      "anomaly"
    ],
    "weight": 4,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 10
      }
    ],
    "choices": {
      "left": {
        "label": "Погасить городскую электросеть",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.14
          },
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.09
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.11
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.1
          }
        ]
      },
      "right": {
        "label": "Скорректировать цифру прожекторами",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.07
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.08
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.14
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Город списан со света",
        "text": "После отключения ведомость исчезла. Утром перепись не смогла найти девять тысяч человек: квартиры обставлены, еда тёплая, но родственники не помнят, кто там жил.",
        "reactions": {
          "left": {
            "label": "Мы позволили их списать"
          },
          "right": {
            "label": "Остаток перестал уменьшаться"
          }
        }
      },
      "right": {
        "title": "Исправление принято",
        "text": "Прожекторы добавили к остатку лишний ноль. Небо приняло поправку, но теперь в городе живёт в десять раз больше теней, чем людей.",
        "reactions": {
          "left": {
            "label": "Это не было населением"
          },
          "right": {
            "label": "Баланс формально восстановлен"
          }
        }
      }
    }
  },
  {
    "id": "city_under_skin",
    "kind": "event",
    "speaker": "Санитарная комиссия",
    "title": "Город под кожей",
    "text": "У тысяч жителей под кожей проступила одинаковая карта улиц. По ночам на ней зажигаются огни, а неизвестный проспект ведёт прямо к сердцу.",
    "palette": [
      "#684b48",
      "#1a1010"
    ],
    "tags": [
      "public",
      "personnel",
      "secrecy",
      "anomaly"
    ],
    "weight": 3.5,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 12
      }
    ],
    "choices": {
      "left": {
        "label": "Изолировать всех носителей",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.16
          },
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.14
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.13
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.11
          }
        ]
      },
      "right": {
        "label": "Нанести карты в городской реестр",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.15
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.08
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.17
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Карантинный мегаполис",
        "text": "Носителей свезли на стадион. В полночь карты на их телах соединились в один город, и тысячи сердец забились как его центральная площадь.",
        "reactions": {
          "left": {
            "label": "Мы собрали его целиком"
          },
          "right": {
            "label": "Периметр ещё удерживается"
          }
        }
      },
      "right": {
        "title": "Новый генеральный план",
        "text": "Реестр принял неизвестные улицы. Наутро они появились в городе физически, прорезав дома и людей; в конце проспекта пульсирует здание без дверей.",
        "reactions": {
          "left": {
            "label": "Стереть реестр любой ценой"
          },
          "right": {
            "label": "Новый район требует финансирования"
          }
        }
      }
    }
  },
  {
    "id": "world_knocking",
    "kind": "event",
    "speaker": "Все линии одновременно",
    "title": "Кто-то стучит снаружи",
    "text": "Стук слышен в каждом окне города, независимо от этажа. Звук идёт не с улицы: он приходит с той стороны неба, где не должно быть пространства.",
    "palette": [
      "#4f3d46",
      "#120d11"
    ],
    "tags": [
      "public",
      "personnel",
      "budget",
      "secrecy",
      "anomaly"
    ],
    "weight": 3,
    "conditions": [
      {
        "type": "turn",
        "op": "gte",
        "value": 14
      }
    ],
    "choices": {
      "left": {
        "label": "Заколотить все окна города",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": -0.18
          },
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.15
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": -0.16
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": -0.12
          }
        ]
      },
      "right": {
        "label": "Ответить одним окном",
        "effects": [
          {
            "type": "resource",
            "key": "budget",
            "amount": 0.1
          },
          {
            "type": "resource",
            "key": "personnel",
            "amount": -0.12
          },
          {
            "type": "resource",
            "key": "secrecy",
            "amount": 0.07
          },
          {
            "type": "resource",
            "key": "anomaly",
            "amount": 0.18
          }
        ]
      }
    },
    "results": {
      "left": {
        "title": "Город без окон",
        "text": "К рассвету стук затих. Жители сняли доски и обнаружили за окнами не улицы, а бесконечную чёрную воду, в которой отражается город без людей.",
        "reactions": {
          "left": {
            "label": "Мы опоздали закрыть их"
          },
          "right": {
            "label": "Не позволять никому смотреть наружу"
          }
        }
      },
      "right": {
        "title": "Окно открыто",
        "text": "В пустом доме открыли одну створку. Стук прекратился повсюду, а из комнаты исчезли двенадцать оперативников, само окно и понятие направления, в котором они ушли.",
        "reactions": {
          "left": {
            "label": "Мы впустили его"
          },
          "right": {
            "label": "Один проём спас остальные"
          }
        }
      }
    }
  }
]);
})();
