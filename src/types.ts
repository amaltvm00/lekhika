export type StoryCategory = 'Romance' | 'Horror' | 'Sci-Fi' | 'Thriller' | 'Fantasy' | 'Drama';

export interface Episode {
  id: string;
  storyId: string;
  episodeNumber: number;
  title: string;
  storyTitle: string;
  category: StoryCategory;
  author: string;
  narrator: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // in seconds
  listenCount: number;
  synopsis?: string;
  releaseDate: string;
  isExplicit?: boolean;
}

export interface Story {
  id: string;
  title: string;
  category: StoryCategory;
  author: string;
  narrator: string;
  rating: number;
  reviewsCount: number;
  listenCount: number;
  coverUrl: string;
  bannerUrl?: string;
  description: string;
  tags: string[];
  language: string;
  isCompleted: boolean;
  totalDurationMinutes: number;
  episodes: Episode[];
  isFeatured?: boolean;
}

export interface PlaybackState {
  currentTrack: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  sleepTimerEnd: number | null; // timestamp when sleep timer fires
  sleepTimerDuration: number | null; // minutes
  queue: Episode[];
  queueIndex: number;
  isLooping: boolean;
}

export type ActiveNavTab = 'home' | 'search' | 'studio' | 'library';

export interface FilterState {
  selectedCategory: StoryCategory | 'All';
  searchQuery: string;
  sortBy: 'popular' | 'rating' | 'newest';
}
