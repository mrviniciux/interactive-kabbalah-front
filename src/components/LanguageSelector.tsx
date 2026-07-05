'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSelector() {
  const router = useRouter();
  const locale = useLocale();

  return (
    <button
      onClick={() => router.push(`/${locale === 'pt-BR' ? 'en-US' : 'pt-BR'}`)}
      className="text-[var(--color-primary)] text-sm font-medium hover:opacity-70 transition-opacity"
      aria-label="Toggle language"
    >
      {locale === 'pt-BR' ? 'EN' : 'PT'}
    </button>
  );
}
