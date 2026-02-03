import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './i18n.config';
import { getMessages } from './get-messages';
import { cookies } from 'next/headers';

export type { TranslationKey } from './messages.types';

export default getRequestConfig(async () => {
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;

	const locale =
		localeCookie && locales.includes(localeCookie as (typeof locales)[number])
			? (localeCookie as (typeof locales)[number])
			: defaultLocale;

	return {
		locale,
		messages: await getMessages(locale),
	};
});
