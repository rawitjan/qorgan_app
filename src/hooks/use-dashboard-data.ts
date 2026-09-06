'use client';

import { useState } from 'react';
import {
  Skill,
  Threat,
  Scenario,
  ScoreChange,
  ActivityItem,
  DashboardData,
} from '@/types';

export interface SkillJourneyMilestone {
  id: number;
  slug: string;
  name_kk: string;
  name_ru: string;
  status: 'completed' | 'current' | 'locked';
  xp_required: number;
  reward_xp: number;
  level: number;
  icon: string;
}

const defaultSkills: Skill[] = [
  { id: 1, slug: 'phishing', name_kk: 'Фишингке қарсы тұру', name_ru: 'Защита от фишинга', icon: 'fish', score: 85, level: 4, category: 'cyber' },
  { id: 2, slug: 'scam_detection', name_kk: 'Алаяқтықты анықтау', name_ru: 'Определение мошенничества', icon: 'scan-eye', score: 78, level: 3, category: 'cyber' },
  { id: 3, slug: 'social_engineering', name_kk: 'Әлеуметтік инженерия', name_ru: 'Социальная инженерия', icon: 'users-round', score: 70, level: 3, category: 'cyber' },
  { id: 4, slug: 'account_security', name_kk: 'Аккаунт қауіпсіздігі', name_ru: 'Безопасность аккаунта', icon: 'key-round', score: 92, level: 5, category: 'cyber' },
  { id: 5, slug: 'bullying_response', name_kk: 'Буллингке төтеп беру', name_ru: 'Ответ на буллинг', icon: 'heart-handshake', score: 80, level: 4, category: 'safe' },
  { id: 6, slug: 'privacy', name_kk: 'Деректер құпиялылығы', name_ru: 'Конфиденциальность данных', icon: 'eye-off', score: 65, level: 2, category: 'safe' },
  { id: 7, slug: 'threat_awareness', name_kk: 'Қауіптерді тану', name_ru: 'Осознание угроз', icon: 'radar', score: 74, level: 3, category: 'cyber' },
  { id: 8, slug: 'legal_literacy', name_kk: 'Құқықтық сауаттылық', name_ru: 'Правовая грамотность', icon: 'scale', score: 68, level: 3, category: 'law' },
  { id: 9, slug: 'consumer_rights', name_kk: 'Тұтынушы құқықтары', name_ru: 'Права потребителей', icon: 'shopping-bag', score: 72, level: 3, category: 'law' },
];

const defaultThreats: Threat[] = [
  {
    id: 1,
    title: 'OLX / Kazpost арқылы төлем жасау сылтауымен тараған фишинг',
    category: 'phishing',
    severity: 'high',
    region: 'KZ-ALL (Жалпыұлттық)',
    description: 'Тауарды сатып алу үшін жалған казпочта немесе курьер сілтемелерін жіберіп, карта деректері мен SMS-кодтарды ұрлау әрекеттері көбейді.',
    starts_at: '2026-09-05 12:00',
    status: 'active',
  },
  {
    id: 2,
    title: 'Сот орындаушылары атынан жалған айыппұл SMS-тері',
    category: 'social_engineering',
    severity: 'critical',
    region: 'KZ-AST (Астана)',
    description: 'Шоттарды бұғаттаумен қорқытып, жалған төлем реквизиттеріне ақша аударуды талап ету фактілері тіркелді.',
    starts_at: '2026-09-05 10:30',
    status: 'active',
  },
];

const defaultMission: Scenario = {
  id: 1,
  slug: 'fake-delivery-kazpost',
  title: 'Күдікті посылка: Жалған SMS хабарлама',
  category: 'phishing',
  difficulty: 'easy',
  age_mode: 'all',
  description: 'Сізге бейтаныс нөмірден сәлемдеме туралы хабарлама келді. Сілтемені тексеріп, қауіпсіз шешім қабылдаңыз.',
  estimated_time: 4,
  xp_reward: 100,
};

const defaultActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'scan',
    title_kk: 'Lens: "kazpost-track.kz" сілтемесі тексерілді',
    title_ru: 'Lens: проверена ссылка "kazpost-track.kz"',
    timestamp: '15 минут бұрын',
    score_delta: +5,
    risk_level: 'HIGH',
  },
  {
    id: 'act-2',
    type: 'training',
    title_kk: '"Telegram жалған ұтысы" миссиясы өтті',
    title_ru: 'Пройдена миссия "Фейк розыгрыш в Telegram"',
    timestamp: '2 сағат бұрын',
    score_delta: +12,
  },
  {
    id: 'act-3',
    type: 'streak',
    title_kk: 'Күнделікті 4 күндік страйк сақталды',
    title_ru: 'Удержан ежедневный 4-дневный страйк',
    timestamp: 'Бүгін, 09:30',
    score_delta: +3,
  },
  {
    id: 'act-4',
    type: 'threat_alert',
    title_kk: 'Астана бойынша жедел қауіп сигналы қабылданды',
    title_ru: 'Получен сигнал оперативной угрозы по Астане',
    timestamp: 'Кеше, 18:40',
  },
];

const defaultMilestones: SkillJourneyMilestone[] = [
  {
    id: 1,
    slug: 'phishing',
    name_kk: 'Фишинг қалқаны',
    name_ru: 'Щит от фишинга',
    status: 'completed',
    xp_required: 100,
    reward_xp: 150,
    level: 4,
    icon: 'fish',
  },
  {
    id: 2,
    slug: 'account_security',
    name_kk: 'Күшті құпиясөздер',
    name_ru: 'Крепкие пароли',
    status: 'completed',
    xp_required: 250,
    reward_xp: 200,
    level: 5,
    icon: 'key-round',
  },
  {
    id: 3,
    slug: 'scam_detection',
    name_kk: 'Алаяқ детективы',
    name_ru: 'Детектив обмана',
    status: 'current',
    xp_required: 500,
    reward_xp: 250,
    level: 3,
    icon: 'scan-eye',
  },
  {
    id: 4,
    slug: 'bullying_response',
    name_kk: 'Кибер-қорғаушы',
    name_ru: 'Кибер-защитник',
    status: 'locked',
    xp_required: 800,
    reward_xp: 300,
    level: 4,
    icon: 'heart-handshake',
  },
  {
    id: 5,
    slug: 'privacy',
    name_kk: 'Көрінбейтін қалқан',
    name_ru: 'Щит-невидимка',
    status: 'locked',
    xp_required: 1200,
    reward_xp: 400,
    level: 2,
    icon: 'eye-off',
  },
];

export function useDashboardData() {
  const [score] = useState<number>(780);
  const [scoreChange] = useState<ScoreChange>({
    delta: 18,
    period: 'week',
    direction: 'up',
  });
  const [skills] = useState<Skill[]>(defaultSkills);
  const [threats] = useState<Threat[]>(defaultThreats);
  const [todayMission] = useState<Scenario>(defaultMission);
  const [streak] = useState({ days: 4, activeToday: true });
  const [level] = useState({
    number: 3,
    title_kk: 'Қорғаушы',
    title_ru: 'Защитник',
    next_level_xp: 750,
  });
  const [xp] = useState({ current: 620, next_level_xp: 750, progress_percent: 82 });
  const [recentActivities] = useState<ActivityItem[]>(defaultActivities);
  const [skillJourney] = useState<SkillJourneyMilestone[]>(defaultMilestones);

  return {
    score,
    scoreChange,
    skills,
    threats,
    todayMission,
    streak,
    level,
    xp,
    recentActivities,
    skillJourney,
  };
}
