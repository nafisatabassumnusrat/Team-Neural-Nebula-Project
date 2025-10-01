import React from 'react';
import { Moon, Sun, Trees } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg hover:scale-110 transition-transform duration-200 animate-float">
            <Trees className="w-6 h-6 text-emerald-600 dark:text-emerald-400 transition-colors" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Innovation Hub</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Forest Investigation Platform 🌍</p>
          </div>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200 active:scale-95"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? 
            <Sun className="w-5 h-5 animate-bounce-in" /> : 
            <Moon className="w-5 h-5 animate-bounce-in" />
          }
        </button>
      </div>
    </header>
  );
};

export default Header;