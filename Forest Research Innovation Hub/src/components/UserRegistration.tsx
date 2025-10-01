import React, { useState } from 'react';
import { User, Mail, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';

interface UserRegistrationProps {
  onRegister: (profile: UserProfile) => void;
  onSkip: () => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister, onSkip }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister({
        name: name.trim(),
        email: email.trim() || undefined
      });
    }
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4 animate-bounce-in">👤</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 animate-slide-in-left">
          Join the Leaderboard!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 animate-slide-in-right">
          Enter your details to track your progress and compete with other forest investigators
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-scale-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.name 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                placeholder="Enter your name"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-slide-up">
                {errors.name}
              </p>
            )}
          </div>

          <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email (Optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-slide-up">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-3 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>Join Leaderboard</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button
              type="button"
              onClick={onSkip}
              className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-2 font-medium transition-colors duration-200 hover:scale-105"
            >
              Skip for now
            </button>
          </div>
        </form>

        <div className="mt-6 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your information is used only for leaderboard display and progress tracking
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;