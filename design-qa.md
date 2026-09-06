# QORGAN light redesign — design QA

- Source visual truth: `C:\Users\rawit\AppData\Local\Temp\codex-clipboard-fd23af20-3eed-4815-b2eb-72bc929c2de0.png`
- Implementation: `http://localhost:3000/`, captured in Codex in-app browser tab 6
- Source pixels: 814 × 654
- Implementation capture: 655 × 774 browser viewport; app surface approximately 440 CSS px wide
- Density normalization: not applied. The source is a three-device presentation board, while the implementation is one responsive app surface; the comparison targets visual language rather than phone-frame pixel identity.
- States checked: mobile dashboard, Lens idle, Lens critical result with legal recommendation, missions home, mission player

## Full-view comparison evidence

The implementation now carries the selected reference's primary visual language: a pale blue outer canvas, white application surface, saturated blue primary actions, low-contrast gray secondary surfaces, large rounded cards, restrained shadows, and a floating rounded bottom navigation. QORGAN-specific safety, legal, mission, and Kazakhstan content intentionally replaces the generic antivirus copy from the source.

## Focused region comparison evidence

- Lens idle: large white scan card, centered blue scan control, compact mode selector, and rounded input/CTA match the reference's scan hierarchy.
- Bottom navigation: white floating pill, muted inactive icons, and pale-blue active state match the source navigation treatment while preserving all five QORGAN destinations.
- Dashboard score: the centered blue progress gauge and concise status chip preserve the source's main scan/score focal point.
- Missions: the previous black/lime editorial treatment was removed; mission cards and the player now use the same white/blue surface hierarchy as Lens.

## Required fidelity surfaces

- Fonts and typography: Inter/system sans produces the same neutral mobile-product character. QORGAN retains slightly stronger heading weights for Kazakh and Russian readability. No actionable mismatch.
- Spacing and layout rhythm: 16–28 px rounded surfaces, consistent 16–24 px inner padding, and soft section spacing align with the source. Mobile controls remain reachable above the persistent navigation.
- Colors and tokens: light-blue canvas, white surfaces, #2775f6 primary blue, muted blue-gray text, and isolated red/amber/green semantic states align with the reference.
- Image and asset fidelity: the reference contains no required content photography. Interface imagery is represented with the existing Tabler icon family; the former custom inline logo drawing was replaced with a library shield icon.
- Copy and content: source antivirus copy was intentionally adapted to QORGAN Lens, missions, legal navigation, and official Kazakhstan resources.
- Accessibility and behavior: primary tap targets are at least 40–44 px, focus styles remain visible, reduced-motion behavior is preserved, and navigation, Lens presets/scan, legal links, mission filters, and mission start were exercised.

## Comparison history

### Pass 1

- P1: black/lime `Threat Lab` shell conflicted with the calm white/blue source.
- P1: square borders, uppercase typography, and hard shadows made missions look like a different product.
- P2: Lens scanner used reticles, a grid, and a laser line absent from the source.
- Fixes: replaced global tokens, header, navigation, buttons, cards, scanner, missions, player, result screen, and logo treatment with the selected white/blue system.

### Pass 2

- Post-fix evidence: dashboard, Lens, critical-result, missions, and mission-player captures show one consistent light system.
- No remaining P0, P1, or P2 issues were found.

## Follow-up polish

- P3: a native SF Pro-style font could make iOS resemblance slightly closer, but the current cross-platform system stack is more practical for the web app.
- P3: long Lens results remain vertically dense because QORGAN exposes evidence and legal guidance that the reference does not contain.

final result: passed
