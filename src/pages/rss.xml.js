import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('./**/*.mdx', { eager: true });
const posts = Object.values(postImportResult);

const nonDraftPosts = posts.filter((post) => !post.frontmatter.draft);
const nonDraftSortedPosts = nonDraftPosts.sort((a, b) => {
  return new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate)
})

export const get = () => rss({
    title: 'Преживявания близки до смъртта',
    description: 'Преживявания близки до смъртта',
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: import.meta.env.SITE,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    // items: import.meta.glob(['./*.mdx', './pages/*.mdx', './nde/*.mdx', './nde/bg/*.mdx']),
    items: nonDraftSortedPosts.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: post.frontmatter.pubDate,
    })),
    stylesheet: '/rss/styles.xsl',
    // (optional) inject custom xml
    customData: `<language>bg</language>`,
  });
