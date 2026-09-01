import { Play, Pause, Star, Headphones, Sparkles, Plus, Check } from 'lucide-react';
import { Story, Episode } from '../types';

interface FeaturedHeroProps {
  story: Story;
  currentPlayingTrack: Episode | null;
  isPlaying: boolean;
  onPlayTrack: (track: Episode, story: Story) => void;
  onSelectStory: (story: Story) => void;
  isFavorited: boolean;
  onToggleFavorite: (storyId: string) => void;
}

export function FeaturedHero({
  story,
  currentPlayingTrack,
  isPlaying,
  onPlayTrack,
  onSelectStory,
  isFavorited,
  onToggleFavorite
}: FeaturedHeroProps) {
  const isPlayingThisStory =
    isPlaying && currentPlayingTrack?.storyId === story.id;

  const handleListenNow = () => {
    if (story.episodes.length > 0) {
      onPlayTrack(story.episodes[0], story);
    }
  };

  return (
    <div
      id="featured-hero-banner"
      className="relative w-full rounded-xl overflow-hidden mb-10 border border-[#222222] shadow-2xl bg-[#111111]"
    >
      {/* Background Banner with Studio Shading */}
      <div className="absolute inset-0 z-0">
        <img
          src={story.bannerUrl || story.coverUrl}
          alt={story.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 max-w-5xl">
        {/* Cover Art in Hero */}
        <div className="relative w-36 h-48 md:w-44 md:h-56 rounded-lg overflow-hidden shadow-2xl flex-shrink-0 border border-[#333333] group">
          <img
            src={story.coverUrl}
            alt={story.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-xs bg-orange-500 text-black text-[9px] font-mono font-bold uppercase tracking-widest">
            FEATURED
          </div>
        </div>

        {/* Text & Metadata */}
        <div className="flex-1 flex flex-col items-start">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-950/40 text-orange-400 font-mono font-bold border border-orange-800/50 uppercase tracking-tight">
              #1 Serial Production of the Week
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#1a1a1a] text-gray-400 font-mono border border-[#2a2a2a] uppercase">
              {story.category}
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#1a1a1a] text-gray-400 font-mono border border-[#2a2a2a]">
              {story.episodes.length} Episodes
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">
            {story.title}
          </h2>

          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Authored by <span className="text-white font-medium">{story.author}</span> • Voice Performance by <span className="text-orange-400">{story.narrator}</span>
          </p>

          <p className="text-xs md:text-sm text-gray-500 mt-2.5 line-clamp-2 leading-relaxed max-w-2xl">
            {story.description}
          </p>

          {/* Metrics & Tags */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 font-mono">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{story.rating}</span>
              <span className="text-gray-500 font-normal">({story.reviewsCount} reviews)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-gray-400">
              <Headphones className="w-3.5 h-3.5 text-gray-500" />
              <span>{(story.listenCount / 1000).toFixed(0)}k listeners</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              id="hero-listen-btn"
              onClick={handleListenNow}
              className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all cursor-pointer flex items-center gap-2"
            >
              {isPlayingThisStory ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Episode</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>Listen Now</span>
                </>
              )}
            </button>

            <button
              id="hero-details-btn"
              onClick={() => onSelectStory(story)}
              className="px-5 py-2.5 rounded-full bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-[#2a2a2a] transition-colors cursor-pointer"
            >
              View Episodes
            </button>

            <button
              id="hero-favorite-btn"
              onClick={() => onToggleFavorite(story.id)}
              className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                isFavorited
                  ? 'bg-orange-950/50 text-orange-400 border-orange-800/50'
                  : 'bg-[#1a1a1a] hover:bg-[#252525] text-gray-400 hover:text-white border-[#2a2a2a]'
              }`}
              title={isFavorited ? 'Saved in Session Library' : 'Save to Session Library'}
            >
              {isFavorited ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

