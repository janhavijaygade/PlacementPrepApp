import React from 'react';
import { Award, BarChart2, Calendar, CheckCircle2, Flame, History, ArrowRight, UserCheck, Calculator, Briefcase } from 'lucide-react';
import { AgentType, FeedbackSummary, SessionHistoryItem, UserProgress } from '../types';
import { AGENT_CONFIGS } from '../data/mockAiEngine';

interface MyProgressViewProps {
  progress: UserProgress;
  sessionHistory: SessionHistoryItem[];
  onSelectAgent: (agentType: AgentType) => void;
  onViewFeedbackSummary: (feedback: FeedbackSummary) => void;
  onOpenBooking: () => void;
}

export const MyProgressView: React.FC<MyProgressViewProps> = ({
  progress,
  sessionHistory,
  onSelectAgent,
  onViewFeedbackSummary,
  onOpenBooking
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#12142B] tracking-tight">
            My Prep Progress & Readiness Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Track your warm-up sessions across behavioral interviews, guesstimates, and case scenarios.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="bg-[#FF6B4A] hover:bg-[#e05939] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Senior Mentor Slot</span>
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-[#E2E4F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-[#6B7280]">Overall Readiness</span>
            <Award className="w-5 h-5 text-[#FF6B4A]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1E33BE]">
            {progress.readinessScore}%
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            +18% since initial warm-up
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E4F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-[#6B7280]">Sessions Completed</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-[#12142B]">
            {progress.sessionsCompletedThisWeek}
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            4 sessions this week
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E4F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-[#6B7280]">Active Streak</span>
            <Flame className="w-5 h-5 text-[#FF6B4A]" />
          </div>
          <div className="text-3xl font-extrabold text-[#12142B]">
            {progress.currentStreakDays} Days
          </div>
          <p className="text-xs text-[#FF6B4A] font-semibold mt-1">
            Consistency boost active
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E4F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-[#6B7280]">Confidence Delta</span>
            <BarChart2 className="w-5 h-5 text-[#1E33BE]" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">
            {progress.avgConfidenceDelta}
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Pre vs post practice score
          </p>
        </div>

      </div>

      {/* Readiness Breakdown per Agent Mode */}
      <div className="bg-white rounded-2xl border border-[#E2E4F0] p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#12142B] mb-4">
          Readiness Breakdown by Practice Mode
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Interview */}
          <div className="bg-[#F5F6FA] p-4 rounded-xl border border-[#E2E4F0] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-[#12142B]">
                <UserCheck className="w-4 h-4 text-[#1E33BE]" />
                <span>Interview Practice</span>
              </div>
              <span className="text-xs font-bold text-[#1E33BE] bg-blue-50 px-2 py-0.5 rounded">
                82% Ready
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              STAR structure verified. Add 2 concrete metrics in Action section.
            </p>
            <button
              onClick={() => onSelectAgent('interview')}
              className="w-full py-2 rounded-lg bg-white border border-[#E2E4F0] text-xs font-bold text-[#1E33BE] hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Practice Interview Mode &rarr;
            </button>
          </div>

          {/* Guesstimate */}
          <div className="bg-[#F5F6FA] p-4 rounded-xl border border-[#E2E4F0] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-[#12142B]">
                <Calculator className="w-4 h-4 text-[#1E33BE]" />
                <span>Guesstimate Practice</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                88% Ready
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Clean MECE market sizing equation. Strong assumption defense.
            </p>
            <button
              onClick={() => onSelectAgent('guesstimate')}
              className="w-full py-2 rounded-lg bg-white border border-[#E2E4F0] text-xs font-bold text-[#1E33BE] hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Practice Guesstimate Mode &rarr;
            </button>
          </div>

          {/* Case Solving */}
          <div className="bg-[#F5F6FA] p-4 rounded-xl border border-[#E2E4F0] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-[#12142B]">
                <Briefcase className="w-4 h-4 text-[#1E33BE]" />
                <span>Case Solving</span>
              </div>
              <span className="text-xs font-bold text-[#FF6B4A] bg-orange-50 px-2 py-0.5 rounded">
                85% Ready
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Profitability framework solid. Work on Pyramid Principle synthesis.
            </p>
            <button
              onClick={() => onSelectAgent('case')}
              className="w-full py-2 rounded-lg bg-white border border-[#E2E4F0] text-xs font-bold text-[#1E33BE] hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Practice Case Mode &rarr;
            </button>
          </div>

        </div>
      </div>

      {/* Session History Log */}
      <div className="bg-white rounded-2xl border border-[#E2E4F0] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#12142B] flex items-center gap-2">
            <History className="w-5 h-5 text-[#1E33BE]" />
            Session History Log
          </h2>
          <span className="text-xs text-[#6B7280]">
            Click any session to view rubric feedback again
          </span>
        </div>

        <div className="divide-y divide-[#E2E4F0] border border-[#E2E4F0] rounded-xl overflow-hidden text-xs">
          {sessionHistory.length === 0 ? (
            <div className="p-6 text-center text-[#6B7280]">
              No practice sessions completed yet. Select an agent to start your first warm-up!
            </div>
          ) : (
            sessionHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => item.feedback && onViewFeedbackSummary(item.feedback)}
                className="p-4 bg-white hover:bg-blue-50/60 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#12142B]">{item.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-[#1E33BE] px-2 py-0.5 rounded">
                      {AGENT_CONFIGS[item.agentType]?.name || item.agentType}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Completed {item.date} • {item.messagesCount} Q&A exchanges
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {item.feedback && (
                    <div className="text-right">
                      <span className="font-extrabold text-[#1E33BE] text-sm block">
                        {item.feedback.overallScore} / 5.0
                      </span>
                      <span className="text-[11px] text-emerald-600 font-semibold">
                        {item.feedback.readinessBadge}
                      </span>
                    </div>
                  )}
                  <ArrowRight className="w-4 h-4 text-[#1E33BE]" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
