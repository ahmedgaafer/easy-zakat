// Auto-generated types from translation files
// This ensures type-safety when using translation keys

import type en from './translations/en.json';

export type Messages = typeof en;

// Utility type to get all nested keys as dot notation
type Join<K, P> = K extends string | number
	? P extends string | number
		? `${K}${'' extends P ? '' : '.'}${P}`
		: never
	: never;

type Paths<T> = T extends object
	? {
			[K in keyof T]: K extends string | number
				? T[K] extends object
					? Join<K, Paths<T[K]>>
					: K
				: never;
		}[keyof T]
	: never;

export type TranslationKey = Paths<Messages>;

// For namespace-based usage
export type Namespace = keyof Messages;
