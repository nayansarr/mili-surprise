/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { DreamyCanvas } from './components/DreamyCanvas';
import { CursorSparkles } from './components/CursorSparkles';
import { OpeningExperience } from './components/OpeningExperience';
import { Navbar } from './components/Navbar';
import { LittleNoteSection } from './components/LittleNoteSection';
import { WhenIMissYouSection } from './components/WhenIMissYouSection';
import { CareCornerSection } from './components/CareCornerSection';
import { FlirtingCornerSection } from './components/FlirtingCornerSection';
import { LaughSection } from './components/LaughSection';
import { MiniStorySection } from './components/MiniStorySection';
import { InteractiveBookSection } from './components/InteractiveBookSection';
import { MusicPlayer } from './components/MusicPlayer';
import { Footer } from './components/Footer';
import { dreamyAudio } from './utils/dreamyAudio';

export default function App() {
  const [inWorld, setInWorld] = useState(false);

  // Check for ?autostart=1 and attempt Suzume soundtrack autoplay
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.location && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('autostart') === '1') {
          setInWorld(true);
        }
      }
    } catch (err) {
      console.warn('Could not read location search:', err);
    }

    // Attempt to start Suzume soundtrack automatically, fallback to first interaction
    dreamyAudio.attemptAutoplay();
  }, []);

  const handleExploreWorld = () => {
    setInWorld(true);
    // Smooth scroll down to world content
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReplayOpening = () => {
    setInWorld(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="top" className="relative min-h-screen text-[#f7eef7] selection:bg-pink-400/30">
      {/* Background celestial canvas */}
      <DreamyCanvas />

      {/* Desktop trailing cursor sparkles */}
      <CursorSparkles />

      {/* Persistent Dreamy Music Player */}
      <MusicPlayer />

      {!inWorld ? (
        /* Opening Hug & Kiss Interaction Experience */
        <OpeningExperience onExploreWorld={handleExploreWorld} />
      ) : (
        /* Main Interactive Storybook World */
        <div className="relative z-10 animate-fadeIn">
          {/* Top Bar Navigation */}
          <Navbar onReplayOpening={handleReplayOpening} />

          {/* Hero Banner Intro for the Little World */}
          <div className="pt-12 pb-6 px-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-xs text-pink-200 mb-4">
              <span>Welcome to Our Little World</span>
              <span aria-hidden="true">·</span>
              <span>Made with love for Mili ♡</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl text-pink-100 tracking-tight leading-tight">
              A Dreamy Little Corner Made Especially For You
            </h1>
            <p className="mt-3 text-slate-300/80 text-sm sm:text-base font-sans-soft max-w-xl mx-auto">
              Every chapter here is a quiet reminder that you are cherished, appreciated, and never truly alone.
            </p>
          </div>

          <main className="space-y-6 sm:space-y-12">
            {/* Section A: A Little Note For You */}
            <LittleNoteSection />

            {/* Section B: When I Miss You */}
            <WhenIMissYouSection />

            {/* Section C: A Little Care Corner */}
            <CareCornerSection />

            {/* Section D: A Little Flirting Corner */}
            <FlirtingCornerSection />

            {/* Section E: A Little Laugh */}
            <LaughSection />

            {/* Section 5: Animated Mini Love Story */}
            <MiniStorySection />

            {/* Section 7: Final Interactive Book */}
            <InteractiveBookSection />
          </main>

          {/* Footer */}
          <Footer onReplayOpening={handleReplayOpening} />
        </div>
      )}
    </div>
  );
}
