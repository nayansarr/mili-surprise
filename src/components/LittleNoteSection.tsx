import React, { useState } from 'react';
import { NOTE_FOR_YOU_TEXT } from '../data/surpriseData';

export const LittleNoteSection: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(true);

  return (
    <section id="note" className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-2xl mx-auto">
        {/* Section kicker */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-pink-300 font-medium">
            Chapter I · Heartfelt Note
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-pink-100 mt-2">
            {NOTE_FOR_YOU_TEXT.heading}
          </h2>
        </div>

        {/* Parchment / Dreamy Letter Card */}
        <div className="relative rounded-3xl p-6 sm:p-10 glass-panel border border-pink-200/20 shadow-2xl overflow-hidden transition-all duration-500 hover:border-pink-300/30">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Letter Header Accent */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-pink-200/10 text-xs text-pink-300/70">
            <span className="font-handwriting text-lg text-pink-300">A letter for Mili</span>
            <span>With love, from Nayan</span>
          </div>

          {/* Letter Body */}
          <div className="space-y-5 text-slate-200/90 text-base sm:text-lg leading-relaxed font-sans-soft">
            {NOTE_FOR_YOU_TEXT.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 1 ? 'text-pink-100 font-medium' : ''}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-8 pt-6 border-t border-pink-200/10 flex items-center justify-between">
            <div className="font-handwriting text-2xl text-pink-300">
              Forever in your corner ♡
            </div>
            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className="text-xs text-pink-300/80 hover:text-pink-100 transition-colors px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/20"
            >
              {isRevealed ? 'Keep safely folded' : 'Open letter'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
