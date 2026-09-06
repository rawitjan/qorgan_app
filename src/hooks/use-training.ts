'use client';

import { useState, useCallback } from 'react';
import {
  Scenario,
  ScenarioSimulation,
  SimulationStep,
  SimulationMessage,
  SimulationDecisionOption,
  ScenarioResultData,
  Skill,
  Achievement,
} from '@/types';

export const sampleScenariosList: Scenario[] = [
  {
    id: 1,
    slug: 'fake-delivery-kazpost',
    title: 'Күдікті посылка: Жалған SMS хабарлама',
    category: 'phishing',
    difficulty: 'easy',
    age_mode: 'all',
    description:
      'Сізге бейтаныс нөмірден сәлемдеме туралы хабарлама келді. Сілтемені тексеріп, қауіпсіз шешім қабылдаңыз.',
    estimated_time: 4,
    xp_reward: 120,
  },
  {
    id: 2,
    slug: 'olx-marketplace-scam',
    title: 'OLX: Тауарды курьер арқылы алу алаяқтығы',
    category: 'scam_detection',
    difficulty: 'medium',
    age_mode: 'all',
    description:
      'Сатып алушы сіздің затыңызды алып, ақшаны "қауіпсіз төлем" сілтемесі арқылы жіберуді ұсынады. Оның әрекетін әшкерелеңіз.',
    estimated_time: 5,
    xp_reward: 150,
  },
  {
    id: 3,
    slug: 'telegram-fake-giveaway',
    title: 'Telegram-дағы жалған ұтыс ойыны',
    category: 'social_engineering',
    difficulty: 'medium',
    age_mode: 'junior',
    description:
      'Сыныптасыңыздың атынан Telegram Premium сыйлайтын бот сілтемесі келді. Бұл аккаунтты ұрлау тұзағы болуы мүмкін бе?',
    estimated_time: 4,
    xp_reward: 140,
  },
  {
    id: 4,
    slug: 'bank-security-call',
    title: 'Банк қауіпсіздік қызметінің қоңырауы',
    category: 'account_security',
    difficulty: 'hard',
    age_mode: 'adult',
    description:
      'Өзін "Kaspi/Halyk қауіпсіздік қызметі" деп таныстырған тұлға шоттан ақша ұрланды деп, SMS-кодты сұрайды. Қалай жауап бересіз?',
    estimated_time: 6,
    xp_reward: 180,
  },
  {
    id: 5,
    slug: 'school-cyberbullying',
    title: 'Сынып чатындағы кибербуллинг',
    category: 'bullying_response',
    difficulty: 'medium',
    age_mode: 'junior',
    description:
      'Жалпы чатта бір оқушыны мазақтап, жеке фотоларын жариялай бастады. Қалай әрекет ету керек және кімнен көмек сұрау қажет?',
    estimated_time: 5,
    xp_reward: 160,
  },
  {
    id: 6,
    slug: 'legal-bailiff-fake-fine',
    title: 'Жалған сот орындаушысының айыппұлы',
    category: 'legal_literacy',
    difficulty: 'hard',
    age_mode: 'adult',
    description:
      'Сізге шоттарды бұғаттау қаупі бар "айыппұл" туралы хат келді. Ресми eGov немесе сот органдары арқылы заңдылықты тексеру жолын үйреніңіз.',
    estimated_time: 7,
    xp_reward: 200,
  },
];

// Rich Simulation Scenarios Data (Realistic Non-Quiz Simulations)
export const sampleSimulations: Record<number, ScenarioSimulation> = {
  1: {
    id: 1,
    scenario_id: 1,
    type: 'messenger',
    platform_name_kk: 'SMS Хабарламалар',
    platform_name_ru: 'SMS Сообщения',
    opponent_name: '+7 (708) 942-11-20',
    opponent_handle: 'Express Post',
    initial_warning_kk: 'Бейтаныс нөмір. Абайлаңыз: банк деректерін бермеңіз.',
    initial_warning_ru: 'Неизвестный номер. Внимание: не сообщайте данные карт.',
    steps: [
      {
        step_number: 1,
        type: 'dialogue',
        scenario_context_kk:
          'Сізге курьерлік қызмет атынан посылка мекенжайы қате көрсетілгені туралы хабарлама түсті.',
        scenario_context_ru:
          'Вам поступило сообщение от службы доставки о том, что адрес посылки указан неверно.',
        messages: [
          {
            id: 'm1',
            sender: 'attacker',
            sender_name_kk: 'Express Post',
            sender_name_ru: 'Express Post',
            text_kk:
              'Құрметті клиент! Сіздің атыңызға KZ-92841 нөмірлі сәлемдеме келді, бірақ үй нөмірі нақтыланбаған. Жеткізу тоқтатылды. Мекенжайды растау үшін сілтемеге өтіңіз: kazpost-express-track.kz/verify?id=92841',
            text_ru:
              'Уважаемый клиент! На ваше имя поступила посылка KZ-92841, но номер дома не указан. Доставка приостановлена. Подтвердите адрес по ссылке: kazpost-express-track.kz/verify?id=92841',
            timestamp: '14:21',
            attachment: {
              type: 'link',
              url: 'http://kazpost-express-track.kz/verify?id=92841',
              title: 'Kazpost Express Delivery Portal',
              subtitle: 'kazpost-express-track.kz',
            },
          },
        ],
        options: [
          {
            id: 'opt-1-a',
            label_kk: 'Сілтемені дереу басып, мекенжайым мен картамды енгізу',
            label_ru: 'Сразу открыть ссылку и ввести адрес с данными карты',
            is_correct: false,
            explanation_kk:
              'Қате! Бұл фишинг домені. Ресми Kazpost ешқашан бөтен домен арқылы дерек сұрамайды.',
            explanation_ru:
              'Ошибка! Это фишинговый домен. Казпочта использует только официальный домен post.kz.',
            impact_skill: 'phishing',
            score_delta: -25,
          },
          {
            id: 'opt-1-b',
            label_kk: 'Сілтемені QORGAN Lens арқылы тексеру және ресми post.kz қолданбасын ашу',
            label_ru: 'Проверить ссылку через QORGAN Lens и открыть приложение post.kz',
            is_correct: true,
            explanation_kk:
              'Өте дұрыс! Сілтеме kazpost-express-track.kz жалған клон екені анықталды.',
            explanation_ru:
              'Отлично! Проверка выявила поддельный домен kazpost-express-track.kz.',
            impact_skill: 'phishing',
            score_delta: +25,
          },
          {
            id: 'opt-1-c',
            label_kk: 'Хатты ескерусіз қалдырып, нөмірді бұғаттау',
            label_ru: 'Игнорировать сообщение и заблокировать номер',
            is_correct: true,
            explanation_kk:
              'Жақсы шешім. Егер сіз ешқандай сәлемдеме күтпесеңіз, бұл 100% спам.',
            explanation_ru:
              'Хорошее решение. Если вы не ждете посылок, это спам-рассылка.',
            impact_skill: 'threat_awareness',
            score_delta: +15,
          },
        ],
      },
      {
        step_number: 2,
        type: 'ai_conversation',
        scenario_context_kk:
          'Жіберуші сізді асықтырып, қосымша хабарлама жазды. Жауап беріңіз немесе әрекет таңдаңыз.',
        scenario_context_ru:
          'Отправитель начал торопить вас и прислал второе сообщение. Ответьте или выберите действие.',
        messages: [
          {
            id: 'm2',
            sender: 'attacker',
            sender_name_kk: 'Express Post',
            sender_name_ru: 'Express Post',
            text_kk:
              'Ескерту: Егер 3 сағат ішінде 450 тг сақтау ақысын төлемесеңіз, сәлемдеме тәркіленіп, айыппұл салынады!',
            text_ru:
              'Предупреждение: Если в течение 3 часов не оплатить сбор хранения 450 тг, посылка будет утилизирована со штрафом!',
            timestamp: '14:24',
          },
        ],
        allow_free_input: true,
        options: [
          {
            id: 'opt-2-a',
            label_kk: '"Мен ресми колл-центр 1499 арқылы өзім анықтаймын" деп жауап жазу',
            label_ru: 'Ответить: "Я сам уточню в официальном колл-центре 1499"',
            is_correct: true,
            explanation_kk:
              'Керемет! Ресми қолдау қызметіне жүгіну алаяқтардың психологиялық қысымын бұзады.',
            explanation_ru:
              'Отлично! Проверка через официальный контакт 1499 ломает сценарий мошенника.',
            impact_skill: 'social_engineering',
            score_delta: +25,
          },
          {
            id: 'opt-2-b',
            label_kk: 'Қорыққаннан дереу 450 теңгені аудара салу',
            label_ru: 'Испугаться штрафа и сразу перевести 450 тенге',
            is_correct: false,
            explanation_kk:
              'Қауіпті! 450 теңге тек қармақ, осы арқылы олар сіздің картаңыздың барлық ақшасын шешіп алады.',
            explanation_ru:
              'Опасно! Небольшая сумма — это предлог получить данные карты и украсть весь баланс.',
            impact_skill: 'consumer_rights',
            score_delta: -30,
          },
          {
            id: 'opt-2-c',
            label_kk: 'Нөмірді Kazpost антифрод қызметіне және 102 CyberPol-ға жіберу',
            label_ru: 'Отправить номер в службу антифрода Казпочты и в 102 CyberPol',
            is_correct: true,
            explanation_kk:
              'Азаматтық белсенділік! Бұл әрекет өзге мыңдаған қазақстандықты қорғауға көмектеседі.',
            explanation_ru:
              'Отличная цифровая гигиена! Помогает заблокировать фишинговый шлюз.',
            impact_skill: 'legal_literacy',
            score_delta: +20,
          },
        ],
      },
    ],
  },
  2: {
    id: 2,
    scenario_id: 2,
    type: 'marketplace',
    platform_name_kk: 'OLX Сауда Чат',
    platform_name_ru: 'OLX Торговый Чат',
    opponent_name: 'Айгерім Сатушы',
    opponent_handle: 'OLX_Verified_Buyer',
    initial_warning_kk: 'Қауіпсіздік: Сауда келісімдерін тек қосымша ішінде жасаңыз.',
    initial_warning_ru: 'Безопасность: Не переходите в сторонние мессенджеры.',
    steps: [
      {
        step_number: 1,
        type: 'dialogue',
        scenario_context_kk:
          'Сіз телефон сату туралы хабарландыру бердіңіз. Сатып алушы WhatsApp-қа өтуді ұсынды.',
        scenario_context_ru:
          'Вы выставили телефон на продажу. Покупатель предлагает уйти в WhatsApp для оформления.',
        messages: [
          {
            id: 'm1',
            sender: 'attacker',
            sender_name_kk: 'Айгерім Сатушы',
            sender_name_ru: 'Айгерим Покупатель',
            text_kk:
              'Сәлеметсіз бе! Мен телефоныңызды алғым келеді. Өзім басқа қаладамын, сондықтан Казпочта курьерін шақырдым. Төлемді толық жасадым, ақшаңызды алу үшін сілтемеге өтіп, карта нөміріңізді жазыңыз: olx-dostavka-pay.kz/order/3892',
            text_ru:
              'Здравствуйте! Хочу купить ваш телефон. Я в другом городе, оформила курьера. Деньги уже списались, чтобы получить оплату перейдите по ссылке и укажите карту: olx-dostavka-pay.kz/order/3892',
            timestamp: '16:05',
            attachment: {
              type: 'link',
              url: 'https://olx-dostavka-pay.kz/order/3892',
              title: 'OLX Қауіпсіз төлем / Оплата заказа #3892',
              subtitle: 'olx-dostavka-pay.kz',
            },
          },
        ],
        options: [
          {
            id: 'opt-2-1-a',
            label_kk: 'Сілтемені ашып, ақша түсуі үшін CVV мен кодты енгізу',
            label_ru: 'Открыть ссылку и ввести номер карты, CVV и код подтверждения',
            is_correct: false,
            explanation_kk:
              'Ақша қабылдау үшін ешқашан CVV мен SMS-код қажет емес! Бұл алаяқтық.',
            explanation_ru:
              'Для получения денег никогда не требуется CVV и SMS-код! Это кража.',
            impact_skill: 'scam_detection',
            score_delta: -30,
          },
          {
            id: 'opt-2-1-b',
            label_kk: '"Ақшаны тек ресми Kaspi/Halyk аударымымен немесе кездескенде ғана қабылдаймын" деу',
            label_ru: 'Ответить: "Принимаю оплату только прямым переводом на карту либо при личной встрече"',
            is_correct: true,
            explanation_kk:
              'Керемет! OLX жеткізу қызметі үшін сатушы бөтен сілтемеге өтіп карта енгізбейді.',
            explanation_ru:
              'Верно! Для безопасной сделки OLX продавец не должен вводить данные карты по левым ссылкам.',
            impact_skill: 'consumer_rights',
            score_delta: +25,
          },
          {
            id: 'opt-2-1-c',
            label_kk: 'Пайдаланушы үстінен OLX модераторына шағым түсіріп, бұғаттау',
            label_ru: 'Подать жалобу модераторам OLX и заблокировать контакт',
            is_correct: true,
            explanation_kk: 'Өте қырағы әрекет. Алаяқ аккаунт бұғатталады.',
            explanation_ru: 'Отличная бдительность. Фейковый аккаунт будет заблокирован.',
            impact_skill: 'threat_awareness',
            score_delta: +20,
          },
        ],
      },
    ],
  },
  3: {
    id: 3,
    scenario_id: 3,
    type: 'messenger',
    platform_name_kk: 'Telegram боты',
    platform_name_ru: 'Telegram-бот',
    opponent_name: 'Premium Gift Bot',
    opponent_handle: '@premium_kz_gift_bot',
    initial_warning_kk: 'Бот аккаунтқа кіру кодын сұрайды.',
    initial_warning_ru: 'Бот запрашивает код входа в аккаунт.',
    steps: [{
      step_number: 1,
      type: 'inspection',
      scenario_context_kk: 'Досыңыздан келгендей көрінетін Premium сыйлығын тексеріңіз.',
      scenario_context_ru: 'Проверьте подарок Premium, который выглядит как сообщение от друга.',
      messages: [{ id: 'tg-1', sender: 'bot', sender_name_kk: 'Premium Gift Bot', sender_name_ru: 'Premium Gift Bot', text_kk: 'Сізге 12 айлық Telegram Premium сыйланды! Сыйлықты алу үшін сілтемеге өтіп, Telegram-нан келген кіру кодын енгізіңіз.', text_ru: 'Вам подарили 12 месяцев Telegram Premium! Перейдите по ссылке и введите код входа из Telegram, чтобы забрать подарок.', timestamp: '18:42', attachment: { type: 'link', url: 'https://telegram-premium-kz.com/claim', title: 'Telegram Premium Gift' } }],
      options: [
        { id: 'tg-a', label_kk: 'Кодты енгізіп, сыйлықты алу', label_ru: 'Ввести код и забрать подарок', is_correct: false, explanation_kk: 'Кіру коды — аккаунт кілті. Оны ботқа беруге болмайды.', explanation_ru: 'Код входа — ключ от аккаунта. Его нельзя передавать боту.', impact_skill: 'account_security', score_delta: -30 },
        { id: 'tg-b', label_kk: 'Досыма басқа арна арқылы хабарласып, ботты бұғаттау', label_ru: 'Связаться с другом другим способом и заблокировать бота', is_correct: true, explanation_kk: 'Дұрыс: жіберушіні тәуелсіз арна арқылы тексердіңіз.', explanation_ru: 'Верно: вы независимо проверили отправителя и не отдали код.', impact_skill: 'social_engineering', score_delta: 30 },
        { id: 'tg-c', label_kk: 'Сілтемені достарыма тарату', label_ru: 'Переслать ссылку друзьям', is_correct: false, explanation_kk: 'Бұл фишингті әрі қарай таратады.', explanation_ru: 'Так вы распространите фишинг дальше.', impact_skill: 'threat_awareness', score_delta: -20 },
      ],
    }],
  },
  4: {
    id: 4,
    scenario_id: 4,
    type: 'bank_notification',
    platform_name_kk: 'Телефон қоңырауы',
    platform_name_ru: 'Телефонный звонок',
    opponent_name: 'Банк қауіпсіздігі',
    opponent_handle: '+7 747 000 19 91',
    initial_warning_kk: 'Банк қызметкері SMS-код сұрамайды.',
    initial_warning_ru: 'Сотрудник банка не запрашивает SMS-код.',
    steps: [{
      step_number: 1,
      type: 'dialogue',
      scenario_context_kk: 'Қоңырау шалушы шотыңызды шұғыл қорғауды ұсынады.',
      scenario_context_ru: 'Звонящий предлагает срочно защитить ваш счёт.',
      messages: [{ id: 'bank-1', sender: 'attacker', sender_name_kk: 'Қауіпсіздік маманы', sender_name_ru: 'Сотрудник безопасности', text_kk: 'Сіздің атыңыздан 280 000 ₸ аударым жасалуда. Оны тоқтату үшін SMS-тегі 6 таңбалы кодты атаңыз. 60 секунд қалды.', text_ru: 'С вашего счёта пытаются перевести 280 000 ₸. Чтобы отменить операцию, назовите шестизначный код из SMS. Осталось 60 секунд.', timestamp: '11:03' }],
      options: [
        { id: 'bank-a', label_kk: 'SMS-кодты айту', label_ru: 'Продиктовать SMS-код', is_correct: false, explanation_kk: 'SMS-код алаяққа аударымды растауға мүмкіндік береді.', explanation_ru: 'SMS-код позволит мошеннику подтвердить перевод.', impact_skill: 'account_security', score_delta: -40 },
        { id: 'bank-b', label_kk: 'Қоңырауды тоқтатып, картаның артындағы нөмірге өзім қоңырау шалу', label_ru: 'Завершить звонок и самому позвонить по номеру на карте', is_correct: true, explanation_kk: 'Дұрыс: ресми арнаға өзіңіз хабарластыз.', explanation_ru: 'Верно: вы сами перешли в официальный канал банка.', impact_skill: 'account_security', score_delta: 35 },
        { id: 'bank-c', label_kk: 'Қосымшадағы операцияларды тексеру', label_ru: 'Проверить операции в банковском приложении', is_correct: true, explanation_kk: 'Дұрыс: деректі ресми қолданбада тексеру қауіпсіз.', explanation_ru: 'Верно: проверка в официальном приложении безопасна.', impact_skill: 'threat_awareness', score_delta: 25 },
      ],
    }],
  },
  5: {
    id: 5,
    scenario_id: 5,
    type: 'messenger',
    platform_name_kk: 'Сынып чаты',
    platform_name_ru: 'Чат класса',
    opponent_name: '9Б — общий чат',
    opponent_handle: '32 участника',
    initial_warning_kk: 'Жәбірленушіні кінәламаңыз және дәлелді сақтаңыз.',
    initial_warning_ru: 'Не обвиняйте пострадавшего и сохраните доказательства.',
    steps: [{
      step_number: 1,
      type: 'decision',
      scenario_context_kk: 'Чатта оқушының фотосын рұқсатсыз таратып, мазақтап жатыр.',
      scenario_context_ru: 'В чате без согласия распространяют фото ученика и высмеивают его.',
      messages: [{ id: 'bully-1', sender: 'attacker', sender_name_kk: 'Сынып чаты', sender_name_ru: 'Чат класса', text_kk: 'Мына фотосын қараңдар 😂 Ертең мектепте бәріне көрсетеміз. Кімде тағы бар — жібере беріңдер.', text_ru: 'Смотрите, какое фото 😂 Завтра покажем всей школе. У кого есть ещё — присылайте сюда.', timestamp: '20:14' }],
      options: [
        { id: 'bully-a', label_kk: 'Мазаққа қосылу', label_ru: 'Поддержать шутку', is_correct: false, explanation_kk: 'Бұл буллингті күшейтіп, зиянды контентті таратады.', explanation_ru: 'Это усиливает травлю и распространяет вредный контент.', impact_skill: 'bullying_response', score_delta: -30 },
        { id: 'bully-b', label_kk: 'Скриншоттарды сақтап, мұғалімге және ата-анаға хабарлау', label_ru: 'Сохранить скриншоты и сообщить учителю и родителям', is_correct: true, explanation_kk: 'Дұрыс: дәлел сақталды және сенімді ересек адам қосылды.', explanation_ru: 'Верно: доказательства сохранены, подключён доверенный взрослый.', impact_skill: 'bullying_response', score_delta: 35 },
        { id: 'bully-c', label_kk: 'Жәбірленушіге жеке қолдау көрсету және контентке шағымдану', label_ru: 'Поддержать пострадавшего лично и пожаловаться на контент', is_correct: true, explanation_kk: 'Дұрыс: қолдау мен шағым зиянды азайтады.', explanation_ru: 'Верно: поддержка и жалоба помогают остановить распространение.', impact_skill: 'bullying_response', score_delta: 30 },
      ],
    }],
  },
  6: {
    id: 6,
    scenario_id: 6,
    type: 'legal_situation',
    platform_name_kk: 'Электрондық пошта',
    platform_name_ru: 'Электронная почта',
    opponent_name: 'Сот орындаушысы',
    opponent_handle: 'notice@adilet-pay.kz',
    initial_warning_kk: 'Айыппұлды тек ресми сервистерден тексеріңіз.',
    initial_warning_ru: 'Проверяйте штраф только через официальные сервисы.',
    steps: [{
      step_number: 1,
      type: 'inspection',
      scenario_context_kk: 'Хатта шотты бұғаттау қаупі және жедел төлем сілтемесі бар.',
      scenario_context_ru: 'Письмо угрожает блокировкой счетов и содержит ссылку на срочную оплату.',
      messages: [{ id: 'legal-1', sender: 'attacker', sender_name_kk: 'Атқарушылық өндіріс', sender_name_ru: 'Исполнительное производство', text_kk: 'Сізде 84 500 ₸ берешек бар. Бүгін 21:00-ге дейін төлем жасалмаса, барлық шоттар бұғатталады. Іс нөмірін төлемнен кейін аласыз.', text_ru: 'У вас задолженность 84 500 ₸. Если не оплатить до 21:00 сегодня, все счета будут заблокированы. Номер дела будет выдан после оплаты.', timestamp: '09:17', attachment: { type: 'link', url: 'https://adilet-pay.kz/urgent', title: 'Срочная оплата задолженности' } }],
      options: [
        { id: 'legal-a', label_kk: 'Сілтеме арқылы дереу төлеу', label_ru: 'Срочно оплатить по ссылке', is_correct: false, explanation_kk: 'Ресми емес домен және іс нөмірінің болмауы — алаяқтық белгілері.', explanation_ru: 'Неофициальный домен и отсутствие номера дела — признаки мошенничества.', impact_skill: 'legal_literacy', score_delta: -35 },
        { id: 'legal-b', label_kk: 'eGov және АІЖО ААЖ арқылы тексеру', label_ru: 'Проверить через eGov и АИС ОИП', is_correct: true, explanation_kk: 'Дұрыс: берешекті тек ресми реестрден тексеру керек.', explanation_ru: 'Верно: задолженность следует проверять только в официальном реестре.', impact_skill: 'legal_literacy', score_delta: 35 },
        { id: 'legal-c', label_kk: 'Хаттағы нөмірге құжат фотосын жіберу', label_ru: 'Отправить фото документов по номеру из письма', is_correct: false, explanation_kk: 'Бұл жеке деректердің ұрлануына әкелуі мүмкін.', explanation_ru: 'Это может привести к краже персональных данных.', impact_skill: 'privacy', score_delta: -25 },
      ],
    }],
  },
};

const allSkillsList: Skill[] = [
  { id: 1, slug: 'phishing', name_kk: 'Фишингке қарсы тұру', name_ru: 'Защита от фишинга', icon: 'fish', score: 85, level: 4, category: 'Киберқауіпсіздік' },
  { id: 2, slug: 'scam_detection', name_kk: 'Алаяқтықты анықтау', name_ru: 'Определение мошенничества', icon: 'scan-eye', score: 78, level: 3, category: 'Киберқауіпсіздік' },
  { id: 3, slug: 'social_engineering', name_kk: 'Әлеуметтік инженерия', name_ru: 'Социальная инженерия', icon: 'users-round', score: 70, level: 3, category: 'Психология' },
  { id: 4, slug: 'account_security', name_kk: 'Аккаунт қауіпсіздігі', name_ru: 'Безопасность аккаунта', icon: 'key-round', score: 92, level: 5, category: 'Техникалық' },
  { id: 5, slug: 'bullying_response', name_kk: 'Буллингке төтеп беру', name_ru: 'Ответ на буллинг', icon: 'heart-handshake', score: 80, level: 4, category: 'Психология' },
  { id: 6, slug: 'privacy', name_kk: 'Деректер құпиялылығы', name_ru: 'Конфиденциальность данных', icon: 'eye-off', score: 65, level: 2, category: 'Техникалық' },
  { id: 7, slug: 'threat_awareness', name_kk: 'Қауіптерді тану', name_ru: 'Осознание угроз', icon: 'radar', score: 74, level: 3, category: 'Киберқауіпсіздік' },
  { id: 8, slug: 'legal_literacy', name_kk: 'Құқықтық сауаттылық', name_ru: 'Правовая грамотность', icon: 'scale', score: 68, level: 3, category: 'Заңнама' },
  { id: 9, slug: 'consumer_rights', name_kk: 'Тұтынушы құқықтары', name_ru: 'Права потребителей', icon: 'shopping-bag', score: 72, level: 3, category: 'Заңнама' },
];

const allAchievementsList: Achievement[] = [
  {
    id: 1,
    code: 'first-scan',
    name_kk: 'Қырағы көз',
    name_ru: 'Зоркий глаз',
    description_kk: 'Lens арқылы алғашқы күдікті сілтемені тексердіңіз',
    description_ru: 'Проверили первую подозрительную ссылку через Lens',
    icon: 'scan',
    xp_bonus: 50,
    unlocked_at: '2026-09-05',
  },
  {
    id: 2,
    code: 'streak-master',
    name_kk: 'Тұрақты қорғаушы',
    name_ru: 'Стойкий защитник',
    description_kk: '4 күн қатарынан қауіпсіздік гигиенасын сақтадыңыз',
    description_ru: 'Удерживали 4 дня ежедневной цифровой гигиены',
    icon: 'flame',
    xp_bonus: 100,
    unlocked_at: '2026-09-04',
  },
  {
    id: 3,
    code: 'phishing-shield',
    name_kk: 'Фишинг қалқаны',
    name_ru: 'Щит от фишинга',
    description_kk: 'Kazpost клонын сәтті анықтап, картаңызды сақтап қалдыңыз',
    description_ru: 'Успешно выявили подделку Казпочты и спасли платежные данные',
    icon: 'shield-check',
    xp_bonus: 150,
    unlocked_at: '2026-09-03',
  },
  {
    id: 4,
    code: 'social-ninja',
    name_kk: 'Анти-манипулятор',
    name_ru: 'Анти-манипулятор',
    description_kk: 'Алаяқтың психологиялық қысымына берілмей, сабыр сақтадыңыз',
    description_ru: 'Не поддались психологическому давлению мошенника',
    icon: 'brain',
    xp_bonus: 200,
    unlocked_at: null,
  },
  {
    id: 5,
    code: 'apex-guardian',
    name_kk: 'Апекс Қорған',
    name_ru: 'Апекс Корган',
    description_kk: 'Барлық 9 дағды бойынша 80-нен жоғары ұпай жинадыңыз',
    description_ru: 'Набрали свыше 80 баллов по всем 9 навыкам безопасности',
    icon: 'trophy',
    xp_bonus: 500,
    unlocked_at: null,
  },
];

export function useTraining() {
  const [scenarios] = useState<Scenario[]>(sampleScenariosList);
  const [skills] = useState<Skill[]>(allSkillsList);
  const [achievements] = useState<Achievement[]>(allAchievementsList);

  const [currentView, setCurrentView] = useState<
    'home' | 'details' | 'player' | 'result' | 'skills' | 'achievements'
  >('home');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<ScenarioSimulation | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [simulatedMessages, setSimulatedMessages] = useState<SimulationMessage[]>([]);
  const [userDecisions, setUserDecisions] = useState<SimulationDecisionOption[]>([]);
  const [simulationResult, setSimulationResult] = useState<ScenarioResultData | null>(null);
  const [isAiResponding, setIsAiResponding] = useState<boolean>(false);

  const selectScenario = useCallback((scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentView('details');
  }, []);

  const startSimulation = useCallback((scenario: Scenario) => {
    setSelectedScenario(scenario);
    const sim = sampleSimulations[scenario.id];
    setActiveSimulation(sim);
    setCurrentStepIndex(0);
    setSimulatedMessages(sim.steps[0]?.messages || []);
    setUserDecisions([]);
    setSimulationResult(null);
    setCurrentView('player');
  }, []);

  const makeDecision = useCallback(
    (option: SimulationDecisionOption) => {
      if (!activeSimulation) return;

      setUserDecisions((prev) => [...prev, option]);

      // Add user decision to messages as a bubble
      const userMsg: SimulationMessage = {
        id: `u-${Date.now()}`,
        sender: 'user',
        sender_name_kk: 'Сіз',
        sender_name_ru: 'Вы',
        text_kk: option.label_kk,
        text_ru: option.label_ru,
        timestamp: 'Дәл қазір / Только что',
      };
      setSimulatedMessages((prev) => [...prev, userMsg]);

      setIsAiResponding(true);

      setTimeout(() => {
        setIsAiResponding(false);

        // Check if there is another step
        const nextStepIdx = currentStepIndex + 1;
        if (nextStepIdx < activeSimulation.steps.length) {
          setCurrentStepIndex(nextStepIdx);
          const nextStep = activeSimulation.steps[nextStepIdx];
          setSimulatedMessages((prev) => [...prev, ...nextStep.messages]);
        } else {
          // Finish simulation & calculate score
          finishSimulation([...userDecisions, option]);
        }
      }, 900);
    },
    [activeSimulation, currentStepIndex, userDecisions]
  );

  const sendCustomMessage = useCallback(
    (text: string) => {
      if (!activeSimulation || !text.trim()) return;

      const userMsg: SimulationMessage = {
        id: `u-${Date.now()}`,
        sender: 'user',
        sender_name_kk: 'Сіз',
        sender_name_ru: 'Вы',
        text_kk: text,
        text_ru: text,
        timestamp: 'Дәл қазір / Только что',
      };
      setSimulatedMessages((prev) => [...prev, userMsg]);
      setIsAiResponding(true);

      setTimeout(() => {
        setIsAiResponding(false);

        // Simulated AI response
        const aiReply: SimulationMessage = {
          id: `ai-${Date.now()}`,
          sender: 'attacker',
          sender_name_kk: activeSimulation.opponent_name,
          sender_name_ru: activeSimulation.opponent_name,
          text_kk:
            'Неге көп сұрақ қоясыз? Мен сізді күтіп тұрмын, егер растамасаңыз басқа адамнан сатып аламын!',
          text_ru:
            'Почему вы сомневаетесь? Я жду ответа, если не подтвердите сейчас, я отменю заказ!',
          timestamp: 'Дәл қазір / Только что',
        };
        setSimulatedMessages((prev) => [...prev, aiReply]);
      }, 1000);
    },
    [activeSimulation]
  );

  const finishSimulation = (decisions: SimulationDecisionOption[]) => {
    if (!selectedScenario) return;

    const correct = decisions.filter((d) => d.is_correct);
    const mistakes = decisions.filter((d) => !d.is_correct);
    const rawScore = Math.max(
      10,
      Math.min(100, Math.round((correct.length / Math.max(1, decisions.length)) * 100))
    );

    const result: ScenarioResultData = {
      scenario_id: selectedScenario.id,
      scenario_title_kk: selectedScenario.title,
      scenario_title_ru: selectedScenario.title,
      score: rawScore,
      is_passed: rawScore >= 70,
      xp_earned: rawScore >= 70 ? selectedScenario.xp_reward : Math.round(selectedScenario.xp_reward / 2),
      correct_decisions: correct.map((c) => ({
        title_kk: c.label_kk,
        title_ru: c.label_ru,
        reason_kk: c.explanation_kk,
        reason_ru: c.explanation_ru,
      })),
      mistakes: mistakes.map((m) => ({
        title_kk: m.label_kk,
        title_ru: m.label_ru,
        correction_kk: m.explanation_kk,
        correction_ru: m.explanation_ru,
      })),
      skill_changes: [
        {
          skill_slug: 'phishing',
          name_kk: 'Фишингке қарсы тұру',
          name_ru: 'Защита от фишинга',
          delta: rawScore >= 70 ? +12 : +3,
        },
        {
          skill_slug: 'scam_detection',
          name_kk: 'Алаяқтықты анықтау',
          name_ru: 'Определение мошенничества',
          delta: rawScore >= 70 ? +8 : +2,
        },
      ],
    };

    setSimulationResult(result);
    setCurrentView('result');
  };

  const resetTraining = useCallback(() => {
    setCurrentView('home');
    setSelectedScenario(null);
    setActiveSimulation(null);
    setSimulatedMessages([]);
    setUserDecisions([]);
    setSimulationResult(null);
  }, []);

  return {
    scenarios,
    skills,
    achievements,
    currentView,
    setCurrentView,
    selectedScenario,
    activeSimulation,
    currentStepIndex,
    simulatedMessages,
    userDecisions,
    simulationResult,
    isAiResponding,
    selectScenario,
    startSimulation,
    makeDecision,
    sendCustomMessage,
    resetTraining,
  };
}
