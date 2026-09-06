# QORGAN DESIGN SYSTEM
*The Source of Truth for all QORGAN Frontend Engineering & Design*

---

## 1. Brand

**QORGAN** (Kazakh: *Қорған* — Fortress, Shield, Guardian) is a **Digital Guardian / Safety OS**.

It is NOT a generic cyber dashboard, and it is emphatically NOT a cliché "AI tool".
We strictly avoid:
- Purple/magenta neon gradients
- Random cosmic glow or bokeh
- Glassmorphism plastered everywhere
- Excessively bubbled or cartoonish cards in security contexts
- Generic corporate SaaS dashboards

### Brand Personality
- **Safe (Қауіпсіз / Безопасный)**: Provides an immediate sense of protection, structure, and calm authority.
- **Smart (Ақылды / Интеллектуальный)**: Analyzes threats with surgical precision without overwhelming the user with raw data.
- **Human (Жанашыр / Человечный)**: Empathetic, supportive, reassuring, especially in crisis or bullying situations.
- **Modern (Заманауи / Современный)**: High-craft, clean, fluid, native-feeling mobile experience.
- **Kazakhstan-Oriented (Қазақстанға бейімделген)**: First-class Kazakh (`kk`) and Russian (`ru`) typography, regional threat intelligence (Kazpost, OLX, Kaspi, regional phone codes), and integration with national hotlines (`111`, `102`).
- **Trustworthy (Сенімді / Надёжный)**: Absolute transparency. Explains *why* a risk exists rather than simply issuing a verdict.

---

## 2. Product Modes

QORGAN operates under two user modes that share the exact same security engine and core identity, but adapt the tone, density, and interaction layer to the user's developmental context:

### STANDARD MODE (Default for Age 16+)
- **Target**: High school seniors, university students, young adults, parents, and working professionals.
- **Character**: Calm, clean, precise, technical, premium, security-oriented.
- **Visuals**: Sharp borders, subtle shadows, high information density, muted technical surfaces, telemetry-inspired data presentation.
- **Tone**: Professional, clear, direct, non-condescending.

### JUNIOR MODE (Tailored for Age 13–15)
- **Target**: Middle school teenagers navigating online spaces, social networks, gaming communities, and school groups.
- **Character**: Friendly, playful, mission-oriented, visual, encouraging.
- **Critical Principle**: **Junior is NOT for 5-year-olds**. It must never feel infantalizing, babyish, or a copy of Duolingo.
- **Visuals**: Softer radii, tactile feedback, gamification tokens (XP badges, streak flames, level progression, cyber missions), expressive mascot prompts ("Qorgan-Batyr" / cyber guardian owl motif).
- **Tone**: Empowering, engaging, peer-level guidance without lecturing.

---

## 3. Shared Identity

Both modes must be instantly recognizable as **QORGAN**:

| Element | Shared Between Modes | Standard Mode Expression | Junior Mode Expression |
| :--- | :--- | :--- | :--- |
| **Logo** | Geometric QORGAN Shield with central core | Crisp monochrome / emerald accent | Emerald shield with subtle energetic aura |
| **Core Palette** | Deep obsidian, guardian emerald, semantic risks | Restrained, dark-slate background | Slightly warmer obsidian, vibrant accents |
| **Icon Language** | Tabler Icons geometric icons | Precise 1.5px stroke, minimalist | Solid/duotone accents, 2px stroke |
| **Information Architecture** | 5 core tabs (Home, Lens, Training, Pulse, Help) | Technical naming, analytical focus | Mission naming, challenge focus |
| **QORGAN Shield Motif** | Central visual signature of security status | Hexagonal telemetry shield | Vibrant guardian shield with level rank |
| **Corner Radius** | Consistent mathematical scale | Moderate (`8px–12px`) | Softer (`12px–16px`) |
| **Density** | Mobile-first ergonomic touch grid | Compact, structured, tabular | Roomier cards, large action buttons |
| **Gamification** | Underlying XP and level engine | Subtle streak and level badge | Prominent mission cards, XP pops, level title |

---

## 4. Color Tokens

All colors are semantic CSS variables. Never use hardcoded arbitrary hex values in component markup.

### Core Semantic Palette (HSL / CSS Variables)

```css
:root {
  /* Surfaces & Neutral Backgrounds */
  --background: 222 47% 7%;          /* #090d16 Deep Obsidian */
  --foreground: 210 40% 98%;         /* #f8fafc Clean Crisp Text */
  --surface: 222 40% 10%;            /* #0f1623 Base Card Surface */
  --surface-raised: 222 38% 14%;     /* #162032 Elevated Card/Modal */
  --surface-overlay: 222 42% 5%;     /* #06090f Backdrop */

  /* Brand Primary (Guardian Emerald - Symbol of Safety & Life) */
  --primary: 158 64% 45%;            /* #29b87a Emerald Guardian */
  --primary-foreground: 222 47% 7%;  /* Deep obsidian contrast */
  --primary-hover: 158 64% 40%;
  --primary-muted: 158 40% 15%;      /* Subtle emerald tint */

  /* Secondary & Accents (Slate Cyan - Precision & Intelligence) */
  --secondary: 200 30% 20%;          /* #233744 Muted Cyan Slate */
  --secondary-foreground: 200 80% 90%;
  --accent: 174 60% 42%;             /* #2ab8a6 Cyan Accent */
  --accent-foreground: 222 47% 7%;

  /* Muted & Borders */
  --muted: 220 25% 15%;              /* Inactive element background */
  --muted-foreground: 215 20% 65%;   /* Secondary labels, metadata */
  --border: 220 25% 18%;             /* Crisp border lines */
  --border-focus: 158 64% 45%;       /* Active outline */
  --input: 220 25% 14%;              /* Form field fills */
  --ring: 158 64% 45%;

  /* Functional Status */
  --success: 152 69% 43%;            /* Positive / Safe */
  --warning: 38 92% 50%;             /* Attention / Caution */
  --danger: 0 84% 60%;               /* Critical error / Emergency */
  --info: 199 89% 48%;               /* Informational notice */

  /* Semantic Risk Tokens (QORGAN Index) */
  --risk-low: 152 69% 43%;           /* #22c55e (Score 0-24) Safe / Verified */
  --risk-moderate: 45 93% 47%;       /* #eab308 (Score 25-49) Caution / Suspicious */
  --risk-high: 25 95% 53%;           /* #f97316 (Score 50-74) High Risk / Warning */
  --risk-critical: 0 84% 60%;        /* #ef4444 (Score 75-100) Dangerous / Malicious */

  /* Gamification Tokens */
  --xp-gold: 43 96% 56%;             /* #facc15 Level / Experience */
  --streak-fire: 16 100% 50%;        /* #ff4500 Active Daily Streak */
  --shield-rank: 217 91% 60%;        /* #3b82f6 Badge / Tier */
}
```

### Junior Mode Semantic Overrides (`[data-mode="junior"]`)
```css
[data-mode="junior"] {
  --background: 224 45% 9%;          /* Slightly warmer deep navy */
  --surface: 224 40% 12%;            /* Softer card background */
  --surface-raised: 224 36% 17%;
  --primary: 158 72% 48%;            /* More luminous emerald */
  --primary-muted: 158 45% 20%;
  --border: 222 30% 22%;
  --radius: 1rem;                    /* 16px soft curve */
}
```

### Risk Color Usage Constraint
> **Rule**: Risk color is strictly semantic. **Never** flood or paint the entire screen red during HIGH/CRITICAL risk states. Use the risk color as an accent border, badge fill, and indicator icon while maintaining the calm, legible `--surface` background. Panic-inducing UIs cause bad security decisions.

---

## 5. Typography

### Primary Font Stack
- **Interface & Display**: `Inter`, system `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`.
- **Numbers & Telemetry**: Inter with tabular figures (`font-variant-numeric: tabular-nums`).
- **Technical IDs / Codes**: `JetBrains Mono`, `ui-monospace`, `monospace`.

### Type Scale (Mobile-First)

| Token | Size | Line Height | Weight | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `text-display` | `28px` (`1.75rem`) | `1.2` | Bold (`700`) | Main Dashboard Score / Level |
| `text-heading-1` | `22px` (`1.375rem`) | `1.25` | Semibold (`600`) | Screen Titles, Section Headers |
| `text-heading-2` | `18px` (`1.125rem`) | `1.3` | Semibold (`600`) | Card Titles, Modal Headers |
| `text-body` | `15px` (`0.9375rem`) | `1.45` | Regular (`400`) | Descriptions, Recommendations |
| `text-label` | `13px` (`0.8125rem`) | `1.35` | Medium (`500`) | Badges, Tabs, Form Labels |
| `text-caption` | `11px` (`0.6875rem`) | `1.3` | Regular (`400`) | Timestamps, Region Tags, Disclaimers |
| `text-score` | `36px` (`2.25rem`) | `1.0` | Extrabold (`800`) | QORGAN Score Value (0–1000) |

### Language Considerations (Kazakh & Russian)
- Kazakh Cyrillic special glyphs (`Ә, Ғ, Қ, Ң, Ө, Ұ, Ү, Һ, І`) must render flawlessly without font fallback jitter.
- Russian and Kazakh text can expand up to 25–35% compared to English. All buttons, labels, and badges must accommodate multi-line wrapping or graceful auto-truncation without clipping.

---

## 6. Spacing Scale

Strict 4px geometric grid:

| Token | Value | Mobile Usage |
| :--- | :--- | :--- |
| `space-1` | `4px` | Micro gaps, badge icon padding |
| `space-2` | `8px` | Badge internal padding, tight list items |
| `space-3` | `12px` | Card internal content gap, icon-to-text spacing |
| `space-4` | `16px` | Standard card padding, section gap |
| `space-5` | `20px` | Outer screen horizontal padding (`px-5`) |
| `space-6` | `24px` | Screen section breaks |
| `space-8` | `32px` | Hero section bottom margin |

### Touch Target Rule
> **Rule**: All interactive elements (navigation items, buttons, choice chips, close icons) MUST have an effective hit target of at least **`44px × 44px`** (`min-h-[44px] min-w-[44px]`).

---

## 7. Border Radius

- **Standard Mode**:
  - Small elements (Badges, tags): `6px` (`rounded-md`)
  - Inputs & Buttons: `8px` (`rounded-lg`)
  - Cards & Containers: `12px` (`rounded-xl`)
  - Floating sheets / Dialogs: `16px` (`rounded-2xl`)
- **Junior Mode**:
  - Small elements: `8px` (`rounded-lg`)
  - Inputs & Buttons: `12px` (`rounded-xl`)
  - Cards & Containers: `16px` (`rounded-2xl`)
  - Floating sheets / Dialogs: `20px` (`rounded-3xl`)
- **Rule**: Avoid making every single card a full capsule or pill. Circles are reserved strictly for avatars, icon badges, and status dots.

---

## 8. Elevation & Shadows

- **Standard Mode**: Zero heavy shadows. Depth is created via **1px crisp borders** (`border border-border/80`) and layered surface fills (`bg-surface`, `bg-surface-raised`).
- **Junior Mode**: Subtle energetic lift on active interactive cards:
  - `shadow-sm`: `0 2px 8px -2px rgba(0, 0, 0, 0.4)`
  - `shadow-glow-emerald`: `0 0 16px -4px rgba(41, 184, 122, 0.25)` for active streak/badge moments.

---

## 9. Iconography

- **Foundation**: `Tabler Icons` (`@tabler/icons-react`).
- **Wrappers**:
  - `<QorganIcon name="..." size={...} />`: Unified icon caller with consistent sizing and theme inheritance.
  - `<RiskIcon level="..." />`: Semantic wrapper returning the exact certified icon for LOW, MODERATE, HIGH, CRITICAL.
  - `<SkillIcon slug="..." />`: Returns the designated emblem for each of the 9 QORGAN skills.
- **Rule**: Never use random emojis (🚨, ⚠️, 💀, 🛡️) as navigation icons or permanent UI labels in production. Clean vector iconography only.

---

## 10. Core Component Catalog

### Customized shadcn/ui Primitives
1. **Button**: Height 44px (`h-11`), active scale feedback (`active:scale-[0.98]`), primary emerald gradient, secondary slate, destructive alert, junior pill variant, SOS emergency variant.
2. **Card**: Surface-backed container with 1px border, subtle hover accent, responsive padding, zero generic flat dashboard look.
3. **Badge**: Semantic compact status pill with embedded dot or icon (Risk levels, XP reward, Difficulty, Status).
4. **Dialog**: Elevated modal overlay with backdrop blur and smooth entrance.
5. **Drawer & Sheet**: Slide-up bottom sheet on mobile (`max-w-md mx-auto`), full ergonomics for thumb interaction.
6. **Tabs**: Segmented pill control with smooth sliding indicator and touch targets >= 44px.
7. **Progress**: Smooth animated bar with secondary track and semantic fill.
8. **Tooltip**: Accessible hint popover with dark obsidian background and high contrast text.
9. **Input & Textarea**: High-contrast border, touch-friendly font size (16px to prevent iOS auto-zoom).
10. **Select & Dropdown**: Custom dark glass styled Radix dropdowns with keyboard accessibility.
11. **Avatar**: Monogram or mascot avatar with dynamic tier level ring.
12. **Skeleton**: Low-contrast shimmering placeholder for loading telemetry.
13. **Alert**: High-priority banner with left semantic status indicator.
14. **Toast**: Unobtrusive floating notification pill for feedback (XP gains, streak saves).
15. **Table**: Clean, tabular telemetry presentation with horizontal scrolling safety for mobile.

### QORGAN Domain Components
1. **`QorganScore`**: Signature telemetry shield featuring the 0–1000 index, level title, and rating text.
2. **`RiskBadge`**: Standardized risk indicator (`LOW`, `MODERATE`, `HIGH`, `CRITICAL`) with icon + label + color.
3. **`RiskGauge`**: Visual horizontal segment bar showing exact score placement.
4. **`SkillProgress`**: 9-skill card with level indicator, score bar (0–100), and bilingual title.
5. **`LensScanner`**: Precision optical viewport with detection crosshairs, upload triggers, and scan line.
6. **`LensProgress`**: 4-stage pipeline tracker (`Extracting` → `Checking` → `Analyzing` → `Scoring`).
7. **`LensFinding`**: Breakdown item for risk signals (signals, severity, evidence quote).
8. **`MissionCard`**: Interactive scenario card with category badge, XP reward, and start button.
9. **`ThreatCard`**: Operational warning card from Threat Pulse with region and severity tags.
10. **`StreakIndicator`**: Daily activity flame chip with consecutive day count.
11. **`XpIndicator`**: Experience badge showing progress toward next level tier.
12. **`AchievementBadge`**: Hexagonal badge showing unlock status, title, and timestamp.
13. **`SafetyAction`**: Guided step-by-step containment recommendation card.
14. **`EmergencyAlert`**: Immediate SAFE intervention component with direct 111 / 102 hotlines.
15. **`MascotMessage`**: Friendly Junior cyber-guardian dialog box for tips and encouragement ("Qorgan-Batyr").
16. **`MobileHeader`**: Top application bar with logo, streak counter, mode toggle, and language selector.
17. **`BottomNavigation`**: Fixed 5-tab ergonomic thumb bar.

---

## 11. Signature QORGAN Score Visual

> **Rule**: Do NOT use a generic pie/donut chart.

The **QORGAN Score** is the core identity of the user's digital fortress. It is designed as a **Hexagonal Guardian Telemetry Shield**:
- Outer geometric shield frame with precise 1px technical lines.
- Segmented radial perimeter arc reflecting 0–1000 points.
- Large numeric score (`36px`, bold tabular figures).
- Qualitative security status pill (`Өте қауіпсіз / Высокий уровень защиты`).
- Dynamic border glow shifting subtly based on overall tier:
  - `0–399`: Amber / Needs Attention
  - `400–699`: Sky / Developing
  - `700–899`: Emerald / Strong Guardian
  - `900–1000`: Apex Diamond / Cybersecurity Shield

---

## 12. Lens Visual Language

QORGAN Lens is the diagnostic radar of the OS. It must look and feel like an advanced security sensor:
- **Optical Crosshair Viewport**: Subtle 4-corner targeting reticles.
- **Scanning State**: Subtle vertical laser sweep line (`translate-y` animation with low-opacity gradient).
- **Subtle Grid**: Low-contrast background grid (16px spacing, opacity 0.08).
- **Clear Progress Pipeline**:
  1. `Extracting` (Мәтінді/нысанды оқу / Извлечение)
  2. `Checking` (Деректер қорымен салыстыру / Проверка баз)
  3. `Analyzing` (Қауіп сигналдарын талдау / Анализ угроз)
  4. `Scoring` (Тәуекел индексін есептеу / Расчёт риска)
- **Anti-Pattern**: Never use fake Hollywood green terminal text or Matrix rain.

---

## 13. Risk Presentation Standards

Every risk display must satisfy the **Multi-Modal Rule**:

$$\text{Risk Presentation} = \text{Icon} + \text{Text Label} + \text{Semantic Color}$$

1. **LOW (0–24)**:
   - Icon: `IconCircleCheck`
   - Label: `ҚАУІПСІЗ / НИЗКИЙ РИСК`
   - Accent: `--risk-low` (`#22c55e`)
2. **MODERATE (25–49)**:
   - Icon: `IconAlertTriangle`
   - Label: `КҮДІКТІ / УМЕРЕННЫЙ РИСК`
   - Accent: `--risk-moderate` (`#eab308`)
3. **HIGH (50–74)**:
   - Icon: `IconShieldExclamation`
   - Label: `ҚАУІП ЖОҒАРЫ / ВЫСОКИЙ РИСК`
   - Accent: `--risk-high` (`#f97316`)
4. **CRITICAL (75–100)**:
   - Icon: `IconAlertOctagon`
   - Label: `АСА ҚАУІПТІ / КРИТИЧЕСКИЙ РИСК`
   - Accent: `--risk-critical` (`#ef4444`)

---

## 14. Junior UI Framework

The Junior mode transforms the app into an interactive cybersecurity academy for adolescents:
- **Missions**: Scenarios are presented as real-world cases ("Detect the Fake Kaspi Link", "Stop the Anonymous Bully").
- **XP & Leveling**: Clear progress bar showing XP gained and next tier requirements.
- **Daily Streak**: Encourages daily security hygiene without toxic FOMO.
- **Guardian Mascot**: "Qorgan-Batyr" (an alert, stylized cyber falcon/owl companion) offering contextual advice in plain language.
- **Simplicity**: Cards are tap-friendly, text is concise, action steps are highlighted.

---

## 15. Motion & Transitions

- Standard transition: `150ms–200ms cubic-bezier(0.4, 0, 0.2, 1)`.
- Modal / Drawer entrance: `250ms cubic-bezier(0.16, 1, 0.3, 1)`.
- Tab switch: subtle crossfade without abrupt layout snap.
- **Accessibility**: All animations must be disabled when `prefers-reduced-motion: reduce` is active.

---

## 16. Accessibility (A11y)

- **Contrast**: Minimum 4.5:1 ratio for regular text, 3:1 for large display elements.
- **Focus Rings**: High-visibility focus outline (`ring-2 ring-primary ring-offset-2 ring-offset-background`).
- **Screen Readers**: All icon-only buttons include `aria-label`.
- **Touch Areas**: Minimum 44px hit-box on all interactive triggers.

---

## 17. Responsive Architecture

- **Primary Canvas**: Mobile smartphone viewports (**360px – 430px width**).
- **Container Constraint**: On tablet/desktop screens, the app is rendered in a centered ergonomic mobile container (`max-w-md mx-auto min-h-screen border-x border-border/50 shadow-2xl`).
- **Safe Area**: Respects iOS notch and Android gesture pill (`pb-[env(safe-area-inset-bottom)]`, `pt-[env(safe-area-inset-top)]`).

---

## 18. Forbidden Anti-Patterns

1. ❌ **Generic Shadcn Dashboard**: No flat gray tables, default sidebar templates, or unstyled cards.
2. ❌ **AI Neon Purple Gradients**: QORGAN is a security OS, not a trendy generative text playground.
3. ❌ **Pervasive Glassmorphism**: Blurry glass layers degrade readability on low-end mobile screens.
4. ❌ **Emoji as UI Navigation**: Always use crisp SVG icons.
5. ❌ **Giant Empty Hero Sections**: Mobile screen real estate is precious; get directly to actionable safety status.
6. ❌ **Red Screen Flood**: High risk should inform, not blind the user with full-bleed crimson.
7. ❌ **Inconsistent Radius**: Strictly follow the 2-mode radius scale.
8. ❌ **Unlabeled Charts**: Never display a number or dial without clear qualitative explanation in the user's language.

---
*Authored for QORGAN Frontend Core Architecture — 2026*
