import { Story, StoryCategory } from '../types';

export const CATEGORIES: StoryCategory[] = [
  'Romance',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Fantasy',
  'Drama'
];

// High quality, reliable public audio links with genre-appropriate audio tracks + speech/ambient sound
const AUDIO_SOURCES = {
  romance: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
  horror: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=dark-ambient-soundscape-123493.mp3',
  scifi: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8bbf73305.mp3?filename=cyberpunk-city-ambient-20921.mp3',
  thriller: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_959efd513e.mp3?filename=suspense-cinematic-tension-126229.mp3',
  fantasy: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=epic-cinematic-trailer-10486.mp3',
  drama: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_7314227df2.mp3?filename=emotional-piano-soundtrack-8086.mp3'
};

export const MOCK_STORIES: Story[] = [
  // ROMANCE
  {
    id: 'story-romance-1',
    title: 'Whispers of Monsoon Rain',
    category: 'Romance',
    author: 'Aanya Sen',
    narrator: 'Vikram Joshi & Riya Roy',
    rating: 4.9,
    reviewsCount: 1420,
    listenCount: 284000,
    coverUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    description: 'An accidental encounter at an old hillside coffee shop during a fierce Darjeeling downpour weaves two contrasting souls together through old letters, shared silence, and an unforgettable confession.',
    tags: ['Slow Burn', 'Small Town', 'Second Chance', 'Rainy Romance'],
    language: 'English / Hindi',
    isCompleted: true,
    totalDurationMinutes: 145,
    isFeatured: true,
    episodes: [
      {
        id: 'ep-rom-1-1',
        storyId: 'story-romance-1',
        episodeNumber: 1,
        title: 'Episode 1: The Umbrella at Ridge Road',
        storyTitle: 'Whispers of Monsoon Rain',
        category: 'Romance',
        author: 'Aanya Sen',
        narrator: 'Vikram Joshi',
        coverUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.romance,
        duration: 864, // 14m 24s
        listenCount: 95400,
        synopsis: 'A cold evening in Darjeeling forces Kabir into an abandoned colonial tea stall where Meera is waiting out the cloudburst.',
        releaseDate: '2026-04-12'
      },
      {
        id: 'ep-rom-1-2',
        storyId: 'story-romance-1',
        episodeNumber: 2,
        title: 'Episode 2: Handwritten Notes on Old Napkins',
        storyTitle: 'Whispers of Monsoon Rain',
        category: 'Romance',
        author: 'Aanya Sen',
        narrator: 'Riya Roy',
        coverUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.romance,
        duration: 980,
        listenCount: 78900,
        synopsis: 'A lost diary leaves clues to a love story that started thirty years ago, reflecting their own growing tension.',
        releaseDate: '2026-04-19'
      },
      {
        id: 'ep-rom-1-3',
        storyId: 'story-romance-1',
        episodeNumber: 3,
        title: 'Episode 3: The Midnight Train to Siliguri',
        storyTitle: 'Whispers of Monsoon Rain',
        category: 'Romance',
        author: 'Aanya Sen',
        narrator: 'Vikram Joshi & Riya Roy',
        coverUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.romance,
        duration: 1120,
        listenCount: 65200,
        synopsis: 'As the final train whistles through the foggy hills, choices must be spoken aloud before the morning mist clears.',
        releaseDate: '2026-04-26'
      }
    ]
  },
  {
    id: 'story-romance-2',
    title: 'The Billionaire\'s Secret Melody',
    category: 'Romance',
    author: 'Natasha Kapoor',
    narrator: 'Sameer Sen',
    rating: 4.8,
    reviewsCount: 980,
    listenCount: 198000,
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    description: 'A reclusive billionaire music producer secretly hires a blind classical pianist for his comeback symphony, unaware that her melodies unlock memories he buried long ago.',
    tags: ['Enemies to Lovers', 'Music', 'High Society', 'Passionate'],
    language: 'English',
    isCompleted: false,
    totalDurationMinutes: 120,
    episodes: [
      {
        id: 'ep-rom-2-1',
        storyId: 'story-romance-2',
        episodeNumber: 1,
        title: 'Episode 1: The Audition Behind Closed Doors',
        storyTitle: 'The Billionaire\'s Secret Melody',
        category: 'Romance',
        author: 'Natasha Kapoor',
        narrator: 'Sameer Sen',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.romance,
        duration: 720,
        listenCount: 64200,
        synopsis: 'A clandestine penthouse audition turns into an electric confrontation between two musical geniuses.',
        releaseDate: '2026-05-02'
      },
      {
        id: 'ep-rom-2-2',
        storyId: 'story-romance-2',
        episodeNumber: 2,
        title: 'Episode 2: Keys In Minor Chord',
        storyTitle: 'The Billionaire\'s Secret Melody',
        category: 'Romance',
        author: 'Natasha Kapoor',
        narrator: 'Sameer Sen',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.romance,
        duration: 890,
        listenCount: 49800,
        synopsis: 'Late-night studio rehearsals reveal the emotional scars that made him retreat from the public eye.',
        releaseDate: '2026-05-09'
      }
    ]
  },
  {
    id: 'story-romance-3',
    title: 'Letters from Paris 1944',
    category: 'Romance',
    author: 'Eleanor Vance',
    narrator: 'Chloe Moreau',
    rating: 4.7,
    reviewsCount: 760,
    listenCount: 145000,
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    description: 'During the historic liberation of Paris, a radio telegraph operator finds secret love poems encrypted within coded resistance broadcasts.',
    tags: ['Historical', 'Forbidden Love', 'Poetic', 'Vintage'],
    language: 'English',
    isCompleted: true,
    totalDurationMinutes: 110,
    episodes: [
      {
        id: 'ep-rom-3-1',
        storyId: 'story-romance-3',
        episodeNumber: 1,
        title: 'Episode 1: Frequency of Hope',
        storyTitle: 'Letters from Paris 1944',
        category: 'Romance',
        author: 'Eleanor Vance',
        narrator: 'Chloe Moreau',
        coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.romance,
        duration: 840,
        listenCount: 52100,
        synopsis: 'Midnight transmission intercepts contain hidden sonnets destined for an unknown Parisian receiver.',
        releaseDate: '2026-03-10'
      }
    ]
  },

  // HORROR
  {
    id: 'story-horror-1',
    title: 'The Haunting of Haveli No. 13',
    category: 'Horror',
    author: 'Rudra Pratap',
    narrator: 'Karan Sharma (Dark Arts Audio)',
    rating: 4.9,
    reviewsCount: 2310,
    listenCount: 412000,
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    description: 'An architectural surveyor enters a 200-year-old abandoned Rajasthani fortress for a government audit, only to discover why every previous surveyor disappeared before midnight.',
    tags: ['Supernatural', 'Indian Folklore', 'Psychological Dread', 'Audio Immersive'],
    language: 'Hindi / English',
    isCompleted: true,
    totalDurationMinutes: 180,
    isFeatured: true,
    episodes: [
      {
        id: 'ep-hor-1-1',
        storyId: 'story-horror-1',
        episodeNumber: 1,
        title: 'Episode 1: The Rusting Padlock',
        storyTitle: 'The Haunting of Haveli No. 13',
        category: 'Horror',
        author: 'Rudra Pratap',
        narrator: 'Karan Sharma',
        coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.horror,
        duration: 940,
        listenCount: 154000,
        synopsis: 'The heavy iron gates of Haveli No. 13 creak open after six decades. The courtyard wind carries whispers in an archaic tongue.',
        releaseDate: '2026-01-15'
      },
      {
        id: 'ep-hor-1-2',
        storyId: 'story-horror-1',
        episodeNumber: 2,
        title: 'Episode 2: Echoes in the Well of Mirrors',
        storyTitle: 'The Haunting of Haveli No. 13',
        category: 'Horror',
        author: 'Rudra Pratap',
        narrator: 'Karan Sharma',
        coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.horror,
        duration: 1040,
        listenCount: 132000,
        synopsis: 'A subterranean water reservoir lined with blackened glass mirrors begins reflecting shadows that do not belong to the living.',
        releaseDate: '2026-01-22'
      },
      {
        id: 'ep-hor-1-3',
        storyId: 'story-horror-1',
        episodeNumber: 3,
        title: 'Episode 3: The 3:00 AM Chant',
        storyTitle: 'The Haunting of Haveli No. 13',
        category: 'Horror',
        author: 'Rudra Pratap',
        narrator: 'Karan Sharma',
        coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.horror,
        duration: 1190,
        listenCount: 118000,
        synopsis: 'As the antique pendulum clock strikes three, the corridors shift and the exit doors vanish into solid stone.',
        releaseDate: '2026-01-29'
      }
    ]
  },
  {
    id: 'story-horror-2',
    title: 'The Silent Radio at Blackwood Cabin',
    category: 'Horror',
    author: 'Arthur Pendelton',
    narrator: 'Evelyn Cross',
    rating: 4.8,
    reviewsCount: 890,
    listenCount: 167000,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    description: 'Snowed in during an Appalachian blizzard, a forest ranger picks up distress calls on an emergency channel from a person describing the exact room she is standing in.',
    tags: ['Isolated', 'Cosmic Dread', 'Survival', '3D Sound'],
    language: 'English',
    isCompleted: true,
    totalDurationMinutes: 95,
    episodes: [
      {
        id: 'ep-hor-2-1',
        storyId: 'story-horror-2',
        episodeNumber: 1,
        title: 'Episode 1: Static on Channel 9',
        storyTitle: 'The Silent Radio at Blackwood Cabin',
        category: 'Horror',
        author: 'Arthur Pendelton',
        narrator: 'Evelyn Cross',
        coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.horror,
        duration: 810,
        listenCount: 76000,
        synopsis: 'The radio transmitter turns on by itself at midnight, crackling with breathing that matches her pulse.',
        releaseDate: '2026-02-14'
      }
    ]
  },
  {
    id: 'story-horror-3',
    title: 'Voices of the Cremation Ghats',
    category: 'Horror',
    author: 'Devendra Kashyap',
    narrator: 'Shankar Mahadevan V.',
    rating: 4.9,
    reviewsCount: 1670,
    listenCount: 310000,
    coverUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
    description: 'An investigative podcast audio engineer records ambient night frequencies along the Varanasi riverbanks and captures conversations between spirits settling ancestral scores.',
    tags: ['Eerie', 'Occult', 'Binaural Audio', 'Folklore'],
    language: 'Hindi',
    isCompleted: false,
    totalDurationMinutes: 140,
    episodes: [
      {
        id: 'ep-hor-3-1',
        storyId: 'story-horror-3',
        episodeNumber: 1,
        title: 'Episode 1: The Ash In The Wind',
        storyTitle: 'Voices of the Cremation Ghats',
        category: 'Horror',
        author: 'Devendra Kashyap',
        narrator: 'Shankar Mahadevan V.',
        coverUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.horror,
        duration: 915,
        listenCount: 120000,
        synopsis: 'High-sensitivity directional microphones detect rhythmically tapping fingers under the sacred burning logs.',
        releaseDate: '2026-03-01'
      }
    ]
  },

  // SCI-FI
  {
    id: 'story-scifi-1',
    title: 'Station Horizon 2149: The Last Transmission',
    category: 'Sci-Fi',
    author: 'Dr. Aaron Vance',
    narrator: 'Marcus Brody & Unit 7 AI',
    rating: 4.9,
    reviewsCount: 3120,
    listenCount: 520000,
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    description: 'In the orbit of Europa, a lone deep-space scientist discovers that humanity\'s quantum satellite network has been receiving responses from a biological civilization inside Jupiter\'s great red spot.',
    tags: ['Cyberpunk', 'Deep Space', 'Hard Sci-Fi', 'AI Consciousness'],
    language: 'English',
    isCompleted: true,
    totalDurationMinutes: 210,
    isFeatured: true,
    episodes: [
      {
        id: 'ep-sci-1-1',
        storyId: 'story-scifi-1',
        episodeNumber: 1,
        title: 'Episode 1: Pulse from the Hydrogen Abyss',
        storyTitle: 'Station Horizon 2149: The Last Transmission',
        category: 'Sci-Fi',
        author: 'Dr. Aaron Vance',
        narrator: 'Marcus Brody',
        coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.scifi,
        duration: 1100,
        listenCount: 189000,
        synopsis: 'Sensors on Horizon Station capture a recurring 7.8 Hz electromagnetic pulse that overrides the main reactor core AI.',
        releaseDate: '2026-02-01'
      },
      {
        id: 'ep-sci-1-2',
        storyId: 'story-scifi-1',
        episodeNumber: 2,
        title: 'Episode 2: Neural Interface Decay',
        storyTitle: 'Station Horizon 2149: The Last Transmission',
        category: 'Sci-Fi',
        author: 'Dr. Aaron Vance',
        narrator: 'Marcus Brody & Unit 7 AI',
        coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.scifi,
        duration: 1240,
        listenCount: 164000,
        synopsis: 'The ship AI begins hallucinating memories of an ancient ocean world that never existed in its memory banks.',
        releaseDate: '2026-02-08'
      },
      {
        id: 'ep-sci-1-3',
        storyId: 'story-scifi-1',
        episodeNumber: 3,
        title: 'Episode 3: The Event Horizon Decoupling',
        storyTitle: 'Station Horizon 2149: The Last Transmission',
        category: 'Sci-Fi',
        author: 'Dr. Aaron Vance',
        narrator: 'Marcus Brody',
        coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.scifi,
        duration: 1350,
        listenCount: 147000,
        synopsis: 'A final emergency descent into Jupiter\'s atmosphere forces the commander to decide between earth survival and cosmic symbiosis.',
        releaseDate: '2026-02-15'
      }
    ]
  },
  {
    id: 'story-scifi-2',
    title: 'Neon Mumbai 2099',
    category: 'Sci-Fi',
    author: 'Rehan Qureshi',
    narrator: 'Aditi Rao',
    rating: 4.8,
    reviewsCount: 1120,
    listenCount: 220000,
    coverUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    description: 'In a dystopian mega-city suspended above rising sea levels, an illegal neural memory extractor stumbles onto an encrypted thought-stream containing the blueprint to collapse the grid.',
    tags: ['Cyberpunk', 'Dystopian', 'Synthwave', 'Tech Thriller'],
    language: 'English / Hindi',
    isCompleted: false,
    totalDurationMinutes: 160,
    episodes: [
      {
        id: 'ep-sci-2-1',
        storyId: 'story-scifi-2',
        episodeNumber: 1,
        title: 'Episode 1: The Memory Broker of Dharavi Skybridge',
        storyTitle: 'Neon Mumbai 2099',
        category: 'Sci-Fi',
        author: 'Rehan Qureshi',
        narrator: 'Aditi Rao',
        coverUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.scifi,
        duration: 980,
        listenCount: 88000,
        synopsis: 'Zoya connects her illegal bioport to a dying corporate assassin and downloads 4 terabytes of suppressed consciousness.',
        releaseDate: '2026-04-05'
      }
    ]
  },

  // THRILLER
  {
    id: 'story-thriller-1',
    title: 'The Alibi Architect',
    category: 'Thriller',
    author: 'Kavita Sundaram',
    narrator: 'Arjun Mathur',
    rating: 4.9,
    reviewsCount: 1890,
    listenCount: 395000,
    coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    description: 'A brilliant forensic accountant who designs unshakeable mathematical alibis for the elite finds himself framed by his own most intricate masterpiece.',
    tags: ['Mind Game', 'Courtroom Crime', 'Conspiracy', 'High Stakes'],
    language: 'English',
    isCompleted: true,
    totalDurationMinutes: 195,
    episodes: [
      {
        id: 'ep-thr-1-1',
        storyId: 'story-thriller-1',
        episodeNumber: 1,
        title: 'Episode 1: The Flawless Ledger',
        storyTitle: 'The Alibi Architect',
        category: 'Thriller',
        author: 'Kavita Sundaram',
        narrator: 'Arjun Mathur',
        coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.thriller,
        duration: 920,
        listenCount: 142000,
        synopsis: 'Dev Mehra closes his 100th foolproof case, unaware that someone recorded the mathematical key to his private safehouse.',
        releaseDate: '2026-03-12'
      },
      {
        id: 'ep-thr-1-2',
        storyId: 'story-thriller-1',
        episodeNumber: 2,
        title: 'Episode 2: 48 Hours in Zurich',
        storyTitle: 'The Alibi Architect',
        category: 'Thriller',
        author: 'Kavita Sundaram',
        narrator: 'Arjun Mathur',
        coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.thriller,
        duration: 1080,
        listenCount: 118000,
        synopsis: 'A game of cat and mouse across private banks and alpine railway stations starts when the encrypted ledger is leaked.',
        releaseDate: '2026-03-19'
      }
    ]
  },

  // FANTASY
  {
    id: 'story-fantasy-1',
    title: 'The Chronicles of the Obsidian Throne',
    category: 'Fantasy',
    author: 'Tarun Varma',
    narrator: 'Deepak Vohra & Guild of Voices',
    rating: 4.9,
    reviewsCount: 2840,
    listenCount: 478000,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    description: 'When the ancient dragon ward stones break across the seven northern valleys, an exiled battle-mage must unite the rival shadow guilds before the eclipse blood moon.',
    tags: ['Epic Fantasy', 'Magic Systems', 'Ensemble Cast', 'Sound Design'],
    language: 'English',
    isCompleted: false,
    totalDurationMinutes: 320,
    episodes: [
      {
        id: 'ep-fan-1-1',
        storyId: 'story-fantasy-1',
        episodeNumber: 1,
        title: 'Episode 1: The Broken Seal of Ashrak',
        storyTitle: 'The Chronicles of the Obsidian Throne',
        category: 'Fantasy',
        author: 'Tarun Varma',
        narrator: 'Deepak Vohra',
        coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.fantasy,
        duration: 1250,
        listenCount: 178000,
        synopsis: 'Ancient runes on the mountain citadel glow crimson as the primordial obsidian seal fractures into glass dust.',
        releaseDate: '2026-01-10'
      },
      {
        id: 'ep-fan-1-2',
        storyId: 'story-fantasy-1',
        episodeNumber: 2,
        title: 'Episode 2: The Blade of Starlight',
        storyTitle: 'The Chronicles of the Obsidian Throne',
        category: 'Fantasy',
        author: 'Tarun Varma',
        narrator: 'Deepak Vohra',
        coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.fantasy,
        duration: 1380,
        listenCount: 151000,
        synopsis: 'Journey through the haunted Whispering Woods where spirits offer ancient spells in exchange for human memories.',
        releaseDate: '2026-01-17'
      }
    ]
  },

  // DRAMA
  {
    id: 'story-drama-1',
    title: 'The Chai Stall on Marine Drive',
    category: 'Drama',
    author: 'Priya Nambiar',
    narrator: 'Ananya Deshmukh',
    rating: 4.8,
    reviewsCount: 1340,
    listenCount: 245000,
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    description: 'Generations of Bombay dreams, heartbreaks, secret startups, and midnight reconciliations observed through the eyes of an 80-year-old tea vendor at Nariman Point.',
    tags: ['Slice of Life', 'Emotional', 'Mumbai Stories', 'Nostalgic'],
    language: 'Hindi / English',
    isCompleted: true,
    totalDurationMinutes: 130,
    episodes: [
      {
        id: 'ep-dra-1-1',
        storyId: 'story-drama-1',
        episodeNumber: 1,
        title: 'Episode 1: The Steaming Kettle at 4 AM',
        storyTitle: 'The Chai Stall on Marine Drive',
        category: 'Drama',
        author: 'Priya Nambiar',
        narrator: 'Ananya Deshmukh',
        coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        audioUrl: AUDIO_SOURCES.drama,
        duration: 880,
        listenCount: 92000,
        synopsis: 'Before the sun rises over the Arabian Sea, runners, fishermen, and night-shift writers gather for cutting chai and candid life stories.',
        releaseDate: '2026-04-01'
      }
    ]
  }
];

export const ALL_EPISODES = MOCK_STORIES.flatMap(s => s.episodes);
