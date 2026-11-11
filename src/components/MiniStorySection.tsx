import React, { useState, useEffect, useRef } from 'react';
import { DEFAULT_STORY_SCENES } from '../data/surpriseData';
import { CuteCharacters, CharacterAction } from './CuteCharacters';
import { advanceStoryScene, prevStoryScene } from '../utils/romanticState';
import { dreamyAudio } from '../utils/dreamyAudio';

export const MiniStorySection: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoProgress, setAutoProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  const scene = DEFAULT_STORY_SCENES.find(s => s.id === currentSceneId) || DEFAULT_STORY_SCENES[0];
  const totalScenes = DEFAULT_STORY_SCENES.length;

  // Auto-play timer loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setAutoProgress(0);
      return;
    }

    const intervalMs = 100;
    const sceneDuration = 5500;
    let elapsed = 0;

    timerRef.current = window.setInterval(() => {
      elapsed += intervalMs;
      const progress = Math.min(100, (elapsed / sceneDuration) * 100);
      setAutoProgress(progress);

      if (elapsed >= sceneDuration) {
        elapsed = 0;
        setAutoProgress(0);
        setCurrentSceneId(curr => {
          const next = advanceStoryScene(curr, totalScenes);
          if (next === 6) dreamyAudio.playHugChime();
          return next;
        });
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalScenes]);

  const handleNext = () => {
    setAutoProgress(0);
    const next = advanceStoryScene(currentSceneId, totalScenes);
    setCurrentSceneId(next);
    if (next === 6) dreamyAudio.playHugChime();
  };

  const handlePrev = () => {
    setAutoProgress(0);
    setCurrentSceneId(prevStoryScene(currentSceneId, totalScenes));
  };

  const handleSelectScene = (id: number) => {
    setAutoProgress(0);
    setCurrentSceneId(id);
    if (id === 6) dreamyAudio.playHugChime();
  };

  const handleReplay = () => {
    setAutoProgress(0);
    setCurrentSceneId(1);
    setIsPlaying(true);
  };

  const getActionForScene = (sceneId: number): CharacterAction => {
    switch (sceneId) {
      case 1:
        return 'tired-mili';
      case 2:
        return 'nayan-comfort';
      case 3:
        return 'silly-cheer';
      case 4:
        return 'mili-care-nayan';
      case 5:
        return 'moon-gazing';
      case 6:
        return 'hugging';
      default:
        return 'apart';
    }
  };

  return (
    <section id="story" className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-pink-300 font-medium">
            Chapter VI · Cinematic Mini Story
          </span>
          <h2 className="font-display text-2xl sm:text-4xl text-pink-100 mt-2">
            The Story of Nayan & Mili
          </h2>
          <p className="text-sm text-slate-300/80 mt-2 max-w-lg mx-auto font-sans-soft">
            A tiny animated tale of understanding, caring, and making each other smile across any distance.
          </p>
        </div>

        {/* Cinematic Story Theater Container */}
        <div className="relative rounded-3xl glass-panel border border-pink-300/25 shadow-2xl overflow-hidden flex flex-col justify-between">
          {/* Story Progress Bar */}
          <div className="w-full bg-white/5 h-1.5 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 transition-all duration-100"
              style={{
                width: isPlaying ? `${autoProgress}%` : `${(currentSceneId / totalScenes) * 100}%`
              }}
            />
          </div>

          {/* Scene Header Strip */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-medium text-pink-300">Scene {scene.id} of {totalScenes}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-200">{scene.title}</span>
            </div>
            <span className="hidden sm:inline text-slate-400 italic">{scene.subtitle}</span>
          </div>

          {/* Theater Visual Stage */}
          <div className="relative min-h-[340px] sm:min-h-[400px] flex flex-col items-center justify-center p-6 sm:p-10 overflow-hidden">
            {/* Dynamic Scene Background Atmospheres */}
            {scene.id === 1 && (
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/60 via-purple-950/40 to-slate-950/70 pointer-events-none transition-all duration-700" />
            )}
            {scene.id === 2 && (
              <div className="absolute inset-0 bg-gradient-to-b from-purple-950/50 via-pink-950/30 to-indigo-950/60 pointer-events-none transition-all duration-700" />
            )}
            {scene.id === 3 && (
              <div className="absolute inset-0 bg-gradient-to-b from-pink-950/40 via-yellow-950/20 to-purple-950/50 pointer-events-none transition-all duration-700">
                <div className="absolute top-10 left-1/4 animate-bounce text-yellow-200 text-xl">⭐</div>
                <div className="absolute top-16 right-1/4 animate-spin text-pink-300 text-lg">✨</div>
              </div>
            )}
            {scene.id === 4 && (
              <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-purple-950/30 to-slate-950/60 pointer-events-none transition-all duration-700">
                <div className="absolute top-8 right-1/3 animate-float-gentle text-pink-300 text-2xl">☕</div>
              </div>
            )}
            {scene.id === 5 && (
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-indigo-950/50 to-purple-950/60 pointer-events-none transition-all duration-700">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 text-5xl animate-pulse-glow text-yellow-100">
                  🌙
                </div>
              </div>
            )}
            {scene.id === 6 && (
              <div className="absolute inset-0 bg-gradient-to-b from-pink-950/60 via-purple-950/50 to-indigo-950/70 pointer-events-none transition-all duration-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full bg-pink-500/20 blur-3xl animate-pulse" />
                </div>
              </div>
            )}

            {/* Character Stage */}
            <div className="relative z-10 w-full flex justify-center py-2">
              <CuteCharacters
                action={getActionForScene(scene.id)}
                size="lg"
                showHearts={scene.id === 6}
              />
            </div>

            {/* Narration & Dialogue Box */}
            <div className="relative z-10 max-w-xl text-center mt-6 space-y-3 px-4">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans-soft">
                {scene.description}
              </p>

              {scene.dialogue && (
                <div className="inline-block px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-pink-300/30 text-pink-100 font-display text-base sm:text-lg shadow-lg">
                  &ldquo;{scene.dialogue}&rdquo;
                </div>
              )}
            </div>

            {/* Final Highlight Message in Scene 6 */}
            {scene.id === 6 && (
              <div className="relative z-10 mt-8 p-6 rounded-2xl bg-gradient-to-r from-pink-950/70 via-purple-950/70 to-indigo-950/70 border border-pink-400/30 text-center max-w-2xl animate-fadeIn">
                <p className="font-display text-base sm:text-xl text-pink-100 leading-relaxed">
                  &ldquo;Care was never supposed to be one-sided.
                  Sometimes I take care of you, sometimes you take care of me.
                  And somehow, even from far away, we find little ways to make each other&apos;s days better.&rdquo;
                </p>
                <div className="mt-4 font-handwriting text-2xl text-pink-300">
                  Forever and always ♡
                </div>
              </div>
            )}
          </div>

          {/* Story Controls Toolbar */}
          <div className="px-6 py-4 bg-black/20 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Scene Jump Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {DEFAULT_STORY_SCENES.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSelectScene(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    s.id === currentSceneId
                      ? 'bg-pink-500/30 text-pink-100 border border-pink-400/40'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={`Jump to scene ${s.id}`}
                >
                  {s.id}
                </button>
              ))}
            </div>

            {/* Play/Pause, Navigation & Replay */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10 transition-colors"
                aria-label="Previous scene"
              >
                ← Prev
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-1.5 rounded-xl bg-pink-500/25 hover:bg-pink-500/35 text-pink-100 text-xs font-medium border border-pink-400/30 shadow-sm transition-colors flex items-center gap-1.5"
                aria-label={isPlaying ? "Pause story auto-advance" : "Play story auto-advance"}
              >
                <span>{isPlaying ? '❚❚ Pause' : '▶ Auto-Play'}</span>
              </button>

              <button
                onClick={handleNext}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10 transition-colors"
                aria-label="Next scene"
              >
                Next →
              </button>

              <button
                onClick={handleReplay}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-pink-300 text-xs border border-pink-400/20 transition-colors"
                title="Replay story from Scene 1"
              >
                ↺ Replay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
