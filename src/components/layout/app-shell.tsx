'use client';

import React, { useState } from 'react';
import { MobileHeader } from '@/components/layout/mobile-header';
import { DesktopHeader, DemoAccount } from '@/components/layout/desktop-header';
import { BottomNavigation, NavTabId } from '@/components/layout/bottom-navigation';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function AppShell({
  children,
  activeTab = 'dashboard',
  onTabChange,
  streakDays = 4,
  workspace = 'personal',
  onToggleWorkspace,
  onSelectDemoAccount,
  className,
}: {
  children: React.ReactNode;
  activeTab?: NavTabId;
  onTabChange?: (tab: NavTabId) => void;
  streakDays?: number;
  workspace?: 'personal' | 'organization';
  onToggleWorkspace?: () => void;
  onSelectDemoAccount?: (account: DemoAccount) => void;
  className?: string;
}) {
  const { mode } = useMode();
  const [localTab, setLocalTab] = useState<NavTabId>(activeTab);
  const currentTab = activeTab ?? localTab;

  const handleTabChange = (tab: NavTabId) => {
    setLocalTab(tab);
    onTabChange?.(tab);
  };

  const isOrg = workspace === 'organization';

  return (
    <div className="app-canvas min-h-screen w-full bg-background text-foreground antialiased">
      {/* Responsive Shell: Mobile Ergonomics + First-Class Desktop Experience */}
      <div
        className={cn(
          'w-full max-w-md md:max-w-6xl xl:max-w-[1280px] min-h-screen mx-auto flex flex-col relative bg-background md:my-6 md:min-h-[calc(100vh-3rem)] md:rounded-[32px] md:overflow-hidden md:shadow-[0_28px_90px_-42px_rgba(35,85,140,0.5)] transition-all duration-200',
          mode === 'junior' && 'theme-junior',
          className
        )}
      >
        {/* Desktop Responsive Navigation Header (>= 768px) */}
        <DesktopHeader
          activeTab={currentTab}
          onTabChange={handleTabChange}
          streakDays={streakDays}
          workspace={workspace}
          onToggleWorkspace={onToggleWorkspace}
          onSelectDemoAccount={onSelectDemoAccount}
        />

        {/* Mobile Sticky Header (< 768px) */}
        <div className="block md:hidden">
          <MobileHeader
            streakDays={streakDays}
            workspace={workspace}
            onToggleWorkspace={onToggleWorkspace}
          />
        </div>

        {/* Scrollable Responsive Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 xl:px-10 py-5 md:py-8 pb-28 md:pb-12">
          {children}
        </main>

        {/* Fixed Mobile Bottom Navigation (< 768px) */}
        {!isOrg && (
          <div className="block md:hidden">
            <BottomNavigation
              activeTab={currentTab}
              onTabChange={handleTabChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
