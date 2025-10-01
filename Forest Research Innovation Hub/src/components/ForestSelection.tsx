import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Forest } from '../types';
import { forests } from '../data/forests';

interface ForestSelectionProps {
  selectedForest: Forest | null;
  onSelectForest: (forest: Forest) => void;
  onNext: () => void;
}

const ForestSelection: React.FC<ForestSelectionProps> = ({ 
  selectedForest, 
  onSelectForest, 
  onNext 
}) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-bounce-in">
          Choose Your Forest to Investigate
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 animate-slide-up">
          Select one of these magnificent forest ecosystems to begin your research journey
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {forests.map((forest, index) => (
          <div
            key={forest.id}
            onClick={() => onSelectForest(forest)}
            className={`
              p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 animate-scale-in
              ${selectedForest?.id === forest.id
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg animate-pulse-slow'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:-translate-y-1'
              }
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-center">
              <div className="text-4xl mb-3 hover:animate-wiggle transition-all duration-200">{forest.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                {forest.name}
              </h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-3 transition-colors">
                {forest.location}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors">
                {forest.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedForest && (
        <div className="text-center animate-bounce-in">
          <button
            onClick={onNext}
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
          >
            <span>Continue with {selectedForest.name}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ForestSelection;