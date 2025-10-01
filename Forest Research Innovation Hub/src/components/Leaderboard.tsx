import React, { useState } from 'react';
import { Trophy, Medal, Award, Crown, ArrowLeft, Calendar, Target, Trees } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard } from '../data/leaderboard';

interface LeaderboardProps {
  onBack: () => void;
  currentUserName?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack, currentUserName }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'innovation' | 'guardian' | 'explorer'>('all');
  const leaderboard = getLeaderboard();

  const filteredLeaderboard = leaderboard.filter(entry => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'innovation') return entry.badge === 'Innovation Leader';
    if (selectedFilter === 'guardian') return entry.badge === 'Climate Guardian';
    if (selectedFilter === 'explorer') return entry.badge === 'Forest Explorer';
    return true;
  }).slice(0, 10);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500 animate-bounce" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400 animate-bounce" style={{ animationDelay: '0.1s' }} />;
      case 3: return <Award className="w-6 h-6 text-amber-600 animate-bounce" style={{ animationDelay: '0.2s' }} />;
      default: return <Trophy className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700';
      case 2: return 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border-gray-200 dark:border-gray-600';
      case 3: return 'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-700';
      default: return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Innovation Leader': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Climate Guardian': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-4 transition-colors animate-slide-in-left group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Results</span>
        </button>
        
        <div className="text-4xl mb-4 animate-bounce-in">🏆</div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-slide-in-left">
          Global Leaderboard
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 animate-slide-in-right">
          Top performers in forest investigation challenges
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 animate-slide-up">
        {[
          { key: 'all', label: 'All Badges', emoji: '🌟' },
          { key: 'innovation', label: 'Innovation Leaders', emoji: '🚀' },
          { key: 'guardian', label: 'Climate Guardians', emoji: '🌍' },
          { key: 'explorer', label: 'Forest Explorers', emoji: '🌱' }
        ].map((filter, index) => (
          <button
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 animate-scale-in ${
              selectedFilter === filter.key
                ? 'bg-emerald-600 text-white shadow-lg animate-pulse-slow'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="mr-2">{filter.emoji}</span>
            {filter.label}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {filteredLeaderboard.map((entry, index) => {
          const rank = index + 1;
          const isCurrentUser = entry.name === currentUserName;
          
          return (
            <div
              key={entry.id}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-slide-in-left ${
                getRankStyle(rank)
              } ${
                isCurrentUser ? 'ring-2 ring-emerald-500 ring-opacity-50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-md hover:rotate-12 transition-transform duration-200">
                    {rank <= 3 ? getRankIcon(rank) : (
                      <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
                        {rank}
                      </span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-lg font-bold transition-colors ${
                        isCurrentUser ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {entry.name}
                        {isCurrentUser && <span className="ml-2 text-sm">(You)</span>}
                      </h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyle(entry.badge)}`}>
                        {entry.badgeEmoji} {entry.badge}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Trees className="w-4 h-4" />
                        <span>{entry.forest}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{entry.topic}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(entry.completedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {entry.score}/{entry.totalQuestions}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {entry.percentage}% accuracy
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000 animate-slide-in-right"
                      style={{ 
                        width: `${entry.percentage}%`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Footer */}
      <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: '1s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Global Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {leaderboard.filter(e => e.badge === 'Innovation Leader').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Innovation Leaders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {leaderboard.filter(e => e.badge === 'Climate Guardian').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Climate Guardians</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {leaderboard.filter(e => e.badge === 'Forest Explorer').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Forest Explorers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;