import React from 'react';

export type CharacterAction = 
  | 'apart' 
  | 'approaching' 
  | 'hugging' 
  | 'kissing' 
  | 'tired-mili' 
  | 'nayan-comfort' 
  | 'silly-cheer' 
  | 'mili-care-nayan' 
  | 'moon-gazing' 
  | 'celebrating';

interface CuteCharactersProps {
  action: CharacterAction;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showHearts?: boolean;
}

export const CuteCharacters: React.FC<CuteCharactersProps> = ({
  action,
  size = 'md',
  className = '',
  showHearts = true
}) => {
  const isHugging = action === 'hugging' || action === 'celebrating';
  const isKissing = action === 'kissing';
  const isApproaching = action === 'approaching';
  const isApart = action === 'apart';

  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-110 sm:scale-125' : 'scale-90 sm:scale-100';

  return (
    <div className={`relative flex items-center justify-center min-h-[220px] select-none ${className}`}>
      {/* Floating Sparkles & Hearts when hugging or kissing */}
      {showHearts && (isHugging || isKissing) && (
        <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
          <div className="absolute -top-12 animate-bounce text-pink-400 text-3xl">♡</div>
          <div className="absolute -top-20 -left-12 animate-pulse text-purple-300 text-2xl">✨</div>
          <div className="absolute -top-16 -right-12 animate-pulse text-rose-300 text-2xl">♡</div>
          <div className="absolute -top-6 -left-20 animate-float-gentle text-pink-300 text-xl">♡</div>
          <div className="absolute -top-8 right-20 animate-float-gentle text-yellow-200 text-xl">✨</div>
          <div className="absolute -bottom-4 text-pink-400 text-xl animate-ping opacity-60">♡</div>
          {/* Radiant back aura */}
          <div className="absolute w-56 h-56 rounded-full bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 blur-2xl animate-pulse" />
        </div>
      )}

      <div className={`flex items-end justify-center transition-all duration-700 ease-out ${scale}`}>
        {/* ===================== NAYAN ===================== */}
        <div
          className={`relative transition-all duration-700 ease-out z-10 ${
            isHugging
              ? 'translate-x-6 sm:translate-x-7 rotate-3'
              : isKissing
              ? 'translate-x-7 sm:translate-x-8 rotate-6'
              : isApproaching
              ? 'translate-x-2'
              : isApart
              ? '-translate-x-14 sm:-translate-x-24'
              : action === 'tired-mili'
              ? '-translate-x-12'
              : action === 'nayan-comfort' || action === 'silly-cheer'
              ? 'translate-x-4'
              : action === 'mili-care-nayan'
              ? '-translate-x-2'
              : action === 'moon-gazing'
              ? '-translate-x-5'
              : '-translate-x-8'
          }`}
        >
          {/* Nayan's Dialog Bubble in story scenes */}
          {action === 'silly-cheer' && (
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-indigo-900/90 text-indigo-100 text-xs px-3 py-1.5 rounded-2xl border border-indigo-400/40 whitespace-nowrap shadow-lg animate-bounce">
              Tada! Look at this star! ⭐
            </div>
          )}
          {action === 'nayan-comfort' && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-indigo-900/90 text-indigo-100 text-xs px-3 py-1.5 rounded-2xl border border-indigo-400/40 whitespace-nowrap shadow-lg animate-pulse">
              I got you ♡
            </div>
          )}

          {/* Nayan Character SVG */}
          <svg width="120" height="140" viewBox="0 0 120 140" className="drop-shadow-md">
            <defs>
              <linearGradient id="nayanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="nayanBelly" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="100%" stopColor="#c7d2fe" />
              </linearGradient>
            </defs>

            {/* Left Ear */}
            <circle cx="34" cy="38" r="14" fill="#6366f1" />
            <circle cx="34" cy="38" r="8" fill="#e0e7ff" opacity="0.8" />

            {/* Right Ear */}
            <circle cx="86" cy="38" r="14" fill="#6366f1" />
            <circle cx="86" cy="38" r="8" fill="#e0e7ff" opacity="0.8" />

            {/* Body */}
            <path
              d="M 32 80 C 22 92, 22 124, 38 132 C 50 138, 70 138, 82 132 C 98 124, 98 92, 88 80 Z"
              fill="url(#nayanGrad)"
            />

            {/* Belly */}
            <ellipse cx="60" cy="108" rx="20" ry="18" fill="url(#nayanBelly)" />

            {/* Head */}
            <circle cx="60" cy="62" r="32" fill="url(#nayanGrad)" />

            {/* Eyes */}
            {isHugging || isKissing || action === 'moon-gazing' ? (
              // Happy squinting curves
              <>
                <path d="M 46 62 Q 52 56 58 62" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 64 62 Q 70 56 76 62" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : action === 'mili-care-nayan' ? (
              // Sleepy cozy eyes
              <>
                <path d="M 46 63 Q 52 68 58 63" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 64 63 Q 70 68 76 63" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              // Kind round eyes
              <>
                <ellipse cx="50" cy="61" rx="4" ry="5.5" fill="#ffffff" />
                <circle cx="51.5" cy="59.5" r="1.8" fill="#1e1b4b" />
                <circle cx="49" cy="62" r="1" fill="#ffffff" />

                <ellipse cx="70" cy="61" rx="4" ry="5.5" fill="#ffffff" />
                <circle cx="71.5" cy="59.5" r="1.8" fill="#1e1b4b" />
                <circle cx="69" cy="62" r="1" fill="#ffffff" />
              </>
            )}

            {/* Blushing Cheeks */}
            <ellipse cx="42" cy="69" rx="6" ry="3.5" fill="#f43f5e" opacity="0.6" />
            <ellipse cx="78" cy="69" rx="6" ry="3.5" fill="#f43f5e" opacity="0.6" />

            {/* Nose & Smile */}
            <ellipse cx="60" cy="65" rx="3" ry="2" fill="#1e1b4b" />
            <path
              d={
                isHugging || isKissing || action === 'silly-cheer'
                  ? "M 55 69 Q 60 76 65 69"
                  : "M 56 68 Q 60 72 64 68"
              }
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Cozy Star Scarf */}
            <path
              d="M 38 78 Q 60 84 82 78 C 84 82, 78 88, 60 88 C 42 88, 36 82, 38 78 Z"
              fill="#fbbf24"
            />
            {/* Scarf tail */}
            <path d="M 68 85 L 74 104 L 84 102 L 78 84 Z" fill="#f59e0b" />
            <circle cx="76" cy="94" r="2.5" fill="#ffffff" opacity="0.8" />

            {/* Left Arm */}
            <path
              d={
                isHugging
                  ? "M 32 90 Q 54 84 76 96"
                  : isKissing
                  ? "M 32 90 Q 52 86 70 94"
                  : action === 'silly-cheer'
                  ? "M 34 94 Q 22 72 32 64"
                  : "M 32 90 Q 24 102 32 110"
              }
              stroke="#6366f1"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />

            {/* Right Arm (reaches out to Mili) */}
            <path
              d={
                isHugging
                  ? "M 88 92 Q 106 90 114 98"
                  : isKissing
                  ? "M 88 92 Q 102 88 112 94"
                  : action === 'silly-cheer'
                  ? "M 86 92 Q 100 68 94 58"
                  : isApproaching
                  ? "M 86 92 Q 102 96 110 94"
                  : "M 86 92 Q 94 104 88 112"
              }
              stroke="#6366f1"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />

            {/* Silly juggle stars for scene 3 */}
            {action === 'silly-cheer' && (
              <>
                <polygon points="32,54 34,58 39,59 35,62 36,67 32,64 28,67 29,62 25,59 30,58" fill="#fef08a" />
                <polygon points="94,48 96,52 101,53 97,56 98,61 94,58 90,61 91,56 87,53 92,52" fill="#fef08a" />
              </>
            )}

            {/* Feet */}
            <ellipse cx="44" cy="133" rx="10" ry="6" fill="#4f46e5" />
            <ellipse cx="76" cy="133" rx="10" ry="6" fill="#4f46e5" />
          </svg>
          <div className="text-center font-handwriting text-indigo-300 text-sm mt-1">Nayan</div>
        </div>

        {/* Center Heart / Sparkle Burst during Hug & Kiss */}
        {(isHugging || isKissing) && (
          <div className="relative -top-20 z-30 pointer-events-none -mx-4">
            <span className="inline-block text-pink-400 text-4xl animate-ping opacity-75">
              ♡
            </span>
          </div>
        )}

        {/* ===================== MILI ===================== */}
        <div
          className={`relative transition-all duration-700 ease-out z-10 ${
            isHugging
              ? '-translate-x-6 sm:-translate-x-7 -rotate-3'
              : isKissing
              ? '-translate-x-7 sm:-translate-x-8 -rotate-6'
              : isApproaching
              ? '-translate-x-2'
              : isApart
              ? 'translate-x-14 sm:translate-x-24'
              : action === 'tired-mili'
              ? 'translate-x-12 rotate-3'
              : action === 'nayan-comfort' || action === 'silly-cheer'
              ? '-translate-x-4'
              : action === 'mili-care-nayan'
              ? 'translate-x-2'
              : action === 'moon-gazing'
              ? 'translate-x-5'
              : 'translate-x-8'
          }`}
        >
          {/* Mili's Dialog Bubble in story scenes */}
          {action === 'tired-mili' && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-pink-950/90 text-pink-200 text-xs px-3 py-1.5 rounded-2xl border border-pink-400/40 whitespace-nowrap shadow-lg">
              *tired sigh* 💭
            </div>
          )}
          {action === 'mili-care-nayan' && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-pink-950/90 text-pink-200 text-xs px-3 py-1.5 rounded-2xl border border-pink-400/40 whitespace-nowrap shadow-lg animate-pulse">
              Drink warm tea ♡
            </div>
          )}

          {/* Mili Character SVG */}
          <svg width="120" height="140" viewBox="0 0 120 140" className="drop-shadow-md">
            <defs>
              <linearGradient id="miliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="miliBelly" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff1f2" />
                <stop offset="100%" stopColor="#fce7f3" />
              </linearGradient>
            </defs>

            {/* Cute Bunny Ears */}
            {/* Left Ear */}
            <path
              d={
                action === 'tired-mili'
                  ? "M 38 46 C 30 26, 20 22, 16 34 C 12 46, 26 52, 34 52 Z" // droopy
                  : "M 42 42 C 34 16, 24 10, 20 20 C 16 32, 28 42, 38 48 Z"
              }
              fill="#f472b6"
            />
            <path
              d={
                action === 'tired-mili'
                  ? "M 36 44 C 30 30, 24 28, 20 34 C 18 42, 28 46, 32 48 Z"
                  : "M 40 40 C 34 20, 26 16, 22 22 C 20 30, 28 38, 36 44 Z"
              }
              fill="#fff1f2"
              opacity="0.8"
            />

            {/* Right Ear */}
            <path
              d="M 78 48 C 88 42, 100 32, 96 20 C 92 10, 82 16, 74 42 Z"
              fill="#f472b6"
            />
            <path
              d="M 76 44 C 84 38, 92 30, 90 22 C 86 16, 80 20, 74 40 Z"
              fill="#fff1f2"
              opacity="0.8"
            />

            {/* Flower / Bow Pin on Left Ear */}
            <g transform="translate(36, 44)">
              <circle cx="0" cy="0" r="4" fill="#fb7185" />
              <circle cx="-3" cy="-3" r="3" fill="#fed7aa" />
              <circle cx="3" cy="-3" r="3" fill="#fed7aa" />
              <circle cx="-3" cy="3" r="3" fill="#fed7aa" />
              <circle cx="3" cy="3" r="3" fill="#fed7aa" />
              <circle cx="0" cy="0" r="2" fill="#fff" />
            </g>

            {/* Body */}
            <path
              d="M 34 82 C 24 94, 24 124, 38 132 C 50 138, 70 138, 82 132 C 96 124, 96 94, 86 82 Z"
              fill="url(#miliGrad)"
            />

            {/* Belly / Dress */}
            <ellipse cx="60" cy="110" rx="19" ry="17" fill="url(#miliBelly)" />

            {/* Head */}
            <circle cx="60" cy="62" r="31" fill="url(#miliGrad)" />

            {/* Eyes */}
            {isHugging || isKissing || action === 'silly-cheer' || action === 'moon-gazing' ? (
              // Sweet crescent eyes
              <>
                <path d="M 46 62 Q 52 56 58 62" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 64 62 Q 70 56 76 62" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : action === 'tired-mili' ? (
              // Droopy tired eyes
              <>
                <path d="M 46 61 Q 52 65 58 61" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 64 61 Q 70 65 76 61" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              // Bright sparkling anime bunny eyes
              <>
                <ellipse cx="50" cy="61" rx="4" ry="5.5" fill="#ffffff" />
                <circle cx="49" cy="59.5" r="1.8" fill="#831843" />
                <circle cx="51.5" cy="62" r="1" fill="#ffffff" />

                <ellipse cx="70" cy="61" rx="4" ry="5.5" fill="#ffffff" />
                <circle cx="69" cy="59.5" r="1.8" fill="#831843" />
                <circle cx="71.5" cy="62" r="1" fill="#ffffff" />
              </>
            )}

            {/* Rosy Cheeks */}
            <ellipse cx="42" cy="68" rx="6.5" ry="4" fill="#fb7185" opacity="0.75" />
            <ellipse cx="78" cy="68" rx="6.5" ry="4" fill="#fb7185" opacity="0.75" />

            {/* Nose & Sweet Smile */}
            <polygon points="60,65 58,63 62,63" fill="#831843" />
            <path
              d={
                action === 'tired-mili'
                  ? "M 57 70 Q 60 67 63 70"
                  : isHugging || isKissing || action === 'silly-cheer'
                  ? "M 55 68 Q 60 76 65 68"
                  : "M 56 67 Q 60 72 64 67"
              }
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Left Arm (towards Nayan) */}
            <path
              d={
                isHugging
                  ? "M 32 92 Q 14 90 6 98"
                  : isKissing
                  ? "M 32 92 Q 18 88 8 94"
                  : action === 'mili-care-nayan'
                  ? "M 34 94 Q 18 86 8 90" // holding cup
                  : isApproaching
                  ? "M 34 92 Q 18 96 10 94"
                  : "M 34 92 Q 26 104 32 112"
              }
              stroke="#f472b6"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />

            {/* Right Arm */}
            <path
              d={
                isHugging
                  ? "M 88 90 Q 66 84 44 96"
                  : isKissing
                  ? "M 88 90 Q 68 86 50 94"
                  : action === 'tired-mili'
                  ? "M 86 92 Q 88 106 82 114"
                  : "M 86 92 Q 94 102 88 110"
              }
              stroke="#f472b6"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />

            {/* Feet */}
            <ellipse cx="44" cy="133" rx="10" ry="6" fill="#db2777" />
            <ellipse cx="76" cy="133" rx="10" ry="6" fill="#db2777" />
          </svg>
          <div className="text-center font-handwriting text-pink-300 text-sm mt-1">Mili</div>
        </div>
      </div>
    </div>
  );
};
