import React from 'react';
import { Award, RotateCcw, Download, Trophy } from 'lucide-react';
import { Forest, Topic, QuizResult } from '../types';
import { generateFindings, generateInnovationIdea } from '../data/reports';

interface ResultsProps {
  selectedForest: Forest;
  selectedTopic: Topic;
  result: QuizResult;
  onRestart: () => void;
  onViewLeaderboard: () => void;
  userRank?: number;
}

const Results: React.FC<ResultsProps> = ({
  selectedForest,
  selectedTopic,
  result,
  onRestart,
  onViewLeaderboard,
  userRank
}) => {
  const findings = generateFindings(selectedForest, selectedTopic);
  const innovationIdea = generateInnovationIdea(selectedForest, selectedTopic);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Innovation Leader': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Climate Guardian': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20';
      default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Score Section */}
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce-in hover:animate-wiggle">{result.badgeEmoji}</div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-slide-in-left">
          Congratulations!
        </h2>
        <div className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4 animate-slide-in-right">
          🎯 You scored {result.score}/{result.totalQuestions}!
        </div>
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full font-semibold animate-bounce-in hover:scale-110 transition-transform duration-200 ${getBadgeColor(result.badge)}`}>
          <Award className="w-5 h-5 animate-wiggle" />
          <span>{result.badge}</span>
        </div>
      </div>

      {/* Investigation Report */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-scale-in hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="text-2xl animate-float">📑</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white animate-slide-in-left">
            Investigation Report
          </h3>
        </div>

        <div className="space-y-6">
          <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">
              Forest Investigated:
            </h4>
            <div className="flex items-center space-x-3">
              <span className="text-2xl hover:animate-wiggle">{selectedForest.emoji}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white transition-colors">{selectedForest.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">{selectedForest.location}</p>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">
              Topic:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 transition-colors">{selectedTopic.name}</p>
          </div>

          <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">
              Key Findings:
            </h4>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
                {findings}
              </p>
            </div>
          </div>

          <div className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">
              Innovation Idea 💡:
            </h4>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200">
              <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed transition-colors">
                {innovationIdea}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <Download className="w-4 h-4 group-hover:animate-bounce" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Leaderboard Teaser */}
      {userRank && (
        <div className="bg-gradient-to-r from-yellow-50 to-emerald-50 dark:from-yellow-900/20 dark:to-emerald-900/20 rounded-2xl p-6 shadow-lg border border-yellow-200 dark:border-yellow-700 mb-6 animate-bounce-in" style={{ animationDelay: '0.7s' }}>
          <div className="text-center">
            <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-3 animate-wiggle" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              🎉 You're ranked #{userRank} globally!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              See how you compare with other forest investigators worldwide
            </p>
            <button
              onClick={onViewLeaderboard}
              className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <Trophy className="w-4 h-4 group-hover:animate-bounce" />
              <span>View Global Leaderboard</span>
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '0.8s' }}>
        <button
          onClick={onRestart}
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
        >
          <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
          <span>Start New Investigation</span>
        </button>
        
        {!userRank && (
          <button
            onClick={onViewLeaderboard}
            className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
          >
            <Trophy className="w-5 h-5 group-hover:animate-bounce" />
            <span>View Leaderboard</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Results;