'use client';

import { LuMoon, LuSun, LuSunMoon } from 'react-icons/lu';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch
	useEffect(() => {
		//@eslint-disable-next-line react-hooks/exhaustive-deps
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="outline" size="icon" disabled>
				<LuSun className="size-4" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		);
	}

	const Icon =
		theme === 'light' ? (
			<LuSun className="size-4" />
		) : theme === 'dark' ? (
			<LuMoon className="size-4" />
		) : (
			<LuSunMoon className="size-4" />
		);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					{Icon}
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
					<DropdownMenuRadioItem value="light">
						<LuSun className="size-4" /> Light
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">
						<LuMoon className="size-4" /> Dark
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="system">
						<LuSunMoon className="size-4" /> System System
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
