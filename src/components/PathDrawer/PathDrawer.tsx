'use client';

import { useTranslations } from 'next-intl';
import { lifePaths } from '@/data/lifePaths';

interface Props {
  pathNumber: number | null;
  view: 'life' | 'death';
  onClose: () => void;
}

export default function PathDrawer({ pathNumber, view, onClose }: Props) {
  const ui = useTranslations('ui');
  const pathsT = useTranslations('paths');

  if (pathNumber === null) return null;

  const path = lifePaths.find(p => p.number === pathNumber);
  if (!path) return null;

  const arcaneText = pathsT(`${path.number}.arcane`);
  const meaningText = pathsT(`${path.number}.meaning`);

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed right-0 top-0 bottom-0 z-[101] w-full sm:w-[380px] max-w-full overflow-y-auto overscroll-contain">
        <div className="min-h-full bg-[#0f0f1a]/95 backdrop-blur-2xl border-l border-white/[0.06] p-6 sm:p-8">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
            ✕
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: path.color }}>
                <span className="text-white text-xl font-bold">{path.letter}</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {ui('path')} {path.number}
                </h2>
                <p className="text-xs text-white/50">{path.letterName} · {path.sign} · {meaningText}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Arcane */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <p className="text-[10px] uppercase text-amber-300/60 mb-1">Arcano Maior</p>
              <p className="text-white/90 text-sm font-medium">🃏 {arcaneText}</p>
            </div>

            {/* Connection */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] uppercase text-white/40 mb-1">Conexão</p>
              <p className="text-white/80 text-sm">{path.from} → {path.to}</p>
            </div>

            {/* Virtue & Vice */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] uppercase text-white/40 mb-2">{ui('virtue')} & {ui('vice')}</p>
              <p className="text-green-300/80 text-sm mb-1">✦ {path.virtue}</p>
              <p className="text-red-300/80 text-sm">✧ {path.vice}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
