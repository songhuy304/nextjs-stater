'use client';

import { cn } from '@repo/ui/lib/utils';
import { Locale } from '@/shared/i18n/config';
import { setUserLocale } from '@/shared/i18n/locale';
import { Button } from '@repo/ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/components/ui/tooltip';
import { US, VN } from 'country-flag-icons/react/3x2';
import { useLocale } from 'next-intl';
import { useTopLoader } from 'nextjs-toploader';
import { startTransition } from 'react';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LocaleSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const loader = useTopLoader();

  const LocaleConfig: Record<Locale, { label: string; icon: React.ReactNode }> = {
    en: { label: 'Switch to Vietnamese', icon: <US /> },
    vi: { label: 'Chuyển sang tiếng Anh', icon: <VN /> }
  };

  const config = LocaleConfig[locale as Locale];

  const handleChangeLanguage = (newLocale: string) => {
    loader.start();
    const locale = newLocale as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='secondary'
          size='icon'
          className={cn('size-8', className)}
          onClick={() => handleChangeLanguage(locale === 'en' ? 'vi' : 'en')}
          aria-label={config?.label}
        >
          {config?.icon}
        </Button>
      </TooltipTrigger>

      <TooltipContent>Toggle Language</TooltipContent>
    </Tooltip>
  );
}
