import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1F2A44] text-white py-6 px-4 sm:px-8 shrink-0 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col text-center md:text-left">
          <span className="font-bold text-lg">All Things School</span>
          <span className="text-[10px] text-white/50 uppercase tracking-widest">
            Inspiring Educators Daily • © 2026
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold uppercase tracking-wider text-white/70">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Classroom Decor
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-xs font-bold">
            FB
          </div>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-xs font-bold">
            IG
          </div>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[#F47C7C] flex items-center justify-center text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity"
          >
            P
          </a>
        </div>
      </div>
    </footer>
  );
}
