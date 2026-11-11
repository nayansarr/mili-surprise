import React from 'react';

interface NavbarProps {
  onReplayOpening: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayOpening }) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#0c0d1e]/75 border-b border-pink-200/10 px-4 sm:px-8 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-base sm:text-lg font-bold tracking-tight text-pink-100 hover:text-pink-200 transition-colors whitespace-nowrap shrink-0"
        >
          Nayan & Mili ♡
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a
            href="#note"
            className="hover:text-pink-200 transition-colors whitespace-nowrap shrink-0"
          >
            Our Note
          </a>
          <a
            href="#miss-you"
            className="hover:text-pink-200 transition-colors whitespace-nowrap shrink-0"
          >
            Miss You
          </a>
          <a
            href="#care"
            className="hover:text-pink-200 transition-colors whitespace-nowrap shrink-0"
          >
            Care Corner
          </a>
          <a
            href="#story"
            className="hover:text-pink-200 transition-colors whitespace-nowrap shrink-0"
          >
            Love Story
          </a>
          <a
            href="#book"
            className="hover:text-pink-200 transition-colors whitespace-nowrap shrink-0"
          >
            Little Book
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onReplayOpening}
            className="glass-button px-3.5 sm:px-4 py-1.5 text-xs font-medium text-pink-100 rounded-full hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            title="Replay opening hug and kiss"
          >
            <span>Hug again ♡</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Quick Navigation Strip */}
      <nav aria-label="Mobile Chapters" className="md:hidden flex items-center gap-2 overflow-x-auto pt-2.5 pb-0.5 text-[11px] text-slate-300">
        <a
          href="#note"
          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 hover:text-pink-200 whitespace-nowrap shrink-0"
        >
          Our Note
        </a>
        <a
          href="#miss-you"
          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 hover:text-pink-200 whitespace-nowrap shrink-0"
        >
          Miss You
        </a>
        <a
          href="#care"
          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 hover:text-pink-200 whitespace-nowrap shrink-0"
        >
          Care Corner
        </a>
        <a
          href="#story"
          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 hover:text-pink-200 whitespace-nowrap shrink-0"
        >
          Love Story
        </a>
        <a
          href="#book"
          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 hover:text-pink-200 whitespace-nowrap shrink-0"
        >
          Little Book
        </a>
      </nav>
    </header>
  );
};
