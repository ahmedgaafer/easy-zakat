import { auth } from '@/lib/auth/index';

export default auth((req) => {
	const isLoggedIn = !!req.auth;
	const isLoginPage = req.nextUrl.pathname === '/login';

	// Redirect to login if not authenticated
	if (!isLoggedIn && !isLoginPage) {
		return Response.redirect(new URL('/login', req.nextUrl.origin));
	}

	// Redirect to dashboard if already logged in and trying to access login
	if (isLoggedIn && isLoginPage) {
		return Response.redirect(new URL('/dashboard', req.nextUrl.origin));
	}
});

export const config = {
	matcher: ['/dashboard/:path*', '/login', '/api/protected/:path*'],
};
