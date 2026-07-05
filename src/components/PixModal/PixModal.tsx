'use client';

import { useState } from 'react';

export default function PixModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pixKey = 'contato.marcosvinicius25@gmail.com';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[var(--color-primary)] text-sm hover:opacity-70 transition-opacity"
        aria-label="Me pague um café"
      >
        ☕
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative w-full max-w-sm rounded-lg p-8 shadow-2xl bg-[var(--color-surface-container)] border border-[var(--color-primary-container)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
              aria-label="Fechar"
            >
              ✕
            </button>

            <div className="text-center">
              <p className="text-3xl mb-2">☕</p>
              <h2 className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                Me pague um café
              </h2>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Se este projeto te ajudou, considere apoiar com um PIX
              </p>

              {/* PIX Key */}
              <div
                className="rounded-xl p-4 mb-4"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Chave PIX (e-mail)
                </p>
                <p className="text-sm font-mono font-medium break-all" style={{ color: 'var(--text-primary)' }}>
                  {pixKey}
                </p>
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 rounded-xl font-medium text-sm text-white transition-all duration-200"
                style={{ background: copied ? '#16a34a' : '#b8963e' }}
              >
                {copied ? '✓ Copiado!' : '📋 Copiar chave PIX'}
              </button>

              <p className="text-[11px] mt-3" style={{ color: 'var(--text-muted)' }}>
                Qualquer valor é bem-vindo 🙏
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
