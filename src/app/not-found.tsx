import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="bg-white rounded-3xl p-12 text-center border border-[#1F2A44]/5 flex flex-col items-center gap-4 max-w-md w-full shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-[#F47C7C] text-white font-bold text-2xl flex items-center justify-center">
          404
        </div>
        <h2 className="font-bold text-[#1F2A44] text-2xl">Guide Not Found</h2>
        <p className="text-xs text-[#333333]/70 max-w-sm leading-relaxed">
          This article doesn&apos;t exist or may have been moved. Head back to explore our
          full library of teacher guides.
        </p>
        <Link
          href="/"
          className="mt-2 bg-[#1F2A44] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#1F2A44]/90 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to All Articles
        </Link>
      </div>
    </div>
  );
}
