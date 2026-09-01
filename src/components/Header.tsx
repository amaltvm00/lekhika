import { Search, Bell, Sparkles, User, Flame } from 'lucide-react';
import { ActiveNavTab, StoryCategory } from '../types';

interface HeaderProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: StoryCategory | 'All';
  onCategorySelect: (cat: StoryCategory | 'All') => void;
}

export function Header({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect
}: HeaderProps) {
  const quickTags = ['Trending', 'Darjeeling Rain', 'Haveli Horror', 'Space 2149', 'Courtroom'];

  return (
    <header
      id="app-header"
      className="h-20 border-b border-[#222222] bg-[#0d0d0d] px-8 flex items-center justify-between gap-6 sticky top-0 z-20 select-none"
    >
      {/* Precision Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="global-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            if (activeTab !== 'search' && e.target.value.trim().length > 0) {
              onTabChange('search');
            }
          }}
          placeholder="Search serials, narrators, voice artists, or tags..."
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] py-2.5 pl-10 pr-4 rounded-md text-xs md:text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Quick Category Chips (Desktop) */}
      <div className="hidden xl:flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
          Trending:
        </span>
        {quickTags.map((tag) => (
          <button
            key={tag}
            id={`quick-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => {
              onSearchChange(tag === 'Trending' ? '' : tag);
              onTabChange('search');
            }}
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#161616] hover:bg-[#222222] border border-[#262626] text-gray-400 hover:text-white transition-colors font-mono"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Right User & Status Console */}
      <div className="flex items-center gap-5">
        <button
          id="header-notifications-btn"
          className="p-2.5 rounded-md bg-[#161616] hover:bg-[#222222] text-gray-400 hover:text-white border border-[#262626] transition-colors relative"
          title="Studio Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-white font-bold tracking-tight leading-tight">Alex Sterling</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter font-mono">
              Lead Audio Engineer
            </p>
          </div>
          <div className="w-9 h-9 rounded-full border-2 border-[#333333] bg-[#1a1a1a] flex items-center justify-center font-bold text-xs text-orange-500">
            AS
          </div>
        </div>
      </div>
    </header>
  );
}

