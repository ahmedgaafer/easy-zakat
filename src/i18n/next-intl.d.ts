// TypeScript module augmentation for next-intl
// This ensures all useTranslations and related hooks are type-safe

import type { Messages } from './messages.types';

declare module 'next-intl' {
	interface IntlMessages extends Messages {}
}
