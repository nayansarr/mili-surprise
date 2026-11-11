import React, { useState, useEffect, useRef } from 'react';
import { dreamyAudio } from '../utils/dreamyAudio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [customTrackName, setCustomTrackName] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const syncState = () => {
      setIsPlaying(dreamyAudio.isPlaying());
      setVolume(dreamyAudio.getVolume());
      setCustomTrackName(dreamyAudio.getCustomAudioName());
    };

    syncState();
    const unsubscribe = dreamyAudio.subscribe(syncState);
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    dreamyAudio.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    dreamyAudio.setVolume(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dreamyAudio.setCustomAudioFile(file);
      setShowUploadModal(false);
    }
  };

  const handleResetToBuiltin = () => {
    dreamyAudio.resetToBuiltInMusic();
    setShowUploadModal(false);
  };

  return (
    <>
      {/* Floating Elegant Music Dock */}
      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex items-center gap-1.5 sm:gap-2">
        {/* Collapsible Volume Slider */}
        {showVolumeSlider && (
          <div className="glass-panel px-3 py-2 rounded-2xl flex items-center gap-2 animate-fadeIn border border-white/10 shadow-lg">
            <span className="text-xs text-pink-300">🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-pink-400 h-1 bg-white/20 rounded-lg cursor-pointer"
              aria-label="Volume slider"
            />
            <span className="text-xs text-pink-300">🔊</span>
          </div>
        )}

        {/* Volume Button Toggle */}
        <button
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          className="w-10 h-10 rounded-full glass-panel border border-white/10 hover:border-pink-300/30 text-slate-300 hover:text-pink-200 flex items-center justify-center text-xs transition-colors shadow-md"
          title="Adjust volume"
          aria-label="Adjust volume"
        >
          {volume === 0 ? '🔇' : '🔉'}
        </button>

        {/* Custom Audio Upload Button */}
        <button
          onClick={() => setShowUploadModal(true)}
          className="w-10 h-10 rounded-full glass-panel border border-white/10 hover:border-pink-300/30 text-slate-300 hover:text-pink-200 flex items-center justify-center text-xs transition-colors shadow-md"
          title="Upload or change song"
          aria-label="Custom song settings"
        >
          🎵
        </button>

        {/* Primary Play / Pause Button with Visualizer */}
        <button
          onClick={handleToggle}
          className="glass-button h-11 px-4 rounded-full flex items-center gap-2.5 text-xs font-medium text-pink-100 shadow-xl cursor-pointer"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <>
              {/* Equalizer bars */}
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-0.5 h-3 bg-pink-300 animate-pulse" />
                <span className="w-0.5 h-4 bg-purple-300 animate-pulse delay-75" />
                <span className="w-0.5 h-2.5 bg-rose-300 animate-pulse delay-150" />
              </div>
              <span className="truncate max-w-[100px] sm:max-w-[130px]">
                {customTrackName || 'Suzume (Theme)'}
              </span>
            </>
          ) : (
            <>
              <span>▶</span>
              <span className="hidden sm:inline">Play Suzume</span>
            </>
          )}
        </button>
      </div>

      {/* Upload & Sound Settings Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-md w-full border border-pink-300/30 shadow-2xl relative text-left">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-xs"
              aria-label="Close modal"
            >
              ✕
            </button>

            <span className="text-xs uppercase tracking-widest text-pink-300 font-medium">
              Audio Settings
            </span>
            <h3 className="font-display text-xl text-pink-100 mt-1 mb-2">
              Background Soundtrack
            </h3>
            <p className="text-xs text-slate-300/80 leading-relaxed font-sans-soft mb-6">
              The website plays the romantic Suzume theme as the permanent background soundtrack, or you can upload your own special song (like a track that reminds you of Mili!).
            </p>

            <div className="space-y-4">
              {/* Current Status */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <span className="text-slate-400">Current track: </span>
                <span className="text-pink-200 font-medium">
                  {customTrackName ? `Custom (${customTrackName})` : 'Suzume (Theme)'}
                </span>
              </div>

              {/* Upload file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full glass-button py-3 rounded-xl text-pink-100 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📂 Choose an audio file from your device</span>
              </button>

              {customTrackName && (
                <button
                  onClick={handleResetToBuiltin}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors"
                >
                  Reset to Suzume soundtrack
                </button>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400">
              Note: The soundtrack will smoothly keep playing as you browse through all chapters.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
