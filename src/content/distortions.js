(function () {
  "use strict";

  const reactions = (left, right) => ({
    left: { label: left },
    right: { label: right }
  });

  window.registerGameCards("distortions", [
    {
      id: "attention_nest",
      speaker: "Группа наблюдения №4",
      title: "Гнездо под эстакадой",
      text: "Под опорой эстакады растёт тёмный кокон. Он увеличивается всякий раз, когда на него направляют камеру или оружие.",
      palette: ["#53645b", "#111816"],
      tags: ["field", "personnel", "anomaly", "distortion"],
      weight: 4,
      conditions: [{ type: "turn", op: "gte", value: 5 }],
      choices: {
        left: {
          label: "Отправить группу устранения",
          forecastEffects: [
            { type: "resource", key: "personnel", amount: -0.11 },
            { type: "resource", key: "anomaly", amount: -0.12 }
          ],
          effects: [
            { type: "resource", key: "personnel", amount: -0.02 },
            { type: "resource", key: "secrecy", amount: -0.04 },
            { type: "resource", key: "anomaly", amount: 0.14 }
          ]
        },
        right: {
          label: "Не реагировать до рассвета",
          forecastEffects: [
            { type: "resource", key: "secrecy", amount: -0.08 },
            { type: "resource", key: "anomaly", amount: 0.1 }
          ],
          effects: [
            { type: "resource", key: "budget", amount: 0.03 },
            { type: "resource", key: "secrecy", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: -0.11 }
          ]
        }
      },
      results: {
        left: {
          title: "Операция, которой не было",
          text: "Кокон питался не людьми, а намерением причинить ему вред. Группа не успела выйти из машины: под эстакадой уже выросло второе небо, видимое всему району.",
          reactions: reactions("Мы сами его накормили", "Отозвать людей и погасить камеры")
        },
        right: {
          title: "Незамеченное исчезает",
          text: "К рассвету кокон съёжился и осыпался дорожной пылью. Свидетели решили, что им приснилось одно и то же; неиспользованное снаряжение вернули на склад.",
          reactions: reactions("Иногда бездействие — тоже протокол", "Записать как успешное наблюдение")
        }
      }
    },
    {
      id: "obedient_siren",
      speaker: "Дежурный по гражданской обороне",
      title: "Послушная сирена",
      text: "Сирена на крыше отвечает на распоряжения человеческим голосом. Она обещает замолчать, если техник поднимется и выключит её вручную.",
      palette: ["#6c5e49", "#18140f"],
      tags: ["public", "personnel", "secrecy", "distortion"],
      weight: 3.8,
      conditions: [{ type: "turn", op: "gte", value: 7 }],
      choices: {
        left: {
          label: "Послать техника на крышу",
          forecastEffects: [
            { type: "resource", key: "personnel", amount: -0.06 },
            { type: "resource", key: "secrecy", amount: 0.1 }
          ],
          effects: [
            { type: "resource", key: "personnel", amount: 0.04 },
            { type: "resource", key: "secrecy", amount: -0.12 },
            { type: "resource", key: "anomaly", amount: 0.07 }
          ]
        },
        right: {
          label: "Отключить электричество квартала",
          forecastEffects: [
            { type: "resource", key: "budget", amount: -0.1 },
            { type: "resource", key: "secrecy", amount: -0.07 },
            { type: "resource", key: "anomaly", amount: -0.05 }
          ],
          effects: [
            { type: "resource", key: "budget", amount: 0.02 },
            { type: "resource", key: "secrecy", amount: 0.04 },
            { type: "resource", key: "anomaly", amount: -0.08 }
          ]
        }
      },
      results: {
        left: {
          title: "Объявление на весь город",
          text: "Техник вернулся невредимым, но сирена заговорила его голосом и перечислила адреса всех объектов службы. Теперь он требует считать себя новым сотрудником отдела оповещения.",
          reactions: reactions("Она использовала нас как пароль", "Хотя бы техник вернулся")
        },
        right: {
          title: "Тишина без электричества",
          text: "После отключения сирена ещё минуту кричала в полной темноте, затем испугалась собственного голоса и замолчала. Энергосеть почему-то выставила службе отрицательный счёт.",
          reactions: reactions("Она тоже умеет бояться", "Зачесть переплату в смету")
        }
      }
    },
    {
      id: "refund_well",
      speaker: "Финансовый отдел",
      title: "Колодец возврата",
      text: "Во дворе казначейства появился колодец. Брошенные в него деньги возвращаются удвоенными, но на купюрах стоят подписи ещё не нанятых сотрудников.",
      palette: ["#716546", "#17140f"],
      tags: ["budget", "personnel", "anomaly", "distortion"],
      weight: 3.5,
      conditions: [{ type: "turn", op: "gte", value: 9 }],
      choices: {
        left: {
          label: "Внести пробную сумму",
          forecastEffects: [
            { type: "resource", key: "budget", amount: 0.13 },
            { type: "resource", key: "anomaly", amount: 0.06 }
          ],
          effects: [
            { type: "resource", key: "budget", amount: -0.11 },
            { type: "resource", key: "personnel", amount: -0.06 },
            { type: "resource", key: "anomaly", amount: 0.05 }
          ]
        },
        right: {
          label: "Засыпать колодец ведомостями",
          forecastEffects: [
            { type: "resource", key: "budget", amount: -0.08 },
            { type: "resource", key: "personnel", amount: -0.05 },
            { type: "resource", key: "anomaly", amount: -0.08 }
          ],
          effects: [
            { type: "resource", key: "budget", amount: 0.09 },
            { type: "resource", key: "personnel", amount: 0.03 },
            { type: "resource", key: "anomaly", amount: -0.05 }
          ]
        }
      },
      results: {
        left: {
          title: "Аванс удержан",
          text: "Колодец принял деньги и выдал приказы о посмертном найме на шестерых сотрудников текущей смены. Их пропуска погасли сразу; бухгалтерия назвала это досрочным исполнением обязательств.",
          reactions: reactions("Мы купили собственные вакансии", "Аннулировать приказы, если ещё можно")
        },
        right: {
          title: "Отчётность принята",
          text: "Колодец подавился неподписанными ведомостями и вернул всё, что проглотил за последние двадцать лет. Среди монет нашли жетоны сотрудников, которые завтра попросятся на работу.",
          reactions: reactions("Не нанимать людей с этими именами", "Средства вернуть в оборот")
        }
      }
    }
  ]);
})();
