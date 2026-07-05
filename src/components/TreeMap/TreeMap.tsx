'use client';

import { sephirots } from '@/data/sephirots';
import { qliphoth } from '@/data/qliphoth';
import { lifePaths } from '@/data/lifePaths';

interface Props {
  view: 'life' | 'death';
  onSelectSephirot: (id: string) => void;
  onSelectPath: (n: number) => void;
}

// Positions in SVG coordinate space (400x600 viewBox)
const positions: Record<string, { x: number; y: number }> = {
  kether:  { x: 200, y: 50 },
  chokmah: { x: 310, y: 110 },
  binah:   { x: 90, y: 110 },
  daath:   { x: 200, y: 165 },
  chesed:  { x: 310, y: 235 },
  gevurah: { x: 90, y: 235 },
  tiferet: { x: 200, y: 310 },
  netzach: { x: 310, y: 390 },
  hod:     { x: 90, y: 390 },
  yesod:   { x: 200, y: 465 },
  malkuth: { x: 200, y: 555 },
};

const qliphothPositions: Record<string, { x: number; y: number }> = {
  thaumiel:       { x: 200, y: 50 },
  ghogiel:        { x: 310, y: 110 },
  satariel:       { x: 90, y: 110 },
  daath_qliphoth: { x: 200, y: 165 },
  ghagsheblah:    { x: 310, y: 235 },
  golohab:        { x: 90, y: 235 },
  tagimron:       { x: 200, y: 310 },
  gharab:         { x: 310, y: 390 },
  samael:         { x: 90, y: 390 },
  gamaliel:       { x: 200, y: 465 },
  nahemoth:       { x: 200, y: 555 },
};

export default function TreeMap({ view, onSelectSephirot, onSelectPath }: Props) {
  const data = view === 'life' ? sephirots : qliphoth;
  const pos = view === 'life' ? positions : qliphothPositions;

  return (
    <div className="relative w-full max-w-2xl aspect-[2/3] px-4 md:px-0">
      <svg className="w-full h-full" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        {/* Paths */}
        <g>
          {lifePaths.map((path) => {
            const from = pos[path.from];
            const to = pos[path.to];
            if (!from || !to) return null;
            return (
              <line
                key={`${path.from}-${path.to}`}
                className="path-line"
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={path.color}
                strokeLinecap="round"
                onClick={() => onSelectPath(path.number)}
              />
            );
          })}
        </g>

        {/* Sephirot nodes */}
        {Object.entries(pos).map(([id, p]) => {
          const d = data[id];
          if (!d) return null;
          const r = id === 'tiferet' || id === 'malkuth' || id === 'tagimron' || id === 'nahemoth' ? 38 : id === 'daath' || id === 'daath_qliphoth' ? 28 : 33;
          const isDaath = id === 'daath' || id === 'daath_qliphoth';

          return (
            <g
              key={id}
              className="sephiroth-sphere"
              onClick={() => onSelectSephirot(id)}
              style={{ color: d.colors.outer }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={r}
                fill={d.colors.inner}
                stroke={isDaath ? d.colors.stroke : '#d4af37'}
                strokeWidth={isDaath ? 1 : 2}
                strokeDasharray={isDaath ? '4' : undefined}
                fillOpacity={isDaath ? 0.4 : 1}
              />
              {/* Icon */}
              <text
                x={p.x}
                y={p.y + 5}
                textAnchor="middle"
                fontSize="18"
                fill={d.colors.text}
                style={{ pointerEvents: 'none' }}
              >
                {d.icon}
              </text>
              {/* Label */}
              <text
                x={p.x}
                y={p.y - r - 8}
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                letterSpacing="0.1em"
                fill="var(--color-on-surface-variant)"
                style={{ fontFamily: 'Inter', textTransform: 'uppercase', pointerEvents: 'none' }}
              >
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
