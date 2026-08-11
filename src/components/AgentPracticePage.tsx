import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, RefreshCw, History, Upload, StopCircle, Award, 
  ArrowLeft, CheckCircle2, ChevronRight, MessageSquare, Sparkles, AlertCircle, FileText
} from 'lucide-react';
import { AgentType, ChatMessage, FeedbackSummary, SessionHistoryItem, UploadedMaterial } from '../types';
import { AGENT_CONFIGS, generateSimulatedAiResponse, generateFeedbackSummary } from '../data/mockAiEngine';

interface AgentPracticePageProps {
  agentType: AgentType;
  onBackToHome: () => void;
  onOpenBooking: () => void;
  uploadedMaterials: UploadedMaterial[];
  onOpenUploadModal: (agentType: AgentType) => void;
  sessionHistory: SessionHistoryItem[];
  onSaveSessionHistory: (item: SessionHistoryItem) => void;
  onViewFeedbackSummary: (feedback: FeedbackSummary) => void;
}

export const AgentPracticePage: React.FC<AgentPracticePageProps> = ({
  agentType,
  onBackToHome,
  onOpenBooking,
  uploadedMaterials,
  onOpenUploadModal,
  sessionHistory,
  onSaveSessionHistory,
  onViewFeedbackSummary
}) => {
  const config = AGENT_CONFIGS[agentType];

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'history' | 'materials'>('chat');
  const [currentSessionTitle, setCurrentSessionTitle] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Filter materials for current agent
  const agentMaterials = uploadedMaterials.filter(m => m.agentType === agentType);
  const agentHistory = sessionHistory.filter(h => h.agentType === agentType);

  // Initialize fresh chat on mount or agent switch
  useEffect(() => {
    startNewSession();
  }, [agentType]);

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const startNewSession = () => {
    const initialMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'agent',
      text: config.initialMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialMsg]);
    setCurrentSessionTitle(`${config.name} - ${new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })}`);
    setActiveTab('chat');
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      // Concatenate uploaded material text as context
      const materialsContext = agentMaterials.map(m => `${m.title}:\n${m.content}`).join('\n\n');

      // Call API endpoint
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentType,
          messages: [...messages, userMsg],
          uploadedMaterials: materialsContext,
          userResponse: text.trim()
        })
      });

      const data = await response.json();
      let aiText = '';

      if (data && data.text) {
        aiText = data.text;
      } else {
        // Use smart domain-specific B-school simulation generator
        aiText = generateSimulatedAiResponse(agentType, text, messages.length + 1, materialsContext);
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'agent',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      // Fallback response
      const fallbackText = generateSimulatedAiResponse(agentType, text, messages.length + 1, '');
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'agent',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = () => {
    if (messages.length < 2) {
      alert("Please participate in at least 1 Q&A exchange before ending session.");
      return;
    }

    const feedback = generateFeedbackSummary(agentType, messages.length, currentSessionTitle);
    
    // Save to history
    const historyItem: SessionHistoryItem = {
      id: feedback.sessionId,
      agentType,
      title: currentSessionTitle,
      date: 'Just now',
      messagesCount: messages.length,
      feedback,
      messages
    };

    onSaveSessionHistory(historyItem);
    onViewFeedbackSummary(feedback);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F5F6FA] flex flex-col lg:flex-row">
      
      {/* LEFT SIDEBAR / CONTROL PANEL */}
      <aside className="w-full lg:w-80 bg-white border-r border-[#E2E4F0] p-4 flex flex-col shrink-0">
        
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#1E33BE] mb-4 py-1 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Agent Selection</span>
        </button>

        {/* Current Agent Badge */}
        <div className="bg-[#14237F] text-white p-4 rounded-xl shadow-sm mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A] bg-orange-950/60 px-2 py-0.5 rounded border border-orange-500/30">
            {config.badge}
          </span>
          <h2 className="text-lg font-bold text-white mt-1">{config.name}</h2>
          <p className="text-xs text-blue-200 mt-0.5">{config.description}</p>
        </div>

        {/* Session Primary Actions */}
        <div className="space-y-2 mb-6">
          <button
            onClick={startNewSession}
            className="w-full py-2.5 px-3 rounded-xl bg-[#1E33BE] hover:bg-[#14237F] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Start New Session</span>
          </button>

          <button
            onClick={() => onOpenUploadModal(agentType)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#F5F6FA] hover:bg-blue-50 text-[#1E33BE] border border-[#E2E4F0] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Practice Material</span>
          </button>
        </div>

        {/* Sidebar Tabs */}
        <div className="flex border-b border-[#E2E4F0] mb-3">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'chat'
                ? 'border-[#1E33BE] text-[#1E33BE]'
                : 'border-transparent text-[#6B7280] hover:text-[#12142B]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Active Session</span>
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-[#1E33BE] text-[#1E33BE]'
                : 'border-transparent text-[#6B7280] hover:text-[#12142B]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History ({agentHistory.length})</span>
          </button>
        </div>

        {/* Active Materials Context Counter */}
        <div className="mb-4 bg-orange-50 border border-orange-200 p-2.5 rounded-lg text-xs">
          <div className="flex items-center justify-between text-[#FF6B4A] font-bold mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Active Context Bank
            </span>
            <span>{agentMaterials.length} materials</span>
          </div>
          <p className="text-[11px] text-[#6B7280]">
            {agentMaterials.length > 0 
              ? `Using ${agentMaterials[0].title} as prompt context.` 
              : 'Upload notes or past questions to customize AI prompts.'}
          </p>
        </div>

        {/* Sidebar Tab Content: History List */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
            {agentHistory.length === 0 ? (
              <div className="text-center py-6 text-[#6B7280]">
                No completed history for this agent yet.
              </div>
            ) : (
              agentHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => item.feedback && onViewFeedbackSummary(item.feedback)}
                  className="p-3 bg-[#F5F6FA] hover:bg-blue-50 border border-[#E2E4F0] rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between font-bold text-[#12142B] mb-1">
                    <span className="truncate max-w-[170px]">{item.title}</span>
                    <span className="text-[10px] bg-blue-100 text-[#1E33BE] px-1.5 py-0.5 rounded">
                      {item.feedback?.overallScore ? `${item.feedback.overallScore}/5` : 'Saved'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>{item.date}</span>
                    <span className="text-[#1E33BE] font-semibold group-hover:underline flex items-center gap-0.5">
                      Feedback &rarr;
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </aside>

      {/* MAIN CHAT PANEL */}
      <main className="flex-1 flex flex-col bg-[#F5F6FA] h-[calc(100vh-4rem)]">
        
        {/* Chat Header Bar */}
        <div className="bg-white px-6 py-3.5 border-b border-[#E2E4F0] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold text-[#12142B]">
                {config.name} Interactive Session
              </h3>
              <p className="text-xs text-[#6B7280]">
                Socratic feedback engine • B-School Mentor Rubric
              </p>
            </div>
          </div>

          {/* End Session Button with Coral highlight */}
          <button
            onClick={handleEndSession}
            className="bg-[#FF6B4A] hover:bg-[#e05939] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer transform active:scale-95"
            title="End session to generate your readiness rubric score"
          >
            <StopCircle className="w-4 h-4" />
            <span>End Session & View Score</span>
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {/* Message Label */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6B7280] mb-1 px-1">
                {msg.role === 'agent' ? (
                  <>
                    <span className="text-[#1E33BE]">{config.name} AI</span>
                    <span>• {msg.timestamp}</span>
                  </>
                ) : (
                  <>
                    <span>You</span>
                    <span>• {msg.timestamp}</span>
                  </>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-xs ${
                  msg.role === 'agent'
                    ? 'bg-white border-l-4 border-l-[#1E33BE] border-t border-r border-b border-[#E2E4F0] text-[#12142B]'
                    : 'bg-[#1E33BE] text-white rounded-br-none font-medium'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="text-[11px] font-bold text-[#1E33BE] mb-1 px-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>{config.name} AI is evaluating your response...</span>
              </div>
              <div className="bg-white border-l-4 border-l-[#1E33BE] border border-[#E2E4F0] rounded-2xl p-4 text-xs text-[#6B7280] flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#1E33BE] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#1E33BE] rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-[#1E33BE] rounded-full animate-bounce delay-200" />
                </div>
                <span>Applying STAR / MECE rubric check...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Prompt Chips */}
        <div className="px-4 sm:px-6 py-2 bg-white/70 border-t border-[#E2E4F0] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#6B7280] font-bold text-[11px] uppercase shrink-0">
            Quick Prompts:
          </span>
          {config.quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-[#F5F6FA] hover:bg-blue-50 border border-[#E2E4F0] hover:border-[#1E33BE] text-[#12142B] hover:text-[#1E33BE] transition-colors shrink-0 font-medium cursor-pointer"
            >
              "{prompt.slice(0, 35)}..."
            </button>
          ))}
        </div>

        {/* Bottom Text Input Bar */}
        <div className="p-4 bg-white border-t border-[#E2E4F0]">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Type your response or answer here for ${config.name}... (Press Enter to send)`}
              rows={2}
              className="flex-1 p-3 text-xs sm:text-sm bg-[#F5F6FA] border border-[#E2E4F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E33BE] resize-none"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              className={`p-3.5 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
                inputText.trim() && !isLoading
                  ? 'bg-[#1E33BE] hover:bg-[#14237F] text-white shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </main>

    </div>
  );
};
