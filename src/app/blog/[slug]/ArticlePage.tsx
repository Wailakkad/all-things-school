'use client';

import { useRouter } from 'next/navigation';
import BlogDetail from '../../../components/BlogDetail';
import { useSiteState } from '../../../lib/saved-context';
import { BlogArticle } from '../../../types';

export default function ArticlePage({
  article,
  allArticles,
}: {
  article: BlogArticle;
  allArticles: BlogArticle[];
}) {
  const router = useRouter();
  const { isSaved, getLikes, toggleSave } = useSiteState();

  const liveArticle: BlogArticle = {
    ...article,
    saved: isSaved(article.id),
    likes: getLikes(article.id, article.likes),
  };

  return (
    <BlogDetail
      article={liveArticle}
      allArticles={allArticles}
      onBack={() => router.push('/')}
      onSelectArticle={a => router.push(`/blog/${a.slug}`)}
      onToggleSave={() => toggleSave(article.id)}
    />
  );
}
