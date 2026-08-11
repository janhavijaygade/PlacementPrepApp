import React from 'react';
import { X, Award, CheckCircle2, AlertCircle, Calendar, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { FeedbackSummary } from '../types';
import { AGENT_CONFIGS } from '../data/mockAiEngine';

interface FeedbackSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: FeedbackSummary | null;
  onOpenBooking: () => void;
  onRestartSession?: () => void;
}

export const FeedbackSummaryModal: React.FC<FeedbackSummaryModalProps> = ({
  isOpen,
  onClose,
  feedback,
  onOpenBooking,
  onRestartSession
}) => {
  if (!isOpen || !feedback) return null;

  const config = AGENT_CONFIGS[feedback.agentType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl border border-[#E2E4F0] max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Top Header */}
        <div className="bg-[#14237F] text-white p-5 flex items-center justify-between border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF6B4A] text-white shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold bg-white/20 px-2 py-0.5 rounded text-blue-100">
                  {config.name}
                </span>
                <span className="text-xs text-blue-200">• {feedback.date}</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">
                Session Feedback & Readiness Report
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Readiness Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-[#FF6B4A] text-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-100 mb-1">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                Readiness Score Signal
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">
                {feedback.readinessBadge}
              </h3>
              <p className="text-xs text-orange-100/90 mt-1 max-w-sm">
                Basics cleared! Your response demonstrates solid structure and framework alignment.
              </p>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center shrink-0">
              <span className="text-xs text-orange-100 block">Overall Score</span>
              <span className="text-2xl font-black">{feedback.overallScore} <span className="text-sm font-normal opacity-80">/ 5.0</span></span>
            </div>
          </div>

          {/* Rubric Breakdown Grid (1-5 Bars) */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#6B7280] mb-3">
              Mentor Rubric Breakdown
            </h4>
            <div className="space-y-3 bg-[#F5F6FA] p-4 rounded-xl border border-[#E2E4F0]">
              {Object.entries(feedback.scores).map(([key, score]) => {
                if (score === undefined) return null;
                const label = config.rubricLabels[key] || key.toUpperCase();
                const percentage = (score / 5) * 100;

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#12142B]">{label}</span>
                      <span className="text-[#1E33BE] font-bold">{score} / 5</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1E33BE] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Written Summary & Key Takeaway */}
          <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E33BE] mb-1">
              Key Takeaway & Key Fixes
            </h4>
            <p className="text-xs sm:text-sm text-[#12142B] leading-relaxed font-medium">
              "{feedback.keyTakeaway}"
            </p>
          </div>

          {/* Strengths & Improvements Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Strengths */}
            <div className="bg-emerald-50/60 border border-emerald-200 p-3.5 rounded-xl">
              <h5 className="font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Strengths
              </h5>
              <ul className="space-y-1.5 text-emerald-950">
                {feedback.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl">
              <h5 className="font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-600" /> Focus Areas
              </h5>
              <ul className="space-y-1.5 text-amber-950">
                {feedback.improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Bar with Coral CTA */}
        <div className="bg-[#F5F6FA] p-4 border-t border-[#E2E4F0] flex flex-col sm:flex-row items-center justify-between gap-3">
          {onRestartSession ? (
            <button
              onClick={onRestartSession}
              className="text-xs font-semibold text-[#1E33BE] hover:text-[#14237F] flex items-center gap-1.5 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Practice Again
            </button>
          ) : (
            <span className="text-xs text-[#6B7280]">
              Ready to take this to a senior mentor?
            </span>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#E2E4F0] text-[#12142B] font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer w-1/2 sm:w-auto"
            >
              Close
            </button>

            {/* Prominent Coral CTA Button as specified */}
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#e05939] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 w-1/2 sm:w-auto transform active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Mentor Slot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
