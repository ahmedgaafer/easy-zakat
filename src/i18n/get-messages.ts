import { Locale } from './i18n.config';

const messages = {
	en: () => import('./translations/en.json').then((module) => module.default),
	ar: () => import('./translations/ar.json').then((module) => module.default),
};

export async function getMessages(locale: Locale) {
	try {
		return await messages[locale]();
	} catch (error) {
		console.error(`Failed to load messages for locale: ${locale}`, error);
		return await messages.en();
	}
}
