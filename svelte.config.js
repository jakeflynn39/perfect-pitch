import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: vercel()
	},

	paths: {
		$lib: ['/src/lib'],
		$api: ['/src/routes/api'],
		$static: ['/src/static']
	}
};

export default config;
