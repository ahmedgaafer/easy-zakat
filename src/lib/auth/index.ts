import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Session } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from 'next-auth/jwt';
import env from '../appConfig';

declare module 'next-auth' {
	interface Session {
		accessToken?: string;
		refreshToken?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string;
		refreshToken?: string;
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
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/login',
		error: '/login',
	},
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.sub = account.providerAccountId;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string;
			session.refreshToken = token.refreshToken as string;
			if (session.user) {
				session.user.id = token.sub || '';
			}
			return session;
		},
	},
});
