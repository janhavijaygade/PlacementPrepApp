import React from 'react';
import { Sparkles, ShieldCheck, Zap, ArrowRight, BookOpen } from 'lucide-react';

interface HeroProps {
  onOpenCaseStudy: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCaseStudy }) => {
  return (
    <section className="bg-gradient-to-b from-[#14237F] to-[#1E33BE] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 shadow-inner">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Value Prop Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-100 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B4A]" />
          <span>Double Diamond & CIRCLES Framework Aligned</span>
          <span className="w-1 h-1 rounded-full bg-blue-300"></span>
          <button 
            onClick={onOpenCaseStudy}
            className="text-[#FF6B4A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            Read Product Case Study &rarr;
          </button>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Warm up before your mentor slot
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Mentor slots are scarce and non-renewable. Mentro gives you unlimited, low-stakes AI practice across behavioral interviews, guesstimates, and case scenarios — so your mentor time is spent on advanced polish, not basics.
        </p>

        {/* Key Pillars Badge Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left text-xs text-blue-100">
          <div className="flex items-center gap-2.5 bg-white/10 rounded-lg p-2.5 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
            <span><strong>Safe Space to Fail:</strong> Catch basic errors privately before real slots</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 rounded-lg p-2.5 border border-white/10">
            <Zap className="w-4 h-4 text-[#FF6B4A] shrink-0" />
            <span><strong>Rubric Feedback:</strong> Scored on STAR & MECE frameworks</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 rounded-lg p-2.5 border border-white/10">
            <BookOpen className="w-4 h-4 text-blue-300 shrink-0" />
            <span><strong>Context Bank:</strong> Uses college-specific past mentor notes</span>
          </div>
        </div>

      </div>
    </section>
  );
};
