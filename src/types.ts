export type AgentType = 'interview' | 'guesstimate' | 'case';

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export interface RubricScores {
  structure: number; // 1-5
  clarity: number;   // 1-5
  depth: number;     // 1-5
  assumptions?: number; // 1-5
  solutioning?: number; // 1-5
}

export interface FeedbackSummary {
  sessionId: string;
  agentType: AgentType;
  date: string;
  topicTitle: string;
  scores: RubricScores;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  readinessBadge: string;
  readinessPercent: number;
  keyTakeaway: string;
}

export interface SessionHistoryItem {
  id: string;
  agentType: AgentType;
  title: string;
  date: string;
  messagesCount: number;
  feedback?: FeedbackSummary;
  messages: ChatMessage[];
}

export interface UploadedMaterial {
  id: string;
  agentType: AgentType;
  title: string;
  content: string;
  uploadedAt: string;
  tags?: string[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  batch: string;
  avatar: string;
  nextAvailableSlot: string;
  rating: number;
  slotsGiven: number;
}

export interface UserProgress {
  sessionsCompletedThisWeek: number;
  currentStreakDays: number;
  avgConfidenceDelta: string;
  readinessScore: number;
  totalPracticeMinutes: number;
}
