'use client';

import { useEffect } from 'react';
import { useStrudelPlayer } from '../context/StrudelPlayerContext';
import { PatternList } from './PatternList';
import { StrudelPlayerControls } from './StrudelPlayerControls';
import { generativePatterns } from '../lib/patterns';

export function GenerativePlayer() {
  const { setQueue } = useStrudelPlayer();

  useEffect(() => {
    setQueue(generativePatterns);
  }, [setQueue]);

  return (
    <div className="h-screen w-screen bg-[#0a0a0a] text-white flex flex-col">
      <div className="px-6 py-6 border-b border-[#1a1a1a]">
        <h1 className="text-2xl font-semibold tracking-tight text-[#e5e5e5]">Generative Library</h1>
        <p className="text-sm text-[#666] mt-1">Algorithmically generated music with Strudel</p>
      </div>
      <PatternList patterns={generativePatterns} />
      <StrudelPlayerControls />
    </div>
  );
}
