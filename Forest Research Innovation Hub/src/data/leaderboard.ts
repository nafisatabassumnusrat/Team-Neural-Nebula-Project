import { LeaderboardEntry } from '../types';

// Mock leaderboard data - in a real app, this would come from a database
export const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Alex Chen',
    score: 5,
    totalQuestions: 5,
    badge: 'Innovation Leader',
    badgeEmoji: '🚀',
    forest: 'Amazon Rainforest',
    topic: 'Climate Change Monitoring',
    completedAt: new Date('2024-01-15'),
    percentage: 100
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    score: 5,
    totalQuestions: 5,
    badge: 'Innovation Leader',
    badgeEmoji: '🚀',
    forest: 'Congo Rainforest',
    topic: 'Biodiversity & Ecosystem Health',
    completedAt: new Date('2024-01-14'),
    percentage: 100
  },
  {
    id: '3',
    name: 'David Kim',
    score: 4,
    totalQuestions: 5,
    badge: 'Climate Guardian',
    badgeEmoji: '🌍',
    forest: 'Sundarbans',
    topic: 'Detecting Changes Over Time',
    completedAt: new Date('2024-01-13'),
    percentage: 80
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    score: 4,
    totalQuestions: 5,
    badge: 'Climate Guardian',
    badgeEmoji: '🌍',
    forest: 'Taiga',
    topic: 'Identify High-Carbon Areas',
    completedAt: new Date('2024-01-12'),
    percentage: 80
  },
  {
    id: '5',
    name: 'Ahmed Hassan',
    score: 4,
    totalQuestions: 5,
    badge: 'Climate Guardian',
    badgeEmoji: '🌍',
    forest: 'Daintree Rainforest',
    topic: 'Detecting Forest Density',
    completedAt: new Date('2024-01-11'),
    percentage: 80
  },
  {
    id: '6',
    name: 'Emma Wilson',
    score: 3,
    totalQuestions: 5,
    badge: 'Climate Guardian',
    badgeEmoji: '🌍',
    forest: 'Amazon Rainforest',
    topic: 'Biodiversity & Ecosystem Health',
    completedAt: new Date('2024-01-10'),
    percentage: 60
  },
  {
    id: '7',
    name: 'Raj Patel',
    score: 3,
    totalQuestions: 5,
    badge: 'Climate Guardian',
    badgeEmoji: '🌍',
    forest: 'Congo Rainforest',
    topic: 'Climate Change Monitoring',
    completedAt: new Date('2024-01-09'),
    percentage: 60
  },
  {
    id: '8',
    name: 'Lisa Zhang',
    score: 3,
    totalQuestions: 5,
    badge: 'Climate Guardian',
    badgeEmoji: '🌍',
    forest: 'Sundarbans',
    topic: 'Identify High-Carbon Areas',
    completedAt: new Date('2024-01-08'),
    percentage: 60
  },
  {
    id: '9',
    name: 'Carlos Silva',
    score: 2,
    totalQuestions: 5,
    badge: 'Forest Explorer',
    badgeEmoji: '🌱',
    forest: 'Taiga',
    topic: 'Detecting Forest Density',
    completedAt: new Date('2024-01-07'),
    percentage: 40
  },
  {
    id: '10',
    name: 'Anna Kowalski',
    score: 2,
    totalQuestions: 5,
    badge: 'Forest Explorer',
    badgeEmoji: '🌱',
    forest: 'Daintree Rainforest',
    topic: 'Detecting Changes Over Time',
    completedAt: new Date('2024-01-06'),
    percentage: 40
  }
];

export const getLeaderboard = (): LeaderboardEntry[] => {
  // Sort by score (descending), then by completion date (most recent first)
  return mockLeaderboardData.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return b.completedAt.getTime() - a.completedAt.getTime();
  });
};

export const addToLeaderboard = (entry: Omit<LeaderboardEntry, 'id'>): void => {
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: Date.now().toString(),
  };
  
  mockLeaderboardData.push(newEntry);
  
  // Keep only top 50 entries
  mockLeaderboardData.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return b.completedAt.getTime() - a.completedAt.getTime();
  });
  
  if (mockLeaderboardData.length > 50) {
    mockLeaderboardData.splice(50);
  }
};

export const getUserRank = (userName: string): number => {
  const leaderboard = getLeaderboard();
  const userIndex = leaderboard.findIndex(entry => entry.name === userName);
  return userIndex === -1 ? -1 : userIndex + 1;
};