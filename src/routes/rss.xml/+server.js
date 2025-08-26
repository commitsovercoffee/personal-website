import { Feed } from 'feed';

export const prerender = true;

export async function GET() {
	const feed = new Feed({
		title: 'CommitsOverCoffee',
		description: "Sourav's Blog Feed",
		id: 'https://commitsovercoffee.com',
		link: 'https://commitsovercoffee.com',
		language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
		copyright: `Copyright ${new Date().getFullYear().toString()}, commitsovercoffee`,
		generator: '💾', // optional, default = 'Feed for Node.js'
		feedLinks: {
			rss: 'https://commitsovercoffee.com/rss.xml'
		},
		author: {
			name: 'Sourav Singh',
			email: 'commitsovercoffee@gmail.com',
			link: 'https://commitsovercoffee.com'
		},
		ttl: 60
	});

	const modules = import.meta.glob('/src/posts/*.md', { eager: true });
	const posts = Object.entries(modules).map(([path, post]) => {
		const slug = path.split('/').pop().replace('.md', '');
		return { slug, ...(post.metadata ?? {}) };
	});

	for (const post of posts) {
		feed.addItem({
			title: post.title,
			description: post.desc,
			content: `<p>${post.desc}</p>`,
			link: `https://commitsovercoffee.com/blog/${post.slug}`,
			author: [
				{
					name: 'Sourav Singh',
					email: 'commitsovercoffee@gmail.com',
					link: 'https://commitsovercoffee.com'
				}
			],
			date: new Date(post.date)
		});
	}

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
