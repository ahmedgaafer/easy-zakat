import { getSheetsClient } from './client';
import appConfig from '@/lib/appConfig';
import { google } from 'googleapis';
import { getServerAccessToken } from '@/lib/auth';

const SPREADSHEET_ID = appConfig.SPREADSHEET_ID;

export async function getSpreadsheetIdByName(): Promise<string | null> {
	const accessToken = await getServerAccessToken();
	if (!accessToken) {
		throw new Error('Not authenticated');
	}

	const oauth2Client = new google.auth.OAuth2();
	oauth2Client.setCredentials({
		access_token: accessToken,
	});

	const drive = google.drive({ version: 'v3', auth: oauth2Client });

	const response = await drive.files.list({
		q: `name='${SPREADSHEET_ID}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
		spaces: 'drive',
		fields: 'files(id, name)',
		pageSize: 1,
	});

	if (response.data.files && response.data.files.length > 0) {
		return response.data.files[0].id || null;
	}

	return null;
}

export async function getOrCreateSpreadsheetByName(): Promise<string> {
	// Try to find existing spreadsheet
	const existingId = await getSpreadsheetIdByName();
	if (existingId) {
		return existingId;
	}

	// Create new spreadsheet if not found
	const accessToken = await getServerAccessToken();
	if (!accessToken) {
		throw new Error('Not authenticated');
	}

	const oauth2Client = new google.auth.OAuth2();
	oauth2Client.setCredentials({
		access_token: accessToken,
	});

	const sheetsAPI = google.sheets({ version: 'v4', auth: oauth2Client });

	const spreadsheet = await sheetsAPI.spreadsheets.create({
		requestBody: {
			properties: {
				title: SPREADSHEET_ID,
			},
			sheets: [
				{
					properties: {
						title: 'Data',
					},
				},
			],
		},
	});

	return spreadsheet.data.spreadsheetId!;
}

export async function ensureDataSheetExists(
	spreadsheetId: string
): Promise<void> {
	const sheets = await getSheetsClient();
	const spreadsheet = await sheets.spreadsheets.get({
		spreadsheetId,
	});

	const sheetExists = spreadsheet.data.sheets?.some(
		(sheet) => sheet.properties?.title === 'Data'
	);

	if (!sheetExists) {
		await sheets.spreadsheets.batchUpdate({
			spreadsheetId,
			requestBody: {
				requests: [
					{
						addSheet: {
							properties: {
								title: 'Data',
							},
						},
					},
				],
			},
		});
	}
}

export async function getSheetData(range: string) {
	const sheets = await getSheetsClient();
	const spreadsheetId = await getOrCreateSpreadsheetByName();

	// Ensure the Data sheet exists before trying to read
	await ensureDataSheetExists(spreadsheetId);

	const response = await sheets.spreadsheets.values.get({
		spreadsheetId,
		range,
	});

	return response.data.values || [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function appendRow(range: string, values: any[][]) {
	const sheets = await getSheetsClient();
	const spreadsheetId = await getOrCreateSpreadsheetByName();

	return sheets.spreadsheets.values.append({
		spreadsheetId,
		range,
		valueInputOption: 'USER_ENTERED',
		requestBody: { values },
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateRow(range: string, values: any[][]) {
	const sheets = await getSheetsClient();
	const spreadsheetId = await getOrCreateSpreadsheetByName();

	return sheets.spreadsheets.values.update({
		spreadsheetId,
		range,
		valueInputOption: 'USER_ENTERED',
		requestBody: { values },
	});
}
