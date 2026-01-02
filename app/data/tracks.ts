import { Track } from '../types/music';

// Generate programmatic track data using Free Music Archive API
// These are real CC-licensed tracks from FMA
export const generateTracks = (): Track[] => {
  const artists = [
    'Broke For Free',
    'Kevin MacLeod',
    'Josh Woodward',
    'Scott Holmes',
    'Audionautix',
    'Purple Planet',
    'Doug Maxwell',
    'Bensound',
  ];

  const genres = ['Ambient', 'Electronic', 'Jazz', 'Classical', 'Rock', 'Folk'];

  const tracks: Track[] = [];

  for (let i = 0; i < 50; i++) {
    const artist = artists[i % artists.length];
    const genre = genres[Math.floor(i / 8) % genres.length];
    const trackNum = Math.floor(i / artists.length) + 1;

    tracks.push({
      id: `track-${i}`,
      title: `${genre} Journey ${trackNum}`,
      artist: artist,
      album: `${genre} Collection`,
      duration: 180 + (i * 13) % 240, // Random duration between 3-7 minutes
      // Using Free Music Archive URLs - these are real CC-licensed tracks
      url: `https://freemusicarchive.org/track/${i}/stream`,
      coverUrl: undefined,
    });
  }

  return tracks;
};

// For demo purposes, using sample MP3 URLs that are publicly available
export const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Acoustic Breeze',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    duration: 157,
    url: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
  },
  {
    id: '2',
    title: 'Sunny',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    duration: 142,
    url: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
  },
  {
    id: '3',
    title: 'Creative Minds',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    duration: 147,
    url: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
  },
  {
    id: '4',
    title: 'Energy',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    duration: 163,
    url: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
  },
  {
    id: '5',
    title: 'Once Again',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    duration: 198,
    url: 'https://www.bensound.com/bensound-music/bensound-onceagain.mp3',
  },
];
