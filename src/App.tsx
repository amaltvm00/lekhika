import { useState, useEffect, useCallback, useMemo } from 'react';
import { MOCK_STORIES, CATEGORIES } from './data/mockAudioData';
import { Story, Episode, StoryCategory, ActiveNavTab, PlaybackState } from './types';
import { globalAudioEngine } from './utils/audioEngine';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FeaturedHero } from './components/FeaturedHero';
import { CategoryRow } from './components/CategoryRow';
import { AudioPlayerFooter } from './components/AudioPlayerFooter';
import { StoryDetailModal } from './components/StoryDetailModal';
import { SearchPage } from './components/SearchPage';
import { LibraryPage } from './components/LibraryPage';
import { CreatorStudio } from './components/CreatorStudio';

const STORAGE_KEY = 'pratilipi_tracks';

export default function App() {
  // All Stories Collection initialized from LocalStorage if available
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const savedTracks = localStorage.getItem(STORAGE_KEY);
      if (savedTracks) {
        const parsed = JSON.parse(savedTracks);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse pratilipi_tracks from localStorage:', e);
    }
    return MOCK_STORIES;
  });

  // Automatically synchronize tracks to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    } catch (e) {
      console.warn('Failed to persist pratilipi_tracks to localStorage:', e);
    }
  }, [stories]);

  // Navigation & Filter States
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Favorites & History
  const [favoriteStoryIds, setFavoriteStoryIds] = useState<string[]>([
    'story-romance-1',
    'story-horror-1'
  ]);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<Episode[]>([]);

  // Selected Story Modal for chapter inspection
  const [inspectedStory, setInspectedStory] = useState<Story | null>(null);

  // Core Playback State
  const [playback, setPlayback] = useState<PlaybackState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.85,
    isMuted: false,
    playbackRate: 1.0,
    sleepTimerEnd: null,
    sleepTimerDuration: null,
    queue: [],
    queueIndex: 0,
    isLooping: false
  });

  // Featured Story
  const featuredStory = useMemo(() => {
    return stories.find((s) => s.isFeatured) || stories[0];
  }, [stories]);

  // Audio Engine Hook-up
  useEffect(() => {
    globalAudioEngine.setCallbacks({
      onTimeUpdate: (time, duration) => {
        setPlayback((prev) => ({
          ...prev,
          currentTime: time,
          duration: duration > 0 ? duration : prev.duration
        }));
      },
      onEnded: () => {
        handleSkipNext();
      },
      onPlayStateChange: (isPlaying) => {
        setPlayback((prev) => ({ ...prev, isPlaying }));
      }
    });

    globalAudioEngine.setVolume(playback.volume);
  }, []);

  // Sleep Timer Countdown Check
  useEffect(() => {
    if (!playback.sleepTimerEnd) return;

    const interval = setInterval(() => {
      if (Date.now() >= (playback.sleepTimerEnd || 0)) {
        globalAudioEngine.pause();
        setPlayback((prev) => ({
          ...prev,
          isPlaying: false,
          sleepTimerEnd: null,
          sleepTimerDuration: null
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playback.sleepTimerEnd]);

  /**
   * CORE RULE: Clicking any audio card must immediately load that track into the bottom footer player and trigger playback.
   */
  const handlePlayTrack = useCallback((track: Episode, story: Story) => {
    // Generate playlist queue starting from clicked episode to end of story
    const storyEpisodes = story.episodes && story.episodes.length > 0 ? story.episodes : [track];
    const episodeIndex = storyEpisodes.findIndex((e) => e.id === track.id);
    const queueIndex = episodeIndex >= 0 ? episodeIndex : 0;

    setPlayback((prev) => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      duration: track.duration,
      queue: storyEpisodes,
      queueIndex
    }));

    // Add to recently played
    setRecentlyPlayedTracks((prev) => {
      const filtered = prev.filter((t) => t.id !== track.id);
      return [track, ...filtered].slice(0, 15);
    });

    // Play in audio engine
    globalAudioEngine.play(track.audioUrl, track.category);
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (!playback.currentTrack) {
      if (stories.length > 0 && stories[0].episodes.length > 0) {
        handlePlayTrack(stories[0].episodes[0], stories[0]);
      }
      return;
    }

    if (playback.isPlaying) {
      globalAudioEngine.pause();
      setPlayback((prev) => ({ ...prev, isPlaying: false }));
    } else {
      globalAudioEngine.resume();
      setPlayback((prev) => ({ ...prev, isPlaying: true }));
    }
  }, [playback.currentTrack, playback.isPlaying, stories, handlePlayTrack]);

  const handleSeek = useCallback((seconds: number) => {
    globalAudioEngine.seek(seconds);
    setPlayback((prev) => ({ ...prev, currentTime: seconds }));
  }, []);

  const handleVolumeChange = useCallback((vol: number) => {
    globalAudioEngine.setVolume(vol);
    setPlayback((prev) => ({ ...prev, volume: vol, isMuted: vol === 0 }));
  }, []);

  const handleToggleMute = useCallback(() => {
    setPlayback((prev) => {
      const nextMuted = !prev.isMuted;
      if (nextMuted) {
        globalAudioEngine.setVolume(0);
      } else {
        globalAudioEngine.setVolume(prev.volume || 0.85);
      }
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  const handlePlaybackRateChange = useCallback((rate: number) => {
    globalAudioEngine.setPlaybackRate(rate);
    setPlayback((prev) => ({ ...prev, playbackRate: rate }));
  }, []);

  const handleSetSleepTimer = useCallback((minutes: number | null) => {
    if (!minutes) {
      setPlayback((prev) => ({
        ...prev,
        sleepTimerEnd: null,
        sleepTimerDuration: null
      }));
      return;
    }

    const timerEnd = Date.now() + minutes * 60 * 1000;
    setPlayback((prev) => ({
      ...prev,
      sleepTimerEnd: timerEnd,
      sleepTimerDuration: minutes
    }));
  }, []);

  const handleSkipNext = useCallback(() => {
    setPlayback((prev) => {
      if (prev.queue.length === 0) return prev;
      const nextIndex = prev.queueIndex + 1;
      if (nextIndex < prev.queue.length) {
        const nextTrack = prev.queue[nextIndex];
        globalAudioEngine.play(nextTrack.audioUrl, nextTrack.category);
        return {
          ...prev,
          currentTrack: nextTrack,
          queueIndex: nextIndex,
          currentTime: 0,
          duration: nextTrack.duration,
          isPlaying: true
        };
      } else {
        // End of queue
        return { ...prev, isPlaying: false, currentTime: 0 };
      }
    });
  }, []);

  const handleSkipPrev = useCallback(() => {
    setPlayback((prev) => {
      if (prev.currentTime > 4) {
        // Rewind to start of current track if > 4s
        globalAudioEngine.seek(0);
        return { ...prev, currentTime: 0 };
      }

      if (prev.queueIndex > 0) {
        const prevIndex = prev.queueIndex - 1;
        const prevTrack = prev.queue[prevIndex];
        globalAudioEngine.play(prevTrack.audioUrl, prevTrack.category);
        return {
          ...prev,
          currentTrack: prevTrack,
          queueIndex: prevIndex,
          currentTime: 0,
          duration: prevTrack.duration,
          isPlaying: true
        };
      }

      return prev;
    });
  }, []);

  const handleSkipSeconds = useCallback((delta: number) => {
    setPlayback((prev) => {
      const newTime = Math.max(0, Math.min(prev.duration || 1000, prev.currentTime + delta));
      globalAudioEngine.seek(newTime);
      return { ...prev, currentTime: newTime };
    });
  }, []);

  const handleToggleFavorite = useCallback((storyId: string) => {
    setFavoriteStoryIds((prev) => {
      if (prev.includes(storyId)) {
        return prev.filter((id) => id !== storyId);
      } else {
        return [...prev, storyId];
      }
    });
  }, []);

  const handlePublishStory = useCallback((newStory: Story) => {
    setStories((prev) => [newStory, ...prev]);
    if (newStory.episodes.length > 0) {
      handlePlayTrack(newStory.episodes[0], newStory);
    }
  }, [handlePlayTrack]);

  // Group stories by category
  const categoriesToDisplay = useMemo(() => {
    if (selectedCategory === 'All') {
      return CATEGORIES;
    }
    return [selectedCategory];
  }, [selectedCategory]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      {/* Main Body Area: Sidebar + Scrollable Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          favoriteCount={favoriteStoryIds.length}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <Header
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {/* Scrollable View Content */}
          <main id="main-content-scroll" className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
            {activeTab === 'home' && (
              <div className="max-w-7xl mx-auto space-y-2">
                {/* Hero Spotlight Banner */}
                {selectedCategory === 'All' && (
                  <FeaturedHero
                    story={featuredStory}
                    currentPlayingTrack={playback.currentTrack}
                    isPlaying={playback.isPlaying}
                    onPlayTrack={handlePlayTrack}
                    onSelectStory={setInspectedStory}
                    isFavorited={favoriteStoryIds.includes(featuredStory.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                )}

                {/* Rows of Audio Cards Grouped by Category */}
                {categoriesToDisplay.map((cat) => {
                  const catStories = stories.filter((s) => s.category === cat);
                  return (
                    <CategoryRow
                      key={cat}
                      category={cat}
                      stories={catStories}
                      currentPlayingTrack={playback.currentTrack}
                      isPlaying={playback.isPlaying}
                      onPlayTrack={handlePlayTrack}
                      onSelectStory={setInspectedStory}
                      onViewAll={(c) => {
                        setSelectedCategory(c);
                        setActiveTab('search');
                      }}
                    />
                  );
                })}
              </div>
            )}

            {activeTab === 'search' && (
              <div className="max-w-7xl mx-auto">
                <SearchPage
                  stories={stories}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                  currentPlayingTrack={playback.currentTrack}
                  isPlaying={playback.isPlaying}
                  onPlayTrack={handlePlayTrack}
                  onSelectStory={setInspectedStory}
                />
              </div>
            )}

            {activeTab === 'library' && (
              <div className="max-w-7xl mx-auto">
                <LibraryPage
                  stories={stories}
                  favoriteIds={favoriteStoryIds}
                  recentTracks={recentlyPlayedTracks}
                  currentPlayingTrack={playback.currentTrack}
                  isPlaying={playback.isPlaying}
                  onPlayTrack={handlePlayTrack}
                  onSelectStory={setInspectedStory}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            )}

            {activeTab === 'studio' && (
              <div className="max-w-7xl mx-auto">
                <CreatorStudio
                  onPublishStory={handlePublishStory}
                  onSelectTab={setActiveTab}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Persistent Sticky Audio Player Footer */}
      <AudioPlayerFooter
        currentTrack={playback.currentTrack}
        isPlaying={playback.isPlaying}
        currentTime={playback.currentTime}
        duration={playback.duration}
        volume={playback.volume}
        isMuted={playback.isMuted}
        playbackRate={playback.playbackRate}
        sleepTimerMinutes={playback.sleepTimerDuration}
        queue={playback.queue}
        queueIndex={playback.queueIndex}
        isFavorite={playback.currentTrack ? favoriteStoryIds.includes(playback.currentTrack.storyId) : false}
        onTogglePlay={handleTogglePlay}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
        onPlaybackRateChange={handlePlaybackRateChange}
        onSetSleepTimer={handleSetSleepTimer}
        onSkipNext={handleSkipNext}
        onSkipPrev={handleSkipPrev}
        onSkipSeconds={handleSkipSeconds}
        onToggleFavorite={handleToggleFavorite}
        onSelectQueueEpisode={(ep) => {
          const matchedStory = stories.find((s) => s.id === ep.storyId) || stories[0];
          handlePlayTrack(ep, matchedStory);
        }}
      />

      {/* Story Chapter Details Modal */}
      <StoryDetailModal
        story={inspectedStory}
        onClose={() => setInspectedStory(null)}
        currentPlayingTrack={playback.currentTrack}
        isPlaying={playback.isPlaying}
        onPlayEpisode={handlePlayTrack}
        isFavorite={inspectedStory ? favoriteStoryIds.includes(inspectedStory.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
