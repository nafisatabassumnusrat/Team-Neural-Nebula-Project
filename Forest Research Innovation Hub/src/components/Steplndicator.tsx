import React from 'react';
import { Check } from 'lucide-react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { id: 'onboarding', label: 'Welcome', number: 1 },
  { id: 'forest-selection', label: 'Forest', number: 2 },
  { id: 'topic-selection', label: 'Topic', number: 3 },
  { id: 'quiz', label: 'Quiz', number: 4 },
  { id: 'results', label: 'Results', number: 5 }
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="flex items-center justify-center space-x-4 mb-8 animate-slide-up">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        
        return (
          <div key={step.id} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 transform
              ${isCompleted ? 'bg-emerald-500 text-white' : 
                isCurrent ? 'bg-emerald-500 text-white' : 
                'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
              ${isCurrent ? 'scale-110 animate-pulse-slow' : 'hover:scale-105'}
            `}>
              {isCompleted ? <Check className="w-4 h-4 animate-bounce-in" /> : step.number}
            </div>
            <span className={`
              ml-2 text-sm font-medium transition-all duration-300
              ${isCurrent ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}
              ${isCurrent ? 'animate-pulse-slow' : ''}
            `}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`
                w-8 h-0.5 mx-4 transition-all duration-500
                ${index < currentStepIndex ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;