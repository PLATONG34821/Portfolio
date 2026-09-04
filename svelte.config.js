import adapterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: true
	},
	kit: {
		adapter: adapterStatic({ fallback: '404.html' })
	}
};

export default config;
