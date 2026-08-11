import React from 'react';
import { Flame, CheckCircle, TrendingUp, Clock, Users, ArrowUpRight } from 'lucide-react';
import { UserProgress } from '../types';

interface StatsStripProps {
  progress: UserProgress;
  onOpenProgress: () => void;
}

export const StatsStrip: React.FC<StatsStripProps> = ({ progress, onOpenProgress }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
      <div className="bg-white rounded-2xl border border-[#E2E4F0] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#E2E4F0]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#12142B]">
              Placement Season 2026 Cohort Activity
            </span>
          </div>
          <button
            onClick={onOpenProgress}
            className="text-xs font-semibold text-[#1E33BE] hover:text-[#14237F] flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View Detailed Analytics</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1 */}
          <div className="bg-[#F5F6FA] rounded-xl p-3.5 border border-[#E2E4F0]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#6B7280] font-medium">Sessions Completed</span>
              <CheckCircle className="w-4 h-4 text-[#1E33BE]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#12142B]">{progress.sessionsCompletedThisWeek}</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                this week
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-[#F5F6FA] rounded-xl p-3.5 border border-[#E2E4F0]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#6B7280] font-medium">Current Streak</span>
              <Flame className="w-4 h-4 text-[#FF6B4A]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#12142B]">{progress.currentStreakDays} Days</span>
              <span className="text-[11px] font-semibold text-[#FF6B4A] bg-orange-50 px-1.5 py-0.5 rounded">
                Active Streak
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-[#F5F6FA] rounded-xl p-3.5 border border-[#E2E4F0]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#6B7280] font-medium">Confidence Delta</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-600">{progress.avgConfidenceDelta}</span>
              <span className="text-[11px] text-[#6B7280]">
                pre vs post
              </span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-[#F5F6FA] rounded-xl p-3.5 border border-[#E2E4F0]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#6B7280] font-medium">Mentor Readiness</span>
              <Users className="w-4 h-4 text-[#1E33BE]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#1E33BE]">{progress.readinessScore}%</span>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                Slot-Ready
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
