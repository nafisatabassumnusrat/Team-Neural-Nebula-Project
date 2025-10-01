import React, { useState } from 'react';
import { Forest, Topic, Step, QuizResult, UserProfile } from './types';
import { ThemeProvider } from './contexts/ThemeContext';
import { addToLeaderboard, getUserRank } from './data/leaderboard';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import Onboarding from './components/Onboarding';
import UserRegistration from './components/UserRegistration';
import ForestSelection from './components/ForestSelection';
import TopicSelection from './components/TopicSelection';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Leaderboard from './components/Leaderboard';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedForest, setSelectedForest] = useState<Forest | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [userRank, setUserRank] = useState<number | undefined>(undefined);

  const getBadge = (score: number, total: number): { badge: string; badgeEmoji: string } => {
    if (score === total) {
      return { badge: 'Innovation Leader', badgeEmoji: '🚀' };
    } else if (score >= Math.ceil(total * 0.6)) {
      return { badge: 'Climate Guardian', badgeEmoji: '🌍' };
    } else {
      return { badge: 'Forest Explorer', badgeEmoji: '🌱' };
    }
  };

  const handleQuizComplete = (score: number) => {
    const totalQuestions = 5;
    const { badge, badgeEmoji } = getBadge(score, totalQuestions);
    
    setQuizResult({
      score,
      totalQuestions,
      badge,
      badgeEmoji
    });
    
    // Show registration modal if user hasn't registered yet
    if (!userProfile) {
      setShowRegistration(true);
    } else {
      // Add to leaderboard and show results
      addToLeaderboard({
        name: userProfile.name,
        score,
        totalQuestions,
        badge,
        badgeEmoji,
        forest: selectedForest!.name,
        topic: selectedTopic!.name,
        completedAt: new Date(),
        percentage: Math.round((score / totalQuestions) * 100)
      });
      
      const rank = getUserRank(userProfile.name);
      setUserRank(rank > 0 ? rank : undefined);
      setCurrentStep('results');
    }
  };

  const handleUserRegistration = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowRegistration(false);
    
    // Add to leaderboard
    if (quizResult && selectedForest && selectedTopic) {
      addToLeaderboard({
        name: profile.name,
        score: quizResult.score,
        totalQuestions: quizResult.totalQuestions,
        badge: quizResult.badge,
        badgeEmoji: quizResult.badgeEmoji,
        forest: selectedForest.name,
        topic: selectedTopic.name,
        completedAt: new Date(),
        percentage: Math.round((quizResult.score / quizResult.totalQuestions) * 100)
      });
      
      const rank = getUserRank(profile.name);
      setUserRank(rank > 0 ? rank : undefined);
    }
    
    setCurrentStep('results');
  };

  const handleSkipRegistration = () => {
    setShowRegistration(false);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('onboarding');
    setSelectedForest(null);
    setSelectedTopic(null);
    setQuizResult(null);
    setUserRank(undefined);
  };

  const handleViewLeaderboard = () => {
    setCurrentStep('leaderboard');
  };

  const renderCurrentStep = () => {
    // Show registration modal overlay
    if (showRegistration) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <UserRegistration
                onRegister={handleUserRegistration}
                onSkip={handleSkipRegistration}
              />
            </div>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 'onboarding':
        return <Onboarding onNext={() => setCurrentStep('forest-selection')} />;
        
      case 'forest-selection':
        return (
          <ForestSelection
            selectedForest={selectedForest}
            onSelectForest={setSelectedForest}
            onNext={() => setCurrentStep('topic-selection')}
          />
        );
        
      case 'topic-selection':
        return selectedForest ? (
          <TopicSelection
            selectedForest={selectedForest}
            selectedTopic={selectedTopic}
            onSelectTopic={setSelectedTopic}
            onNext={() => setCurrentStep('quiz')}
          />
        ) : null;
        
      case 'quiz':
        return selectedForest && selectedTopic ? (
          <Quiz
            selectedForest={selectedForest}
            selectedTopic={selectedTopic}
            onComplete={handleQuizComplete}
          />
        ) : null;
        
      case 'results':
        return selectedForest && selectedTopic && quizResult ? (
          <Results
            selectedForest={selectedForest}
            selectedTopic={selectedTopic}
            result={quizResult}
            onRestart={handleRestart}
            onViewLeaderboard={handleViewLeaderboard}
            userRank={userRank}
          />
        ) : null;
        
      case 'leaderboard':
        return (
          <Leaderboard
            onBack={() => setCurrentStep('results')}
            currentUserName={userProfile?.name}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {currentStep !== 'onboarding' && currentStep !== 'leaderboard' && <StepIndicator currentStep={currentStep} />}
          {renderCurrentStep()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;