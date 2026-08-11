import React, { useState } from 'react';
import { X, BookOpen, Layers, Users, BarChart, ShieldCheck, Heart, Zap, Award } from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'personas' | 'validation' | 'circles' | 'heart'>('problem');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl border border-[#E2E4F0] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="bg-[#14237F] text-white p-5 flex items-center justify-between border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/40 border border-blue-400/30">
              <BookOpen className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Mentro — B-School Product Case Study
              </h2>
              <p className="text-xs text-blue-200">
                Framework: Double Diamond (Discover &rarr; Define &rarr; Develop &rarr; Deliver) • CIRCLES • HEART
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="bg-[#F5F6FA] border-b border-[#E2E4F0] px-5 flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('problem')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'problem'
                ? 'border-[#1E33BE] text-[#1E33BE]'
                : 'border-transparent text-[#6B7280] hover:text-[#12142B]'
            }`}
          >
            1. Problem & Statement
          </button>
          <button
            onClick={() => setActiveTab('personas')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'personas'
                ? 'border-[#1E33BE] text-[#1E33BE]'
                : 'border-transparent text-[#6B7280] hover:text-[#12142B]'
            }`}
          >
            2. Persona Definitions
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'validation'
                ? 'border-[#1E33BE] text-[#1E33BE]'
                : 'border-transparent text-[#6B7280] hover:text-[#12142B]'
            }`}
          >
            3. Survey Data & AI Filter
          </button>
          <button
            onClick={() => setActiveTab('circles')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'circles'
                ? 'border-[#1E33BE] text-[#1E33BE]'
                : 'border-transparent text-[#6B7280] hover:text-[#12142B]'
            }`}
          >
            4. Proposal (CIRCLES)
          </button>
          <button
            onClick={() => setActiveTab('heart')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'heart'
                ? 'border-[#1E33BE] text-[#1E33BE]'
                : 'border-transparent text-[#6B7280] hover:text-[#12142B]'
            }`}
          >
            5. HEART Metrics & Risks
          </button>
        </div>

        {/* Modal Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#12142B] flex-1">
          
          {activeTab === 'problem' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <h3 className="text-base font-bold text-[#1E33BE] mb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5" /> Working Problem Statement
                </h3>
                <p className="italic text-[#12142B] leading-relaxed">
                  "Students get limited, high-value mentor time, but currently spend a meaningful share of it on low-value repetition and basic errors that could be caught and corrected independently — reducing the effective value of a scarce resource and leaving weaker-prepared students (without strong peer networks) further behind."
                </p>
              </div>

              <h4 className="font-bold text-[#12142B] text-base">Key Observed Patterns (Pre-Survey Signal)</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <li className="bg-[#F5F6FA] p-3 rounded-lg border border-[#E2E4F0]">
                  <strong>Unstructured Warm-Ups:</strong> First 10–15 minutes of mentor slots spent on basics (rambling answers, weak STAR framework).
                </li>
                <li className="bg-[#F5F6FA] p-3 rounded-lg border border-[#E2E4F0]">
                  <strong>Scarce Resource:</strong> Mentors can only give 3–5 slots/season, but demand spikes before recruiting deadlines.
                </li>
                <li className="bg-[#F5F6FA] p-3 rounded-lg border border-[#E2E4F0]">
                  <strong>Feedback Retention Deficit:</strong> Feedback given in sessions is forgotten or scattered in memory, causing repeated mistakes.
                </li>
                <li className="bg-[#F5F6FA] p-3 rounded-lg border border-[#E2E4F0]">
                  <strong>Equity Gap:</strong> Practice quality depends heavily on peer networks — leaving isolated students disadvantaged.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'personas' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#12142B] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#1E33BE]" /> Persona Mapping Matrix
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Persona A */}
                <div className="bg-[#F5F6FA] p-4 rounded-xl border-2 border-[#1E33BE] relative">
                  <span className="bg-[#FF6B4A] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded absolute top-3 right-3">
                    PRIMARY MVP
                  </span>
                  <h4 className="font-bold text-sm text-[#1E33BE] mb-1">First-Round Fahad</h4>
                  <p className="text-[#6B7280] mb-2 font-medium">1st-year MBA • No prior case exposure</p>
                  <p className="mb-2"><strong>Goal:</strong> Not embarrass himself in mentor slots; build baseline competence fast.</p>
                  <p className="mb-2"><strong>JTBD:</strong> "When I have a mentor slot booked, I want to arrive already past the basics, so I can get feedback that actually moves me forward."</p>
                  <p className="text-emerald-700 font-medium bg-emerald-50 p-1.5 rounded border border-emerald-200">
                    Why Fahad: Highest incremental value from AI due to equity gap.
                  </p>
                </div>

                {/* Persona B */}
                <div className="bg-[#F5F6FA] p-4 rounded-xl border border-[#E2E4F0]">
                  <h4 className="font-bold text-sm text-[#12142B] mb-1">Networked Nisha</h4>
                  <p className="text-[#6B7280] mb-2 font-medium">1st-year MBA • Strong peer network</p>
                  <p className="mb-2"><strong>Goal:</strong> Maximize mentor time on advanced polish, not basics.</p>
                  <p className="mb-2"><strong>JTBD:</strong> "When I prep, I want realistic pressure-testing, so my peer practice isn't just talking in circles."</p>
                  <p className="text-[#6B7280]">Already has peer group substitutes.</p>
                </div>

                {/* Persona C */}
                <div className="bg-[#F5F6FA] p-4 rounded-xl border border-[#E2E4F0]">
                  <h4 className="font-bold text-sm text-[#12142B] mb-1">Rohan, Senior/Alum</h4>
                  <p className="text-[#6B7280] mb-2 font-medium">2nd-year / Alum Mentor • 3–5 slots/season</p>
                  <p className="mb-2"><strong>Goal:</strong> Give useful feedback without repeating "prep 101" every session.</p>
                  <p className="mb-2"><strong>JTBD:</strong> "When I run a slot, I want to spend limited time on judgment calls, not basic corrections."</p>
                  <p className="text-[#6B7280]">Supply-side beneficiary.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#12142B] flex items-center gap-2">
                <BarChart className="w-5 h-5 text-[#1E33BE]" /> Quantitative & Qualitative Survey Validation
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <span className="text-2xl font-bold text-[#1E33BE]">72%</span>
                  <p className="text-[#12142B] mt-1">Feel "not confident" going into a mentor slot</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                  <span className="text-2xl font-bold text-[#FF6B4A]">68%</span>
                  <p className="text-[#12142B] mt-1">Walk into slots underprepared for question type</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                  <span className="text-2xl font-bold text-emerald-700">84%</span>
                  <p className="text-[#12142B] mt-1">Demanded unlimited low-stakes practice before slots</p>
                </div>
              </div>

              <h4 className="font-bold text-[#12142B] text-sm pt-2">AI Appropriateness Filter (Why AI, not PDF?)</h4>
              <div className="border border-[#E2E4F0] rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#F5F6FA] text-[#6B7280] uppercase font-bold border-b border-[#E2E4F0]">
                    <tr>
                      <th className="p-2.5">Criterion</th>
                      <th className="p-2.5">Interview</th>
                      <th className="p-2.5">Guesstimate</th>
                      <th className="p-2.5">Case Solving</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E4F0]">
                    <tr>
                      <td className="p-2.5 font-medium">Language/reasoning required</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ STAR rubric</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ Assumption probe</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ MECE evaluation</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">Judgment-based (no 1 right answer)</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ Qualitative</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ Multiple methods</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ Business trade-offs</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium">Safe space to fail privately</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ High safety</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ High safety</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ High safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'circles' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#12142B] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FF6B4A]" /> CIRCLES Framework Architecture
              </h3>

              <div className="bg-[#F5F6FA] p-4 rounded-xl border border-[#E2E4F0] space-y-3 text-xs">
                <p><strong>Comprehend Context:</strong> Mentor slots are scarce. Students need a structured pre-slot warm-up layer.</p>
                <p><strong>Identify User:</strong> Primary Focus = First-Round Fahad (No peer network, high anxiety).</p>
                <p><strong>Report Needs:</strong> Safe space to fail, STAR/MECE rubric feedback, college-specific past mentor notes.</p>
                <p><strong>Cut with Trade-offs:</strong> Text-only v1 (no voice/video overhead); standard Gemini 3.6 Flash + retrieval (no custom model fine-tuning required).</p>
                <p><strong>Estimate Solution:</strong> 3 distinct modules (Interview, Guesstimate, Case) sharing a unified feedback rubric engine.</p>
              </div>
            </div>
          )}

          {activeTab === 'heart' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#12142B] flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" /> HEART Metrics & Success Framework
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F5F6FA] rounded-lg border border-[#E2E4F0]">
                  <strong className="text-[#1E33BE]">Happiness:</strong> Post-session satisfaction rating & pre vs post confidence delta.
                </div>
                <div className="p-3 bg-[#F5F6FA] rounded-lg border border-[#E2E4F0]">
                  <strong className="text-[#1E33BE]">Engagement:</strong> Avg practice sessions per student per week during recruiting peak.
                </div>
                <div className="p-3 bg-[#F5F6FA] rounded-lg border border-[#E2E4F0]">
                  <strong className="text-[#1E33BE]">Adoption:</strong> % of cohort completing &ge;1 session before real mentor slot.
                </div>
                <div className="p-3 bg-[#F5F6FA] rounded-lg border border-[#E2E4F0]">
                  <strong className="text-[#1E33BE]">Retention:</strong> % of students returning for a 2nd practice module.
                </div>
              </div>

              <div className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <h4 className="font-bold text-xs uppercase text-[#FF6B4A]">North Star Metric</h4>
                <p className="text-sm font-bold text-[#12142B]">
                  "% of mentor slots preceded by at least one AI practice session"
                </p>
                <p className="text-xs text-[#6B7280] mt-1">
                  Directly measures resource-efficiency impact by guaranteeing students arrive prepared.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F5F6FA] p-4 border-t border-[#E2E4F0] flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">
            Mentro Case Study • Double Diamond Framework
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1E33BE] text-white font-semibold text-xs hover:bg-[#14237F] transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
