'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function AuthToggle({ isAuthenticated }: { isAuthenticated: boolean }) {
	const router = useRouter();

	if (isAuthenticated) {
		return null;
	}

	const handleSignIn = () => {
		router.push('/login');
	};

	return (
		<Button variant="outline" onClick={handleSignIn}>
			Sign In
		</Button>
	);
}
