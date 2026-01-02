export interface Pattern {
  id: string;
  name: string;
  artist: string;
  genre: string;
  code: string;
  duration: number;
  bpm: number;
}

// Generate different algorithmic music patterns
export const generativePatterns: Pattern[] = [
  {
    id: 'ambient-1',
    name: 'Digital Sunset',
    artist: 'Algorithmic Dreams',
    genre: 'Ambient',
    code: `s("piano").note("<c3 eb3 g3 bb3>").slow(4).room(0.9)`,
    duration: 180,
    bpm: 60,
  },
  {
    id: 'electronic-1',
    name: 'Binary Pulse',
    artist: 'Synthetic Core',
    genre: 'Electronic',
    code: `stack(s("bd*4"),s("~ hh ~ hh"),s("sawtooth").note("<c2 d2 e2 g2>"))`,
    duration: 240,
    bpm: 128,
  },
  {
    id: 'techno-1',
    name: 'Neural Network',
    artist: 'Synthetic Core',
    genre: 'Techno',
    code: `stack(s("bd ~ bd ~"),s("~ cp ~ cp"),s("hh*8"),s("sawtooth").note("<a2 a2 c3 d3>"))`,
    duration: 300,
    bpm: 135,
  },
  {
    id: 'ambient-2',
    name: 'Cloud Formations',
    artist: 'Algorithmic Dreams',
    genre: 'Ambient',
    code: `s("piano").note("<[c4 e4 g4] [d4 f4 a4]>").slow(8).delay(0.5).room(0.9)`,
    duration: 240,
    bpm: 50,
  },
  {
    id: 'house-1',
    name: 'Generator Loop',
    artist: 'Code Rhythm',
    genre: 'House',
    code: `stack(s("bd ~ ~ ~ bd ~ ~ ~"),s("~ cp ~ cp"),s("hh*16"),s("sine").note("<e2 e2 a2 b2>"))`,
    duration: 270,
    bpm: 124,
  },
  {
    id: 'idm-1',
    name: 'Glitch Pattern',
    artist: 'Digital Fragments',
    genre: 'IDM',
    code: `stack(s("bd(3,8)"),s("cp(5,16)"),s("square").note("<c3 d3 e3 g3>(5,16)"))`,
    duration: 210,
    bpm: 140,
  },
  {
    id: 'downtempo-1',
    name: 'Late Night Code',
    artist: 'Midnight Compiler',
    genre: 'Downtempo',
    code: `stack(s("bd ~ ~ ~ ~ ~ bd ~"),s("~ ~ cp ~"),s("sine").note("<[a2 c3 e3] [g2 bb2 d3]>").delay(0.3))`,
    duration: 260,
    bpm: 85,
  },
  {
    id: 'ambient-3',
    name: 'Memory Leak',
    artist: 'Algorithmic Dreams',
    genre: 'Ambient',
    code: `s("sine").note("<[c3,e3,g3] [d3,f3,a3]>").slow(8).room(0.95).delay(0.6)`,
    duration: 300,
    bpm: 55,
  },
  {
    id: 'breakbeat-1',
    name: 'Stack Overflow',
    artist: 'Code Rhythm',
    genre: 'Breakbeat',
    code: `stack(s("bd ~ bd bd ~ bd ~ ~"),s("~ cp ~ ~ cp ~ cp ~"),s("hh*12"),s("sawtooth").note("<d2 e2 g2 a2>"))`,
    duration: 220,
    bpm: 145,
  },
  {
    id: 'minimal-1',
    name: 'Refactor',
    artist: 'Minimal Logic',
    genre: 'Minimal',
    code: `stack(s("bd ~ ~ ~ bd ~ ~ ~"),s("~ ~ ~ cp"),s("sine").note("<c2 c2 c2 f2>"))`,
    duration: 240,
    bpm: 120,
  },
  {
    id: 'dub-1',
    name: 'Echo Chamber',
    artist: 'Digital Fragments',
    genre: 'Dub',
    code: `stack(s("bd ~ ~ bd"),s("~ cp ~ cp"),s("sine").note("<a2 a2 d2 e2>").delay(0.8).room(0.7))`,
    duration: 280,
    bpm: 95,
  },
  {
    id: 'electronica-1',
    name: 'Async Function',
    artist: 'Synthetic Core',
    genre: 'Electronica',
    code: `stack(s("bd(3,8)"),s("hh*6"),s("triangle").note("<c3 e3 g3>(3,8)"))`,
    duration: 200,
    bpm: 110,
  },
];

// Generate more patterns programmatically
const scales = ['c3', 'd3', 'e3', 'f3', 'g3', 'a3'];
const sounds = ['piano', 'sawtooth', 'sine', 'triangle', 'square'];
const genres = ['Ambient', 'Electronic', 'Techno', 'House', 'IDM'];
const artists = ['Algorithmic Dreams', 'Synthetic Core', 'Code Rhythm', 'Digital Fragments', 'Midnight Compiler', 'Minimal Logic'];

for (let i = 0; i < 20; i++) {
  const scale = scales[i % scales.length];
  const sound = sounds[i % sounds.length];
  const genre = genres[i % genres.length];
  const artist = artists[i % artists.length];
  const bpm = 60 + (i * 7) % 80;

  generativePatterns.push({
    id: `gen-${i}`,
    name: `Pattern ${i + 1}`,
    artist,
    genre,
    code: `s("${sound}").note("<${scale} ${scale}>").slow(${2 + i % 4})`,
    duration: 180 + (i * 13) % 120,
    bpm,
  });
}
