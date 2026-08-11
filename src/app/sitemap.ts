import type { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from '../data/blogsData';
import { SITE_URL } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const articleEntries: MetadataRoute.Sitemap = BLOG_ARTICLES.map(article => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articleEntries,
  ];
}
