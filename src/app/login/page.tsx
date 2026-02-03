import { signIn } from '@/lib/auth';

export default function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-sm space-y-4 p-6">
				<h1 className="text-2xl font-bold text-center">Sign In</h1>
				<form
					action={async () => {
						'use server';
						await signIn('google', { redirectTo: '/dashboard' });
					}}
				>
					<button
						type="submit"
						className="w-full flex items-center justify-center gap-2 rounded-lg border p-3 hover:bg-gray-50"
					>
						<svg className="h-5 w-5" viewBox="0 0 24 24">
							{/* Google icon SVG */}
						</svg>
						Continue with Google
					</button>
				</form>
			</div>
		</div>
	);
}
