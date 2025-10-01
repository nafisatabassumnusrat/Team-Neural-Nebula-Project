export interface Forest {
  id: string;
  name: string;
  location: string;
  emoji: string;
  description: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  badge: string;
  badgeEmoji: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  totalQuestions: number;
  badge: string;
  badgeEmoji: string;
  forest: string;
  topic: string;
  completedAt: Date;
  percentage: number;
}

export interface UserProfile {
  name: string;
  email?: string;
}

export interface Report {
  forest: Forest;
  topic: Topic;
  findings: string;
  innovationIdea: string;
}

export type Step = 'onboarding' | 'forest-selection' | 'topic-selection' | 'quiz' | 'results' | 'leaderboard';