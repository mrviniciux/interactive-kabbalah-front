'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { sephirots } from '@/data/sephirots';
import { qliphoth } from '@/data/qliphoth';
import { sephirotCorrespondences } from '@/data/correspondences';

interface Props {
  sephirotId: string | null;
  view: 'life' | 'death';
  onClose: () => void;
}

export default function SephirotDrawer({ sephirotId, view, onClose }: Props) {
  const ui = useTranslations('ui');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!sephirotId) return null;
  const data = view === 'life' ? sephirots[sephirotId] : qliphoth[sephirotId];
  if (!data) return null;
  const corr = sephirotCorrespondences[sephirotId];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--color-surface)]/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-[var(--color-surface-container)] border border-[var(--color-primary-container)] p-6 sm:p-10 max-w-lg w-full rounded-lg shadow-2xl animate-scroll-unfold overflow-y-auto max-h-[85vh]">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors text-xl">
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-lg"
            style={{ background: data.colors.inner, borderColor: '#d4af37', boxShadow: `0 0 20px ${data.colors.outer}44` }}
          >
            <span className="text-2xl" style={{ color: data.colors.text }}>{data.icon}</span>
          </div>
          <div>
            <h2 className="text-[24px] sm:text-[32px] text-[var(--color-primary)] uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
              {data.name}
            </h2>
            <p className="text-sm text-[var(--color-on-surface-variant)]">{data.valor} · {data.planetName}</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Regent */}
          {data.regent.title && (
            <div>
              <span className="text-[10px] font-semibold text-[var(--color-outline)] uppercase tracking-wider block mb-1">Regente</span>
              <p className="text-[var(--color-on-surface)] text-sm">{data.regent.title} — {data.regent.name}</p>
              {data.regent.defect && data.regent.defect.trim() && (
                <p className="text-red-700 text-xs mt-1">⚠ {data.regent.defect}</p>
              )}
            </div>
          )}

          {/* Archetypes */}
          {data.archetypes.length > 0 && (
            <div className="pt-3 border-t border-[var(--color-outline-variant)]">
              <span className="text-[10px] font-semibold text-[var(--color-outline)] uppercase tracking-wider block mb-2">{ui('archetypes')}</span>
              <div className="flex flex-wrap gap-1.5">
                {data.archetypes.map((a, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-[var(--color-primary-container)]/20 border border-[var(--color-outline-variant)] text-[var(--color-on-surface-variant)] text-xs">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Minor Arcana */}
          {data.minorArcana.length > 0 && (
            <div className="pt-3 border-t border-[var(--color-outline-variant)]">
              <span className="text-[10px] font-semibold text-[var(--color-outline)] uppercase tracking-wider block mb-2">{ui('minorArcana')}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {data.minorArcana.map((a, i) => (
                  <p key={i} className="text-xs text-[var(--color-on-surface-variant)]">🃏 {a}</p>
                ))}
              </div>
            </div>
          )}

          {/* Correspondences */}
          {corr && (
            <div className="pt-3 border-t border-[var(--color-outline-variant)] grid grid-cols-2 gap-4">
              {corr.animals.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold text-[var(--color-outline)] uppercase block mb-1">Animais</span>
                  <p className="text-xs text-[var(--color-on-surface)]">{corr.animals.slice(0, 3).join(', ')}</p>
                </div>
              )}
              {corr.stones.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold text-[var(--color-outline)] uppercase block mb-1">Pedras</span>
                  <p className="text-xs text-[var(--color-on-surface)]">{corr.stones.slice(0, 3).join(', ')}</p>
                </div>
              )}
              {corr.bodyParts.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold text-[var(--color-outline)] uppercase block mb-1">Corpo</span>
                  <p className="text-xs text-[var(--color-on-surface)]">{corr.bodyParts.slice(0, 3).join(', ')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
