// src/routes/+page.js
export async function load() {
	// Load all markdown files eagerly (no need for Promise.all + resolver calls)
	const modules = import.meta.glob('/src/posts/*.md', { eager: true });

	const posts = Object.entries(modules).map(([path, post]) => {
		const slug = path.split('/').pop().replace('.md', '');
		return { slug, ...post.metadata };
	});

	// Sort newest first
	posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	return { posts };
}
