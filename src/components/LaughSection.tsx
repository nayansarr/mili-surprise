import React, { useState } from 'react';
import { DEFAULT_JOKES } from '../data/surpriseData';
import { JokeItem } from '../types/surprise';
import { pickNextRandomMessage } from '../utils/romanticState';

export const LaughSection: React.FC = () => {
  const [currentJoke, setCurrentJoke] = useState<JokeItem>(DEFAULT_JOKES[0]);
  const [animKey, setAnimKey] = useState(0);

  const handleNextJoke = () => {
    const next = pickNextRandomMessage(DEFAULT_JOKES, currentJoke.id);
    setCurrentJoke(next);
    setAnimKey(prev => prev + 1);
  };

  return (
    <section id="laugh" className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
            Chapter V · Light & Sweet
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-pink-100 mt-2">
            One tiny reason to smile.
          </h2>
          <p className="text-xs text-slate-400 mt-1">Silly little truths from my brain</p>
        </div>

        {/* Joke Display Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 glass-panel border border-amber-300/20 shadow-2xl overflow-hidden min-h-[250px] flex flex-col justify-between items-center">
          {/* Reaction Emoji */}
          <div key={`joke-icon-${animKey}`} className="animate-bounce">
            <span className="inline-block text-4xl p-3 rounded-full bg-amber-500/15 border border-amber-400/20 shadow-md">
              {currentJoke.reaction}
            </span>
          </div>

          {/* Punchline */}
          <div className="my-6 px-4">
            <p
              key={`joke-text-${animKey}`}
              className="font-display text-xl sm:text-2xl text-amber-100 leading-relaxed animate-fadeIn"
            >
              &ldquo;{currentJoke.punchline}&rdquo;
            </p>
          </div>

          {/* Button: "Tell me another joke" */}
          <button
            onClick={handleNextJoke}
            className="glass-button px-7 py-3 rounded-2xl text-amber-100 font-medium text-sm flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-500/25 active:scale-95 transition-all"
          >
            <span>Tell me another one ♡</span>
            <span>😄</span>
          </button>
        </div>
      </div>
    </section>
  );
};
