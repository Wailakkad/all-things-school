'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Bookmark,
  Pin,
  Heart,
  CheckSquare,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Clock,
  SlidersHorizontal,
  Check,
  Plus,
  User
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogsData';
import { useSiteState } from '../lib/saved-context';

export default function HomePage() {
  const { activeTab, setActiveTab, isSaved, getLikes, toggleSave, savedCount } =
    useSiteState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [dailyChecklist, setDailyChecklist] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: '1', text: 'Set up Monday morning entrance bin', done: true },
    { id: '2', text: 'Restock pastel highlighters & dry erase markers', done: false },
    { id: '3', text: 'Update weekly learning objective board', done: true },
    { id: '4', text: 'Print 2026 classroom organization templates', done: false }
  ]);
  const [newCheckitem, setNewCheckitem] = useState('');

  const toggleChecklist = (id: string) => {
    setDailyChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const addCheckitem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCheckitem.trim()) return;
    setDailyChecklist(prev => [
      ...prev,
      { id: Date.now().toString(), text: newCheckitem.trim(), done: false }
    ]);
    setNewCheckitem('');
  };

  // Filter articles based on active tab, search query, and category filter
  const filteredArticles = BLOG_ARTICLES.filter(art => {
    const matchesTab =
      activeTab === 'Home'
        ? true
        : activeTab === 'Saved'
        ? isSaved(art.id)
        : art.category === activeTab;

    const matchesCategory =
      selectedCategory === 'All' ? true : art.category === selectedCategory;

    const matchesSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.overviewHtml.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-6">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-[#8FAF9A]/20 via-[#F47C7C]/10 to-[#F5EFE6] rounded-3xl p-6 sm:p-10 border border-white/60 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#F47C7C]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#8FAF9A]/20 rounded-full blur-2xl pointer-events-none" />

        <span className="inline-flex items-center gap-1.5 bg-white/80 text-[#1F2A44] text-xs font-bold px-3 py-1 rounded-full border border-[#1F2A44]/10 mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#F47C7C]" />
          Comprehensive Educational Blog & Lookbook 2026
        </span>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1F2A44] mb-3 leading-tight max-w-3xl">
          In-Depth Guides for Exceptional Classrooms
        </h2>

        <p className="text-sm sm:text-lg text-[#333333]/80 max-w-2xl mb-6 leading-relaxed">
          Read comprehensive, long-form articles with interactive budget planners, step-by-step setup guides, color palettes, and teacher community notes.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-xl bg-white p-2 rounded-2xl sm:rounded-full shadow-sm border border-[#1F2A44]/10 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 w-full">
            <Search className="w-4 h-4 text-[#1F2A44]/40" />
            <input
              type="text"
              placeholder="Search reading nook, budget calculator, rolling cart, nail art..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[#333333]/40 text-[#1F2A44]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#333333]/50 hover:text-[#1F2A44]"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('articles-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#1F2A44] hover:bg-[#1F2A44]/90 text-white px-6 py-2.5 rounded-xl sm:rounded-full font-bold text-sm flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 transition-all shadow-xs cursor-pointer"
          >
            <span>Explore Articles</span>
            <ArrowRight className="w-4 h-4 text-[#F47C7C]" />
          </button>
        </div>
      </section>

      {/* ANNOUNCEMENT / TEACHER TIP BANNER */}
      <div className="w-full bg-white/80 backdrop-blur-xs border-2 border-dashed border-[#1F2A44]/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8FAF9A]/20 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-[#8FAF9A]" />
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#1F2A44]/50 font-bold">
              Teacher Tip of the Day
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#1F2A44]">
              &quot;Long-form visual planning reduces classroom setup stress by over 60%. Take advantage of our interactive budget calculators!&quot;
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('Organization')}
          className="text-xs font-bold text-[#F47C7C] hover:text-[#1F2A44] flex items-center gap-1 shrink-0 bg-white px-3 py-1.5 rounded-lg border border-[#F47C7C]/20 cursor-pointer"
        >
          <span>View Organization Guides</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* MAIN LAYOUT GRID: ARTICLES + SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="articles-grid">
        {/* LEFT 3 COLUMNS: RICH BLOG POSTS GALLERY */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {/* Gallery Category Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#1F2A44]/5 shadow-2xs">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#8FAF9A]" />
              <h3 className="font-bold text-[#1F2A44] text-base">
                {activeTab === 'Home' ? 'All In-Depth Articles' : `${activeTab} Articles`}
              </h3>
              <span className="bg-[#F5EFE6] text-[#1F2A44] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {filteredArticles.length}
              </span>
            </div>

            {/* Sub-Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {['All', 'Classroom Decor', 'Organization', 'Nails'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-medium px-3 py-1 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#8FAF9A] text-white font-bold shadow-2xs'
                      : 'bg-[#F5EFE6] text-[#333333] hover:bg-[#1F2A44]/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles List/Grid */}
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#1F2A44]/5 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#1F2A44]">
                <Search className="w-6 h-6 text-[#F47C7C]" />
              </div>
              <h4 className="font-bold text-[#1F2A44] text-lg">No articles match your search</h4>
              <p className="text-xs text-[#333333]/70 max-w-md">
                Try adjusting your keywords or category filters to discover more in-depth teacher guides.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setActiveTab('Home');
                }}
                className="mt-2 bg-[#1F2A44] text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map(article => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="bg-white rounded-3xl p-5 border border-[#1F2A44]/5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1 relative"
                >
                  <div>
                    {/* Image Card Header */}
                    <div className={`h-40 ${article.imageBg} rounded-2xl mb-3 flex items-center justify-center relative overflow-hidden`}>
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="relative z-10 w-12 h-12 rounded-full bg-white/90 border border-white shadow-xs text-[#1F2A44] flex items-center justify-center font-bold text-sm tracking-tight group-hover:scale-110 transition-transform">
                        {article.badgeNumber}
                      </div>

                      {/* Category Overlay */}
                      <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#1F2A44] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/40">
                        {article.category}
                      </span>

                      {/* Read Time Tag */}
                      <span className="absolute bottom-2.5 left-2.5 bg-[#1F2A44]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#F47C7C]" />
                        {article.readTime}
                      </span>

                      {/* Bookmark Button */}
                      <button
                        onClick={e => {
                          e.preventDefault();
                          toggleSave(article.id);
                        }}
                        title={isSaved(article.id) ? 'Unpin article' : 'Pin this article'}
                        className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all cursor-pointer ${
                          isSaved(article.id)
                            ? 'bg-[#F47C7C] text-white shadow-xs'
                            : 'bg-white/80 text-[#1F2A44] hover:bg-white'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved(article.id) ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* Theme & Author Meta */}
                    <div className="flex items-center justify-between text-[11px] font-medium text-[#333333]/60 mb-2">
                      <span className="bg-[#F5EFE6] px-2 py-0.5 rounded-md font-semibold text-[#1F2A44]">
                        {article.theme}
                      </span>
                      <span className="flex items-center gap-1 text-[#8FAF9A] font-bold">
                        <User className="w-3 h-3" />
                        {article.author.name.split(',')[0]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-[#1F2A44] text-base mb-2 group-hover:text-[#F47C7C] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    {/* Summary Excerpt */}
                    <p className="text-xs text-[#333333]/70 line-clamp-3 leading-relaxed mb-4">
                      {article.summary}
                    </p>
                  </div>

                  {/* Article Footer */}
                  <div className="pt-3 border-t border-[#1F2A44]/5 flex items-center justify-between text-xs">
                    <span className="text-[#333333]/60 font-medium flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#F47C7C] fill-[#F47C7C]/20" />
                      {getLikes(article.id, article.likes)} saves
                    </span>
                    <span className="text-[#F47C7C] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PINTEREST COMMUNITY & DAILY CHECKLIST SIDEBAR */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          {/* Save on Pinterest Card */}
          <div className="bg-[#8FAF9A] rounded-3xl p-6 flex flex-col justify-center items-center text-center text-white shadow-xs relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <span className="text-3xl mb-2">📌</span>
            <h3 className="font-bold text-lg leading-tight mb-2">
              Save on Pinterest
            </h3>
            <p className="text-xs opacity-90 mb-5 leading-relaxed">
              Join 50k+ teachers saving our daily long-form school inspiration guides and budget templates.
            </p>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#8FAF9A] hover:bg-[#F5EFE6] px-4 py-2.5 rounded-xl text-xs font-bold w-full uppercase tracking-wider text-center shadow-xs transition-colors"
            >
              Join Community
            </a>
          </div>

          {/* Daily Classroom Prep Checklist Widget */}
          <div className="bg-white rounded-3xl p-5 border border-[#1F2A44]/5 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F2A44]/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F47C7C]/15 flex items-center justify-center text-[#F47C7C]">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-[#1F2A44] text-sm">Teacher Prep List</h4>
              </div>
              <span className="text-[10px] bg-[#F5EFE6] text-[#1F2A44] px-2 py-0.5 rounded-full font-bold">
                {dailyChecklist.filter(c => c.done).length}/{dailyChecklist.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {dailyChecklist.map(item => (
                <label
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer text-xs ${
                    item.done
                      ? 'bg-[#8FAF9A]/10 border-[#8FAF9A]/30 text-[#333333]/60 line-through'
                      : 'bg-[#F5EFE6]/50 border-transparent text-[#1F2A44] hover:bg-[#F5EFE6]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      item.done
                        ? 'bg-[#8FAF9A] text-white'
                        : 'border-2 border-[#1F2A44]/30 bg-white'
                    }`}
                  >
                    {item.done && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="leading-tight font-medium">{item.text}</span>
                </label>
              ))}
            </div>

            <form onSubmit={addCheckitem} className="flex gap-2 pt-2 border-t border-[#1F2A44]/5">
              <input
                type="text"
                placeholder="Add custom task..."
                value={newCheckitem}
                onChange={e => setNewCheckitem(e.target.value)}
                className="flex-grow bg-[#F5EFE6] text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8FAF9A] placeholder:text-[#333333]/40"
              />
              <button
                type="submit"
                className="bg-[#1F2A44] text-white p-2 rounded-xl hover:bg-[#1F2A44]/90 transition-colors shrink-0 cursor-pointer"
                title="Add Task"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
