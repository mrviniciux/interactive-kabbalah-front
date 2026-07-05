'use client';

import { useTranslations } from 'next-intl';

/**
 * Decorative frame overlay — renders on top of the canvas but behind interactive elements.
 * Includes: ornamental border, corner triangles, AIN captions, veils, world labels, columns B/J.
 * Matches HodStudio poster aesthetic.
 */
export default function DecorativeFrame() {
  const ui = useTranslations('ui');

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Outer ornamental border */}
      <div className="absolute inset-3 sm:inset-5 border-2 border-[var(--text-muted)]/30 rounded-sm">
        <div className="absolute inset-1.5 border border-[var(--text-muted)]/20 rounded-sm" />
      </div>

      {/* Corner ornaments ▲ ▽ */}
      <span className="absolute top-4 left-4 sm:top-6 sm:left-6 text-[var(--text-muted)]/40 text-lg sm:text-xl select-none">▲</span>
      <span className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[var(--text-muted)]/40 text-lg sm:text-xl select-none">▽</span>
      <span className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-[var(--text-muted)]/40 text-lg sm:text-xl select-none">△</span>
      <span className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-[var(--text-muted)]/40 text-lg sm:text-xl select-none">▽</span>

      {/* AIN captions — top center */}
      <div className="absolute top-8 sm:top-12 left-0 right-0 flex flex-col items-center gap-0.5 sm:gap-1">
        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--text-muted)]/60" style={{ fontFamily: 'var(--font-heading)' }}>
          Ain — Nada — 0
        </p>
        <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[var(--text-muted)]/50" style={{ fontFamily: 'var(--font-heading)' }}>
          Ain Soph — Ilimitado — 00
        </p>
        <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[var(--text-muted)]/40" style={{ fontFamily: 'var(--font-heading)' }}>
          Ain Soph Aur — Luz Ilimitada — 000
        </p>
      </div>

      {/* World labels */}
      <WorldLabel text="Jechidah" position="top-[105px] sm:top-[130px] left-1/2 -translate-x-1/2" />
      <WorldLabel text="Neschamah" position="top-[160px] sm:top-[200px] left-[8%] sm:left-[12%]" />
      <WorldLabel text="Chiah" position="top-[160px] sm:top-[200px] right-[8%] sm:right-[12%]" />
      <WorldLabel text="Ruach" position="top-[55%] left-[3%] sm:left-[5%]" />
      <WorldLabel text="Nephesch" position="bottom-[60px] sm:bottom-[80px] left-1/2 -translate-x-1/2" />

      {/* Veils — horizontal dashed lines */}
      <Veil label="Véu do Abismo" top="30%" />
      <Veil label="Véu do Parokhet" top="58%" />
      <Veil label="Véu de Nephesch" top="80%" />

      {/* Columns B and J */}
      <Column side="left" letter="B" />
      <Column side="right" letter="J" />
    </div>
  );
}

function WorldLabel({ text, position }: { text: string; position: string }) {
  return (
    <span
      className={`absolute ${position} text-[10px] sm:text-xs italic text-[var(--text-muted)]/50 tracking-wide select-none`}
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      {text}
    </span>
  );
}

function Veil({ label, top }: { label: string; top: string }) {
  return (
    <div className="absolute left-6 right-6 sm:left-10 sm:right-10 flex items-center gap-2" style={{ top }}>
      <span className="text-[9px] sm:text-[10px] italic text-[var(--text-muted)]/40 whitespace-nowrap" style={{ fontFamily: 'var(--font-heading)' }}>
        {label}
      </span>
      <div className="flex-1 border-t border-dashed border-[var(--text-muted)]/20" />
    </div>
  );
}

function Column({ side, letter }: { side: 'left' | 'right'; letter: string }) {
  const pos = side === 'left' ? 'left-[6%] sm:left-[8%]' : 'right-[6%] sm:right-[8%]';
  return (
    <div className={`absolute bottom-12 sm:bottom-16 ${pos} flex flex-col items-center opacity-20`}>
      {/* Capital */}
      <div className="w-8 sm:w-10 h-2 sm:h-3 bg-[var(--text-muted)] rounded-t-sm" />
      <div className="w-6 sm:w-8 h-1 bg-[var(--text-muted)]" />
      {/* Shaft */}
      <div className="w-4 sm:w-5 h-24 sm:h-36 bg-gradient-to-b from-[var(--text-muted)]/80 to-[var(--text-muted)]/40 rounded-sm" />
      {/* Base */}
      <div className="w-6 sm:w-8 h-1 bg-[var(--text-muted)]" />
      <div className="w-8 sm:w-10 h-2 sm:h-3 bg-[var(--text-muted)] rounded-b-sm" />
      {/* Letter */}
      <span className="mt-1 text-sm sm:text-base font-bold text-[var(--text-muted)]/60" style={{ fontFamily: 'var(--font-heading)' }}>
        {letter}
      </span>
    </div>
  );
}
