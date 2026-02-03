import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Session } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import env from '../appConfig';

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string;
		refreshToken?: string;
		expiresAt?: number;
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
					scope: [
						'openid',
						'email',
						'profile',
						'https://www.googleapis.com/auth/spreadsheets',
						'https://www.googleapis.com/auth/drive.file',
					].join(' '),
				},
			},
		}),
	],
	session: { strategy: 'jwt', maxAge: 24 * 60 * 60 }, // 24 hours
	pages: {
		signIn: '/login',
		error: '/login',
	},
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.expiresAt = account.expires_at;
				token.sub = account.providerAccountId;
				return token;
			}

			// If token has not expired, return it
			if (token.expiresAt && Date.now() < (token.expiresAt as number) * 1000) {
				return token;
			}

			// Token has expired, try to refresh it
			if (!token.refreshToken) {
				throw new Error('No refresh token available');
			}

			try {
				const response = await fetch('https://oauth2.googleapis.com/token', {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({
						client_id: env.GOOGLE_CLIENT_ID,
						client_secret: env.GOOGLE_CLIENT_SECRET,
						grant_type: 'refresh_token',
						refresh_token: token.refreshToken as string,
					}),
					method: 'POST',
				});

				const tokens = await response.json();

				if (!response.ok) {
					throw tokens;
				}

				return {
					...token,
					accessToken: tokens.access_token,
					expiresAt:
						Math.floor(Date.now() / 1000) + (tokens.expires_in || 3599),
					refreshToken: tokens.refresh_token ?? token.refreshToken,
				};
			} catch (error) {
				console.error('Error refreshing access token', error);
				// Return invalid token which will be caught in session callback
				return { ...token, expiresAt: 0 };
			}
		},
		async session({ session, token }) {
			// Check if token is still valid
			if (token.expiresAt && Date.now() >= (token.expiresAt as number) * 1000) {
				// Token expired and couldn't be refreshed
				return session;
			}

			if (session.user) {
				session.user.id = token.sub || '';
			}
			return session;
		},
	},
});

export async function getServerAccessToken() {
	const headersList = await headers();
	const token = await getToken({
		req: { headers: headersList },
		secret: env.NEXTAUTH_SECRET,
	});

	return token?.accessToken as string | undefined;
}
