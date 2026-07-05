'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import TreeMap from '@/components/TreeMap/TreeMap';
import SephirotDrawer from '@/components/SephirotDrawer/SephirotDrawer';
import PathDrawer from '@/components/PathDrawer/PathDrawer';
import LanguageSelector from '@/components/LanguageSelector';
import Search from '@/components/Search/Search';
import PixModal from '@/components/PixModal/PixModal';

export default function HomePage() {
  const [view, setView] = useState<'life' | 'death'>('life');
  const [selectedSephirot, setSelectedSephirot] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<number | null>(null);
  const ui = useTranslations('ui');

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 py-3 bg-[var(--color-surface)] border-b border-[var(--color-outline-variant)]">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-primary)] text-xl">✡</span>
          <h1 className="text-[20px] sm:text-[28px] tracking-[0.15em] uppercase text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
            {ui('title')}
          </h1>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <Search />
          <LanguageSelector />
          <PixModal />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow pt-20 pb-20 relative flex flex-col items-center overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(212, 175, 55, 0.04) 100%)' }} />

        {/* Marginalia — desktop only */}
        <div className="absolute left-6 top-28 hidden lg:block w-44 space-y-3">
          <p className="marginalia text-balance">&ldquo;As above, so below; as within, so without; as the universe, so the soul.&rdquo;</p>
          <div className="h-px w-full bg-[var(--color-outline-variant)]" />
          <p className="text-[10px] font-semibold text-[var(--color-outline)] uppercase tracking-[0.15em]">Macrocosm</p>
        </div>
        <div className="absolute right-6 bottom-28 hidden lg:block w-44 text-right space-y-3">
          <p className="text-[10px] font-semibold text-[var(--color-outline)] uppercase tracking-[0.15em]">Microcosm</p>
          <div className="h-px w-full bg-[var(--color-outline-variant)] ml-auto" />
          <p className="marginalia text-balance">The path of the serpent winds through the spheres of being.</p>
        </div>

        {/* Tree SVG */}
        <TreeMap
          view={view}
          onSelectSephirot={(id) => { setSelectedSephirot(id); setSelectedPath(null); }}
          onSelectPath={(n) => { setSelectedPath(n); setSelectedSephirot(null); }}
        />
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[var(--color-surface-container-low)] border-t border-[var(--color-outline-variant)] rounded-t-xl">
        <NavItem
          active={view === 'life'}
          onClick={() => setView('life')}
          icon="☉"
          label={ui('life')}
        />
        <NavItem
          active={view === 'death'}
          onClick={() => setView('death')}
          icon="☽"
          label={ui('death')}
        />
        <NavItem
          active={false}
          onClick={() => {}}
          icon="⚖"
          label="Mirror"
        />
        <a
          href="https://github.com/mrviniciux"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-[var(--color-on-surface-variant)] opacity-60 hover:opacity-100 transition-opacity"
        >
          <span className="text-lg">📖</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5">GitHub</span>
        </a>
      </nav>

      {/* Modals / Drawers */}
      <SephirotDrawer sephirotId={selectedSephirot} view={view} onClose={() => setSelectedSephirot(null)} />
      <PathDrawer pathNumber={selectedPath} view={view} onClose={() => setSelectedPath(null)} />
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center transition-all duration-300 ${
        active
          ? 'text-[var(--color-primary)] font-bold border-t-2 border-[var(--color-primary)] pt-1 scale-105'
          : 'text-[var(--color-on-surface-variant)] opacity-60 hover:opacity-100'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5">{label}</span>
    </button>
  );
}
