'use client';

import { useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TrackList } from './TrackList';
import { PlayerControls } from './PlayerControls';
import { sampleTracks } from '../data/tracks';

export function MusicPlayer() {
  const { setQueue } = usePlayer();

  useEffect(() => {
    setQueue(sampleTracks);
  }, [setQueue]);

  return (
    <div className="h-screen w-screen bg-[#0a0a0a] text-white flex flex-col">
      <div className="px-6 py-6 border-b border-[#1a1a1a]">
        <h1 className="text-2xl font-semibold tracking-tight text-[#e5e5e5]">Library</h1>
      </div>
      <TrackList tracks={sampleTracks} />
      <PlayerControls />
    </div>
  );
}
