import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Volume1,
  Heart,
  ListMusic,
  Moon,
  Gauge,
  Activity
} from 'lucide-react';
import { Episode } from '../types';

interface AudioPlayerFooterProps {
  currentTrack: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  sleepTimerMinutes: number | null;
  queue: Episode[];
  queueIndex: number;
  isFavorite: boolean;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onPlaybackRateChange: (rate: number) => void;
  onSetSleepTimer: (minutes: number | null) => void;
  onSkipNext: () => void;
  onSkipPrev: () => void;
  onSkipSeconds: (deltaSeconds: number) => void;
  onToggleFavorite: (storyId: string) => void;
  onSelectQueueEpisode: (episode: Episode) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function AudioPlayerFooter({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  playbackRate,
  sleepTimerMinutes,
  queue,
  queueIndex,
  isFavorite,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onPlaybackRateChange,
  onSetSleepTimer,
  onSkipNext,
  onSkipPrev,
  onSkipSeconds,
  onToggleFavorite,
  onSelectQueueEpisode
}: AudioPlayerFooterProps) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [showQueueDrawer, setShowQueueDrawer] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubTime, setScrubTime] = useState(0);

  const speedMenuRef = useRef<HTMLDivElement>(null);
  const sleepMenuRef = useRef<HTMLDivElement>(null);
  const queueDrawerRef = useRef<HTMLDivElement>(null);

  // Close popup menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target as Node)) {
        setShowSpeedMenu(false);
      }
      if (sleepMenuRef.current && !sleepMenuRef.current.contains(event.target as Node)) {
        setShowSleepMenu(false);
      }
      if (queueDrawerRef.current && !queueDrawerRef.current.contains(event.target as Node)) {
        setShowQueueDrawer(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const effectiveDuration = duration > 0 ? duration : currentTrack?.duration || 100;
  const displayTime = isScrubbing ? scrubTime : currentTime;
  const progressPercent = Math.min(100, Math.max(0, (displayTime / effectiveDuration) * 100));

  const handleSeekSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setScrubTime(val);
  };

  const handleSeekSliderMouseDown = () => {
    setIsScrubbing(true);
    setScrubTime(currentTime);
  };

  const handleSeekSliderMouseUp = () => {
    setIsScrubbing(false);
    onSeek(scrubTime);
  };

  if (!currentTrack) {
    return (
      <footer
        id="audio-player-footer"
        className="sticky bottom-0 left-0 right-0 h-20 bg-[#050505] border-t border-[#222222] px-8 flex items-center justify-between z-30 select-none text-gray-500"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#111] border border-[#222] flex items-center justify-center">
            <ListMusic className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">
              STANDBY // NO TRACK LOADED
            </p>
            <p className="text-[10px] text-gray-600">Select any audio serial in the console to engage playback</p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          STUDIO.FLOW // BITSTREAM READY
        </div>
      </footer>
    );
  }

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  const sleepTimerOptions = [
    { label: 'Off', minutes: null },
    { label: '15 Minutes', minutes: 15 },
    { label: '30 Minutes', minutes: 30 },
    { label: '45 Minutes', minutes: 45 },
    { label: 'End of Episode', minutes: Math.ceil((effectiveDuration - currentTime) / 60) }
  ];

  return (
    <>
      {/* Queue Drawer Popover */}
      {showQueueDrawer && (
        <div
          ref={queueDrawerRef}
          className="fixed bottom-24 right-8 w-80 md:w-96 max-h-96 bg-[#111111] border border-[#222222] rounded-lg shadow-2xl p-4 z-40 flex flex-col"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-xs bg-orange-500" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white font-mono">
                Session Tracklist ({queue.length})
              </h4>
            </div>
            <button
              onClick={() => setShowQueueDrawer(false)}
              className="text-[10px] font-mono uppercase text-gray-500 hover:text-white tracking-wider"
            >
              [Close]
            </button>
          </div>

          <div className="overflow-y-auto mt-2 space-y-1 flex-1 pr-1">
            {queue.map((ep, idx) => {
              const isCurrent = ep.id === currentTrack.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => {
                    onSelectQueueEpisode(ep);
                    setShowQueueDrawer(false);
                  }}
                  className={`flex items-center gap-3 p-2 rounded-md text-left cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-[#1a1a1a] text-orange-400 border border-orange-800/40'
                      : 'hover:bg-[#161616] text-gray-300'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-gray-500 w-4 text-center">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <img
                    src={ep.coverUrl}
                    alt={ep.title}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-white">{ep.title}</p>
                    <p className="text-[10px] text-gray-500 truncate font-mono">{ep.narrator}</p>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 flex-shrink-0">
                    {formatTime(ep.duration)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Sticky Bottom Footer */}
      <footer
        id="audio-player-footer"
        className="sticky bottom-0 left-0 right-0 h-24 bg-[#050505] border-t border-[#222222] px-6 md:px-8 flex items-center justify-between z-30 select-none"
      >
        {/* Left: Track Information */}
        <div className="w-1/4 min-w-[200px] flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-[#111111] border border-[#222222]">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 h-full bg-orange-500 animate-pulse" />
                  <div className="w-0.5 h-2 bg-orange-500 animate-pulse delay-75" />
                  <div className="w-0.5 h-3 bg-orange-500 animate-pulse delay-150" />
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm text-white font-bold truncate">
              {currentTrack.title}
            </p>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest truncate uppercase">
              {isPlaying ? 'ENGINEERING_ACTIVE' : 'AUDIO_PAUSED'} • {currentTrack.category}
            </p>
          </div>

          <button
            id="player-toggle-favorite-btn"
            onClick={() => onToggleFavorite(currentTrack.storyId)}
            className={`p-1.5 rounded transition-colors hidden sm:flex ${
              isFavorite
                ? 'text-orange-500 hover:text-orange-400'
                : 'text-gray-600 hover:text-gray-300'
            }`}
            title={isFavorite ? 'Remove from session library' : 'Save to session library'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-orange-500' : ''}`} />
          </button>
        </div>

        {/* Center: Core Playback Controls & Precision Scrubber */}
        <div className="w-1/2 flex flex-col items-center gap-2 max-w-lg">
          {/* Action Button Row */}
          <div className="flex items-center gap-6 md:gap-7">
            {/* 10s Rewind */}
            <button
              id="player-rewind-10s"
              onClick={() => onSkipSeconds(-10)}
              className="text-gray-500 hover:text-white transition-colors relative"
              title="Rewind 10 seconds"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[7px] font-mono text-gray-500">
                10
              </span>
            </button>

            {/* Previous Track */}
            <button
              id="player-skip-prev"
              onClick={onSkipPrev}
              disabled={queueIndex <= 0}
              className={`transition-colors ${
                queueIndex <= 0
                  ? 'text-gray-700 cursor-not-allowed'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Previous episode"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Stark White Primary Play/Pause Button */}
            <button
              id="player-play-pause-btn"
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full border border-[#444444] bg-white text-black flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-md transform active:scale-95 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Next Track */}
            <button
              id="player-skip-next"
              onClick={onSkipNext}
              disabled={queueIndex >= queue.length - 1}
              className={`transition-colors ${
                queueIndex >= queue.length - 1
                  ? 'text-gray-700 cursor-not-allowed'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Next episode"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* 10s Forward */}
            <button
              id="player-forward-10s"
              onClick={() => onSkipSeconds(10)}
              className="text-gray-500 hover:text-white transition-colors relative"
              title="Forward 10 seconds"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[7px] font-mono text-gray-500">
                10
              </span>
            </button>
          </div>

          {/* Thin Studio Scrubber Bar */}
          <div className="w-full flex items-center gap-3">
            <span className="text-[10px] font-mono text-gray-500 w-9 text-right">
              {formatTime(displayTime)}
            </span>

            <div className="relative flex-1 group flex items-center">
              {/* Background Track */}
              <div className="w-full h-1 bg-[#222222] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-white group-hover:bg-orange-500 rounded-full transition-colors"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Native range input for seeking */}
              <input
                id="player-seek-slider"
                type="range"
                min={0}
                max={effectiveDuration}
                step={0.5}
                value={displayTime}
                onChange={handleSeekSliderChange}
                onMouseDown={handleSeekSliderMouseDown}
                onMouseUp={handleSeekSliderMouseUp}
                onTouchStart={handleSeekSliderMouseDown}
                onTouchEnd={handleSeekSliderMouseUp}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Seek audio track"
              />
            </div>

            <span className="text-[10px] font-mono text-gray-500 w-9">
              {formatTime(effectiveDuration)}
            </span>
          </div>
        </div>

        {/* Right: Audio Adjustments & Studio Peak Meters */}
        <div className="w-1/4 min-w-[200px] flex items-center justify-end gap-5">
          {/* Peak Level VU Meter */}
          <div className="hidden lg:flex flex-col items-end gap-1">
            <span className="text-[9px] text-gray-500 uppercase font-bold font-mono tracking-widest">
              Peak Level
            </span>
            <div className="flex gap-0.5">
              <div className={`w-1 h-3 rounded-xs ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-[#1a1a1a]'}`} />
              <div className={`w-1 h-3 rounded-xs ${isPlaying ? 'bg-green-500 animate-pulse delay-75' : 'bg-[#1a1a1a]'}`} />
              <div className={`w-1 h-3 rounded-xs ${isPlaying ? 'bg-green-500 animate-pulse delay-100' : 'bg-[#1a1a1a]'}`} />
              <div className={`w-1 h-3 rounded-xs ${isPlaying ? 'bg-yellow-500 animate-pulse delay-150' : 'bg-[#1a1a1a]'}`} />
              <div className="w-1 h-3 rounded-xs bg-[#1f1f1f]" />
            </div>
          </div>

          {/* Speed & Sleep Controls */}
          <div className="flex items-center gap-1.5">
            {/* Speed Selector */}
            <div className="relative" ref={speedMenuRef}>
              <button
                id="player-speed-btn"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-2 py-1 rounded bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] text-[10px] font-mono font-bold text-gray-300 flex items-center gap-1 transition-colors"
                title="Playback Speed"
              >
                <span>{playbackRate}x</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-10 right-0 w-24 bg-[#111111] border border-[#222222] rounded-md shadow-2xl p-1 z-40 flex flex-col gap-0.5">
                  {speedOptions.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => {
                        onPlaybackRateChange(rate);
                        setShowSpeedMenu(false);
                      }}
                      className={`px-2 py-1 text-[10px] font-mono rounded text-left transition-colors ${
                        playbackRate === rate
                          ? 'bg-orange-950/60 text-orange-400 font-bold border border-orange-800/40'
                          : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                      }`}
                    >
                      {rate}x {rate === 1.0 && '[Norm]'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sleep Timer */}
            <div className="relative" ref={sleepMenuRef}>
              <button
                id="player-sleep-timer-btn"
                onClick={() => setShowSleepMenu(!showSleepMenu)}
                className={`p-1.5 rounded border text-xs transition-colors ${
                  sleepTimerMinutes
                    ? 'bg-orange-950/60 text-orange-400 border-orange-800/40'
                    : 'bg-[#111111] hover:bg-[#1a1a1a] text-gray-400 hover:text-white border-[#222222]'
                }`}
                title={sleepTimerMinutes ? `Sleep timer: ${sleepTimerMinutes}m` : 'Set Sleep Timer'}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>

              {showSleepMenu && (
                <div className="absolute bottom-10 right-0 w-36 bg-[#111111] border border-[#222222] rounded-md shadow-2xl p-1 z-40 flex flex-col gap-0.5">
                  <div className="px-2 py-1 text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                    Sleep Timer
                  </div>
                  {sleepTimerOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onSetSleepTimer(opt.minutes);
                        setShowSleepMenu(false);
                      }}
                      className={`px-2 py-1 text-[10px] font-mono rounded text-left transition-colors ${
                        sleepTimerMinutes === opt.minutes
                          ? 'bg-orange-950/60 text-orange-400 font-bold border border-orange-800/40'
                          : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Volume Control */}
            <div className="hidden md:flex items-center gap-1.5 pl-1">
              <button
                id="player-volume-mute-btn"
                onClick={onToggleMute}
                className="p-1 rounded text-gray-400 hover:text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-red-500" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>

              <div className="w-16 h-1 bg-[#222222] rounded-full relative flex items-center">
                <input
                  id="player-volume-slider"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1 bg-transparent rounded-full appearance-none cursor-pointer accent-orange-500"
                  title="Adjust Output Volume"
                />
              </div>
            </div>

            {/* Queue Drawer Button */}
            <button
              id="player-queue-btn"
              onClick={() => setShowQueueDrawer(!showQueueDrawer)}
              className={`p-1.5 rounded border text-xs transition-colors ${
                showQueueDrawer
                  ? 'bg-orange-950/60 text-orange-400 border-orange-800/40'
                  : 'bg-[#111111] hover:bg-[#1a1a1a] text-gray-400 hover:text-white border-[#222222]'
              }`}
              title="Tracklist Queue"
            >
              <ListMusic className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

