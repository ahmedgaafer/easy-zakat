import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';
import { FcGoogle } from 'react-icons/fc';

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
					<Button
						type="submit"
						className="bg-black text-white dark:bg-white dark:text-black hover:cursor-pointer align-middle w-full justify-center"
					>
						<FcGoogle className="size-5 mr-2" />
						Continue with Google
					</Button>
				</form>
			</div>
		</div>
	);
}
