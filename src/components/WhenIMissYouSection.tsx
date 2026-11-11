import React, { useState } from 'react';
import { DEFAULT_MISS_MOMENTS } from '../data/surpriseData';

export const WhenIMissYouSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentMoment = DEFAULT_MISS_MOMENTS[activeIndex];

  return (
    <section id="miss-you" className="py-16 sm:py-24 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Section kicker */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-indigo-300 font-medium">
            Chapter II · Across The Miles
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-pink-100 mt-2">
            Little moments when I miss you...
          </h2>
          <p className="text-xs text-slate-400 mt-1">Tap a floating starlight to reveal each thought</p>
        </div>

        {/* Scenic Sky Frame with Moon & Character */}
        <div className="relative rounded-3xl p-6 sm:p-10 glass-panel border border-indigo-300/20 shadow-2xl overflow-hidden min-h-[360px] flex flex-col justify-between">
          {/* Animated Moon and Starlit Hill */}
          <div className="absolute top-6 right-8 pointer-events-none">
            <div className="relative">
              <span className="text-5xl text-yellow-100 drop-shadow-[0_0_15px_rgba(254,240,138,0.5)]">🌙</span>
              <div className="absolute -inset-4 bg-yellow-200/10 rounded-full blur-xl" />
            </div>
          </div>

          {/* Interactive Star Constellation Selector */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-8">
            {DEFAULT_MISS_MOMENTS.map((moment, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={moment.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-pink-500/25 text-pink-100 border border-pink-300/40 shadow-lg shadow-pink-500/20 scale-105'
                      : 'bg-white/5 text-slate-300/80 border border-white/10 hover:border-pink-300/20 hover:text-white'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className={isActive ? 'text-yellow-300 animate-spin text-sm' : 'text-slate-400 text-xs'}>
                    ★
                  </span>
                  <span>Moment {idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Featured Message Display */}
          <div className="relative z-10 text-center my-auto py-6 px-4">
            <div className="min-h-[110px] flex items-center justify-center">
              <p
                key={currentMoment.id}
                className="font-display text-xl sm:text-2xl text-pink-100 leading-relaxed max-w-xl mx-auto transition-all duration-500 animate-fadeIn"
              >
                &ldquo;{currentMoment.text}&rdquo;
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-indigo-300/70 font-handwriting text-lg">
              <span>{activeIndex + 1} of {DEFAULT_MISS_MOMENTS.length}</span>
              <span>·</span>
              <span>Always in my heart</span>
            </div>
          </div>

          {/* Bottom Hill & Mini Character Looking Up */}
          <div className="relative z-10 pt-4 flex items-end justify-between border-t border-white/10">
            {/* Mini Nayan looking up at moon */}
            <div className="flex items-center gap-3">
              <svg width="48" height="48" viewBox="0 0 120 140" className="opacity-90">
                <circle cx="60" cy="62" r="32" fill="#6366f1" />
                <circle cx="34" cy="38" r="14" fill="#6366f1" />
                <circle cx="86" cy="38" r="14" fill="#6366f1" />
                <ellipse cx="60" cy="65" rx="3" ry="2" fill="#fff" />
                <path d="M 52 58 Q 58 52 64 58" stroke="#fff" strokeWidth="2.5" fill="none" />
                <path d="M 72 58 Q 78 52 84 58" stroke="#fff" strokeWidth="2.5" fill="none" />
                <ellipse cx="44" cy="68" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />
                <ellipse cx="76" cy="68" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />
                <path d="M 32 80 C 22 92, 22 124, 38 132 C 50 138, 70 138, 82 132 C 98 124, 98 92, 88 80 Z" fill="#4f46e5" />
              </svg>
              <div className="text-left">
                <p className="text-xs text-indigo-200 font-medium">Looking at the night sky</p>
                <p className="text-[11px] text-slate-400">Knowing we look at the same moon</p>
              </div>
            </div>

            {/* Next / Previous Moment Steppers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveIndex(prev => (prev === 0 ? DEFAULT_MISS_MOMENTS.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center text-xs transition-colors"
                aria-label="Previous moment"
              >
                ←
              </button>
              <button
                onClick={() => setActiveIndex(prev => (prev === DEFAULT_MISS_MOMENTS.length - 1 ? 0 : prev + 1))}
                className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 hover:text-white hover:bg-pink-500/30 flex items-center justify-center text-xs transition-colors"
                aria-label="Next moment"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
