'use client';

import { useLocale as useNextIntlLocale } from 'next-intl';
import { Locale } from './i18n.config';

export function useLocale(): Locale {
	return useNextIntlLocale() as Locale;
}
