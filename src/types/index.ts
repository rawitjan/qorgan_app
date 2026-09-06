export type AgeGroup = '13_15' | '16_24' | '25_44' | '45_plus';
export type UiMode = 'junior' | 'standard';
export type Locale = 'kk' | 'ru';

export type User = {
  id: number;
  name: string;
  email: string;
  age_group: AgeGroup;
  ui_mode: UiMode;
  locale: Locale;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type SkillSlug =
  | 'phishing'
  | 'scam_detection'
  | 'social_engineering'
  | 'privacy'
  | 'account_security'
  | 'bullying_response'
  | 'threat_awareness'
  | 'legal_literacy'
  | 'consumer_rights';

export type Skill = {
  id: number;
  slug: SkillSlug;
  name_kk: string;
  name_ru: string;
  description_kk?: string;
  description_ru?: string;
  icon: string;
  score: number; // 0-100
  level: number; // 1-5
  category?: string;
};

export type ThreatSeverity = 'low' | 'moderate' | 'high' | 'critical';

export type Threat = {
  id: number;
  title: string;
  category: string;
  severity: ThreatSeverity;
  region: string | null;
  description: string;
  starts_at?: string;
  ends_at?: string | null;
  status: 'active' | 'resolved' | 'archived';
};

export type LensInputType = 'text' | 'url' | 'image' | 'screenshot' | 'qr';

export type LensStatus =
  | 'pending'
  | 'extracting'
  | 'checking'
  | 'analyzing'
  | 'scoring'
  | 'completed'
  | 'failed';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type LensFinding = {
  id: number;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence?: number | null;
  title: string;
  description: string;
  evidence?: string | null;
  source: 'ai' | 'heuristic' | 'threat_intelligence' | 'system';
  metadata?: Record<string, unknown>;
};

export type OfficialLegalResource = {
  name: string;
  contact: string;
  type: string;
  description: string;
  url?: string | null;
  is_emergency: boolean;
};

export type LegalRecommendation = {
  title: string;
  situation_explanation: string;
  document_explanation?: string;
  important_points: string[];
  recommended_steps: string[];
  official_resources: OfficialLegalResource[];
  disclaimer: string;
};

export type LensScan = {
  id: number;
  input_type: LensInputType;
  category?: string | null;
  subcategory?: string | null;
  status: LensStatus;
  risk_score?: number | null; // 0-100
  risk_level?: RiskLevel | null;
  summary?: string | null;
  recommendation?: string | null;
  legal_recommendation?: LegalRecommendation | null;
  findings?: LensFinding[];
  signals?: Array<{
    id: number;
    signal_code: string;
    title: string;
    category: string;
    weight: number;
    source: string;
    evidence?: string | null;
    metadata?: Record<string, unknown>;
  }>;
  input?: {
    input_type: LensInputType;
    extracted_urls?: string[] | null;
    original_filename?: string | null;
    mime_type?: string | null;
    file_size?: number | null;
    metadata?: Record<string, unknown> | null;
  };
  started_at?: string | null;
  completed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type ScenarioDifficulty = 'easy' | 'medium' | 'hard';

export type Scenario = {
  id: number;
  slug: string;
  title: string;
  category: string;
  difficulty: ScenarioDifficulty;
  age_mode: 'junior' | 'all' | 'adult';
  description: string;
  estimated_time: number; // minutes
  xp_reward: number;
};

export type Achievement = {
  id: number;
  code: string;
  name_kk: string;
  name_ru: string;
  description_kk: string;
  description_ru: string;
  icon: string;
  xp_bonus: number;
  unlocked_at?: string | null;
};

export type QorganScoreData = {
  value: number; // 0-1000
  rating: string;
  rating_ru: string;
  updated_at?: string;
};

export type DashboardData = {
  user: User;
  score: QorganScoreData;
  skills: Skill[];
  recommended_training: Scenario[];
  current_threats: Threat[];
  streak: {
    days: number;
    active_today: boolean;
  };
  level: {
    number: number;
    title_kk: string;
    title_ru: string;
    next_level_xp: number;
  };
  xp: {
    current: number;
    progress_percent: number;
  };
  achievements: {
    unlocked_count: number;
    total_count: number;
    badges: Achievement[];
  };
};

export type SafeAnalysisResult = {
  has_bullying_signs: boolean;
  confidence: number;
  detected_categories: string[];
  explanation: string;
  is_emergency: boolean;
  emergency_contacts?: Array<{
    title: string;
    phone: string;
    description: string;
  }>;
};

export type ScoreChange = {
  delta: number;
  period: 'week' | 'month';
  direction: 'up' | 'down' | 'same';
};

export type ActivityItem = {
  id: string | number;
  type: 'scan' | 'training' | 'streak' | 'threat_alert';
  title_kk: string;
  title_ru: string;
  timestamp: string;
  score_delta?: number;
  risk_level?: RiskLevel;
  icon?: string;
};

export type LensScanStage =
  | 'idle'
  | 'preparing'
  | 'extracting'
  | 'checking'
  | 'analyzing'
  | 'scoring'
  | 'completed'
  | 'failed';

export type LensFailureReason =
  | 'ai_unavailable'
  | 'provider_unavailable'
  | 'scan_failed'
  | 'network_error'
  | 'invalid_input';

export type LensTechnicalDetails = {
  target: string;
  resolved_ip?: string;
  registered_region?: string;
  ssl_certified?: boolean;
  whois_registrar?: string;
  sha256_hash: string;
  heuristic_signals: string[];
  execution_duration_ms: number;
};

export type LensScanHistoryItem = {
  id: string | number;
  input_type: LensInputType;
  payload_preview: string;
  risk_score: number; // 0-100
  risk_level: RiskLevel;
  summary_kk: string;
  summary_ru: string;
  created_at: string;
  findings_count: number;
  category: string;
};

// --- SIMULATION & TRAINING TYPES ---

export type SimulationType = 'messenger' | 'marketplace' | 'bank_notification' | 'legal_situation';

export type SimulationMessageSender = 'attacker' | 'system' | 'victim' | 'bot' | 'user' | 'assistant';

export interface SimulationMessage {
  id: string;
  sender: SimulationMessageSender;
  sender_name_kk: string;
  sender_name_ru: string;
  sender_avatar?: string;
  text_kk: string;
  text_ru: string;
  timestamp: string;
  attachment?: {
    type: 'link' | 'image' | 'file' | 'audio';
    url: string;
    title: string;
    subtitle?: string;
  };
}

export interface SimulationDecisionOption {
  id: string;
  label_kk: string;
  label_ru: string;
  is_correct: boolean;
  explanation_kk: string;
  explanation_ru: string;
  impact_skill: SkillSlug;
  score_delta: number;
}

export interface SimulationStep {
  step_number: number;
  type: 'dialogue' | 'decision' | 'ai_conversation' | 'inspection';
  scenario_context_kk: string;
  scenario_context_ru: string;
  messages: SimulationMessage[];
  options?: SimulationDecisionOption[];
  allow_free_input?: boolean;
}

export interface ScenarioSimulation {
  id: number;
  scenario_id: number;
  type: SimulationType;
  platform_name_kk: string;
  platform_name_ru: string;
  opponent_name: string;
  opponent_handle?: string;
  opponent_avatar?: string;
  initial_warning_kk?: string;
  initial_warning_ru?: string;
  steps: SimulationStep[];
}

export interface ScenarioResultData {
  scenario_id: number;
  scenario_title_kk: string;
  scenario_title_ru: string;
  score: number; // 0-100
  is_passed: boolean;
  xp_earned: number;
  correct_decisions: Array<{
    title_kk: string;
    title_ru: string;
    reason_kk: string;
    reason_ru: string;
  }>;
  mistakes: Array<{
    title_kk: string;
    title_ru: string;
    correction_kk: string;
    correction_ru: string;
  }>;
  skill_changes: Array<{
    skill_slug: SkillSlug;
    name_kk: string;
    name_ru: string;
    delta: number;
  }>;
}

// --- THREAT PULSE DETAIL TYPES ---

export interface ThreatDetail extends Threat {
  impact_level: 'critical' | 'high' | 'moderate';
  targeted_entities: string[];
  iocs: string[];
  indicators_description_kk: string;
  indicators_description_ru: string;
  countermeasures_kk: string[];
  countermeasures_ru: string[];
  official_source: string;
  verified_date: string;
}

// --- ORGANIZATION TYPES ---

export type OrgRole = 'admin' | 'manager' | 'coordinator';

export interface OrgMember {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'employee' | 'member';
  group_name: string;
  qorgan_score: number;
  risk_level: RiskLevel;
  assignments_completed: number;
  total_assignments: number;
  last_active: string;
}

export interface OrgGroup {
  id: string;
  name: string;
  member_count: number;
  avg_score: number;
  completion_rate: number;
  dominant_vulnerability: string;
}

export interface OrgAssignment {
  id: string;
  title_kk: string;
  title_ru: string;
  scenario_id: number;
  target_groups: string[];
  due_date: string;
  total_assigned: number;
  completed_count: number;
  status: 'active' | 'completed' | 'overdue';
}

export interface OrgAnalytics {
  total_participants: number;
  avg_score: number;
  active_assignments_count: number;
  risk_distribution: {
    low: number;
    moderate: number;
    high: number;
    critical: number;
  };
  skill_averages: Array<{
    slug: SkillSlug;
    name_kk: string;
    name_ru: string;
    score: number;
  }>;
  before_after: {
    before_score: number;
    after_score: number;
    improvement_pct: number;
    detection_rate_before: number;
    detection_rate_after: number;
  };
}
