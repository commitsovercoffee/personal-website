export async function load() {
	const modules = import.meta.glob('/src/posts/*.md', { eager: true });

	const posts = Object.entries(modules).map(([path, post]) => {
		const slug = path.split('/').pop().replace('.md', '');
		return { slug, ...(post.metadata ?? {}) };
	});

	posts.sort((a, b) => {
		// Pinned posts first
		if (a.pinned && !b.pinned) return -1;
		if (!a.pinned && b.pinned) return 1;
		// Then sort by position
		return (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER);
	});

	return { posts };
}
