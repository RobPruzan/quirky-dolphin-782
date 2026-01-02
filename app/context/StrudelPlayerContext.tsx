'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { Pattern } from '../lib/patterns';

interface PlayerState {
  currentPattern: Pattern | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  queue: Pattern[];
  currentIndex: number;
}

interface PlayerContextType extends PlayerState {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  playPattern: (pattern: Pattern, index: number) => void;
  setQueue: (patterns: Pattern[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function StrudelPlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    currentPattern: null,
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    queue: [],
    currentIndex: -1,
  });

  const schedulerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const initializedRef = useRef<boolean>(false);

  const evaluateRef = useRef<any>(null);

  useEffect(() => {
    const initStrudel = async () => {
      if (typeof window === 'undefined' || initializedRef.current) return;

      try {
        const { repl } = await import('@strudel/core');
        const { getAudioContext, webaudioOutput, initAudioOnFirstClick } = await import('@strudel/webaudio');

        await initAudioOnFirstClick();
        const ctx = getAudioContext();
        audioContextRef.current = ctx;

        const { scheduler, evaluate } = repl({
          defaultOutput: webaudioOutput,
          getTime: () => ctx.currentTime,
        });

        schedulerRef.current = scheduler;
        evaluateRef.current = evaluate;
        initializedRef.current = true;
      } catch (error) {
        console.error('Failed to initialize Strudel:', error);
      }
    };

    initStrudel();

    return () => {
      if (schedulerRef.current) {
        try {
          schedulerRef.current.stop();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startPattern = useCallback((pattern: Pattern) => {
    if (!schedulerRef.current || !evaluateRef.current) return;

    try {
      // Stop existing pattern
      schedulerRef.current.stop();

      // Evaluate the pattern code
      const evaluatedPattern = evaluateRef.current(pattern.code);

      // Set and start the pattern
      schedulerRef.current.setPattern(evaluatedPattern, true);
      schedulerRef.current.start();

      startTimeRef.current = Date.now();
      setState(prev => ({ ...prev, isPlaying: true }));
    } catch (error) {
      console.error('Failed to play pattern:', error);
    }
  }, []);

  useEffect(() => {
    // Start time tracking
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current === 0) return;

      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      setState(prev => {
        if (!prev.isPlaying) return prev;

        if (prev.currentPattern && elapsed >= prev.currentPattern.duration) {
          // Auto-advance to next track
          if (prev.currentIndex < prev.queue.length - 1) {
            const nextIndex = prev.currentIndex + 1;
            const nextPattern = prev.queue[nextIndex];
            startPattern(nextPattern);
            return {
              ...prev,
              currentPattern: nextPattern,
              currentIndex: nextIndex,
              currentTime: 0,
            };
          } else {
            if (schedulerRef.current) {
              schedulerRef.current.stop();
            }
            return { ...prev, isPlaying: false };
          }
        }
        return { ...prev, currentTime: elapsed };
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startPattern]);

  const play = useCallback(() => {
    if (!state.currentPattern) return;
    startPattern(state.currentPattern);
  }, [state.currentPattern, startPattern]);

  const pause = useCallback(() => {
    if (schedulerRef.current) {
      schedulerRef.current.stop();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const next = useCallback(() => {
    if (state.currentIndex < state.queue.length - 1) {
      const nextIndex = state.currentIndex + 1;
      playPattern(state.queue[nextIndex], nextIndex);
    }
  }, [state.currentIndex, state.queue]);

  const previous = useCallback(() => {
    if (state.currentIndex > 0) {
      const prevIndex = state.currentIndex - 1;
      playPattern(state.queue[prevIndex], prevIndex);
    }
  }, [state.currentIndex, state.queue]);

  const setVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume }));
    if (audioContextRef.current) {
      // Volume control would be handled through Strudel's gain
    }
  }, []);

  const playPattern = useCallback((pattern: Pattern, index: number) => {
    if (schedulerRef.current) {
      schedulerRef.current.stop();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setState(prev => ({
      ...prev,
      currentPattern: pattern,
      currentIndex: index,
      currentTime: 0,
      isPlaying: false,
    }));

    // Start the pattern
    startPattern(pattern);
  }, [startPattern]);

  const setQueue = useCallback((patterns: Pattern[]) => {
    setState(prev => ({ ...prev, queue: patterns }));
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
        setVolume,
        playPattern,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function useStrudelPlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('useStrudelPlayer must be used within a StrudelPlayerProvider');
  }
  return context;
}
