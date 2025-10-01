import React from 'react';
import { ChevronRight, Globe, Target, FileText, Award } from 'lucide-react';

interface OnboardingProps {
  onNext: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onNext }) => {
  const steps = [
    { icon: Globe, text: 'Pick a forest to investigate 🌳', number: '1️⃣' },
    { icon: Target, text: 'Choose a research focus 🔍', number: '2️⃣' },
    { icon: Target, text: 'Answer 5 quiz questions 🎯', number: '3️⃣' },
    { icon: FileText, text: 'Receive an investigation report 📑', number: '4️⃣' },
    { icon: Award, text: 'Get marks, badges, and leaderboard placement 🏆', number: '5️⃣' }
  ];

  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-bounce-in">
          👋 Hi! Welcome to the Innovation Hub 🌍
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 animate-slide-up">
          Here you can explore the world's great forests, investigate important topics, 
          test your knowledge, and innovate new ideas.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8 animate-scale-in hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-in-left">
          👉 How it works:
        </h2>
        
        <div className="space-y-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index} 
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 animate-slide-in-right hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-200">
                    <IconComponent className="w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-colors" />
                  </div>
                </div>
                <span className="text-lg font-medium text-gray-900 dark:text-white transition-colors">
                  {step.number} {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onNext}
        className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 animate-bounce-in group"
      >
        <span>Let's Start Investigating!</span>
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </div>
  );
};

export default Onboarding;