import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, GraduationCap, CheckCircle2, Bookmark, Palette } from 'lucide-react';
import { ADSTERA_SMART_LINK } from '../lib/site';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomePopup({ isOpen, onClose }: WelcomePopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#1F2A44]/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-white/80 z-10 overflow-hidden flex flex-col gap-6 text-[#333333]"
          >
            {/* Ambient Background Decorative Glows */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#F47C7C]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#8FAF9A]/25 rounded-full blur-2xl pointer-events-none" />

            {/* Badge Header */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 bg-[#F5EFE6] text-[#1F2A44] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#1F2A44]/10 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#F47C7C]" />
                <span>2026 Educator Lookbook Access</span>
              </div>
              <span className="text-[11px] font-bold text-[#8FAF9A] uppercase tracking-wider">
                All Things School
              </span>
            </div>

            {/* Hook Headline & Sentence */}
            <div className="flex flex-col gap-3 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2A44] leading-tight tracking-tight">
                Ready to Transform Your Classroom This Year?
              </h2>

              <p className="text-sm sm:text-base text-[#333333]/85 font-medium leading-relaxed">
                Unlock <strong className="text-[#F47C7C]">50+ in-depth teacher lookbooks</strong>, interactive budget calculators, and back-to-school decor secrets that save <strong>5+ hours of prep every week!</strong>
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 gap-2.5 bg-[#F5EFE6]/60 p-4 rounded-2xl border border-[#1F2A44]/5 text-xs text-[#1F2A44]">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#8FAF9A] text-white flex items-center justify-center shrink-0 font-bold">
                  <Palette className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">Step-by-step Boho & Retro classroom decor guides</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#F47C7C] text-white flex items-center justify-center shrink-0 font-bold">
                  <Bookmark className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">Interactive materials checklist & budget planners</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#1F2A44] text-white flex items-center justify-center shrink-0 font-bold">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">Teacher-tested organization hacks & nail art sets</span>
              </div>
            </div>

            {/* Single Action Button (Only Way to Close) */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={ADSTERA_SMART_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full bg-[#1F2A44] hover:bg-[#1F2A44]/90 text-white py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <span>Unlock Free Lookbooks & Explore</span>
                <ArrowRight className="w-4 h-4 text-[#F47C7C] group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onClose}
                className="text-[11px] text-center text-[#333333]/50 font-medium hover:text-[#F47C7C] transition-colors cursor-pointer"
              >
                No thanks, I&apos;ll explore first
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
