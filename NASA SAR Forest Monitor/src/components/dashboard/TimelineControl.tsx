import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Calendar,
  Clock
} from 'lucide-react';

interface TimelineControlProps {
  onTimeChange?: (timestamp: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export default function TimelineControl({ onTimeChange, onPlayStateChange }: TimelineControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState([75]); // 75% through timeline
  const [timeRange, setTimeRange] = useState('6months');

  const timeRanges = [
    { value: '1day', label: '24 Hours' },
    { value: '1week', label: '7 Days' },
    { value: '1month', label: '30 Days' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
  ];

  const handlePlayPause = () => {
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);
    onPlayStateChange?.(newPlayState);
  };

  const handleTimelineChange = (value: number[]) => {
    setCurrentTime(value);
    onTimeChange?.(value[0]);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const totalDays = timeRange === '1day' ? 1 : 
                     timeRange === '1week' ? 7 :
                     timeRange === '1month' ? 30 :
                     timeRange === '3months' ? 90 :
                     timeRange === '6months' ? 180 : 365;
    
    const daysBack = Math.floor((100 - currentTime[0]) * totalDays / 100);
    const targetDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    
    return targetDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Timeline Control</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {getCurrentDate()}
          </span>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Time Range
        </label>
        <div className="flex flex-wrap gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range.value)}
              className="text-xs"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Timeline Slider */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground mb-3 block">
          Historical Timeline
        </label>
        <div className="relative">
          <Slider
            value={currentTime}
            onValueChange={handleTimelineChange}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Historical</span>
            <span>Current</span>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleTimelineChange([Math.max(0, currentTime[0] - 10)])}
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button
          variant={isPlaying ? "secondary" : "default"}
          size="sm"
          onClick={handlePlayPause}
          className="w-12 h-12 rounded-full"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleTimelineChange([Math.min(100, currentTime[0] + 10)])}
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Speed Control */}
      <div className="mt-4 text-center">
        <span className="text-xs text-muted-foreground">
          Playback Speed: {isPlaying ? '2x' : '1x'}
        </span>
      </div>
    </div>
  );
}