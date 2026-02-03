import { z } from 'zod';

const envSchema = z.object({
	GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
	GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
	NEXTAUTH_URL: z.url('NEXTAUTH_URL must be a valid URL'),
	NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
	SPREADSHEET_ID: z.string().min(1, 'SPREADSHEET_ID is required'),
});

export type Env = z.infer<typeof envSchema>;

const env = envSchema.parse(process.env);

console.log(env);

export default env;
