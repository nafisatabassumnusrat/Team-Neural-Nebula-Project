import React, { useState, useEffect } from 'react';
import { Check, X, ChevronRight } from 'lucide-react';
import { Question, Forest, Topic } from '../types';
import { questions } from '../data/questions';

interface QuizProps {
  selectedForest: Forest;
  selectedTopic: Topic;
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ selectedForest, selectedTopic, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const quizQuestions = questions[selectedTopic.id] || [];
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  useEffect(() => {
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
  }, [quizQuestions.length]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="text-2xl mb-2 animate-bounce-in hover:animate-wiggle">{selectedForest.emoji}</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 animate-slide-in-left">
          {selectedTopic.name}
        </h2>
        <div className="flex justify-center space-x-2 mb-4">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index < currentQuestionIndex
                  ? 'bg-emerald-500 animate-bounce-in'
                  : index === currentQuestionIndex
                  ? 'bg-emerald-300 animate-pulse-slow'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 animate-slide-in-right">
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-6 animate-scale-in hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed animate-slide-up">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            let buttonStyle = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-600';
            
            if (showFeedback) {
              if (index === currentQuestion.correctAnswer) {
                buttonStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 animate-pulse-slow';
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                buttonStyle = 'border-red-500 bg-red-50 dark:bg-red-900/20 animate-wiggle';
              }
            } else if (selectedAnswer === index) {
              buttonStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 animate-pulse-slow';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 flex items-center justify-between hover:scale-105 active:scale-95 animate-slide-in-left ${buttonStyle}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-gray-900 dark:text-white font-medium transition-colors">
                  {String.fromCharCode(97 + index)}) {option}
                </span>
                {showFeedback && (
                  <div>
                    {index === currentQuestion.correctAnswer && (
                      <Check className="w-5 h-5 text-emerald-600 animate-bounce-in" />
                    )}
                    {index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                      <X className="w-5 h-5 text-red-600 animate-bounce-in" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {showFeedback && currentQuestion.explanation && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4 animate-slide-up">
            <p className="text-blue-800 dark:text-blue-200 text-sm transition-colors">
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}

        {showFeedback && (
          <div className="text-center animate-bounce-in">
            <button
              onClick={handleNext}
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        )}
      </div>

      <div className="text-center text-gray-600 dark:text-gray-400 animate-slide-up transition-colors">
        Current Score: {score}/{answeredQuestions.filter(Boolean).length}
      </div>
    </div>
  );
};

export default Quiz;