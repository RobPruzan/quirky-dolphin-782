'use client';

import { useStrudelPlayer } from '../context/StrudelPlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export function StrudelPlayerControls() {
  const { currentPattern, isPlaying, currentTime, volume, togglePlay, next, previous, setVolume } = useStrudelPlayer();

  if (!currentPattern) {
    return null;
  }

  const progress = (currentTime / currentPattern.duration) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-[#1a1a1a] px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Track info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-[#e5e5e5] truncate">
              {currentPattern.name}
            </div>
            <div className="text-xs text-[#888] truncate">
              {currentPattern.artist} • {currentPattern.genre} • {currentPattern.bpm} BPM
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-1 bg-[#1a1a1a] rounded-full relative">
            <div
              className="h-full bg-[#e5e5e5] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-[#666]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentPattern.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={previous}
              className="text-[#888] hover:text-[#e5e5e5] transition-colors p-2"
              aria-label="Previous pattern"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlay}
              className="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
            <button
              onClick={next}
              className="text-[#888] hover:text-[#e5e5e5] transition-colors p-2"
              aria-label="Next pattern"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 size={18} className="text-[#888]" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-[#1a1a1a] rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:cursor-pointer
                hover:[&::-webkit-slider-thumb]:scale-110
                [&::-webkit-slider-thumb]:transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
