export async function load({ params }) {
	const post = await import(`../../../posts/${params.slug}.md`);
	return {
		title: post.metadata.title,
		desc: post.metadata.desc,
		tags: post.metadata.tags,
		date: post.metadata.date,
		content: post.default
	};
}
