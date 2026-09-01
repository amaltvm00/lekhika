import { Play, Pause, Star, Headphones, Layers, Info } from 'lucide-react';
import React from 'react';
import { Story, Episode } from '../types';

interface AudioCardProps {
  key?: React.Key;
  story: Story;
  currentPlayingTrack: Episode | null;
  isPlaying: boolean;
  onPlayTrack: (track: Episode, story: Story) => void;
  onSelectStory: (story: Story) => void;
}

export function AudioCard({
  story,
  currentPlayingTrack,
  isPlaying,
  onPlayTrack,
  onSelectStory
}: AudioCardProps) {
  const isCurrentStoryPlaying =
    isPlaying && currentPlayingTrack?.storyId === story.id;
  const isCurrentStoryLoaded = currentPlayingTrack?.storyId === story.id;

  const handleCardClick = () => {
    // Core Rule: Clicking any audio card must immediately load that track into the bottom footer player and trigger playback.
    if (story.episodes.length > 0) {
      onPlayTrack(story.episodes[0], story);
    }
  };

  return (
    <div
      id={`audio-card-${story.id}`}
      className="group relative flex flex-col bg-[#111111] hover:bg-[#161616] border border-[#222222] hover:border-[#333333] rounded-lg p-3 transition-all duration-200 cursor-pointer w-[205px] flex-shrink-0 select-none"
      onClick={handleCardClick}
    >
      {/* Cover Image with Studio Play Overlay */}
      <div className="relative aspect-[3/4] w-full rounded overflow-hidden bg-[#1a1a1a] border border-[#222222]">
        <img
          src={story.coverUrl}
          alt={story.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Gradient Studio Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Category Pill */}
        <div className="absolute top-2 left-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-black/80 text-orange-400 border border-orange-900/40">
            {story.category}
          </span>
        </div>

        {/* Episodes Count Pill */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 px-1.5 py-0.5 rounded-xs text-[9px] font-mono text-gray-400 border border-white/10">
          <Layers className="w-2.5 h-2.5 text-gray-500" />
          <span>{story.episodes.length} Eps</span>
        </div>

        {/* Studio Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
          <button
            id={`play-btn-${story.id}`}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-11 h-11 rounded-full bg-white text-black hover:bg-orange-500 hover:text-white flex items-center justify-center shadow-2xl transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Engage Audio Playback"
          >
            {isCurrentStoryPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Active Equalizer Indicator */}
        {isCurrentStoryPlaying && (
          <div className="absolute bottom-2 right-2 flex items-end gap-0.5 bg-black/90 px-1.5 py-1 rounded-xs border border-orange-500/40">
            <div className="w-0.5 h-3 bg-orange-500 animate-pulse" />
            <div className="w-0.5 h-4 bg-orange-500 animate-pulse delay-75" />
            <div className="w-0.5 h-2 bg-orange-500 animate-pulse delay-150" />
          </div>
        )}

        {/* Listeners Count */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-gray-300 font-mono bg-black/80 px-1.5 py-0.5 rounded-xs">
          <Headphones className="w-3 h-3 text-orange-400" />
          <span>{(story.listenCount / 1000).toFixed(0)}k</span>
        </div>
      </div>

      {/* Track & Story Details */}
      <div className="mt-3 flex flex-col flex-1">
        <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-orange-400 transition-colors">
          {story.title}
        </h3>

        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
          By <span className="text-gray-400">{story.author}</span>
        </p>

        <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1 font-mono">
          Voice: {story.narrator}
        </p>

        <div className="mt-2.5 pt-2 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
            <span className="font-bold text-gray-200 text-[11px]">{story.rating}</span>
            <span className="text-[9px] text-gray-500">({story.reviewsCount})</span>
          </div>

          <button
            id={`info-btn-${story.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectStory(story);
            }}
            className="p-1 rounded bg-[#161616] hover:bg-[#222222] text-gray-400 hover:text-white transition-colors"
            title="Inspect Track Episodes"
          >
            <Info className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

