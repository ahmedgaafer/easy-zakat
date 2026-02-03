import { google } from 'googleapis';
import { getServerAccessToken } from '@/lib/auth';

export async function getSheetsClient() {
	const accessToken = await getServerAccessToken();

	if (!accessToken) {
		throw new Error('Not authenticated');
	}

	const oauth2Client = new google.auth.OAuth2();
	oauth2Client.setCredentials({
		access_token: accessToken,
	});

	return google.sheets({ version: 'v4', auth: oauth2Client });
}
