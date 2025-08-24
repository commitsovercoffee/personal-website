import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

const mdsvexOptions = {
	extensions: ['.md']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	preprocess: [mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
