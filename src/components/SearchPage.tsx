import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Story, StoryCategory, Episode } from '../types';
import { CATEGORIES } from '../data/mockAudioData';
import { AudioCard } from './AudioCard';

interface SearchPageProps {
  stories: Story[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: StoryCategory | 'All';
  onCategorySelect: (cat: StoryCategory | 'All') => void;
  currentPlayingTrack: Episode | null;
  isPlaying: boolean;
  onPlayTrack: (track: Episode, story: Story) => void;
  onSelectStory: (story: Story) => void;
}

export function SearchPage({
  stories,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  currentPlayingTrack,
  isPlaying,
  onPlayTrack,
  onSelectStory
}: SearchPageProps) {
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'episodes'>('popular');

  const filteredStories = useMemo(() => {
    return stories
      .filter((story) => {
        const matchesCategory =
          selectedCategory === 'All' || story.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          q === '' ||
          story.title.toLowerCase().includes(q) ||
          story.author.toLowerCase().includes(q) ||
          story.narrator.toLowerCase().includes(q) ||
          story.description.toLowerCase().includes(q) ||
          story.tags.some((t) => t.toLowerCase().includes(q));

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.listenCount - a.listenCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'episodes') return b.episodes.length - a.episodes.length;
        return 0;
      });
  }, [stories, searchQuery, selectedCategory, sortBy]);

  return (
    <div id="search-explore-view" className="space-y-6 pb-12 select-none">
      {/* Title & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222222]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-light text-white tracking-tight">
              Explore Audio Master Catalog
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-xs bg-orange-950/40 text-orange-400 font-mono font-bold border border-orange-800/40 uppercase">
              INDEX SEARCH
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Browse through serialized audio literature, multi-cast voice productions, and soundscapes
          </p>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-500 font-mono uppercase">Sort by:</span>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'episodes')}
            className="bg-[#161616] border border-[#262626] text-xs text-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-orange-500 font-mono"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="episodes">Episode Count</option>
          </select>
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => onCategorySelect('All')}
          className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-white text-black border border-white'
              : 'bg-[#141414] hover:bg-[#202020] text-gray-400 border border-[#262626]'
          }`}
        >
          All Genres ({stories.length})
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect(cat)}
            className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-black border border-white'
                : 'bg-[#141414] hover:bg-[#202020] text-gray-400 border border-[#262626]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {filteredStories.length === 0 ? (
        <div className="py-16 text-center bg-[#111111] rounded-lg border border-[#222222]">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">No audio productions matched</p>
          <p className="text-[11px] text-gray-600 mt-1">Try modifying your query or selecting another genre category</p>
          <button
            onClick={() => {
              onSearchChange('');
              onCategorySelect('All');
            }}
            className="mt-4 px-4 py-2 rounded-md bg-[#1a1a1a] hover:bg-[#252525] text-xs font-mono font-bold text-gray-200 border border-[#2a2a2a] uppercase"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">
            Displaying {filteredStories.length} Productions
          </div>

          <div className="flex flex-wrap gap-4">
            {filteredStories.map((story) => (
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
        </div>
      )}
    </div>
  );
}

