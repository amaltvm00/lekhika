import { X, Play, Pause, Star, Headphones, Calendar, Clock, Bookmark, Share2 } from 'lucide-react';
import { Story, Episode } from '../types';

interface StoryDetailModalProps {
  story: Story | null;
  onClose: () => void;
  currentPlayingTrack: Episode | null;
  isPlaying: boolean;
  onPlayEpisode: (episode: Episode, story: Story) => void;
  isFavorite: boolean;
  onToggleFavorite: (storyId: string) => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
}

export function StoryDetailModal({
  story,
  onClose,
  currentPlayingTrack,
  isPlaying,
  onPlayEpisode,
  isFavorite,
  onToggleFavorite
}: StoryDetailModalProps) {
  if (!story) return null;

  return (
    <div
      id="story-detail-modal-backdrop"
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="story-detail-modal-card"
        className="bg-[#0d0d0d] border border-[#222222] rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-auto select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Area */}
        <div className="relative h-64 md:h-72 w-full overflow-hidden bg-[#050505]">
          <img
            src={story.bannerUrl || story.coverUrl}
            alt={story.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent" />

          {/* Close Button */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-md bg-[#161616] hover:bg-[#222222] text-gray-400 hover:text-white transition-colors border border-[#262626] z-10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Story Main Info inside Hero */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end gap-5">
            <img
              src={story.coverUrl}
              alt={story.title}
              referrerPolicy="no-referrer"
              className="w-24 h-32 md:w-32 md:h-44 rounded-lg object-cover shadow-2xl border border-[#333333] flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-xs bg-orange-950/40 text-orange-400 border border-orange-800/40 uppercase tracking-widest">
                {story.category}
              </span>
              <h2 className="text-xl md:text-2xl font-light text-white tracking-tight mt-1 line-clamp-2">
                {story.title}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Author: <span className="text-white font-medium">{story.author}</span> • Narrator: <span className="text-orange-400 font-mono">{story.narrator}</span>
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 font-mono">
                <div className="flex items-center gap-1 font-bold text-white">
                  <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  <span>{story.rating}</span>
                  <span className="text-gray-500 font-normal">({story.reviewsCount} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Headphones className="w-3.5 h-3.5 text-gray-500" />
                  <span>{(story.listenCount / 1000).toFixed(0)}k plays</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto">
          {/* Quick Actions & Synopsis */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <button
                id="modal-play-first-ep-btn"
                onClick={() => {
                  if (story.episodes.length > 0) {
                    onPlayEpisode(story.episodes[0], story);
                  }
                }}
                className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>Play from Episode 1</span>
              </button>

              <button
                id="modal-toggle-library-btn"
                onClick={() => onToggleFavorite(story.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  isFavorite
                    ? 'bg-orange-950/40 text-orange-400 border-orange-800/50'
                    : 'bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 hover:text-white border-[#2a2a2a]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isFavorite ? 'Saved in Session Library' : 'Save to Library'}</span>
              </button>
            </div>

            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
              About This Production
            </h4>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-normal">
              {story.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[#161616] text-gray-400 border border-[#262626]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Episode Tracklist */}
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#222222] mb-3">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white">
                Episodes & Chapters ({story.episodes.length})
              </h4>
              <span className="text-[10px] font-mono text-gray-500">Duration: ~{story.totalDurationMinutes} mins</span>
            </div>

            <div className="space-y-2">
              {story.episodes.map((episode, idx) => {
                const isThisEpisodePlaying =
                  isPlaying && currentPlayingTrack?.id === episode.id;

                return (
                  <div
                    key={episode.id}
                    id={`episode-row-${episode.id}`}
                    onClick={() => onPlayEpisode(episode, story)}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                      isThisEpisodePlaying
                        ? 'bg-[#1a1a1a] border-orange-800/40 text-orange-400'
                        : 'bg-[#141414] hover:bg-[#1a1a1a] border-[#222222] text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="text-[10px] font-mono font-bold text-gray-600 w-4 text-center">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <button
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                          isThisEpisodePlaying
                            ? 'bg-orange-500 text-black'
                            : 'bg-[#222222] text-gray-300 hover:scale-105'
                        }`}
                        title="Play episode"
                      >
                        {isThisEpisodePlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-bold truncate text-white">
                          {episode.title}
                        </p>
                        {episode.synopsis && (
                          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                            {episode.synopsis}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0 ml-3 text-xs text-gray-500 font-mono">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-600" />
                        <span>{formatDuration(episode.duration)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

