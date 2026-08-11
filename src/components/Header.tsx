import React from 'react';
import { Compass, BarChart2, Calendar } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenCaseStudy: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenBooking
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#14237F] text-white shadow-md border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-compass-primary flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform border border-blue-400/30">
            <Compass className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-200 transition-colors">
                Mentro
              </span>
            </div>
            <p className="text-xs text-blue-200/80 font-normal hidden sm:block">
              Prep Engine for B-Schools
            </p>
          </div>
        </button>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              currentView === 'home'
                ? 'bg-white/15 text-white font-semibold'
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('progress')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentView === 'progress'
                ? 'bg-white/15 text-white font-semibold'
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            My Progress
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="bg-[#FF6B4A] hover:bg-[#e05939] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Book Mentor Slot</span>
            <span className="sm:hidden">Book Slot</span>
          </button>
        </div>

      </div>
    </header>
  );
};
