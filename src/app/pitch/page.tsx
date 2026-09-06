import type { Metadata } from 'next';
import { PitchDeck } from '@/components/pitch/pitch-deck';

export const metadata: Metadata = {
  title: 'QORGAN — Питч перед жюри | Pitch Deck 2026',
  description: 'Полноэкранная интерактивная презентация проекта QORGAN для жюри хакатона. Защита граждан и бизнеса от киберугроз на базе AlemAI (Qwen 3 8B).',
};

export default function PitchPage() {
  return (
    <main className="w-full h-full min-h-screen bg-[#121620]">
      <PitchDeck />
    </main>
  );
}
