import { google } from 'googleapis';
import { auth } from '@/lib/auth/index';

export async function getSheetsClient() {
	const session = await auth();

	if (!session?.accessToken) {
		throw new Error('Not authenticated');
	}

	const oauth2Client = new google.auth.OAuth2();
	oauth2Client.setCredentials({
		access_token: session.accessToken as string,
	});

	return google.sheets({ version: 'v4', auth: oauth2Client });
}
