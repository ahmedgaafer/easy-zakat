import { useTranslations } from 'next-intl';
import { TranslationKey } from './messages.types';

export function useTranslation() {
	const t = useTranslations<TranslationKey>();

	return (key: TranslationKey) => t(key);
}
