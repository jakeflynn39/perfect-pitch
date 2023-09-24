import { env } from '$env/dynamic/private';

const clientId = env.CLIENT_ID;
const redirectUri = env.CALLBACK_URL;
const scope = 'user-read-private user-read-email';

const state =
	Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
	redirectUri
)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;

export async function GET() {
	const returnData = {
		status: 302,
		headers: {
			location: authUrl
		}
	};

	const response = new Response(JSON.stringify(returnData), {
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return response;
}
