import { auth } from '@/lib/auth/index';

export default auth((req) => {
	if (!req.auth && req.nextUrl.pathname !== '/login') {
		return Response.redirect(new URL('/login', req.nextUrl.origin));
	}
});

export const config = {
	matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
