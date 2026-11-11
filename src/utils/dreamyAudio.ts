/**
 * Romantic background audio engine featuring Suzume as the permanent soundtrack.
 * Supports continuous looping, initial autoplay attempt, automatic start on first
 * user interaction, volume controls, and optional custom audio uploads.
 */

function safeGetStorage(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (err) {
    console.warn('Storage read restricted:', err);
  }
  return null;
}

function safeSetStorage(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (err) {
    console.warn('Storage write restricted:', err);
  }
}

function safeRemoveStorage(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (err) {
    console.warn('Storage remove restricted:', err);
  }
}

const SUZUME_TRACK_TITLE = 'Suzume (Theme)';
const SUZUME_AUDIO_SRC = '/audio/suzume.mp3';

class DreamyAudioEngine {
  private ctx: AudioContext | null = null;
  private volume = 0.65;
  private suzumeAudio: HTMLAudioElement | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;
  private customAudioName: string | null = null;
  private isPlayingState = false;
  private hasSetupInteractionListener = false;
  private onStateChangeListeners: Array<() => void> = [];

  constructor() {
    this.customAudioName = safeGetStorage('mili_custom_audio_name');
    if (typeof window !== 'undefined') {
      this.initSuzumeAudio();
    }
  }

  private initSuzumeAudio(): HTMLAudioElement {
    if (!this.suzumeAudio && typeof window !== 'undefined') {
      this.suzumeAudio = new Audio();
      this.suzumeAudio.src = SUZUME_AUDIO_SRC;
      this.suzumeAudio.loop = true;
      this.suzumeAudio.preload = 'auto';
      this.suzumeAudio.volume = this.volume;

      this.suzumeAudio.addEventListener('play', () => {
        this.isPlayingState = true;
        this.notify();
      });

      this.suzumeAudio.addEventListener('pause', () => {
        if (!this.customAudio || this.customAudio.paused) {
          this.isPlayingState = false;
          this.notify();
        }
      });

      this.suzumeAudio.addEventListener('ended', () => {
        // Enforce continuous loop
        if (this.suzumeAudio) {
          this.suzumeAudio.currentTime = 0;
          this.suzumeAudio.play().catch(() => {});
        }
      });

      this.suzumeAudio.addEventListener('error', (e) => {
        console.warn('Suzume MP3 error, trying WAV fallback if present', e);
        if (this.suzumeAudio && this.suzumeAudio.src.endsWith('.mp3')) {
          this.suzumeAudio.src = '/audio/suzume.wav';
          this.suzumeAudio.load();
        }
      });
    }
    return this.suzumeAudio!;
  }

  public subscribe(listener: () => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.onStateChangeListeners.forEach(listener => {
      try {
        listener();
      } catch (err) {
        console.error('Audio state listener error:', err);
      }
    });
  }

  private getContext(): AudioContext | null {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch (e) {
      console.warn('AudioContext unavailable or restricted:', e);
      return null;
    }
  }

  public isPlaying(): boolean {
    if (this.customAudio && !this.customAudio.paused) {
      return true;
    }
    if (this.suzumeAudio && !this.suzumeAudio.paused) {
      return true;
    }
    return this.isPlayingState;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCustomAudioName(): string | null {
    return this.customAudioName;
  }

  public getTrackTitle(): string {
    return this.customAudioName ? this.customAudioName : SUZUME_TRACK_TITLE;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.suzumeAudio) {
      this.suzumeAudio.volume = this.volume;
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
    this.notify();
  }

  /**
   * Attempts automatic playback on open. If blocked by browser autoplay policy,
   * sets up a one-time listener so audio starts on the visitor's very first interaction
   * (e.g. tapping "Come here", click, touch, or key).
   */
  public attemptAutoplay() {
    this.play().then(() => {
      console.log('Suzume soundtrack autoplay succeeded.');
    }).catch((err) => {
      console.log('Autoplay deferred pending first user interaction:', err?.message || err);
      this.setupFirstInteractionListener();
    });
  }

  private setupFirstInteractionListener() {
    if (this.hasSetupInteractionListener || typeof window === 'undefined') return;
    this.hasSetupInteractionListener = true;

    const startOnInteraction = () => {
      this.play().catch(() => {});
      ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, startOnInteraction, true);
      });
    };

    ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
      window.addEventListener(evt, startOnInteraction, { once: true, capture: true });
    });
  }

  public async play(): Promise<void> {
    // If a custom track was uploaded and active, play it
    if (this.customAudioUrl && this.customAudio) {
      this.customAudio.volume = this.volume;
      await this.customAudio.play();
      this.isPlayingState = true;
      this.notify();
      return;
    }

    // Default & only soundtrack: Suzume
    const audio = this.initSuzumeAudio();
    audio.volume = this.volume;
    try {
      await audio.play();
      this.isPlayingState = true;
      this.notify();
    } catch (err) {
      this.isPlayingState = false;
      this.notify();
      throw err;
    }
  }

  public stop() {
    if (this.customAudio) {
      try {
        this.customAudio.pause();
      } catch {
        // ignore
      }
    }
    if (this.suzumeAudio) {
      try {
        this.suzumeAudio.pause();
      } catch {
        // ignore
      }
    }
    this.isPlayingState = false;
    this.notify();
  }

  public toggle() {
    if (this.isPlaying()) {
      this.stop();
    } else {
      this.play().catch((err) => {
        console.warn('Playback toggle failed:', err);
      });
    }
  }

  public async setCustomAudioFile(file: File) {
    this.stop();

    if (this.customAudioUrl) {
      try {
        URL.revokeObjectURL(this.customAudioUrl);
      } catch {
        // ignore
      }
    }

    try {
      this.customAudioUrl = URL.createObjectURL(file);
      this.customAudioName = file.name;
      safeSetStorage('mili_custom_audio_name', file.name);

      if (!this.customAudio) {
        this.customAudio = new Audio();
        this.customAudio.loop = true;
        this.customAudio.addEventListener('ended', () => {
          this.isPlayingState = false;
          this.notify();
        });
        this.customAudio.addEventListener('error', (e) => {
          console.warn('Custom audio playback error, restoring Suzume', e);
          this.resetToBuiltInMusic();
        });
      }

      this.customAudio.src = this.customAudioUrl;
      this.customAudio.volume = this.volume;

      try {
        await this.customAudio.play();
        this.isPlayingState = true;
      } catch (err) {
        console.warn('Custom audio waiting for user interaction:', err);
        this.isPlayingState = false;
      }
    } catch (err) {
      console.error('Error handling audio file:', err);
    }
    this.notify();
  }

  public resetToBuiltInMusic() {
    this.stop();
    if (this.customAudioUrl) {
      try {
        URL.revokeObjectURL(this.customAudioUrl);
      } catch {
        // ignore
      }
      this.customAudioUrl = null;
    }
    this.customAudioName = null;
    safeRemoveStorage('mili_custom_audio_name');

    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio.src = '';
    }

    // Play Suzume immediately
    this.play().catch(() => {});
  }

  public playHugChime() {
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const chord = [523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(this.volume * 0.2, now + idx * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.6);
      });
    } catch {
      // Graceful
    }
  }

  public playKissChime() {
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const notes = [659.25, 880.00, 1174.66];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(this.volume * 0.22, now + idx * 0.07 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 1.3);
      });
    } catch {
      // Graceful
    }
  }

  public playPageFlip() {
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(1.5, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.15, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Graceful
    }
  }
}

export const dreamyAudio = new DreamyAudioEngine();
