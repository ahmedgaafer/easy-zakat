'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function SessionMonitor() {
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		// Check session status and redirect if expired
		if (status === 'unauthenticated') {
			// Clear any stored data and redirect to login
			sessionStorage.clear();
			localStorage.clear();
			router.push('/login');
		}
	}, [status, router]);

	return null;
}
