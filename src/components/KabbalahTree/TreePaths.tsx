'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { lifePaths, type LifePathDef } from '@/data/lifePaths';

type Positions = Record<string, { x: number; y: number }>;
type PathDef = LifePathDef;

const centralPaths = new Set([13, 25, 32]);

const paths = lifePaths;

interface Props {
  positions: Positions;
  width: number;
  height: number;
}

export default function TreePaths({ positions, width, height }: Props) {
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);
  const [pinnedPath, setPinnedPath] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const ui = useTranslations('ui');
  const pathsT = useTranslations('paths');

  const activePath = pinnedPath ?? hoveredPath;

  const handleMouse = useCallback((e: React.MouseEvent, num: number) => {
    if (pinnedPath !== null) return;
    setHoveredPath(num);
    setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }, [pinnedPath]);

  const handleClick = useCallback((e: React.MouseEvent, num: number) => {
    if (pinnedPath === num) {
      setPinnedPath(null);
    } else {
      setPinnedPath(num);
      setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  }, [pinnedPath]);

  const handleCopy = async () => {
    const p = paths.find(pp => pp.number === activePath);
    if (!p) return;
    const arcaneText = pathsT(`${p.number}.arcane`);
    const meaningText = pathsT(`${p.number}.meaning`);
    const text = `${ui('path')} ${p.number} — ${p.letter} (${p.letterName}) — ${p.sign} (${meaningText})\n${arcaneText}\n${p.from} → ${p.to}\n${ui('virtue')}: ${p.virtue}\n${ui('vice')}: ${p.vice}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Close pinned tooltip on Escape
  useEffect(() => {
    if (!pinnedPath) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPinnedPath(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [pinnedPath]);

  const renderBar = (path: PathDef) => {
    const from = positions[path.from];
    const to = positions[path.to];
    if (!from || !to) return null;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;

    const barHeight = 30;
    const nodeRadius = 72;
    const actualLength = length - nodeRadius * 2;
    if (actualLength <= 10) return null;

    const isHovered = hoveredPath === path.number;

    return (
      <g key={`bar-${path.number}`}>
        <rect
          x={midX - actualLength / 2}
          y={midY - barHeight / 2 - 1}
          width={actualLength}
          height={barHeight + 2}
          rx={5}
          fill="rgba(0,0,0,0.5)"
          transform={`rotate(${angle}, ${midX}, ${midY})`}
        />
        <rect
          x={midX - actualLength / 2}
          y={midY - barHeight / 2}
          width={actualLength}
          height={barHeight}
          rx={4}
          fill={path.color}
          opacity={isHovered ? 1 : 0.9}
          transform={`rotate(${angle}, ${midX}, ${midY})`}
        />
      </g>
    );
  };

  const renderTexts = (path: PathDef) => {
    const from = positions[path.from];
    const to = positions[path.to];
    if (!from || !to) return null;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;

    const nodeRadius = 72;
    const actualLength = length - nodeRadius * 2;
    if (actualLength <= 10) return null;

    const isVertical = Math.abs(Math.abs(angle) - 90) < 10;
    const needsFlip = angle > 90 || angle < -90;

    const items = [
      { text: String(path.number), size: 15, bold: true },
      { text: path.letter, size: 18, bold: true },
      { text: path.sign, size: 16, bold: false },
      { text: path.arcane.split(' - ')[0], size: 13, bold: true },
    ];

    if (isVertical) {
      // Vertical: stack items top-to-bottom, each character stays horizontal
      const totalSpan = actualLength * 0.8;
      const step = totalSpan / (items.length - 1);
      const startY = -totalSpan / 2;

      return (
        <g
          key={`txt-${path.number}`}
          className="cursor-pointer"
          onMouseEnter={(e) => handleMouse(e, path.number)}
          onMouseMove={(e) => setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
          onMouseLeave={() => setHoveredPath(null)}
        >
          {items.map((item, i) => (
            <text
              key={i}
              x={midX}
              y={midY + startY + step * i}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize={item.size}
              fontWeight={item.bold ? 'bold' : 'normal'}
              fontFamily="Arial, sans-serif"
            >
              {item.text}
            </text>
          ))}
        </g>
      );
    } else {
      // Non-vertical: text along the bar, flipped if needed to read left→right
      const textAngle = needsFlip ? angle + 180 : angle;
      const spacing = actualLength * 0.25;
      const positions_x = [-spacing * 1.4, -spacing * 0.45, spacing * 0.45, spacing * 1.4];

      return (
        <g
          key={`txt-${path.number}`}
          transform={`translate(${midX}, ${midY}) rotate(${textAngle})`}
          className="cursor-pointer"
          onMouseEnter={(e) => handleMouse(e, path.number)}
          onMouseMove={(e) => setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
          onMouseLeave={() => setHoveredPath(null)}
        >
          {items.map((item, i) => (
            <text
              key={i}
              x={positions_x[i]}
              y={0}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize={item.size}
              fontWeight={item.bold ? 'bold' : 'normal'}
              fontFamily="Arial, sans-serif"
            >
              {item.text}
            </text>
          ))}
        </g>
      );
    }
  };

  const bgPaths = paths.filter(p => centralPaths.has(p.number));
  const fgPaths = paths.filter(p => !centralPaths.has(p.number));

  return (
    <div className="absolute inset-0" style={{ width, height }}>
      {/* Background bars (central pillar) — behind sephirots */}
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 0 }}>
        {bgPaths.map(renderBar)}
      </svg>

      {/* Foreground bars */}
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 2 }}>
        {fgPaths.map(renderBar)}
      </svg>

      {/* Text layer — visible on top, but no pointer events (tooltip handled by hit areas below) */}
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 12 }}>
        {paths.map(renderTexts)}
      </svg>

      {/* Invisible hit areas for tooltip */}
      <svg className="absolute inset-0" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ zIndex: 5 }}>
        {paths.map((path) => {
          const from = positions[path.from];
          const to = positions[path.to];
          if (!from || !to) return null;
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const nodeRadius = 72;
          const actualLength = length - nodeRadius * 2;
          if (actualLength <= 10) return null;
          return (
            <rect
              key={`hit-${path.number}`}
              x={midX - actualLength / 2}
              y={midY - 16}
              width={actualLength}
              height={32}
              rx={4}
              fill="transparent"
              transform={`rotate(${angle}, ${midX}, ${midY})`}
              className="cursor-pointer"
              onMouseEnter={(e) => handleMouse(e, path.number)}
              onMouseMove={(e) => { if (!pinnedPath) setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }}
              onMouseLeave={() => { if (!pinnedPath) setHoveredPath(null); }}
              onClick={(e) => handleClick(e, path.number)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {activePath !== null && (
        <div
          className={`absolute z-[500] ${pinnedPath ? '' : 'pointer-events-none'}`}
          style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 20 }}
          onMouseEnter={() => { /* keep visible */ }}
          onMouseLeave={() => { if (!pinnedPath) setHoveredPath(null); }}
        >
          <div className={`bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg px-4 py-3 shadow-2xl border ${pinnedPath ? 'border-yellow-400/50' : 'border-white/20'} whitespace-nowrap select-text max-w-[320px]`}>
            {(() => {
              const p = paths.find(pp => pp.number === activePath);
              if (!p) return null;
              const arcaneText = pathsT(`${p.number}.arcane`);
              const meaningText = pathsT(`${p.number}.meaning`);
              return (
                <>
                  <p className="font-bold text-sm">{ui('path')} {p.number} — {p.letter} ({p.letterName}) — {p.sign} ({meaningText})</p>
                  <p className="text-yellow-200 mt-1">🃏 {arcaneText}</p>
                  <p className="text-white/60 mt-1">{p.from} → {p.to}</p>
                  <div className="mt-2 pt-1 border-t border-white/10">
                    <p className="text-green-300">✦ {ui('virtue')}: {p.virtue}</p>
                    <p className="text-red-300">✧ {ui('vice')}: {p.vice}</p>
                  </div>
                  {pinnedPath && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                      <button onClick={handleCopy} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">
                        {copied ? `✓ ${ui('copied')}` : `📋 ${ui('copy')}`}
                      </button>
                      <button onClick={() => setPinnedPath(null)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition">
                        ✕ {ui('close')}
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
          {!pinnedPath && (
            <p className="text-center text-[9px] text-white/40 mt-1">{ui('clickToPin')}</p>
          )}
        </div>
      )}
    </div>
  );
}
