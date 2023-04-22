import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get() {
  return rss({
    title: 'Commits over coffee | Blog',
    description: 'Shower thougths...',
    site: 'https://commitsovercoffee.netlify.app/',
    items: await pagesGlobToRssItems(import.meta.glob('../posts/**/*.md')),
    customData: `<language>en-us</language>`,
  });
}
