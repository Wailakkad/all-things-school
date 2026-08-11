import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_ARTICLES } from '../../../data/blogsData';
import { SITE_URL } from '../../../lib/site';
import ArticlePage from './ArticlePage';

export function generateStaticParams() {
  return BLOG_ARTICLES.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find(a => a.slug === slug);
  if (!article) return {};

  const url = `${SITE_URL}/blog/${article.slug}`;

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      url,
      type: 'article',
      publishedTime: new Date(article.publishDate).toISOString(),
      authors: [article.author.name],
      tags: [article.category, article.theme, ...article.proTips],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find(a => a.slug === slug);
  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.summary,
    datePublished: new Date(article.publishDate).toISOString(),
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    keywords: [article.category, article.theme].join(', '),
    url: `${SITE_URL}/blog/${article.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlePage article={article} allArticles={BLOG_ARTICLES} />
    </>
  );
}
