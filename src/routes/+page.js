export async function load() {
	const modules = import.meta.glob('/src/posts/*.md', { eager: true });

	let posts = Object.entries(modules).map(([path, post]) => {
		const slug = path.split('/').pop().replace('.md', '');
		return { slug, ...post.metadata };
	});

	// Split pinned and unpinned, sort by position
	const pinned = posts
		.filter((p) => p.pinned)
		.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

	const unpinned = posts
		.filter((p) => !p.pinned)
		.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

	posts = [...pinned, ...unpinned];

	return { posts };
}
