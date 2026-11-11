import React, { useState } from 'react';
import { DEFAULT_CARE_ITEMS } from '../data/surpriseData';
import { CareItem } from '../types/surprise';
import { toggleCareCompletion, calculateCareProgress } from '../utils/romanticState';

export const CareCornerSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<CareItem | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const handleCardClick = (item: CareItem) => {
    setSelectedItem(item);
  };

  const handleToggleComplete = (id: string) => {
    setCompletedIds(prev => toggleCareCompletion(prev, id));
  };

  const getIcon = (type: CareItem['icon']) => {
    switch (type) {
      case 'food':
        return '🥣';
      case 'break':
        return '🌿';
      case 'rest':
        return '🌙';
      case 'water':
        return '💧';
      case 'peace':
        return '🕊️';
      default:
        return '✨';
    }
  };

  const progress = calculateCareProgress(completedIds.length, DEFAULT_CARE_ITEMS.length);

  return (
    <section id="care" className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-emerald-300 font-medium">
            Chapter III · Gentle Comfort
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-pink-100 mt-2">
            Have you taken care of yourself today?
          </h2>
          <p className="text-sm text-slate-300/80 mt-2 max-w-md mx-auto font-sans-soft">
            No pressure, no checklists. Just a tender virtual comfort corner to wrap around you.
          </p>

          {/* Gentle progress heart badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-xs text-pink-200">
            <span>{completedIds.length} of {DEFAULT_CARE_ITEMS.length} reminders checked</span>
            <span aria-hidden="true">·</span>
            <span>{progress}% loved & cared for</span>
          </div>
        </div>

        {/* 5 Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEFAULT_CARE_ITEMS.map(item => {
            const isCompleted = completedIds.includes(item.id);
            const isSelected = selectedItem?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className={`relative rounded-2xl p-6 glass-panel cursor-pointer transition-all duration-300 border text-left flex flex-col justify-between group ${
                  isSelected
                    ? 'border-pink-400/50 shadow-xl shadow-pink-500/20 bg-pink-950/30'
                    : isCompleted
                    ? 'border-emerald-400/30 bg-emerald-950/20'
                    : 'border-white/10 hover:border-pink-300/30 hover:bg-white/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                      {getIcon(item.icon)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleComplete(item.id);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-white/5 border border-white/20 text-slate-400 hover:border-pink-300'
                      }`}
                      aria-label={`Mark ${item.shortLabel} done`}
                    >
                      {isCompleted ? '✓' : '♡'}
                    </button>
                  </div>

                  <h3 className="font-display text-lg text-pink-100 group-hover:text-white transition-colors">
                    {item.question}
                  </h3>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-pink-300/80">
                  <span>{item.shortLabel}</span>
                  <span className="group-hover:translate-x-1 transition-transform">Read warm advice →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Care Response Panel */}
        {selectedItem && (
          <div className="mt-8 rounded-3xl p-6 sm:p-8 glass-panel border border-pink-300/30 shadow-2xl animate-fadeIn relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 flex items-center justify-center text-xs"
              aria-label="Close comfort message"
            >
              ✕
            </button>

            <div className="flex items-start gap-4">
              <span className="text-4xl">{getIcon(selectedItem.icon)}</span>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-pink-300 font-medium">
                  {selectedItem.shortLabel}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-pink-100">
                  {selectedItem.responseTitle}
                </h3>
                <p className="text-slate-200/90 leading-relaxed font-sans-soft text-base">
                  {selectedItem.comfortMessage}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-pink-200/90 font-medium">
                  <span>Tip:</span>
                  <span>{selectedItem.actionTip}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
