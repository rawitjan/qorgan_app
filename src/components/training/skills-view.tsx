'use client';

import React, { useState } from 'react';
import {
  IconArrowLeft,
  IconShield,
  IconBrain,
  IconLock,
  IconScale,
  IconRadar,
  IconFish,
  IconScanEye,
  IconUsers,
  IconHeartHandshake,
  IconEyeOff,
  IconShoppingBag,
} from '@tabler/icons-react';
import { Skill, SkillSlug } from '@/types';
import { SkillProgress } from '@/components/qorgan/skill-progress';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function SkillsView({
  skills,
  onBack,
  className,
}: {
  skills: Skill[];
  onBack: () => void;
  className?: string;
}) {
  const { locale } = useMode();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label_kk: 'Барлығы', label_ru: 'Все' },
    { id: 'Киберқауіпсіздік', label_kk: 'Киберқауіпсіздік', label_ru: 'Кибербезопасность' },
    { id: 'Психология', label_kk: 'Психология', label_ru: 'Психология' },
    { id: 'Техникалық', label_kk: 'Техникалық', label_ru: 'Технические' },
    { id: 'Заңнама', label_kk: 'Заңнама', label_ru: 'Правовые' },
  ];

  const filteredSkills = skills.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className={cn('flex flex-col gap-5 w-full animate-in fade-in-50 duration-200', className)}>
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="touch-target flex h-9 w-9 items-center justify-center rounded-xl bg-surface border border-border text-foreground hover:bg-surface-raised transition-colors"
          aria-label="Back"
        >
          <IconArrowLeft size={18} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-base font-bold text-foreground">
            {locale === 'kk' ? '9 Қауіпсіздік дағдысы' : '9 Навыков безопасности'}
          </h2>
          <p className="text-[11px] text-muted-foreground">
            {locale === 'kk'
              ? 'Жеке цифрлық қорғанысыңыздың толық құрылымы'
              : 'Архитектура вашей персональной цифровой защиты'}
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              'touch-target shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
              selectedCategory === cat.id
                ? 'bg-primary text-primary-foreground font-bold'
                : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {locale === 'kk' ? cat.label_kk : cat.label_ru}
          </button>
        ))}
      </div>

      {/* Skills List */}
      <div className="flex flex-col gap-2.5">
        {filteredSkills.map((skill) => (
          <SkillProgress key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
