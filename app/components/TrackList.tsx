'use client';

import { usePlayer } from '../context/PlayerContext';
import { Track } from '../types/music';
import { Play, Pause } from 'lucide-react';

interface TrackListProps {
  tracks: Track[];
}

export function TrackList({ tracks }: TrackListProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay, currentIndex } = usePlayer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrackClick = (track: Track, index: number) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track, index);
    }
  };

  return (
    <div className="flex-1 overflow-auto pb-32">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-1">
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            const isActive = isCurrentTrack && isPlaying;

            return (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track, index)}
                className={`
                  group flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
                  transition-colors
                  ${isCurrentTrack ? 'bg-[#1a1a1a]' : 'hover:bg-[#0f0f0f]'}
                `}
              >
                <div className="w-12 flex justify-center">
                  {isCurrentTrack ? (
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
                    className={`${isCurrentTrack ? 'hidden' : 'hidden group-hover:block text-white'}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm truncate ${isCurrentTrack ? 'text-white' : 'text-[#e5e5e5]'}`}>
                    {track.title}
                  </div>
                  <div className="text-xs text-[#888] truncate">
                    {track.artist}
                  </div>
                </div>

                <div className="text-sm text-[#666]">
                  {track.album}
                </div>

                <div className="text-sm text-[#666] w-12 text-right">
                  {formatTime(track.duration)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
