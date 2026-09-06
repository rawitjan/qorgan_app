import React from 'react';
import * as TablerIcons from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export type IconName = keyof typeof TablerIcons;

export function QorganIcon({
  name,
  className,
  size = 20,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  // Convert kebab-case or snake_case to PascalCase
  const pascalName = name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');

  // Tabler icons are prefixed with 'Icon' (e.g., IconShield, IconAlertTriangle)
  const tablerKey = pascalName.startsWith('Icon') ? pascalName : `Icon${pascalName}`;

  const IconComponent = ((TablerIcons as Record<string, unknown>)[tablerKey] ||
    (TablerIcons as Record<string, unknown>)[pascalName]) as
    | React.ComponentType<{ size?: number; className?: string; stroke?: number }>
    | undefined;

  if (!IconComponent) {
    return <TablerIcons.IconShield size={size} className={cn('shrink-0', className)} />;
  }

  return <IconComponent size={size} className={cn('shrink-0', className)} />;
}
