'use client';

import { locales, localeNames, type Locale } from '@/i18n/i18n.config';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

interface LocaleToggleProps {
	currentLocale: Locale;
}

export function LocaleToggle({ currentLocale }: LocaleToggleProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleLocaleChange = (newLocale: string) => {
		if (newLocale === currentLocale) return;

		startTransition(() => {
			// Update the locale cookie
			document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

			// Reload the page to apply the new locale
			window.location.reload();
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" disabled={isPending}>
					<Languages className="size-4" />
					<span className="sr-only">Toggle language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup
					value={currentLocale}
					onValueChange={handleLocaleChange}
				>
					{locales.map((loc) => (
						<DropdownMenuRadioItem key={loc} value={loc}>
							{localeNames[loc]}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
