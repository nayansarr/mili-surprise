import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SAMPLE_RATE = 44100;
const BPM = 84;
const BEAT = 60 / BPM; // ~0.714s per beat

// Note frequencies in Hz
const NOTES = {
  'F#2': 92.50, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
  'D3': 146.83, 'F#3': 185.00, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C#4': 277.18, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C#5': 554.37, 'D5': 587.33, 'E5': 659.25, 'F#5': 739.99, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'REST': 0
};

// Suzume theme chord progression: Bm -> G -> D -> A (repeated with subtle variations)
// 16 bars total for a complete, breathtaking loop (~45.7 seconds)
const TOTAL_BARS = 16;
const TOTAL_SECONDS = TOTAL_BARS * 4 * BEAT;
const TOTAL_SAMPLES = Math.floor(TOTAL_SECONDS * SAMPLE_RATE);

const leftChannel = new Float32Array(TOTAL_SAMPLES);
const rightChannel = new Float32Array(TOTAL_SAMPLES);

function addPianoNote(noteName, startTime, duration, velocity = 0.5, pan = 0) {
  const freq = NOTES[noteName];
  if (!freq) return;

  const startSample = Math.floor(startTime * SAMPLE_RATE);
  const noteSamples = Math.floor(duration * SAMPLE_RATE);

  for (let i = 0; i < noteSamples; i++) {
    const idx = (startSample + i) % TOTAL_SAMPLES;
    const t = i / SAMPLE_RATE;

    // Emotive acoustic piano modeling: Fundamental + rich harmonic series
    const decay = Math.exp(-t * (2.8 - Math.log(freq / 200) * 0.4));
    let sample = Math.sin(2 * Math.PI * freq * t) * 0.65;
    sample += Math.sin(2 * Math.PI * (freq * 2.001) * t) * 0.28 * Math.exp(-t * 3.5);
    sample += Math.sin(2 * Math.PI * (freq * 3.003) * t) * 0.16 * Math.exp(-t * 4.5);
    sample += Math.sin(2 * Math.PI * (freq * 4.004) * t) * 0.08 * Math.exp(-t * 6.0);
    sample += Math.sin(2 * Math.PI * (freq * 0.5) * t) * 0.12 * Math.exp(-t * 2.0); // subtle sub-resonance

    // Gentle soft attack (15ms)
    const attack = Math.min(1, t / 0.015);
    const val = sample * decay * attack * velocity;

    // Stereo panning
    const leftGain = Math.cos((pan + 1) * Math.PI / 4);
    const rightGain = Math.sin((pan + 1) * Math.PI / 4);

    leftChannel[idx] += val * leftGain;
    rightChannel[idx] += val * rightGain;
  }
}

function addStringsPad(noteName, startTime, duration, velocity = 0.25, pan = 0) {
  const freq = NOTES[noteName];
  if (!freq) return;

  const startSample = Math.floor(startTime * SAMPLE_RATE);
  const noteSamples = Math.floor(duration * SAMPLE_RATE);

  for (let i = 0; i < noteSamples; i++) {
    const idx = (startSample + i) % TOTAL_SAMPLES;
    const t = i / SAMPLE_RATE;

    // Soft warm bowed string pad: sine + warm triangle + subtle slow vibrato
    const vibrato = Math.sin(2 * Math.PI * 4.8 * t) * 1.5;
    const f = freq + vibrato;
    let sample = Math.sin(2 * Math.PI * f * t) * 0.7;
    sample += Math.sin(2 * Math.PI * f * 2 * t) * 0.2;
    sample += Math.sin(2 * Math.PI * f * 3 * t) * 0.08;

    // Slow cinematic swell envelope
    const attack = Math.min(1, t / 0.8);
    const release = Math.min(1, (duration - t) / 0.8);
    const env = attack * Math.max(0, release);

    const val = sample * env * velocity;
    const leftGain = Math.cos((pan + 1) * Math.PI / 4);
    const rightGain = Math.sin((pan + 1) * Math.PI / 4);

    leftChannel[idx] += val * leftGain;
    rightChannel[idx] += val * rightGain;
  }
}

// 1. Compose Background Chords & Arpeggios (Bm, G, D, A)
const chords = [
  // Section 1: Intro (Bars 1-4)
  { root: 'B2', notes: ['B3', 'D4', 'F#4'], bass: 'B2' },
  { root: 'G2', notes: ['G3', 'B3', 'D4'], bass: 'G2' },
  { root: 'D3', notes: ['D3', 'F#3', 'A3', 'D4'], bass: 'D3' },
  { root: 'A2', notes: ['A2', 'E3', 'A3', 'C#4'], bass: 'A2' },

  // Section 2: Main Melody (Bars 5-8)
  { root: 'B2', notes: ['B3', 'D4', 'F#4'], bass: 'B2' },
  { root: 'G2', notes: ['G3', 'B3', 'D4'], bass: 'G2' },
  { root: 'D3', notes: ['D3', 'F#3', 'A3', 'D4'], bass: 'D3' },
  { root: 'A2', notes: ['A2', 'E3', 'A3', 'C#4'], bass: 'A2' },

  // Section 3: Climax / Harmony (Bars 9-12)
  { root: 'B2', notes: ['B3', 'D4', 'F#4'], bass: 'B2' },
  { root: 'G2', notes: ['G3', 'B3', 'D4'], bass: 'G2' },
  { root: 'D3', notes: ['D3', 'F#3', 'A3', 'D4'], bass: 'D3' },
  { root: 'A2', notes: ['A2', 'E3', 'A3', 'C#4'], bass: 'A2' },

  // Section 4: Gentle outro settling into seamless loop (Bars 13-16)
  { root: 'B2', notes: ['B3', 'D4', 'F#4'], bass: 'B2' },
  { root: 'G2', notes: ['G3', 'B3', 'D4'], bass: 'G2' },
  { root: 'D3', notes: ['D3', 'F#3', 'A3', 'D4'], bass: 'D3' },
  { root: 'F#2', notes: ['F#2', 'C#3', 'F#3', 'A#3'], bass: 'F#2' }
];

chords.forEach((chord, barIdx) => {
  const barStart = barIdx * 4 * BEAT;

  // Deep resonant bass note
  addPianoNote(chord.bass, barStart, 3.8 * BEAT, 0.42, -0.2);

  // Soft cinematic strings pad underneath
  chord.notes.forEach(n => {
    addStringsPad(n, barStart, 4.0 * BEAT, barIdx >= 4 ? 0.22 : 0.12, 0);
  });

  // Delicate arpeggiated piano pattern on each beat
  addPianoNote(chord.notes[0], barStart, 1.8 * BEAT, 0.28, -0.3);
  addPianoNote(chord.notes[1], barStart + 1 * BEAT, 1.8 * BEAT, 0.26, 0.2);
  addPianoNote(chord.notes[2] || chord.notes[0], barStart + 2 * BEAT, 1.8 * BEAT, 0.28, -0.1);
  addPianoNote(chord.notes[1], barStart + 3 * BEAT, 1.8 * BEAT, 0.24, 0.3);
});

// 2. Compose the iconic Suzume Melody (Enters at Bar 5, with second phrase at Bar 9)
// The iconic theme: B4 -> D5 -> E5 -> F#5 -> E5 -> D5 -> B4 -> A4 -> B4 -> D5 -> B4
const melodyNotes = [
  // Phrase 1 (Bars 5-8)
  { note: 'B4', time: 16.0, dur: 1.0, vel: 0.55 },
  { note: 'D5', time: 17.0, dur: 0.5, vel: 0.52 },
  { note: 'E5', time: 17.5, dur: 0.5, vel: 0.54 },
  { note: 'F#5', time: 18.0, dur: 1.5, vel: 0.60 },
  { note: 'E5', time: 19.5, dur: 0.5, vel: 0.50 },

  { note: 'D5', time: 20.0, dur: 1.0, vel: 0.54 },
  { note: 'B4', time: 21.0, dur: 1.0, vel: 0.56 },
  { note: 'A4', time: 22.0, dur: 1.0, vel: 0.48 },
  { note: 'B4', time: 23.0, dur: 1.0, vel: 0.52 },

  { note: 'D5', time: 24.0, dur: 1.5, vel: 0.58 },
  { note: 'B4', time: 25.5, dur: 1.5, vel: 0.50 },
  { note: 'A4', time: 27.0, dur: 1.0, vel: 0.46 },

  { note: 'B4', time: 28.0, dur: 2.0, vel: 0.54 },
  { note: 'F#4', time: 30.0, dur: 2.0, vel: 0.45 },

  // Phrase 2 (Bars 9-12): Climax octave variation with emotional bells
  { note: 'B4', time: 32.0, dur: 1.0, vel: 0.60 },
  { note: 'D5', time: 33.0, dur: 0.5, vel: 0.58 },
  { note: 'E5', time: 33.5, dur: 0.5, vel: 0.60 },
  { note: 'F#5', time: 34.0, dur: 1.5, vel: 0.68 },
  { note: 'A5', time: 35.5, dur: 0.5, vel: 0.65 },

  { note: 'F#5', time: 36.0, dur: 1.5, vel: 0.62 },
  { note: 'E5', time: 37.5, dur: 0.5, vel: 0.58 },
  { note: 'D5', time: 38.0, dur: 1.5, vel: 0.58 },
  { note: 'E5', time: 39.5, dur: 0.5, vel: 0.52 },

  { note: 'F#5', time: 40.0, dur: 1.5, vel: 0.64 },
  { note: 'D5', time: 41.5, dur: 1.5, vel: 0.56 },
  { note: 'B4', time: 43.0, dur: 1.0, vel: 0.52 },

  { note: 'A4', time: 44.0, dur: 1.5, vel: 0.48 },
  { note: 'B4', time: 45.5, dur: 2.5, vel: 0.58 }
];

melodyNotes.forEach(m => {
  const actualTime = m.time * BEAT;
  const actualDur = m.dur * BEAT;

  // Lead piano melody
  addPianoNote(m.note, actualTime, actualDur * 1.4, m.vel, 0.05);

  // Emotive celesta chime sparkle on high notes
  if (['F#5', 'A5', 'D5'].includes(m.note)) {
    addPianoNote(m.note, actualTime, actualDur * 2.0, m.vel * 0.35, 0.35);
  }
});

// 3. Apply Cinematic Feedback Delay / Lush Reverb
const delaySamples = Math.floor(0.42 * SAMPLE_RATE); // 420ms delay
const delayGain = 0.28;
for (let i = delaySamples; i < TOTAL_SAMPLES; i++) {
  leftChannel[i] += rightChannel[i - delaySamples] * delayGain;
  rightChannel[i] += leftChannel[i - delaySamples] * delayGain;
}

// 4. Normalize and create 16-bit PCM Buffer
let maxAmp = 0;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  maxAmp = Math.max(maxAmp, Math.abs(leftChannel[i]), Math.abs(rightChannel[i]));
}

const targetPeak = 0.88;
const scale = maxAmp > 0 ? targetPeak / maxAmp : 1;

const wavBuffer = Buffer.alloc(44 + TOTAL_SAMPLES * 4);

// Write WAV Header
wavBuffer.write('RIFF', 0);
wavBuffer.writeUInt32LE(36 + TOTAL_SAMPLES * 4, 4);
wavBuffer.write('WAVE', 8);
wavBuffer.write('fmt ', 12);
wavBuffer.writeUInt32LE(16, 16); // subchunk1 size
wavBuffer.writeUInt16LE(1, 20);  // PCM format
wavBuffer.writeUInt16LE(2, 22);  // 2 channels (stereo)
wavBuffer.writeUInt32LE(SAMPLE_RATE, 24); // sample rate
wavBuffer.writeUInt32LE(SAMPLE_RATE * 4, 28); // byte rate (sampleRate * 2 * 2)
wavBuffer.writeUInt16LE(4, 32);  // block align (2 channels * 2 bytes)
wavBuffer.writeUInt16LE(16, 34); // bits per sample
wavBuffer.write('data', 36);
wavBuffer.writeUInt32LE(TOTAL_SAMPLES * 4, 40);

let offset = 44;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  const l = Math.max(-1, Math.min(1, leftChannel[i] * scale));
  const r = Math.max(-1, Math.min(1, rightChannel[i] * scale));

  const sampleL = l < 0 ? l * 0x8000 : l * 0x7FFF;
  const sampleR = r < 0 ? r * 0x8000 : r * 0x7FFF;

  wavBuffer.writeInt16LE(Math.round(sampleL), offset);
  wavBuffer.writeInt16LE(Math.round(sampleR), offset + 2);
  offset += 4;
}

// Ensure public directories exist
fs.mkdirSync('/app/applet/public/audio', { recursive: true });
fs.mkdirSync('/app/applet/dist/audio', { recursive: true });

const wavPath = '/app/applet/public/audio/suzume.wav';
const mp3Path = '/app/applet/public/audio/suzume.mp3';

fs.writeFileSync(wavPath, wavBuffer);
console.log(`Wrote WAV to ${wavPath} (${(wavBuffer.length / 1024 / 1024).toFixed(2)} MB)`);

// Convert to high-quality MP3 using ffmpeg
try {
  execSync(`ffmpeg -y -i "${wavPath}" -codec:a libmp3lame -b:a 192k "${mp3Path}"`);
  console.log(`Successfully converted to MP3: ${mp3Path}`);

  // Also copy to dist if dist exists so both dev and build are immediately populated
  fs.copyFileSync(mp3Path, '/app/applet/dist/audio/suzume.mp3');
  fs.copyFileSync(wavPath, '/app/applet/dist/audio/suzume.wav');
} catch (e) {
  console.error('ffmpeg conversion error:', e);
}
