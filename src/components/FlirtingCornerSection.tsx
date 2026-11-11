import React, { useState } from 'react';
import { DEFAULT_FLIRT_MESSAGES } from '../data/surpriseData';
import { FlirtMessage } from '../types/surprise';
import { pickNextRandomMessage } from '../utils/romanticState';

export const FlirtingCornerSection: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState<FlirtMessage>(DEFAULT_FLIRT_MESSAGES[0]);
  const [burstKey, setBurstKey] = useState(0);

  const handleNextMessage = () => {
    const next = pickNextRandomMessage(DEFAULT_FLIRT_MESSAGES, currentMessage.id);
    setCurrentMessage(next);
    setBurstKey(prev => prev + 1);
  };

  return (
    <section id="flirting" className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-rose-300 font-medium">
            Chapter IV · Playful Teasing
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-pink-100 mt-2">
            Okay, enough emotional stuff. A little teasing now.
          </h2>
          <p className="text-xs text-slate-400 mt-1">Guaranteed 100% true statements</p>
        </div>

        {/* Playful Teasing Display Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 glass-panel border border-rose-300/25 shadow-2xl overflow-hidden min-h-[260px] flex flex-col justify-between items-center group">
          {/* Heart aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Emoji Badge with pop animation */}
          <div key={`badge-${burstKey}`} className="animate-bounce">
            <span className="inline-block text-4xl p-3 rounded-full bg-rose-500/15 border border-rose-400/20 shadow-md">
              {currentMessage.reaction}
            </span>
          </div>

          {/* Teasing text */}
          <div className="my-6 px-4">
            <p
              key={`text-${burstKey}`}
              className="font-display text-xl sm:text-2xl text-pink-100 leading-relaxed animate-fadeIn"
            >
              &ldquo;{currentMessage.text}&rdquo;
            </p>
          </div>

          {/* Button: "Another one ♡" */}
          <button
            onClick={handleNextMessage}
            className="glass-button px-7 py-3 rounded-2xl text-pink-100 font-medium text-sm flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-rose-500/25 active:scale-95 transition-all"
          >
            <span>Another one ♡</span>
            <span>✨</span>
          </button>
        </div>
      </div>
    </section>
  );
};
