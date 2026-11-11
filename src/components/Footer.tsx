import React from 'react';

interface FooterProps {
  onReplayOpening: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayOpening }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-pink-200/10 py-12 px-4 text-center text-xs text-slate-400 bg-[#090a18]/60">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-pink-200 border border-white/10 transition-colors text-xs cursor-pointer"
        >
          <span>↑ Back to top</span>
        </button>

        <p className="font-handwriting text-2xl text-pink-300">
          For Mili, always & forever ♡
        </p>

        <p className="text-slate-400 text-xs font-sans-soft max-w-md mx-auto">
          Distance is only a test of how far love can travel. Built with boundless warmth by Nayan.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4 text-xs">
          <button
            onClick={onReplayOpening}
            className="text-pink-300 hover:text-pink-100 transition-colors underline underline-offset-4"
          >
            Replay opening hug & kiss
          </button>
          <span aria-hidden="true">·</span>
          <a
            href="#story"
            className="text-pink-300 hover:text-pink-100 transition-colors underline underline-offset-4"
          >
            Mini love story
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#book"
            className="text-pink-300 hover:text-pink-100 transition-colors underline underline-offset-4"
          >
            Little book
          </a>
        </div>
      </div>
    </footer>
  );
};
