import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import i18next from 'eslint-plugin-i18next';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		files: ['src/**/*.{ts,tsx}'],
		ignores: ['src/i18n/**/*.{ts,tsx}', 'src/i18n.ts'],
		plugins: {
			i18next,
		},
		rules: {
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'next-intl',
							importNames: ['useTranslations'],
							message:
								"Import 'useTranslations' only from i18n files under src/i18n or src/i18n.ts.",
						},
					],
				},
			],
		},
	},

	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
		// Ignore type declaration files
		'**/*.d.ts',
	]),
]);

export default eslintConfig;
