'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { NavTabId } from '@/components/layout/bottom-navigation';
import { StandardDashboard } from '@/components/dashboard/standard-dashboard';
import { JuniorDashboard } from '@/components/dashboard/junior-dashboard';
import { LensScanner } from '@/components/qorgan/lens-scanner';
import { LensResultStandard } from '@/components/qorgan/lens-result-standard';
import { LensResultJunior } from '@/components/qorgan/lens-result-junior';
import { LensHistory } from '@/components/qorgan/lens-history';
import { useLensScanner } from '@/hooks/use-lens-scanner';
import { TrainingModule } from '@/components/training/training-home';
import { ThreatPulseModule } from '@/components/pulse/threat-pulse-view';
import { ProfileView } from '@/components/profile/profile-view';
import { OrganizationWorkspace } from '@/components/organization/organization-workspace';
import { EmergencyAlert } from '@/components/qorgan/emergency-alert';
import { useMode } from '@/context/mode-context';
import { Button } from '@/components/ui/button';
import { IconHistory, IconScan, IconLifebuoy, IconUser } from '@tabler/icons-react';
import { selectDemoAccountForApi } from '@/lib/api';

export default function Home() {
  const { mode, locale } = useMode();
  const [workspace, setWorkspace] = useState<'personal' | 'organization'>('personal');
  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [profileOrHelpSubTab, setProfileOrHelpSubTab] = useState<'profile' | 'hotlines'>('profile');

  // Centralized QORGAN Lens Engine
  const {
    inputType,
    setInputType,
    inputPayload,
    setInputPayload,
    filePreview,
    handleFileUpload,
    stage,
    failureReason,
    activeScan,
    technicalDetails,
    history,
    viewMode,
    setViewMode,
    startScan,
    resetScanner,
    selectHistoryScan,
    clearHistory,
  } = useLensScanner();

  const isJunior = mode === 'junior';

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      streakDays={4}
      workspace={workspace}
      onToggleWorkspace={() =>
        setWorkspace(workspace === 'personal' ? 'organization' : 'personal')
      }
      onSelectDemoAccount={(acc) => {
        selectDemoAccountForApi(acc.email);
        if (acc.id === 'manager' || acc.id === 'admin') {
          setWorkspace('organization');
        } else {
          setWorkspace('personal');
          setActiveTab('dashboard');
        }
      }}
    >
      {/* A. ORGANIZATION WORKSPACE (Dedicated Responsive Manager Workspace) */}
      {workspace === 'organization' ? (
        <OrganizationWorkspace onExitToPersonal={() => setWorkspace('personal')} />
      ) : (
        /* B. PERSONAL GUARDIAN WORKSPACE */
        <>
          {/* 1. DASHBOARD TAB VIEW (Dual-Presentation: Standard vs Junior) */}
          {activeTab === 'dashboard' && (
            <>
              {isJunior ? (
                <JuniorDashboard
                  onNavigateToLens={() => setActiveTab('lens')}
                  onStartMission={() => setActiveTab('training')}
                />
              ) : (
                <StandardDashboard
                  onNavigateToLens={() => setActiveTab('lens')}
                  onNavigateToPulse={() => setActiveTab('pulse')}
                  onStartMission={() => setActiveTab('training')}
                />
              )}
            </>
          )}

          {/* 2. LENS TAB VIEW (Progressive Scanner, Standard / Junior Results, History, Fallback States) */}
          {activeTab === 'lens' && (
            <div className="flex flex-col gap-5">
              {/* Title with History Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-primary">{locale === 'kk' ? 'Қауіпсіздік сканері' : 'Сканер безопасности'}</span>
                  <h2 className="mt-0.5 text-3xl font-bold tracking-[-0.04em] text-foreground">QORGAN Lens</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {locale === 'kk'
                      ? 'Сілтемелерді, мәтіндерді және суреттерді тексеру'
                      : 'Проверка ссылок, текстов, фото и QR на киберугрозы'}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'history' ? 'scanner' : 'history')}
                  className="h-10 px-3.5 text-xs gap-1.5 border-border rounded-2xl"
                >
                  {viewMode === 'history' ? (
                    <>
                      <IconScan size={14} />
                      <span>{locale === 'kk' ? 'Сканер' : 'Сканер'}</span>
                    </>
                  ) : (
                    <>
                      <IconHistory size={14} />
                      <span>{locale === 'kk' ? 'Тарих' : 'История'}</span>
                      {history.length > 0 && (
                        <span className="ml-0.5 px-1 py-0.2 rounded-full bg-primary/20 text-primary text-[10px] font-mono font-bold">
                          {history.length}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </div>

              {/* Sub-view: History */}
              {viewMode === 'history' ? (
                <LensHistory
                  history={history}
                  onSelectScan={(item) => {
                    selectHistoryScan(item);
                  }}
                  onClearHistory={clearHistory}
                  onClose={() => setViewMode('scanner')}
                />
              ) : activeScan && stage === 'completed' ? (
                /* Sub-view: Result (Standard or Junior) */
                isJunior ? (
                  <LensResultJunior
                    scan={activeScan}
                    onReset={resetScanner}
                    onStartTraining={() => setActiveTab('training')}
                  />
                ) : (
                  <LensResultStandard
                    scan={activeScan}
                    technicalDetails={technicalDetails}
                    onReset={resetScanner}
                    onStartTraining={() => setActiveTab('training')}
                  />
                )
              ) : (
                /* Sub-view: Multi-modal Input & Progressive 5-Stage Tracker */
                <LensScanner
                  stage={stage}
                  inputType={inputType}
                  inputPayload={inputPayload}
                  filePreview={filePreview}
                  failureReason={failureReason}
                  onSelectType={setInputType}
                  onPayloadChange={setInputPayload}
                  onFileUpload={handleFileUpload}
                  onScan={(type, payload, forceError) => startScan(type, payload, forceError)}
                  onRetry={() => startScan(inputType, inputPayload)}
                  onOpenHistory={() => setViewMode('history')}
                />
              )}
            </div>
          )}

          {/* 3. TRAINING / MISSIONS TAB VIEW (Full Simulation Suite: Home, Details, Player, Result, Skills, Achievements) */}
          {activeTab === 'training' && <TrainingModule />}

          {/* 4. THREAT PULSE TAB VIEW (Live regional threats, filters, detailed IOC & countermeasure drawer) */}
          {activeTab === 'pulse' && <ThreatPulseModule />}

          {/* 5. PROFILE & SETTINGS / HELP TAB VIEW */}
          {activeTab === 'help' && (
            <div className="flex flex-col gap-4">
              {/* Sub-tab Navigation: Profile & Settings vs Emergency Hotlines */}
              <div className="grid grid-cols-2 gap-1 p-1.5 rounded-[20px] bg-surface-raised select-none">
                <button
                  onClick={() => setProfileOrHelpSubTab('profile')}
                  className={`touch-target flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-colors ${
                    profileOrHelpSubTab === 'profile'
                      ? 'bg-surface text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <IconUser size={15} />
                  <span>{locale === 'kk' ? 'Профиль және Баптау' : 'Профиль и настройки'}</span>
                </button>

                <button
                  onClick={() => setProfileOrHelpSubTab('hotlines')}
                  className={`touch-target flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-colors ${
                    profileOrHelpSubTab === 'hotlines'
                      ? 'bg-surface text-red-500 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <IconLifebuoy size={15} />
                  <span>{locale === 'kk' ? 'Шұғыл көмек 111' : 'Экстренная помощь'}</span>
                </button>
              </div>

              {profileOrHelpSubTab === 'profile' ? (
                <ProfileView
                  onDeleteLensHistory={clearHistory}
                  onNavigateToSkills={() => setActiveTab('training')}
                  onNavigateToAchievements={() => setActiveTab('training')}
                />
              ) : (
                <div className="flex flex-col gap-4 animate-in fade-in-50 duration-150">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold text-foreground">
                      {locale === 'kk' ? 'Көмек және сенім желілері' : 'Помощь и горячие линии'}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {locale === 'kk'
                        ? 'Психологиялық қолдау, құқықтық кеңес және шұғыл қызметтер.'
                        : 'Психологическая помощь, юридические консультации и экстренные службы.'}
                    </p>
                  </div>

                  <EmergencyAlert />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </AppShell>
  );
}
