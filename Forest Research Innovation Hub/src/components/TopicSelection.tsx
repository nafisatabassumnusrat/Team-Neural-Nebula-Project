import React from 'react';
import { ChevronRight, Clock, Leaf, BarChart3, Thermometer, Heart } from 'lucide-react';
import { Topic, Forest } from '../types';
import { topics } from '../data/topics';

interface TopicSelectionProps {
  selectedForest: Forest;
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
  onNext: () => void;
}

const topicIcons = {
  'changes-over-time': Clock,
  'high-carbon-areas': Leaf,
  'forest-density': BarChart3,
  'climate-monitoring': Thermometer,
  'biodiversity-health': Heart
};

const TopicSelection: React.FC<TopicSelectionProps> = ({
  selectedForest,
  selectedTopic,
  onSelectTopic,
  onNext
}) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="text-3xl mb-2 animate-bounce-in hover:animate-wiggle">{selectedForest.emoji}</div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-slide-in-left">
          Great choice! 🌱
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 animate-slide-in-right">
          Now select your research topic for investigating the <strong>{selectedForest.name}</strong>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        {topics.map((topic, index) => {
          const IconComponent = topicIcons[topic.id as keyof typeof topicIcons];
          
          return (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className={`
                p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 animate-scale-in
                ${selectedTopic?.id === topic.id
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg animate-pulse-slow'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:-translate-y-1'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center hover:rotate-12 transition-transform duration-200">
                    <IconComponent className="w-6 h-6 text-emerald-600 dark:text-emerald-400 transition-colors" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors">
                    {topic.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedTopic && (
        <div className="text-center animate-bounce-in">
          <button
            onClick={onNext}
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
          >
            <span>Start Quiz: {selectedTopic.name}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicSelection;