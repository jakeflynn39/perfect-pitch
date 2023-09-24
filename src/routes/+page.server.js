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

export async function load() {
	return {
		topArtists: [artist11, artist12, artist13],
		sideArtists: [artist14, artist15, artist16]
	};
}
