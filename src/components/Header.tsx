'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Bookmark, Pin } from 'lucide-react';
import { TabId, useSiteState } from '../lib/saved-context';

interface HeaderProps {
  onOpenWelcome: () => void;
}

export default function Header({ onOpenWelcome }: HeaderProps) {
  const { activeTab, setActiveTab, savedCount } = useSiteState();

  const navTabs: TabId[] = ['Home', 'Classroom Decor', 'Organization', 'Nails'];

  return (
    <header className="bg-white border-b-2 border-[#1F2A44]/10 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="bg-[#F47C7C] w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
            A
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl text-[#1F2A44] tracking-tight leading-tight">
              All Things School
            </h1>
            <span className="text-[10px] text-[#8FAF9A] font-semibold tracking-wider uppercase hidden sm:inline-block">
              Long-Form Teacher Guides 2026
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navTabs.map(tab => (
            <Link
              key={tab}
              href="/"
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium transition-colors px-1 py-1 relative cursor-pointer ${
                activeTab === tab
                  ? 'text-[#F47C7C] font-bold'
                  : 'text-[#333333] hover:text-[#F47C7C]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F47C7C] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWelcome}
            className="hidden lg:flex items-center gap-1.5 bg-[#F5EFE6] hover:bg-[#1F2A44]/10 text-[#1F2A44] px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border border-[#1F2A44]/10"
            title="Show Welcome Offer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F47C7C]" />
            <span>Welcome Guide</span>
          </button>

          <Link
            href="/"
            onClick={() => setActiveTab('Saved')}
            className="bg-[#8FAF9A]/15 text-[#1F2A44] hover:bg-[#8FAF9A]/25 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#8FAF9A] fill-[#8FAF9A]" />
            <span>Saved Pins ({savedCount})</span>
          </Link>

          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F47C7C] text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xs hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <Pin className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline">Follow on Pinterest</span>
            <span className="sm:hidden">Pinterest</span>
          </a>
        </div>
      </div>

      {/* Mobile Navigation Row */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 bg-white border-t border-[#1F2A44]/5 gap-2 scrollbar-none">
        {([...navTabs, 'Saved'] as TabId[]).map(tab => (
          <Link
            key={tab}
            href="/"
            onClick={() => setActiveTab(tab)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-[#1F2A44] text-white'
                : 'bg-[#F5EFE6] text-[#333333]'
            }`}
          >
            {tab} {tab === 'Saved' && `(${savedCount})`}
          </Link>
        ))}
      </div>
    </header>
  );
}
