import { Heart, BookOpen, Clock, Play, Headphones } from 'lucide-react';
import { Story, Episode } from '../types';
import { AudioCard } from './AudioCard';

interface LibraryPageProps {
  stories: Story[];
  favoriteIds: string[];
  recentTracks: Episode[];
  currentPlayingTrack: Episode | null;
  isPlaying: boolean;
  onPlayTrack: (track: Episode, story: Story) => void;
  onSelectStory: (story: Story) => void;
  onToggleFavorite: (storyId: string) => void;
}

export function LibraryPage({
  stories,
  favoriteIds,
  recentTracks,
  currentPlayingTrack,
  isPlaying,
  onPlayTrack,
  onSelectStory,
  onToggleFavorite
}: LibraryPageProps) {
  const favoriteStories = stories.filter((s) => favoriteIds.includes(s.id));

  return (
    <div id="user-library-view" className="space-y-8 pb-12 select-none">
      {/* Header */}
      <div className="pb-4 border-b border-[#222222]">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-light text-white tracking-tight">
            Saved Literature & Play History
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-xs bg-[#161616] text-gray-400 font-mono font-bold border border-[#262626] uppercase">
            SESSION REPOSITORY
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Your saved audio master records, episode bookmarks, and continuous playback history
        </p>
      </div>

      {/* Bookmarked Favorites */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white">
            Bookmarked Series ({favoriteStories.length})
          </h3>
        </div>

        {favoriteStories.length === 0 ? (
          <div className="p-8 text-center bg-[#111111] rounded-lg border border-[#222222]">
            <Heart className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">No series bookmarked</p>
            <p className="text-[11px] text-gray-600 mt-1">
              Click the bookmark icon on any audio card or in the player footer to save your favorite serials.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {favoriteStories.map((story) => (
              <AudioCard
                key={story.id}
                story={story}
                currentPlayingTrack={currentPlayingTrack}
                isPlaying={isPlaying}
                onPlayTrack={onPlayTrack}
                onSelectStory={onSelectStory}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recent Listening History */}
      {recentTracks.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white">
              Recent Session Logs
            </h3>
          </div>

          <div className="space-y-2">
            {recentTracks.map((ep) => {
              const matchedStory = stories.find((s) => s.id === ep.storyId) || {
                id: ep.storyId,
                title: ep.storyTitle,
                category: ep.category,
                author: ep.author,
                narrator: ep.narrator,
                rating: 4.9,
                reviewsCount: 100,
                listenCount: ep.listenCount,
                coverUrl: ep.coverUrl,
                description: ep.synopsis || '',
                tags: [ep.category],
                language: 'English',
                isCompleted: true,
                totalDurationMinutes: 120,
                episodes: [ep]
              };

              const isPlayingThis = isPlaying && currentPlayingTrack?.id === ep.id;

              return (
                <div
                  key={ep.id}
                  onClick={() => onPlayTrack(ep, matchedStory)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                    isPlayingThis
                      ? 'bg-[#1a1a1a] border-orange-800/40 text-orange-400'
                      : 'bg-[#111111] hover:bg-[#161616] border-[#222222] text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={ep.coverUrl}
                      alt={ep.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded object-cover flex-shrink-0 border border-[#222222]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{ep.title}</p>
                      <p className="text-[10px] text-gray-500 font-mono truncate">
                        {ep.storyTitle} • Voice: {ep.narrator}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-[10px] text-gray-500 font-mono">
                      {Math.floor(ep.duration / 60)}m {ep.duration % 60}s
                    </span>
                    <button
                      className="w-8 h-8 rounded-full bg-white text-black hover:bg-orange-500 hover:text-white flex items-center justify-center shadow transition-all cursor-pointer"
                      title="Play Session"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

