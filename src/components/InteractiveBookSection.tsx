import React, { useState } from 'react';
import { DEFAULT_BOOK_PAGES } from '../data/surpriseData';
import { nextBookPage, prevBookPage, canFlipNext, canFlipPrev } from '../utils/romanticState';
import { dreamyAudio } from '../utils/dreamyAudio';

export const InteractiveBookSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = DEFAULT_BOOK_PAGES.length;

  const handleOpenBook = () => {
    setIsOpen(true);
    setCurrentPage(1);
    dreamyAudio.playPageFlip();
  };

  const handleCloseBook = () => {
    setIsOpen(false);
    dreamyAudio.playPageFlip();
  };

  const handleNextPage = () => {
    if (canFlipNext(currentPage, totalPages)) {
      setCurrentPage(prev => nextBookPage(prev, totalPages));
      dreamyAudio.playPageFlip();
    }
  };

  const handlePrevPage = () => {
    if (canFlipPrev(currentPage)) {
      setCurrentPage(prev => prevBookPage(prev));
      dreamyAudio.playPageFlip();
    }
  };

  const activePageData = DEFAULT_BOOK_PAGES[currentPage - 1];

  return (
    <section id="book" className="py-20 sm:py-32 px-4 relative overflow-hidden">
      {/* Floating starry background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-widest text-pink-300 font-medium">
            Chapter VII · The Final Chapter
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-pink-100 mt-2">
            A Keepsake For You
          </h2>
          <p className="text-sm text-slate-300/80 mt-2 font-sans-soft">
            There&apos;s one last little thing waiting for you...
          </p>
        </div>

        {/* BOOK CONTAINER */}
        {!isOpen ? (
          /* ================= CLOSED BOOK COVER ================= */
          <div className="flex flex-col items-center">
            {/* 3D Gilded Book Presentation */}
            <div
              onClick={handleOpenBook}
              className="group relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.03] select-none"
              style={{
                perspective: '1200px'
              }}
            >
              {/* Cloud Pedestal Shadow */}
              <div className="absolute -bottom-8 inset-x-6 h-10 bg-pink-500/20 blur-xl rounded-full group-hover:bg-pink-400/30 transition-all" />

              {/* Spine edge representation */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-rose-950 via-pink-950 to-pink-900 rounded-l-2xl border-l border-t border-b border-yellow-200/30 shadow-2xl z-20" />

              {/* Book Front Cover */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#3b1728] via-[#291322] to-[#1a0c19] rounded-2xl border-2 border-yellow-300/40 p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
                {/* Gilded Corner Filigrees */}
                <div className="absolute top-3 left-3 text-yellow-300/60 text-lg">✦</div>
                <div className="absolute top-3 right-3 text-yellow-300/60 text-lg">✦</div>
                <div className="absolute bottom-3 left-3 text-yellow-300/60 text-lg">✦</div>
                <div className="absolute bottom-3 right-3 text-yellow-300/60 text-lg">✦</div>

                {/* Inner Gold Foil Frame */}
                <div className="absolute inset-3 rounded-xl border border-yellow-200/25 pointer-events-none" />

                {/* Top Embellishment */}
                <div className="pt-6">
                  <div className="w-12 h-12 mx-auto rounded-full border border-yellow-300/30 flex items-center justify-center text-yellow-200 text-xl shadow-[0_0_20px_rgba(253,224,71,0.2)]">
                    🌙
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-yellow-200/60 mt-2">
                    Special Keepsake
                  </div>
                </div>

                {/* Cover Title */}
                <div className="my-auto py-4">
                  <h3 className="font-display text-2xl sm:text-3xl text-yellow-100 font-semibold tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    For My Cute Babyy ♡
                  </h3>
                  <div className="font-handwriting text-xl text-pink-300/90 mt-2">
                    Written with warmth, just for Mili
                  </div>
                </div>

                {/* Bottom Cover Accent */}
                <div className="pb-4 text-xs text-yellow-200/60 font-sans-soft flex items-center justify-center gap-2">
                  <span>✦</span>
                  <span>Tap to gently open</span>
                  <span>✦</span>
                </div>
              </div>
            </div>

            {/* Open Button */}
            <div className="mt-8">
              <button
                onClick={handleOpenBook}
                className="glass-button px-8 py-3.5 rounded-2xl text-pink-100 font-medium text-base shadow-xl hover:shadow-pink-500/25 cursor-pointer flex items-center gap-3 transition-all"
              >
                <span>Open your little book</span>
                <span className="text-xl">📖</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= OPEN INTERACTIVE BOOK ================= */
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-[#1e172e] rounded-3xl border border-pink-200/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-6 sm:p-12 overflow-hidden text-left flex flex-col justify-between min-h-[460px]">
              {/* Book Spine center line */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/20 via-black/40 to-black/20 pointer-events-none hidden sm:block" />

              {/* Golden Bookmark ribbon */}
              <div className="absolute top-0 right-12 w-6 h-20 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-b shadow-md pointer-events-none flex items-end justify-center pb-2 text-[10px] text-yellow-950 font-bold">
                ♡
              </div>

              {/* Page Header */}
              <div className="flex items-center justify-between border-b border-pink-200/10 pb-4 mb-6">
                <span className="font-display text-sm text-pink-300">
                  {activePageData.header}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentPage} / {totalPages}
                </span>
              </div>

              {/* Page Content */}
              <div className="my-auto py-4 px-2 sm:px-6">
                <div
                  key={`page-${currentPage}`}
                  className="font-display text-lg sm:text-2xl text-pink-100 leading-relaxed space-y-4 animate-fadeIn"
                >
                  {activePageData.text.split('\n\n').map((para, i) => (
                    <p key={i} className="text-slate-100/90 font-display">
                      {para}
                    </p>
                  ))}
                </div>

                {activePageData.footerSign && (
                  <div className="mt-8 pt-4 border-t border-pink-200/10 text-center font-handwriting text-2xl text-pink-300">
                    {activePageData.footerSign}
                  </div>
                )}
              </div>

              {/* Page Navigation & Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-pink-200/10 text-xs">
                <button
                  onClick={handlePrevPage}
                  disabled={!canFlipPrev(currentPage)}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    canFlipPrev(currentPage)
                      ? 'bg-white/10 text-slate-200 hover:bg-white/15 cursor-pointer'
                      : 'opacity-30 cursor-not-allowed text-slate-500'
                  }`}
                  aria-label="Previous Page"
                >
                  <span>←</span>
                  <span className="hidden sm:inline">Previous Page</span>
                  <span className="sm:hidden">Prev</span>
                </button>

                <button
                  onClick={handleCloseBook}
                  className="text-slate-400 hover:text-pink-300 transition-colors px-2 sm:px-3 py-1.5"
                >
                  Close Book
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={!canFlipNext(currentPage, totalPages)}
                  className={`px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    canFlipNext(currentPage, totalPages)
                      ? 'bg-pink-500/25 text-pink-100 border border-pink-400/30 hover:bg-pink-500/35 cursor-pointer'
                      : 'opacity-30 cursor-not-allowed text-slate-500'
                  }`}
                  aria-label="Next Page"
                >
                  <span className="hidden sm:inline">Next Page</span>
                  <span className="sm:hidden">Next</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Bottom Tagline */}
            <p className="mt-6 text-xs text-pink-300/80 font-handwriting text-xl">
              Made with love, just for you.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
