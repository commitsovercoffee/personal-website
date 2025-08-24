// Loads a single markdown post by slug
export async function load({ params }) {
	const modules = import.meta.glob('/src/posts/*.md');

	const match = Object.entries(modules).find(([path]) => path.endsWith(`${params.slug}.md`));

	if (!match) {
		throw new Error(`Post not found: ${params.slug}`);
	}

	const resolver = match[1];
	const post = await resolver();

	return {
		slug: params.slug,
		...post.metadata,
		content: post.default // the compiled Svelte component from markdown
	};
}
