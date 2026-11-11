import React, { useState } from 'react';
import { CuteCharacters, CharacterAction } from './CuteCharacters';
import { dreamyAudio } from '../utils/dreamyAudio';

interface OpeningExperienceProps {
  onExploreWorld: () => void;
  onReplay?: () => void;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({
  onExploreWorld
}) => {
  // Stages: 'waiting-hug' | 'animating-hug' | 'hugged' | 'waiting-kiss' | 'animating-kiss' | 'kissed'
  const [stage, setStage] = useState<
    'waiting-hug' | 'animating-hug' | 'hugged' | 'waiting-kiss' | 'animating-kiss' | 'kissed'
  >('waiting-hug');

  const getCharacterAction = (): CharacterAction => {
    switch (stage) {
      case 'waiting-hug':
        return 'apart';
      case 'animating-hug':
        return 'approaching';
      case 'hugged':
      case 'waiting-kiss':
        return 'hugging';
      case 'animating-kiss':
      case 'kissed':
        return 'kissing';
      default:
        return 'apart';
    }
  };

  const handleComeHere = () => {
    // Start ambient music gently if not yet playing
    dreamyAudio.play();
    setStage('animating-hug');

    setTimeout(() => {
      setStage('hugged');
      dreamyAudio.playHugChime();
    }, 900);
  };

  const handleAskKiss = () => {
    setStage('waiting-kiss');
  };

  const handleGiveKiss = () => {
    setStage('animating-kiss');
    setTimeout(() => {
      setStage('kissed');
      dreamyAudio.playKissChime();
    }, 800);
  };

  const handleReset = () => {
    setStage('waiting-hug');
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-12 text-center overflow-hidden">
      {/* Dreamy moon & stars backdrop ornament */}
      <div className="absolute top-10 pointer-events-none opacity-40">
        <div className="w-28 h-28 rounded-full border border-pink-200/20 shadow-[0_0_50px_rgba(244,114,182,0.15)] flex items-center justify-center">
          <span className="text-yellow-100/70 text-4xl">🌙</span>
        </div>
      </div>

      <div className="relative z-10 max-w-xl mx-auto w-full">
        {/* Stage 1: Waiting for Hug */}
        {stage === 'waiting-hug' && (
          <div className="space-y-6 transition-all duration-500 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-200 text-xs tracking-wide">
              <span>A tiny surprise for Mili</span>
              <span aria-hidden="true">·</span>
              <span>From Nayan</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl text-pink-100 tracking-tight leading-tight">
              Hey, someone has been waiting to give you a hug...
            </h1>

            <p className="text-slate-300/80 text-sm sm:text-base font-sans-soft max-w-md mx-auto">
              Take a quiet breath, leave your worries behind, and come a little closer.
            </p>
          </div>
        )}

        {/* Stage 2: Hugged */}
        {(stage === 'animating-hug' || stage === 'hugged') && (
          <div className="space-y-4 transition-all duration-700 animate-fadeIn">
            <span className="text-pink-300 text-xs tracking-wider uppercase font-medium">
              Warm Embrace ♡
            </span>
            <h1 className="font-display text-2xl sm:text-3xl text-pink-100 tracking-tight leading-relaxed max-w-lg mx-auto">
              &ldquo;If I could be there right now, this is exactly where I&apos;d want to be.&rdquo;
            </h1>
            <p className="text-pink-200/80 text-sm font-handwriting text-xl">
              Just holding you soft and warm, for as long as you need.
            </p>
          </div>
        )}

        {/* Stage 3: Prompting Kiss */}
        {stage === 'waiting-kiss' && (
          <div className="space-y-4 transition-all duration-500 animate-fadeIn">
            <span className="text-purple-300 text-xs tracking-wider uppercase font-medium">
              Just a little heartbeat...
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-purple-100 tracking-tight">
              Wait... one more little thing.
            </h1>
            <p className="text-slate-300/80 text-sm sm:text-base font-sans-soft">
              Close your eyes for half a second.
            </p>
          </div>
        )}

        {/* Stage 4: Kissed */}
        {(stage === 'animating-kiss' || stage === 'kissed') && (
          <div className="space-y-4 transition-all duration-700 animate-fadeIn">
            <span className="text-rose-300 text-xs tracking-wider uppercase font-medium">
              Sealed with warmth ♡
            </span>
            <h1 className="font-display text-2xl sm:text-3xl text-pink-100 tracking-tight leading-relaxed max-w-lg mx-auto">
              &ldquo;Okay, now you&apos;re officially not allowed to forget this moment.&rdquo;
            </h1>
            <p className="text-rose-200/80 text-sm font-handwriting text-xl">
              Saved forever in our little universe.
            </p>
          </div>
        )}

        {/* Characters Arena */}
        <div className="my-6 py-4">
          <CuteCharacters
            action={getCharacterAction()}
            size="lg"
            showHearts={stage === 'hugged' || stage === 'kissed'}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {stage === 'waiting-hug' && (
            <button
              onClick={handleComeHere}
              className="glass-button px-8 py-3.5 rounded-2xl text-pink-100 font-medium text-base shadow-lg hover:shadow-pink-500/25 cursor-pointer flex items-center gap-2 group"
            >
              <span>Come here ♡</span>
              <span className="group-hover:translate-x-1 transition-transform">✨</span>
            </button>
          )}

          {stage === 'hugged' && (
            <button
              onClick={handleAskKiss}
              className="glass-button px-8 py-3.5 rounded-2xl text-pink-100 font-medium text-base shadow-lg hover:shadow-purple-500/25 cursor-pointer flex items-center gap-2 group"
            >
              <span>One more? ♡</span>
              <span className="group-hover:scale-110 transition-transform">🌸</span>
            </button>
          )}

          {stage === 'waiting-kiss' && (
            <button
              onClick={handleGiveKiss}
              className="glass-button px-8 py-3.5 rounded-2xl text-rose-100 font-medium text-base shadow-lg hover:shadow-rose-500/25 cursor-pointer flex items-center gap-2 group"
            >
              <span>Give kiss ♡</span>
              <span className="group-hover:scale-125 transition-transform">💋</span>
            </button>
          )}

          {stage === 'kissed' && (
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={onExploreWorld}
                className="glass-button px-9 py-4 rounded-2xl text-white font-medium text-lg bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30 border border-pink-200/40 shadow-xl shadow-pink-500/20 hover:scale-105 transition-all cursor-pointer flex items-center gap-3"
              >
                <span>Explore our little world</span>
                <span className="text-xl">✨</span>
              </button>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-pink-300 transition-colors pt-2 underline underline-offset-4"
              >
                Replay hug & kiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
