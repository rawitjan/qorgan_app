import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RiskLevel, ThreatSeverity } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RiskMeta = {
  level: RiskLevel;
  label_kk: string;
  label_ru: string;
  badgeClass: string;
  borderClass: string;
  textClass: string;
  bgClass: string;
  glowClass: string;
  icon: 'check-circle' | 'alert-triangle' | 'shield-alert' | 'alert-octagon';
};

export function getRiskMeta(level?: RiskLevel | null): RiskMeta {
  switch (level) {
    case 'CRITICAL':
      return {
        level: 'CRITICAL',
        label_kk: 'АСА ҚАУІПТІ',
        label_ru: 'КРИТИЧЕСКИЙ РИСК',
        badgeClass: 'bg-red-50 text-red-700 border-red-200',
        borderClass: 'border-red-200',
        textClass: 'text-red-700',
        bgClass: 'bg-red-50',
        glowClass: 'shadow-sm',
        icon: 'alert-octagon',
      };
    case 'HIGH':
      return {
        level: 'HIGH',
        label_kk: 'ҚАУІП ЖОҒАРЫ',
        label_ru: 'ВЫСОКИЙ РИСК',
        badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
        borderClass: 'border-orange-200',
        textClass: 'text-orange-700',
        bgClass: 'bg-orange-50',
        glowClass: 'shadow-sm',
        icon: 'shield-alert',
      };
    case 'MODERATE':
      return {
        level: 'MODERATE',
        label_kk: 'КҮДІКТІ',
        label_ru: 'УМЕРЕННЫЙ РИСК',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
        borderClass: 'border-amber-200',
        textClass: 'text-amber-700',
        bgClass: 'bg-amber-50',
        glowClass: 'shadow-sm',
        icon: 'alert-triangle',
      };
    case 'LOW':
    default:
      return {
        level: 'LOW',
        label_kk: 'ҚАУІПСІЗ',
        label_ru: 'НИЗКИЙ РИСК',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        borderClass: 'border-emerald-200',
        textClass: 'text-emerald-700',
        bgClass: 'bg-emerald-50',
        glowClass: 'shadow-sm',
        icon: 'check-circle',
      };
  }
}

export function severityToRiskLevel(severity: ThreatSeverity): RiskLevel {
  switch (severity) {
    case 'critical':
      return 'CRITICAL';
    case 'high':
      return 'HIGH';
    case 'moderate':
      return 'MODERATE';
    case 'low':
    default:
      return 'LOW';
  }
}

export type ScoreTierMeta = {
  tier: 'vulnerable' | 'developing' | 'guardian' | 'apex';
  label_kk: string;
  label_ru: string;
  colorClass: string;
  shieldBorder: string;
};

export function getScoreTier(score: number): ScoreTierMeta {
  if (score >= 900) {
    return {
      tier: 'apex',
      label_kk: 'Киберсақшы (Апекс)',
      label_ru: 'Киберстраж (Апекс)',
      colorClass: 'text-primary',
      shieldBorder: 'border-primary/20',
    };
  }
  if (score >= 700) {
    return {
      tier: 'guardian',
      label_kk: 'Қорғаныс мықты',
      label_ru: 'Надёжная защита',
      colorClass: 'text-primary',
      shieldBorder: 'border-primary/20',
    };
  }
  if (score >= 400) {
    return {
      tier: 'developing',
      label_kk: 'Даму деңгейінде',
      label_ru: 'Базовый уровень',
      colorClass: 'text-sky-700',
      shieldBorder: 'border-sky-200',
    };
  }
  return {
    tier: 'vulnerable',
    label_kk: 'Назар аудару керек',
    label_ru: 'Требует внимания',
    colorClass: 'text-amber-700',
    shieldBorder: 'border-amber-200',
  };
}
