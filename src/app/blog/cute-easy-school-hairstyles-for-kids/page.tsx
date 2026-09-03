import type { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site';
import HairstylesArticle from './HairstylesArticle';

const ARTICLE = {
  title: '30 Cute Easy School Hairstyles for Kids (5-Minute, No-Heat Styles for Busy Mornings)',
  slug: 'cute-easy-school-hairstyles-for-kids',
  description:
    'Need cute easy hairstyles for school for kids? Explore 30 quick 5-minute, no-heat school hairstyles\u2014braids, ponytails, buns, and more for busy mornings.',
  publishDate: 'September 03, 2026',
  author: 'Sarah Jenkins, M.Ed.',
  authorRole: '3rd Grade Educator & Parenting Contributor',
  coverImage: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788467130/Design_school_hairstyles_blog_cover_202609032224.jpg',
};

export const metadata: Metadata = {
  title: ARTICLE.title,
  description: ARTICLE.description,
  alternates: { canonical: `/blog/${ARTICLE.slug}` },
  openGraph: {
    title: ARTICLE.title,
    description: ARTICLE.description,
    url: `${SITE_URL}/blog/${ARTICLE.slug}`,
    type: 'article',
    publishedTime: new Date(ARTICLE.publishDate).toISOString(),
    authors: [ARTICLE.author],
    tags: ['Teacher Hacks', 'Back to School', 'Kids Hairstyles', 'No-Heat Styles', '5-Minute Hairstyles'],
    images: [
      {
        url: ARTICLE.coverImage,
        width: 1200,
        height: 675,
        alt: '30 Cute Easy School Hairstyles for Kids',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE.title,
    description: ARTICLE.description,
  },
};

export default function HairstylesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: ARTICLE.title,
    description: ARTICLE.description,
    datePublished: new Date(ARTICLE.publishDate).toISOString(),
    author: {
      '@type': 'Person',
      name: ARTICLE.author,
      jobTitle: ARTICLE.authorRole,
    },
    keywords: 'cute easy hairstyles for school for kids, no-heat hairstyles, 5-minute hairstyles, kids school hair',
    url: `${SITE_URL}/blog/${ARTICLE.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${ARTICLE.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HairstylesArticle />
    </>
  );
}
