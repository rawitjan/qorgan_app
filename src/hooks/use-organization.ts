'use client';

import { useState } from 'react';
import {
  OrgMember,
  OrgGroup,
  OrgAssignment,
  OrgAnalytics,
} from '@/types';

export const initialMembers: OrgMember[] = [
  {
    id: 'm-1',
    name: 'Айзере Мұратқызы',
    email: 'aizere.m@school48.edu.kz',
    role: 'student',
    group_name: '9-А сыныбы',
    qorgan_score: 840,
    risk_level: 'LOW',
    assignments_completed: 3,
    total_assignments: 3,
    last_active: '12 мин бұрын',
  },
  {
    id: 'm-2',
    name: 'Диас Серікұлы',
    email: 'dias.s@school48.edu.kz',
    role: 'student',
    group_name: '9-А сыныбы',
    qorgan_score: 520,
    risk_level: 'HIGH',
    assignments_completed: 1,
    total_assignments: 3,
    last_active: '2 сағат бұрын',
  },
  {
    id: 'm-3',
    name: 'Мадина Әлішерқызы',
    email: 'madina.a@school48.edu.kz',
    role: 'student',
    group_name: '9-Б сыныбы',
    qorgan_score: 710,
    risk_level: 'MODERATE',
    assignments_completed: 2,
    total_assignments: 3,
    last_active: 'Кеше',
  },
  {
    id: 'm-4',
    name: 'Әлихан Болатұлы',
    email: 'alikhan.b@school48.edu.kz',
    role: 'student',
    group_name: '10-А сыныбы',
    qorgan_score: 890,
    risk_level: 'LOW',
    assignments_completed: 3,
    total_assignments: 3,
    last_active: 'Бүгін, 10:15',
  },
  {
    id: 'm-5',
    name: 'Гүлнәр Сейітқызы',
    email: 'gulnar.s@school48.edu.kz',
    role: 'employee',
    group_name: 'Педагогтар',
    qorgan_score: 760,
    risk_level: 'LOW',
    assignments_completed: 3,
    total_assignments: 3,
    last_active: 'Бүгін, 09:00',
  },
];

export const initialGroups: OrgGroup[] = [
  {
    id: 'g-1',
    name: '9-А сыныбы',
    member_count: 28,
    avg_score: 720,
    completion_rate: 85,
    dominant_vulnerability: 'Фишингтік сілтемелер (Phishing)',
  },
  {
    id: 'g-2',
    name: '9-Б сыныбы',
    member_count: 26,
    avg_score: 685,
    completion_rate: 78,
    dominant_vulnerability: 'Құпиясөз гигиенасы (Password Hygiene)',
  },
  {
    id: 'g-3',
    name: '10-А сыныбы',
    member_count: 30,
    avg_score: 790,
    completion_rate: 92,
    dominant_vulnerability: 'Әлеуметтік инженерия (Social Engineering)',
  },
  {
    id: 'g-4',
    name: '11-А сыныбы',
    member_count: 32,
    avg_score: 815,
    completion_rate: 96,
    dominant_vulnerability: 'Құқықтық сауаттылық (Legal Literacy)',
  },
  {
    id: 'g-5',
    name: 'Педагогикалық ұжым',
    member_count: 32,
    avg_score: 740,
    completion_rate: 88,
    dominant_vulnerability: 'Банк қоңыраулары мен SMS (Vishing)',
  },
];

export const initialAssignments: OrgAssignment[] = [
  {
    id: 'a-1',
    title_kk: 'Kazpost және курьерлік фишингтен қорғану',
    title_ru: 'Защита от почтового и курьерского фишинга',
    scenario_id: 1,
    target_groups: ['9-А сыныбы', '9-Б сыныбы'],
    due_date: '10 қыркүйек 2026',
    total_assigned: 54,
    completed_count: 48,
    status: 'active',
  },
  {
    id: 'a-2',
    title_kk: 'Сынып чатындағы кибербуллингке төтеп беру',
    title_ru: 'Противодействие кибербуллингу в школьных чатах',
    scenario_id: 5,
    target_groups: ['Барлық сыныптар'],
    due_date: '15 қыркүйек 2026',
    total_assigned: 116,
    completed_count: 74,
    status: 'active',
  },
  {
    id: 'a-3',
    title_kk: 'Банк қауіпсіздігі және 2FA орнату',
    title_ru: 'Безопасность банковских приложений и 2FA',
    scenario_id: 4,
    target_groups: ['10-А сыныбы', '11-А сыныбы', 'Педагогтар'],
    due_date: '18 қыркүйек 2026',
    total_assigned: 94,
    completed_count: 86,
    status: 'active',
  },
];

export const initialAnalytics: OrgAnalytics = {
  total_participants: 148,
  avg_score: 742,
  active_assignments_count: 3,
  risk_distribution: {
    low: 94,
    moderate: 38,
    high: 16,
    critical: 0,
  },
  skill_averages: [
    { slug: 'phishing', name_kk: 'Фишингтен қорғану', name_ru: 'Защита от фишинга', score: 76 },
    { slug: 'account_security', name_kk: 'Аккаунт қауіпсіздігі', name_ru: 'Безопасность аккаунтов', score: 82 },
    { slug: 'scam_detection', name_kk: 'Алаяқтықты тану', name_ru: 'Определение обмана', score: 74 },
    { slug: 'social_engineering', name_kk: 'Әлеуметтік инженерия', name_ru: 'Соц. инженерия', score: 68 },
    { slug: 'bullying_response', name_kk: 'Буллингке жауап', name_ru: 'Ответ на буллинг', score: 79 },
    { slug: 'privacy', name_kk: 'Құпиялылық', name_ru: 'Конфиденциальность', score: 70 },
  ],
  before_after: {
    before_score: 615,
    after_score: 782,
    improvement_pct: 27,
    detection_rate_before: 42,
    detection_rate_after: 88,
  },
};

export function useOrganization() {
  const [orgName] = useState('№48 IT Мектеп-Лицейі (Астана)');
  const [currentTab, setCurrentTab] = useState<
    'overview' | 'members' | 'groups' | 'assignments' | 'analytics'
  >('overview');
  const [members] = useState<OrgMember[]>(initialMembers);
  const [groups] = useState<OrgGroup[]>(initialGroups);
  const [assignments] = useState<OrgAssignment[]>(initialAssignments);
  const [analytics] = useState<OrgAnalytics>(initialAnalytics);
  const [selectedMember, setSelectedMember] = useState<OrgMember | null>(null);

  return {
    orgName,
    currentTab,
    setCurrentTab,
    members,
    groups,
    assignments,
    analytics,
    selectedMember,
    setSelectedMember,
  };
}
