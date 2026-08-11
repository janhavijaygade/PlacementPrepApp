import React from 'react';
import { UserCheck, Calculator, Briefcase, ArrowRight, CheckCircle2, Clock, Award } from 'lucide-react';
import { AgentType } from '../types';
import { AGENT_CONFIGS } from '../data/mockAiEngine';

interface AgentCardsProps {
  onSelectAgent: (agentType: AgentType) => void;
}

export const AgentCards: React.FC<AgentCardsProps> = ({ onSelectAgent }) => {
  const agentsList: { type: AgentType; icon: React.ReactNode; bullets: string[]; timeEstimate: string }[] = [
    {
      type: 'interview',
      icon: <UserCheck className="w-8 h-8 text-[#1E33BE]" />,
      timeEstimate: '10-15 min warm-up',
      bullets: [
        'STAR Framework alignment',
        'Scored on Situation vs Action depth',
        'Quantified metric check'
      ]
    },
    {
      type: 'guesstimate',
      icon: <Calculator className="w-8 h-8 text-[#1E33BE]" />,
      timeEstimate: '12-18 min warm-up',
      bullets: [
        'MECE market sizing equations',
        'Interactive pushback on assumptions',
        'Sanity check & math validation'
      ]
    },
    {
      type: 'case',
      icon: <Briefcase className="w-8 h-8 text-[#1E33BE]" />,
      timeEstimate: '15-20 min warm-up',
      bullets: [
        'Profitability, Market Entry & M&A cases',
        'Step-by-step hypothesis driving',
        'Pyramid Principle recommendation'
      ]
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#12142B] tracking-tight">
            Select Your AI Practice Agent
          </h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Choose a practice mode to start an interactive warm-up session before booking your mentor slot.
          </p>
        </div>
        <div className="mt-2 md:mt-0 text-xs font-semibold text-[#1E33BE] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 inline-flex items-center gap-1.5 self-start">
          <Award className="w-3.5 h-3.5 text-[#FF6B4A]" />
          <span>All modules generate mentor-ready feedback rubrics</span>
        </div>
      </div>

      {/* 3 Selectable Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agentsList.map(({ type, icon, timeEstimate, bullets }) => {
          const config = AGENT_CONFIGS[type];
          return (
            <div
              key={type}
              onClick={() => onSelectAgent(type)}
              className="bg-white rounded-2xl border border-[#E2E4F0] p-6 shadow-sm hover:shadow-xl hover:border-[#1E33BE] transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden transform hover:-translate-y-1"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1E33BE] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 group-hover:bg-[#1E33BE] group-hover:text-white transition-colors">
                    {React.cloneElement(icon as React.ReactElement, {
                      className: 'w-7 h-7 text-[#1E33BE] group-hover:text-white transition-colors'
                    })}
                  </div>
                  <span className="text-xs font-medium text-[#6B7280] bg-[#F5F6FA] px-2.5 py-1 rounded-md border border-[#E2E4F0] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#1E33BE]" />
                    {timeEstimate}
                  </span>
                </div>

                {/* Title & Badge */}
                <div className="mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B4A] bg-orange-50 px-2 py-0.5 rounded-md inline-block mb-1">
                    {config.badge}
                  </span>
                  <h3 className="text-xl font-bold text-[#12142B] group-hover:text-[#1E33BE] transition-colors">
                    {config.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                  {config.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2 mb-6">
                  {bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#12142B]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA Button */}
              <div className="pt-4 border-t border-[#E2E4F0] flex items-center justify-between text-sm font-semibold text-[#1E33BE] group-hover:text-[#14237F]">
                <span>Start Practice Session</span>
                <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-[#1E33BE] group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4 text-[#1E33BE] group-hover:text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
