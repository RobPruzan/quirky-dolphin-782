'use client';

import { useStrudelPlayer } from '../context/StrudelPlayerContext';
import { Pattern } from '../lib/patterns';
import { Play, Pause } from 'lucide-react';

interface PatternListProps {
  patterns: Pattern[];
}

export function PatternList({ patterns }: PatternListProps) {
  const { currentPattern, isPlaying, playPattern, togglePlay, currentIndex } = useStrudelPlayer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePatternClick = (pattern: Pattern, index: number) => {
    if (currentPattern?.id === pattern.id) {
      togglePlay();
    } else {
      playPattern(pattern, index);
    }
  };

  return (
    <div className="flex-1 overflow-auto pb-32">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-1">
          {patterns.map((pattern, index) => {
            const isCurrentPattern = currentPattern?.id === pattern.id;
            const isActive = isCurrentPattern && isPlaying;

            return (
              <div
                key={pattern.id}
                onClick={() => handlePatternClick(pattern, index)}
                className={`
                  group flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
                  transition-colors
                  ${isCurrentPattern ? 'bg-[#1a1a1a]' : 'hover:bg-[#0f0f0f]'}
                `}
              >
                <div className="w-12 flex justify-center">
                  {isCurrentPattern ? (
                    <button className="text-white">
                      {isPlaying ? (
                        <Pause size={16} fill="currentColor" />
                      ) : (
                        <Play size={16} fill="currentColor" />
                      )}
                    </button>
                  ) : (
                    <span className="text-[#666] group-hover:hidden text-sm">
                      {index + 1}
                    </span>
                  )}
                  <Play
                    size={16}
                    fill="currentColor"
                    className={`${isCurrentPattern ? 'hidden' : 'hidden group-hover:block text-white'}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm truncate ${isCurrentPattern ? 'text-white' : 'text-[#e5e5e5]'}`}>
                    {pattern.name}
                  </div>
                  <div className="text-xs text-[#888] truncate">
                    {pattern.artist}
                  </div>
                </div>

                <div className="text-sm text-[#666]">
                  {pattern.genre}
                </div>

                <div className="text-xs text-[#666]">
                  {pattern.bpm} BPM
                </div>

                <div className="text-sm text-[#666] w-12 text-right">
                  {formatTime(pattern.duration)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
