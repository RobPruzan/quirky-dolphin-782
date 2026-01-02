'use client';

import React, { createContext, useContext, useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { Track, PlayerState } from '../types/music';

interface PlayerContextType extends PlayerState {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  playTrack: (track: Track, index: number) => void;
  setQueue: (tracks: Track[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    queue: [],
    currentIndex: -1,
  });

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      setState((prev) => ({ ...prev, currentTime: audio.currentTime }));
    });

    audio.addEventListener('ended', () => {
      next();
    });

    audio.volume = state.volume;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  const play = () => {
    if (audioRef.current && state.currentTrack) {
      audioRef.current.play();
      setState((prev) => ({ ...prev, isPlaying: true }));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  const togglePlay = () => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const next = () => {
    if (state.currentIndex < state.queue.length - 1) {
      const nextIndex = state.currentIndex + 1;
      playTrack(state.queue[nextIndex], nextIndex);
    }
  };

  const previous = () => {
    if (state.currentIndex > 0) {
      const prevIndex = state.currentIndex - 1;
      playTrack(state.queue[prevIndex], prevIndex);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState((prev) => ({ ...prev, currentTime: time }));
    }
  };

  const setVolume = (volume: number) => {
    setState((prev) => ({ ...prev, volume }));
  };

  const playTrack = (track: Track, index: number) => {
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setState((prev) => ({
          ...prev,
          currentTrack: track,
          currentIndex: index,
          isPlaying: true,
          currentTime: 0,
        }));
      });
    }
  };

  const setQueue = useCallback((tracks: Track[]) => {
    setState((prev) => ({ ...prev, queue: tracks }));
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        play,
        pause,
        togglePlay,
        next,
        previous,
        seek,
        setVolume,
        playTrack,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
