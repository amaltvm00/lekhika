import { Home, Search, Mic, BookOpen, Layers, Radio, Sparkles, HardDrive } from 'lucide-react';
import { ActiveNavTab, StoryCategory } from '../types';
import { CATEGORIES } from '../data/mockAudioData';

interface SidebarProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  selectedCategory: StoryCategory | 'All';
  onCategorySelect: (cat: StoryCategory | 'All') => void;
  favoriteCount: number;
}

export function Sidebar({
  activeTab,
  onTabChange,
  selectedCategory,
  onCategorySelect,
  favoriteCount
}: SidebarProps) {
  const emojiMap: Record<StoryCategory, string> = {
    Romance: '💖',
    Horror: '👻',
    'Sci-Fi': '🚀',
    Thriller: '🔪',
    Fantasy: '⚔️',
    Drama: '🎭'
  };

  return (
    <aside
      id="app-sidebar"
      className="w-72 flex-shrink-0 bg-[#000000] border-r border-[#222222] flex flex-col h-full select-none z-20"
    >
      {/* Brand Logo & Studio Header */}
      <div className="p-7 pb-6 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-5 h-5 bg-orange-500 rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-xs" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase font-mono">
            Vibe<span className="text-orange-500">.</span>Flow
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-xs bg-[#1a1a1a] text-orange-400 font-mono font-bold border border-[#2a2a2a] ml-auto uppercase tracking-wider">
            PRO
          </span>
        </div>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
          Audio Literature Master Console
        </p>
      </div>

      {/* Main Console Navigation */}
      <div className="px-6 py-5 border-b border-[#1a1a1a]">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">
          Console
        </p>
        <nav className="space-y-1.5">
          <button
            id="nav-btn-home"
            onClick={() => {
              onTabChange('home');
              onCategorySelect('All');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-all text-left ${
              activeTab === 'home'
                ? 'text-white font-bold bg-[#141414] border-l-2 border-orange-500 pl-3.5 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#111111]'
            }`}
          >
            <Home className={`w-4 h-4 ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-400'}`} />
            <span className="flex-1">Master Feed</span>
          </button>

          <button
            id="nav-btn-search"
            onClick={() => onTabChange('search')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-all text-left ${
              activeTab === 'search'
                ? 'text-white font-bold bg-[#141414] border-l-2 border-orange-500 pl-3.5 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#111111]'
            }`}
          >
            <Search className={`w-4 h-4 ${activeTab === 'search' ? 'text-orange-500' : 'text-gray-400'}`} />
            <span className="flex-1">Explore & Search</span>
          </button>

          <button
            id="nav-btn-library"
            onClick={() => onTabChange('library')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-all text-left ${
              activeTab === 'library'
                ? 'text-white font-bold bg-[#141414] border-l-2 border-orange-500 pl-3.5 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#111111]'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === 'library' ? 'text-orange-500' : 'text-gray-400'}`} />
            <span className="flex-1">Session Library</span>
            {favoriteCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1f1f1f] text-gray-300 font-mono font-bold border border-[#2a2a2a]">
                {favoriteCount}
              </span>
            )}
          </button>

          <button
            id="nav-btn-studio"
            onClick={() => onTabChange('studio')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-all text-left group ${
              activeTab === 'studio'
                ? 'text-white font-bold bg-[#141414] border-l-2 border-orange-500 pl-3.5 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#111111]'
            }`}
          >
            <Mic className="w-4 h-4 text-orange-400 group-hover:scale-105 transition-transform" />
            <span className="flex-1">Creator Studio</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-950/50 text-orange-400 font-mono font-bold border border-orange-800/40 uppercase tracking-tight">
              Publish
            </span>
          </button>
        </nav>
      </div>

      {/* Categories & Genres Selection */}
      <div className="px-6 py-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between pb-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            Categories
          </p>
          <span className="text-[10px] font-mono text-gray-500">
            {CATEGORIES.length}
          </span>
        </div>

        <div className="space-y-1 mt-1">
          <button
            id="cat-btn-all"
            onClick={() => {
              onCategorySelect('All');
              if (activeTab !== 'home') onTabChange('home');
            }}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#1a1a1a] text-white font-semibold border border-[#333]'
                : 'text-gray-400 hover:text-white hover:bg-[#121212]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-xs bg-orange-500/80"></span>
              <span>All Genres</span>
            </div>
            {selectedCategory === 'All' && (
              <span className="text-[9px] font-mono text-orange-400 uppercase tracking-tighter">
                ACTIVE
              </span>
            )}
          </button>

          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                id={`cat-btn-${category.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                onClick={() => {
                  onCategorySelect(category);
                  if (activeTab !== 'home') onTabChange('home');
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-orange-400 font-semibold border border-orange-800/40'
                    : 'text-gray-400 hover:text-white hover:bg-[#121212]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs">{emojiMap[category]}</span>
                  <span>{category}</span>
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Disk Space / Buffer Status Box */}
      <div className="p-6 border-t border-[#1a1a1a] bg-[#050505]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest flex items-center gap-1.5">
            <HardDrive className="w-3 h-3 text-gray-500" /> Audio Stream Buffer
          </span>
          <span className="text-[10px] font-mono text-gray-400 font-bold">100% ONLINE</span>
        </div>
        <div className="h-1 w-full bg-[#1a1a1a] rounded-full overflow-hidden mb-3">
          <div className="h-full w-4/5 bg-orange-500"></div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
          <span>Bitrate: 320kbps</span>
          <span className="text-green-500">HD Hi-Fi</span>
        </div>
      </div>
    </aside>
  );
}

