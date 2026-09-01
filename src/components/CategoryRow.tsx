import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Story, StoryCategory, Episode } from '../types';
import { AudioCard } from './AudioCard';

interface CategoryRowProps {
  key?: React.Key;
  category: StoryCategory;
  stories: Story[];
  currentPlayingTrack: Episode | null;
  isPlaying: boolean;
  onPlayTrack: (track: Episode, story: Story) => void;
  onSelectStory: (story: Story) => void;
  onViewAll?: (category: StoryCategory) => void;
}

export function CategoryRow({
  category,
  stories,
  currentPlayingTrack,
  isPlaying,
  onPlayTrack,
  onSelectStory,
  onViewAll
}: CategoryRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -480 : 480;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const categoryEmoji: Record<StoryCategory, string> = {
    Romance: '💖',
    Horror: '👻',
    'Sci-Fi': '🚀',
    Thriller: '🔪',
    Fantasy: '⚔️',
    Drama: '🎭'
  };

  const categorySubtext: Record<StoryCategory, string> = {
    Romance: 'Passionate serials, emotional arcs, and multi-cast intimate soundscapes',
    Horror: 'Paranormal audio dramas, eerie folklore, and spine-chilling acoustic engineering',
    'Sci-Fi': 'Deep space voyages, quantum anomalies, and futuristic synthetic mastering',
    Thriller: 'Courtroom suspense, mind games, and high-stakes criminal conspiracies',
    Fantasy: 'Ancient magic, shadow guilds, and legendary realm orchestral sagas',
    Drama: 'Emotional slice of life, city memoirs, and heartfelt narratives'
  };

  if (stories.length === 0) return null;

  return (
    <section id={`category-section-${category.toLowerCase().replace(/[^a-z0-9]/g, '')}`} className="mb-10">
      {/* Category Header with Scroll Controls */}
      <div className="flex items-end justify-between mb-4 px-1">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{categoryEmoji[category]}</span>
            <h2 className="text-xl font-light text-white tracking-tight">
              {category}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-xs bg-[#161616] text-gray-400 font-mono font-bold border border-[#262626] uppercase tracking-wider">
              {stories.length} Series
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {categorySubtext[category]}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              id={`view-all-${category.toLowerCase()}`}
              onClick={() => onViewAll(category)}
              className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 mr-2"
            >
              [Explore All]
            </button>
          )}

          <button
            id={`scroll-left-${category.toLowerCase()}`}
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-md bg-[#161616] hover:bg-[#222222] border border-[#262626] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            id={`scroll-right-${category.toLowerCase()}`}
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-md bg-[#161616] hover:bg-[#222222] border border-[#262626] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
      >
        {stories.map((story) => (
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
    </section>
  );
}

