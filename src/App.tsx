import React, { useState } from 'react';
import { AgentType, FeedbackSummary, SessionHistoryItem, UploadedMaterial, UserProgress } from './types';
import { INITIAL_HISTORY, INITIAL_UPLOADED_MATERIALS } from './data/mockAiEngine';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AgentCards } from './components/AgentCards';
import { StatsStrip } from './components/StatsStrip';
import { AgentPracticePage } from './components/AgentPracticePage';
import { MyProgressView } from './components/MyProgressView';
import { CaseStudyModal } from './components/CaseStudyModal';
import { FeedbackSummaryModal } from './components/FeedbackSummaryModal';
import { MentorBookingModal } from './components/MentorBookingModal';
import { UploadMaterialModal } from './components/UploadMaterialModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'home' | 'agent' | 'progress'>('home');
  const [activeAgentType, setActiveAgentType] = useState<AgentType>('interview');

  // Modals
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadTargetAgent, setUploadTargetAgent] = useState<AgentType>('interview');
  const [activeFeedbackSummary, setActiveFeedbackSummary] = useState<FeedbackSummary | null>(null);

  // App Data
  const [uploadedMaterials, setUploadedMaterials] = useState<UploadedMaterial[]>(INITIAL_UPLOADED_MATERIALS);
  const [sessionHistory, setSessionHistory] = useState<SessionHistoryItem[]>(INITIAL_HISTORY);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    sessionsCompletedThisWeek: 4,
    currentStreakDays: 3,
    avgConfidenceDelta: '+38%',
    readinessScore: 85,
    totalPracticeMinutes: 52
  });

  // Handlers
  const handleSelectAgent = (type: AgentType) => {
    setActiveAgentType(type);
    setCurrentView('agent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string) => {
    if (view === 'home' || view === 'progress') {
      setCurrentView(view as 'home' | 'progress');
    }
  };

  const handleSaveSessionHistory = (item: SessionHistoryItem) => {
    setSessionHistory(prev => [item, ...prev]);
    setUserProgress(prev => ({
      ...prev,
      sessionsCompletedThisWeek: prev.sessionsCompletedThisWeek + 1,
      totalPracticeMinutes: prev.totalPracticeMinutes + 15
    }));
  };

  const handleMaterialUploaded = (newMaterial: UploadedMaterial) => {
    setUploadedMaterials(prev => [newMaterial, ...prev]);
  };

  const handleOpenUploadModal = (type: AgentType) => {
    setUploadTargetAgent(type);
    setIsUploadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#12142B] flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <Hero onOpenCaseStudy={() => setIsCaseStudyOpen(true)} />
            <AgentCards onSelectAgent={handleSelectAgent} />
            <StatsStrip 
              progress={userProgress} 
              onOpenProgress={() => setCurrentView('progress')} 
            />
          </div>
        )}

        {currentView === 'agent' && (
          <div className="animate-fade-in">
            <AgentPracticePage
              agentType={activeAgentType}
              onBackToHome={() => setCurrentView('home')}
              onOpenBooking={() => setIsBookingOpen(true)}
              uploadedMaterials={uploadedMaterials}
              onOpenUploadModal={handleOpenUploadModal}
              sessionHistory={sessionHistory}
              onSaveSessionHistory={handleSaveSessionHistory}
              onViewFeedbackSummary={(feedback) => setActiveFeedbackSummary(feedback)}
            />
          </div>
        )}

        {currentView === 'progress' && (
          <div className="animate-fade-in">
            <MyProgressView
              progress={userProgress}
              sessionHistory={sessionHistory}
              onSelectAgent={handleSelectAgent}
              onViewFeedbackSummary={(feedback) => setActiveFeedbackSummary(feedback)}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer (shown on home and progress views) */}
      {currentView !== 'agent' && (
        <Footer onOpenCaseStudy={() => setIsCaseStudyOpen(true)} />
      )}

      {/* MODALS */}
      {/* Product Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />

      {/* Feedback Summary Modal */}
      <FeedbackSummaryModal
        isOpen={!!activeFeedbackSummary}
        onClose={() => setActiveFeedbackSummary(null)}
        feedback={activeFeedbackSummary}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Mentor Booking Modal */}
      <MentorBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        recentFeedback={activeFeedbackSummary}
      />

      {/* Upload Practice Material Modal */}
      <UploadMaterialModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        agentType={uploadTargetAgent}
        onMaterialUploaded={handleMaterialUploaded}
      />

    </div>
  );
}
