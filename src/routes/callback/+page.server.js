import { env } from '$env/dynamic/private';

const artist11 = {
	id: '06HL4z0CvFAxyc27GXpf02',
	name: 'Taylor Swift'
};
const artist12 = {
	id: '55Aa2cqylxrFIXC767Z865',
	name: 'Lil Wayne'
};
const artist13 = {
	id: '7c0XG5cIJTrrAgEC3ULPiq',
	name: 'Ty Dolla $ign'
};
const artist14 = {
	id: '2YZyLoL8N0Wb9xBt1NhZWg',
	name: 'Kendrick Lamar'
};
const artist15 = {
	id: '1RyvyyTE3xzB2ZywiAwp0i',
	name: 'Future'
};
const artist16 = {
	id: '5ndkK3dpZLKtBklKjxNQwT',
	name: 'B.o.B'
};

export async function load(event) {
	const searchParams = event.url.searchParams;
	const code = searchParams.get('code');
	const state = searchParams.get('state');
	const clientId = env.CLIENT_ID;
	const clientSecret = env.CLIENT_SECRET;
	const redirectUri = env.CALLBACK_URL;
	console.log(redirectUri, 'redirectUri');

	// get the access token
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
		},
		body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
			redirectUri
		)}`
	});
	const data = await response.json();
	const accessToken = data.access_token;

	return {
		accessToken: accessToken,
		topArtists: [artist11, artist12, artist13],
		sideArtists: [artist14, artist15, artist16]
	};
}
