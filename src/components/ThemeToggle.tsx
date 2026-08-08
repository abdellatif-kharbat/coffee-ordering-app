import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      id="theme-toggle-button"
      aria-label="Toggle theme"
      className={`relative inline-flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-white/10 text-[#D8B58A] hover:bg-white/20 border border-white/20 shadow-lg shadow-black/30'
          : 'bg-[#2C1810]/10 text-[#2C1810] hover:bg-[#2C1810]/20 border border-[#2C1810]/20 shadow-md'
      } backdrop-blur-md hover:scale-105 active:scale-95`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-[#C58B44] transition-transform duration-500 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-5 h-5 text-[#2C1810] transition-transform duration-500 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
