import { auth } from '@/lib/auth';
import { getSheetData } from '@/lib/sheets/operations';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function DashboardPage() {
	const session = await auth();
	const userData = await getSheetData('Sheet1!A:F');

	console.log(userData);
	// Skip header row and filter for current user (row-level security)
	userData.pop();

	return (
		<div className="container mx-auto p-6 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Dashboard</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Welcome, {session?.user?.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">{session?.user?.email}</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Your Data ({userData.length} items)</CardTitle>
				</CardHeader>
				<CardContent>
					{/* Render your data here */}
					<pre className="text-sm">{JSON.stringify(userData, null, 2)}</pre>
				</CardContent>
			</Card>
		</div>
	);
}
