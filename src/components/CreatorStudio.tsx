import React, { useState } from 'react';
import { Mic, Sparkles, Image, Music, ArrowLeft } from 'lucide-react';
import { Story, StoryCategory, Episode } from '../types';
import { CATEGORIES } from '../data/mockAudioData';

interface CreatorStudioProps {
  onPublishStory: (story: Story) => void;
  onSelectTab: (tab: 'home' | 'search' | 'library' | 'studio') => void;
}

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80';
const DEFAULT_AUDIO = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3';

export function CreatorStudio({ onPublishStory, onSelectTab }: CreatorStudioProps) {
  const [title, setTitle] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [category, setCategory] = useState<StoryCategory>('Romance');
  const [coverUrl, setCoverUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !creatorName.trim()) return;

    const storyId = `story-custom-${Date.now()}`;
    const epId = `ep-custom-${Date.now()}-1`;
    const finalCover = coverUrl.trim() || DEFAULT_COVER;
    const finalAudio = audioUrl.trim() || DEFAULT_AUDIO;

    const episode1: Episode = {
      id: epId,
      storyId,
      episodeNumber: 1,
      title: `${title.trim()} - Part 1`,
      storyTitle: title.trim(),
      category,
      author: creatorName.trim(),
      narrator: creatorName.trim(),
      coverUrl: finalCover,
      audioUrl: finalAudio,
      duration: 320,
      listenCount: 1,
      synopsis: description.trim() || `An original audio production by ${creatorName.trim()}.`,
      releaseDate: new Date().toISOString().split('T')[0]
    };

    const newStory: Story = {
      id: storyId,
      title: title.trim(),
      category,
      author: creatorName.trim(),
      narrator: creatorName.trim(),
      rating: 5.0,
      reviewsCount: 1,
      listenCount: 1,
      coverUrl: finalCover,
      bannerUrl: finalCover,
      description: description.trim() || `An original ${category} audio drama produced by ${creatorName.trim()}.`,
      tags: [category, 'Original', 'Community'],
      language: 'English',
      isCompleted: false,
      totalDurationMinutes: 12,
      episodes: [episode1]
    };

    // Prepend to stories array and immediately navigate back to home feed
    onPublishStory(newStory);
    onSelectTab('home');
  };

  return (
    <div id="creator-studio-view" className="max-w-2xl mx-auto pb-16 space-y-6 select-none">
      {/* Studio Header */}
      <div className="pb-4 border-b border-[#222222] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-light text-white tracking-tight flex items-center gap-2">
              <Mic className="w-5 h-5 text-orange-500" />
              Creator Studio
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-xs bg-orange-950/40 text-orange-400 font-mono font-bold border border-orange-800/40 uppercase">
              NEW PRODUCTION
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Publish an original audio literature track directly to the master feed
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#161616] hover:bg-[#222222] text-gray-400 hover:text-white text-xs font-mono transition-colors border border-[#262626]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Feed</span>
        </button>
      </div>

      {/* Creator Form */}
      <form onSubmit={handleSubmit} className="space-y-5 bg-[#0d0d0d] p-6 md:p-8 rounded-xl border border-[#222222] shadow-2xl">
        {/* Story Title */}
        <div>
          <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
            Story Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Whispers of the Forgotten Station"
            className="w-full bg-[#161616] border border-[#262626] focus:border-orange-500 rounded-md px-3.5 py-2.5 text-xs md:text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors"
          />
        </div>

        {/* Creator Name */}
        <div>
          <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
            Creator Name / Author *
          </label>
          <input
            type="text"
            required
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            placeholder="e.g. Elena Rostova"
            className="w-full bg-[#161616] border border-[#262626] focus:border-orange-500 rounded-md px-3.5 py-2.5 text-xs md:text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as StoryCategory)}
            className="w-full bg-[#161616] border border-[#262626] focus:border-orange-500 rounded-md px-3.5 py-2.5 text-xs md:text-sm text-gray-100 focus:outline-none transition-colors font-mono cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Cover Image URL */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Image className="w-3 h-3 text-orange-400" />
              Cover Image URL (Optional)
            </label>
            <span className="text-[9px] font-mono text-gray-600">Defaults to royalty-free artwork</span>
          </div>
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full bg-[#161616] border border-[#262626] focus:border-orange-500 rounded-md px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none transition-colors font-mono"
          />
        </div>

        {/* Audio File URL */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Music className="w-3 h-3 text-orange-400" />
              Audio File URL (Optional)
            </label>
            <span className="text-[9px] font-mono text-gray-600">Defaults to royalty-free audio stream</span>
          </div>
          <input
            type="url"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="https://cdn.pixabay.com/... or MP3 stream URL"
            className="w-full bg-[#161616] border border-[#262626] focus:border-orange-500 rounded-md px-3.5 py-2.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none transition-colors font-mono"
          />
        </div>

        {/* Synopsis / Description */}
        <div>
          <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
            Synopsis & Story Notes
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short hook for listeners..."
            className="w-full bg-[#161616] border border-[#262626] focus:border-orange-500 rounded-md p-3.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none transition-colors"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            id="submit-creator-track-btn"
            className="flex-1 py-3.5 rounded-full bg-white hover:bg-orange-500 text-black hover:text-white font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            Publish & Add to Top of Feed
          </button>
        </div>
      </form>
    </div>
  );
}


