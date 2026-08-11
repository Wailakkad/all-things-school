import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Heart,
  Bookmark,
  Share2,
  Check,
  Copy,
  DollarSign,
  Palette,
  CheckSquare,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Send,
  Pin,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { BlogArticle, BlogComment } from '../types';

interface BlogDetailProps {
  article: BlogArticle;
  allArticles: BlogArticle[];
  onBack: () => void;
  onSelectArticle: (article: BlogArticle) => void;
  onToggleSave: (id: string) => void;
}

export default function BlogDetail({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  onToggleSave
}: BlogDetailProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [likes, setLikes] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<BlogComment[]>(article.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentRole, setNewCommentRole] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMaterials, setCopiedMaterials] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Sync state if article changes
  useEffect(() => {
    setLikes(article.likes);
    setHasLiked(false);
    setComments(article.comments || []);
    setCheckedMaterials({});
    setCompletedSteps({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article]);

  // Track Reading Progress Bar on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Material checklist toggling
  const toggleMaterial = (matName: string) => {
    setCheckedMaterials(prev => ({ ...prev, [matName]: !prev[matName] }));
  };

  // Step completion toggling
  const toggleStep = (idx: number) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Calculate budget
  const calculateBudget = () => {
    let total = 0;
    let remaining = 0;
    article.materials.forEach(item => {
      const priceNum = parseFloat(item.estimatedPrice.replace(/[^0-9.]/g, '')) || 0;
      total += priceNum;
      if (!checkedMaterials[item.name]) {
        remaining += priceNum;
      }
    });
    return { total: total.toFixed(2), remaining: remaining.toFixed(2) };
  };

  const budgetInfo = calculateBudget();

  // Copy article link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Copy materials list
  const handleCopyMaterials = () => {
    const text = article.materials
      .map(
        m => `- ${m.name} (${m.estimatedPrice}) [${m.essential ? 'Essential' : 'Optional'}]`
      )
      .join('\n');
    navigator.clipboard.writeText(`Materials for ${article.title}:\n\n${text}`);
    setCopiedMaterials(true);
    setTimeout(() => setCopiedMaterials(false), 2500);
  };

  // Toggle Like
  const handleLikeToggle = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  // Post Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: BlogComment = {
      id: Date.now().toString(),
      author: newCommentAuthor.trim() || 'Fellow Educator',
      role: newCommentRole.trim() || 'Classroom Teacher',
      avatarBg: 'bg-[#F47C7C]',
      date: 'Just now',
      text: newCommentText.trim(),
      likes: 1
    };

    setComments(prev => [newComment, ...prev]);
    setNewCommentText('');
    setNewCommentAuthor('');
    setNewCommentRole('');
  };

  // Comment Upvote
  const handleUpvoteComment = (commentId: string) => {
    setComments(prev =>
      prev.map(c => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  // Related Articles
  const relatedArticles = allArticles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#333333] pb-16 relative">
      {/* SCROLL READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#1F2A44]/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#F47C7C] via-[#8FAF9A] to-[#1F2A44] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-6">
        {/* BREADCRUMB & BACK ACTION */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-white text-[#1F2A44] hover:bg-[#1F2A44] hover:text-white px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-2xs border border-[#1F2A44]/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(article.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                article.saved
                  ? 'bg-[#F47C7C] text-white shadow-2xs'
                  : 'bg-white text-[#1F2A44] hover:bg-[#F5EFE6] border border-[#1F2A44]/10'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${article.saved ? 'fill-white' : ''}`} />
              <span>{article.saved ? 'Saved Pin' : 'Save Article'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 bg-white text-[#1F2A44] hover:bg-[#1F2A44] hover:text-white px-3.5 py-2 rounded-full text-xs font-bold transition-all border border-[#1F2A44]/10"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#8FAF9A]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* HERO ARTICLE HEADER CARD */}
        <header className="bg-white rounded-3xl p-6 sm:p-10 border border-[#1F2A44]/10 shadow-xs mb-8 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8FAF9A]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Cover Image */}
          <div className="relative w-full h-48 sm:h-72 rounded-2xl overflow-hidden border border-[#1F2A44]/10 shadow-2xs">
            <img
              src={article.coverImage}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#1F2A44] text-xs font-bold px-3 py-1 rounded-full border border-white/60 shadow-2xs">
              {article.badgeNumber} • {article.category}
            </span>
          </div>

          {/* Meta Tags */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="bg-[#8FAF9A] text-white px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <span className="bg-[#F5EFE6] text-[#1F2A44] px-3 py-1 rounded-full border border-[#1F2A44]/10">
              {article.theme}
            </span>
            <span className="bg-[#F47C7C]/15 text-[#F47C7C] px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1F2A44] leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-[#333333]/80 leading-relaxed max-w-3xl font-medium">
            {article.summary}
          </p>

          {/* Author & Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1F2A44]/10 text-xs text-[#333333]/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1F2A44] text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                {article.author.avatar}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#1F2A44] text-sm">{article.author.name}</span>
                <span className="text-[11px] text-[#333333]/60">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 font-semibold text-[#1F2A44]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8FAF9A]" />
                {article.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#F47C7C]" />
                Prep: {article.prepTime}
              </span>
              <span>•</span>
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  hasLiked ? 'bg-[#F47C7C] text-white' : 'bg-[#F5EFE6] text-[#1F2A44] hover:bg-[#F47C7C]/20'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : 'text-[#F47C7C]'}`} />
                <span>{likes} Helpful Votes</span>
              </button>
            </div>
          </div>
        </header>

        {/* STICKY QUICK-JUMP NAVIGATION MENU */}
        <nav className="bg-white/90 backdrop-blur-md rounded-2xl p-2 border border-[#1F2A44]/10 shadow-2xs mb-8 sticky top-16 z-20 overflow-x-auto flex items-center gap-2 scrollbar-none text-xs font-bold text-[#1F2A44]">
          <span className="px-3 text-[#333333]/40 uppercase text-[10px] tracking-widest hidden sm:inline-block">
            Jump To:
          </span>
          {[
            { id: 'overview', label: '1. Overview & Research' },
            { id: 'colors', label: '2. Palette' },
            { id: 'calculator', label: '3. Budget Calculator' },
            { id: 'steps', label: '4. Step-by-Step Guide' },
            { id: 'hacks', label: '5. Teacher Hacks' },
            { id: 'sel', label: '6. SEL Impact' },
            { id: 'discussion', label: `7. Community (${comments.length})` }
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
                const el = document.getElementById(sec.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-[#1F2A44] text-white shadow-2xs'
                  : 'bg-[#F5EFE6] text-[#333333] hover:bg-[#8FAF9A]/20'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </nav>

        {/* ARTICLE BODY & SIDEBAR CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN ARTICLE CONTENT (2 COLS) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* SECTION 1: OVERVIEW & BACKGROUND */}
            <section id="overview" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8FAF9A] uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4 text-[#F47C7C]" />
                Section 1 • Educational Philosophy & Context
              </div>
              <h2 className="text-2xl font-bold text-[#1F2A44] mb-4">
                Why This Setup Transforms Classroom Dynamics
              </h2>
              <div
                className="prose prose-slate max-w-none text-sm text-[#333333] leading-relaxed space-y-4 font-normal"
                dangerouslySetInnerHTML={{ __html: article.overviewHtml }}
              />
            </section>

            {/* SECTION 2: COLOR PALETTE BREAKDOWN */}
            <section id="colors" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F47C7C] uppercase tracking-wider mb-3">
                <Palette className="w-4 h-4" />
                Section 2 • Visual Aesthetics & Color Psychology
              </div>
              <h2 className="text-2xl font-bold text-[#1F2A44] mb-2">
                The Color Palette Formula
              </h2>
              <p className="text-xs text-[#333333]/70 mb-6">
                Colors directly influence student nervous system regulation. Using low-contrast neutral bases paired with serene accent tones minimizes visual clutter and reduces fatigue.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {article.colorPalette.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-3 rounded-2xl border border-[#1F2A44]/10 bg-[#F5EFE6]/50 text-center"
                  >
                    <div
                      className="w-12 h-12 rounded-xl mb-2 shadow-inner border border-white"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-bold text-xs text-[#1F2A44]">{color.name}</span>
                    <span className="text-[10px] text-[#333333]/60 font-mono mt-0.5">{color.hex}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: INTERACTIVE BUDGET CALCULATOR & MATERIALS CHECKLIST */}
            <section id="calculator" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/5 shadow-2xs">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1F2A44] uppercase tracking-wider">
                  <DollarSign className="w-4 h-4 text-[#8FAF9A]" />
                  Section 3 • Interactive Classroom Budget & Sourcing
                </div>

                <button
                  onClick={handleCopyMaterials}
                  className="text-xs font-bold text-[#F47C7C] hover:text-[#1F2A44] flex items-center gap-1 cursor-pointer"
                >
                  {copiedMaterials ? <Check className="w-3.5 h-3.5 text-[#8FAF9A]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMaterials ? 'List Copied!' : 'Copy Materials List'}</span>
                </button>
              </div>

              <h2 className="text-2xl font-bold text-[#1F2A44] mb-2">
                Materials & Budget Planner
              </h2>
              <p className="text-xs text-[#333333]/70 mb-5">
                Check off any items you already own in your classroom closet to automatically calculate your remaining out-of-pocket budget.
              </p>

              {/* Real-time Budget Counter Bar */}
              <div className="bg-[#8FAF9A]/15 border border-[#8FAF9A]/30 p-4 rounded-2xl mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#333333]/70 block font-medium">Estimated Full Cost:</span>
                  <span className="text-lg font-bold text-[#1F2A44]">${budgetInfo.total}</span>
                </div>
                <div className="h-8 w-px bg-[#8FAF9A]/30 hidden sm:block" />
                <div>
                  <span className="text-[#333333]/70 block font-medium">Already Owned Items:</span>
                  <span className="text-lg font-bold text-[#8FAF9A]">
                    {Object.values(checkedMaterials).filter(Boolean).length} of {article.materials.length}
                  </span>
                </div>
                <div className="h-8 w-px bg-[#8FAF9A]/30 hidden sm:block" />
                <div className="bg-white px-4 py-2 rounded-xl shadow-2xs text-center w-full sm:w-auto">
                  <span className="text-[10px] uppercase font-bold text-[#F47C7C] block">Your Remaining Budget:</span>
                  <span className="text-xl font-bold text-[#1F2A44]">${budgetInfo.remaining}</span>
                </div>
              </div>

              {/* Interactive Materials List */}
              <div className="flex flex-col gap-2.5">
                {article.materials.map((mat, i) => {
                  const isChecked = !!checkedMaterials[mat.name];
                  return (
                    <div
                      key={i}
                      onClick={() => toggleMaterial(mat.name)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#8FAF9A]/10 border-[#8FAF9A]/40 opacity-70 line-through'
                          : 'bg-[#F5EFE6]/40 border-[#1F2A44]/5 hover:bg-[#F5EFE6]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                            isChecked
                              ? 'bg-[#8FAF9A] text-white border-[#8FAF9A]'
                              : 'bg-white border-[#1F2A44]/30'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div>
                          <span className="text-xs font-bold text-[#1F2A44] block leading-tight">
                            {mat.name}
                          </span>
                          <span className="text-[10px] text-[#333333]/60">
                            Source: {mat.source}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-right shrink-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            mat.essential
                              ? 'bg-[#F47C7C]/20 text-[#F47C7C]'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {mat.essential ? 'Essential' : 'Optional'}
                        </span>
                        <span className="font-bold text-xs text-[#1F2A44]">{mat.estimatedPrice}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 4: DETAILED STEP-BY-STEP IMPLEMENTATION */}
            <section id="steps" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8FAF9A] uppercase tracking-wider">
                  <CheckSquare className="w-4 h-4 text-[#1F2A44]" />
                  Section 4 • Detailed Step-by-Step Implementation
                </div>
                <span className="text-xs font-bold text-[#1F2A44] bg-[#F5EFE6] px-3 py-1 rounded-full">
                  {Object.values(completedSteps).filter(Boolean).length}/{article.detailedSteps.length} Steps Done
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#1F2A44] mb-2">
                Execution Blueprint
              </h2>
              <p className="text-xs text-[#333333]/70 mb-6">
                Follow these precise instructions in sequence for optimal structural stability and classroom flow.
              </p>

              <div className="flex flex-col gap-6">
                {article.detailedSteps.map((step, idx) => {
                  const isDone = !!completedSteps[idx];
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-3xl border transition-all ${
                        isDone
                          ? 'bg-[#8FAF9A]/10 border-[#8FAF9A]/30'
                          : 'bg-white border-[#1F2A44]/10 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-2xl bg-[#1F2A44] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                            0{idx + 1}
                          </span>
                          <h3 className="font-bold text-base text-[#1F2A44]">
                            {step.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => toggleStep(idx)}
                          className={`text-xs font-bold px-3 py-1 rounded-xl transition-colors cursor-pointer shrink-0 ${
                            isDone
                              ? 'bg-[#8FAF9A] text-white'
                              : 'bg-[#F5EFE6] text-[#1F2A44] hover:bg-[#1F2A44]/10'
                          }`}
                        >
                          {isDone ? '✓ Completed' : 'Mark Done'}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-[#333333]/80 leading-relaxed mb-4 pl-11">
                        {step.description}
                      </p>

                      {step.proTip && (
                        <div className="ml-11 bg-[#F47C7C]/10 border-l-4 border-[#F47C7C] p-3 rounded-r-2xl text-xs text-[#1F2A44] flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-[#F47C7C] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">Pro Teacher Advice:</span>
                            <span>{step.proTip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 5: PRO TIPS & COMMON PITFALLS */}
            <section id="hacks" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F47C7C] uppercase tracking-wider mb-3">
                <Lightbulb className="w-4 h-4" />
                Section 5 • Classroom Management Hacks & Pitfalls
              </div>
              <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">
                Expert Advice from Veteran Educators
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Pro Tips Column */}
                <div className="bg-[#8FAF9A]/15 rounded-3xl p-5 border border-[#8FAF9A]/30">
                  <h3 className="font-bold text-[#1F2A44] text-base mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#8FAF9A] stroke-[3]" />
                    Top Teacher Hacks
                  </h3>
                  <ul className="flex flex-col gap-2.5 text-xs text-[#333333]">
                    {article.proTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-white">
                        <span className="text-[#8FAF9A] font-bold">•</span>
                        <span className="leading-snug">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pitfalls Column */}
                <div className="bg-[#F47C7C]/15 rounded-3xl p-5 border border-[#F47C7C]/30">
                  <h3 className="font-bold text-[#1F2A44] text-base mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#F47C7C]" />
                    Pitfalls to Avoid
                  </h3>
                  <ul className="flex flex-col gap-2.5 text-xs text-[#333333]">
                    {article.commonPitfalls.map((pitfall, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-white">
                        <span className="text-[#F47C7C] font-bold">•</span>
                        <span className="leading-snug">{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 6: SEL & BEHAVIORAL IMPACT */}
            <section id="sel" className="bg-gradient-to-r from-[#1F2A44] to-[#1F2A44]/90 text-white rounded-3xl p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-bold text-[#8FAF9A] uppercase tracking-widest block mb-2">
                Section 6 • Social-Emotional Learning
              </span>
              <h2 className="text-2xl font-bold text-white mb-3">
                Impact on Student Well-Being
              </h2>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl">
                {article.selImpact}
              </p>
            </section>

            {/* SECTION 7: COMMUNITY DISCUSSION & COMMENTS */}
            <section id="discussion" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F2A44]/5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4 text-[#F47C7C]" />
                Section 7 • Teacher Community Discussion
              </div>
              <h2 className="text-2xl font-bold text-[#1F2A44] mb-6">
                Teacher Q&A & Experiences ({comments.length})
              </h2>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="bg-[#F5EFE6] p-4 sm:p-5 rounded-2xl border border-[#1F2A44]/10 mb-8 flex flex-col gap-3">
                <h3 className="font-bold text-xs text-[#1F2A44] uppercase tracking-wider">
                  Join the Conversation & Share Your Idea
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Sarah M.)"
                    value={newCommentAuthor}
                    onChange={e => setNewCommentAuthor(e.target.value)}
                    className="bg-white text-xs px-3 py-2 rounded-xl border border-[#1F2A44]/10 focus:outline-none focus:ring-1 focus:ring-[#8FAF9A]"
                  />
                  <input
                    type="text"
                    placeholder="Grade / Role (e.g. 4th Grade Teacher)"
                    value={newCommentRole}
                    onChange={e => setNewCommentRole(e.target.value)}
                    className="bg-white text-xs px-3 py-2 rounded-xl border border-[#1F2A44]/10 focus:outline-none focus:ring-1 focus:ring-[#8FAF9A]"
                  />
                </div>

                <textarea
                  rows={3}
                  placeholder="Share how you modified this guide in your classroom or ask a question..."
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  className="bg-white text-xs p-3 rounded-xl border border-[#1F2A44]/10 focus:outline-none focus:ring-1 focus:ring-[#8FAF9A] w-full"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#1F2A44] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#1F2A44]/90 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Teacher Note</span>
                  </button>
                </div>
              </form>

              {/* Comments Stream */}
              <div className="flex flex-col gap-4">
                {comments.map(comm => (
                  <div key={comm.id} className="p-4 rounded-2xl bg-[#F5EFE6]/40 border border-[#1F2A44]/5 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${comm.avatarBg} text-white font-bold flex items-center justify-center text-xs`}>
                          {comm.author.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-xs text-[#1F2A44] block leading-tight">{comm.author}</span>
                          <span className="text-[10px] text-[#333333]/60">{comm.role} • {comm.date}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleUpvoteComment(comm.id)}
                        className="text-[11px] text-[#1F2A44] font-bold bg-white px-2.5 py-1 rounded-full border border-[#1F2A44]/10 hover:bg-[#F47C7C]/10 flex items-center gap-1 cursor-pointer"
                      >
                        <ThumbsUp className="w-3 h-3 text-[#F47C7C]" />
                        <span>{comm.likes}</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#333333]/80 leading-relaxed pl-10">
                      {comm.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR (1 COL) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Quick Action Widget */}
            <div className="bg-white rounded-3xl p-5 border border-[#1F2A44]/10 shadow-2xs flex flex-col gap-4 sticky top-32">
              <h3 className="font-bold text-[#1F2A44] text-sm flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#F47C7C]" />
                Save & Share This Guide
              </h3>

              <p className="text-xs text-[#333333]/70">
                Save this full tutorial to your teacher board or export the materials checklist to your school drive.
              </p>

              <button
                onClick={() => onToggleSave(article.id)}
                className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  article.saved
                    ? 'bg-[#8FAF9A] text-white shadow-2xs'
                    : 'bg-[#F47C7C] text-white hover:opacity-90 shadow-2xs'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${article.saved ? 'fill-white' : ''}`} />
                <span>{article.saved ? 'Saved in Your Pins' : 'Save To Board'}</span>
              </button>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1F2A44] text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1F2A44]/90"
              >
                <Pin className="w-4 h-4 fill-white" />
                <span>Pin to Pinterest</span>
              </a>

              <hr className="border-[#1F2A44]/10 my-1" />

              {/* Author Bio Card */}
              <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#1F2A44]/5 flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1F2A44] text-white font-bold flex items-center justify-center text-xs">
                    {article.author.avatar}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#1F2A44] block leading-tight">{article.author.name}</span>
                    <span className="text-[10px] text-[#333333]/60">{article.author.role}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#333333]/70 leading-relaxed italic">
                  "Dedicated to creating low-stress, high-engagement classroom environments for educators everywhere."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED ARTICLES SLIDER AT BOTTOM */}
        <div className="mt-12 pt-8 border-t border-[#1F2A44]/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#8FAF9A] uppercase tracking-wider block">
                Keep Exploring
              </span>
              <h2 className="text-2xl font-bold text-[#1F2A44]">
                More School Inspiration Articles
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold text-[#F47C7C] hover:text-[#1F2A44] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Guides</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="bg-white rounded-3xl p-4 border border-[#1F2A44]/5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className={`h-28 ${rel.imageBg} rounded-2xl mb-3 flex items-center justify-center relative`}>
                    <span className="w-10 h-10 rounded-full bg-white text-[#1F2A44] font-bold text-xs flex items-center justify-center shadow-2xs">
                      {rel.badgeNumber}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#F47C7C] uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h3 className="font-bold text-sm text-[#1F2A44] group-hover:text-[#F47C7C] transition-colors line-clamp-2 mb-1.5">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#333333]/60 line-clamp-2 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#1F2A44]/5 flex items-center justify-between text-[11px] font-bold text-[#8FAF9A]">
                  <span>{rel.readTime}</span>
                  <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Read Guide <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
