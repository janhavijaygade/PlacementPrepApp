import React from 'react';
import { Compass, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCaseStudy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCaseStudy }) => {
  return (
    <footer className="bg-[#14237F] text-white border-t border-blue-900/40 py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Left branding */}
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#FF6B4A]" />
          <span className="font-bold text-sm">Mentro</span>
          <span className="text-blue-300">• Built for B-School students</span>
        </div>

        {/* Center tagline */}
        <div className="text-blue-200 text-center">
          Prep smarter, perform better • Reallocating mentor time to advanced polish
        </div>

        {/* Right link */}
        <button
          onClick={onOpenCaseStudy}
          className="text-[#FF6B4A] hover:underline font-semibold cursor-pointer"
        >
          Product Case Study & Frameworks
        </button>

      </div>
    </footer>
  );
};
