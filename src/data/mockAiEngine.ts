import { AgentType, ChatMessage, FeedbackSummary, Mentor, SessionHistoryItem, UploadedMaterial } from '../types';

export const AGENT_CONFIGS: Record<AgentType, {
  name: string;
  badge: string;
  description: string;
  iconName: string;
  initialMessage: string;
  quickPrompts: string[];
  rubricLabels: { [key: string]: string };
}> = {
  interview: {
    name: 'Interview Practice',
    badge: 'Behavioral & Fit',
    description: 'Practice behavioral & fit questions using the STAR framework with rubric scoring.',
    iconName: 'UserCheck',
    initialMessage: "Welcome to Interview Practice! I'm your AI Interview Mentor. Let's warm up for your upcoming mentor slot.\n\nHere is your first prompt:\n**\"Tell me about a time you had to lead a team through a high-stakes disagreement or ambiguous project. What was the situation and how did you resolve it?\"**\n\n*(Tip: Use the STAR framework — Situation, Task, Action, Result with quantified metrics!)*",
    quickPrompts: [
      "Tell me about a time you failed and what you learned.",
      "Why consulting / PM / investment banking?",
      "Describe a situation where you had to influence without authority.",
      "Tell me about a time you managed competing tight deadlines."
    ],
    rubricLabels: {
      structure: 'STAR Structure',
      clarity: 'Delivery & Conciseness',
      depth: 'Action & Impact Depth',
      assumptions: 'Self-Awareness',
      solutioning: 'Quantified Metrics'
    }
  },
  guesstimate: {
    name: 'Guesstimate Practice',
    badge: 'Structured Estimation',
    description: 'Sharpen structured estimation and defend market sizing assumptions in real-time.',
    iconName: 'Calculator',
    initialMessage: "Welcome to Guesstimate Practice! I'm your Guesstimate Coach. We'll simulate a mentor pushing back on your estimations.\n\nHere is your prompt:\n**\"Estimate the total annual market size (in USD) for EV charging stations in Tier-1 cities in India.\"**\n\n*(Tip: Start by outlining your high-level equation, target population/vehicle parameters, and key assumptions before doing math!)*",
    quickPrompts: [
      "Estimate the daily coffee cups consumed in Bangalore tech parks.",
      "Estimate annual revenue of a busy airport Starbucks location.",
      "Estimate the number of commercial flights taking off in Europe daily.",
      "Estimate the monthly smartphone replacement market in South East Asia."
    ],
    rubricLabels: {
      structure: 'MECE Breakdown',
      clarity: 'Mathematical Rigor',
      depth: 'Assumption Defense',
      assumptions: 'Sanity Checking',
      solutioning: 'Adaptability to Pushback'
    }
  },
  case: {
    name: 'Case Solving',
    badge: 'Interactive Business Scenarios',
    description: 'Work through real case scenarios (Profitability, Market Entry, M&A) step-by-step.',
    iconName: 'Briefcase',
    initialMessage: "Welcome to Case Solving! I'm your AI Case Companion. We'll work through a structured B-school case scenario.\n\n**Case Scenario:**\n*\"A leading national budget airline has seen its operating margins drop from 18% to 6% over the last 18 months despite steady passenger load factors. The CEO wants us to identify the root cause and recommend an action plan within 6 weeks.\"*\n\nWhere would you like to start? *(Tip: Begin with clarifying questions and state your high-level framework!)*",
    quickPrompts: [
      "I'd like to ask clarifying questions about business model & revenue drivers.",
      "Here is my framework: Revenue (Price x Volume) vs Cost (Fixed vs Variable).",
      "Let's explore market entry for an EV battery manufacturer in Vietnam.",
      "Let's analyze a tech acquisition (M&A) case for a fintech super-app."
    ],
    rubricLabels: {
      structure: 'Case Framework & MECE',
      clarity: 'Hypothesis Drive',
      depth: 'Quantitative Analysis',
      assumptions: 'Business Judgment',
      solutioning: 'Actionable Recommendation'
    }
  }
};

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Rohan Sharma',
    role: 'Senior Consultant',
    company: 'McKinsey & Company',
    batch: 'Class of 2023',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    nextAvailableSlot: 'Tomorrow, 6:00 PM',
    rating: 4.9,
    slotsGiven: 28
  },
  {
    id: 'm2',
    name: 'Priya Nair',
    role: 'Senior Product Manager',
    company: 'Google',
    batch: 'Class of 2022',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    nextAvailableSlot: 'Thursday, 8:30 PM',
    rating: 5.0,
    slotsGiven: 34
  },
  {
    id: 'm3',
    name: 'Anish Kapoor',
    role: 'Case Team Leader',
    company: 'Bain & Company',
    batch: 'Class of 2021',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    nextAvailableSlot: 'Friday, 5:00 PM',
    rating: 4.85,
    slotsGiven: 19
  }
];

export const INITIAL_UPLOADED_MATERIALS: UploadedMaterial[] = [
  {
    id: 'mat-1',
    agentType: 'interview',
    title: 'Consulting Fit Round - Past Mentor Notes (Placement 2025)',
    content: 'Mentors noted that 65% of students spend too much time on Situation context and lack 2 concrete metrics in Action/Result. Emphasize metrics like % revenue growth, team size, time saved.',
    uploadedAt: '2 days ago',
    tags: ['STAR Framework', 'Fit Round']
  },
  {
    id: 'mat-2',
    agentType: 'guesstimate',
    title: 'India EV & Infrastructure Guesstimate Bank',
    content: 'Key reference statistics: India population 1.4B, Urban 35%, Tier 1 population ~120M, Households ~30M, Household vehicle ownership 22%, EV penetration growing at 32% CAGR.',
    uploadedAt: '1 week ago',
    tags: ['Market Sizing', 'India Context']
  },
  {
    id: 'mat-3',
    agentType: 'case',
    title: 'Aviation & Transportation Profitability Frameworks',
    content: 'Airline cost buckets: Fuel (30-35%), Airport & Landing fees (15%), Aircraft leasing/capital (20%), Labor & Crew (20%), Maintenance & Tech (10%). Revenue drivers: Yield per RPK, Ancillary services (baggage, seats, meals).',
    uploadedAt: '3 days ago',
    tags: ['Profitability', 'Aviation Case']
  }
];

export const INITIAL_HISTORY: SessionHistoryItem[] = [
  {
    id: 'hist-1',
    agentType: 'interview',
    title: 'Conflict Resolution & Leadership Practice',
    date: 'Yesterday, 4:15 PM',
    messagesCount: 6,
    messages: [
      { id: 'm1', role: 'agent', text: 'Tell me about a time you led a team through a high-stakes disagreement.', timestamp: '4:15 PM' },
      { id: 'm2', role: 'user', text: 'In my last role, two engineers disagreed on microservices vs monolith architecture for a new client portal...', timestamp: '4:17 PM' }
    ],
    feedback: {
      sessionId: 'hist-1',
      agentType: 'interview',
      date: 'Yesterday, 4:15 PM',
      topicTitle: 'Conflict Resolution & Leadership Practice',
      scores: {
        structure: 4,
        clarity: 4,
        depth: 3,
        assumptions: 4,
        solutioning: 4
      },
      overallScore: 4.0,
      strengths: [
        'Clear STAR structure with concise Situation setup',
        'Strong interpersonal empathy in resolving conflict'
      ],
      improvements: [
        'Quantify the ultimate business outcome (e.g. % speed improvement, delivery timeline hit)',
        'Be explicit about YOUR specific leadership role versus group action'
      ],
      readinessBadge: '82% Ready for Mentor Slot',
      readinessPercent: 82,
      keyTakeaway: 'Great narrative baseline. Adding 2 hard metrics in the Result section will make this slot-ready.'
    }
  },
  {
    id: 'hist-2',
    agentType: 'guesstimate',
    title: 'EV Charging Station Market Sizing',
    date: '3 days ago',
    messagesCount: 8,
    messages: [
      { id: 'm1', role: 'agent', text: 'Estimate the total annual market size for EV charging stations in Tier-1 Indian cities.', timestamp: '10:00 AM' },
      { id: 'm2', role: 'user', text: 'I will break this down into 2 key segments: 4-wheelers (commercial + private) and 2-wheelers...', timestamp: '10:04 AM' }
    ],
    feedback: {
      sessionId: 'hist-2',
      agentType: 'guesstimate',
      date: '3 days ago',
      topicTitle: 'EV Charging Station Market Sizing',
      scores: {
        structure: 5,
        clarity: 4,
        depth: 4,
        assumptions: 3,
        solutioning: 4
      },
      overallScore: 4.2,
      strengths: [
        'Clean MECE breakdown dividing 2W, 4W private, and fleet taxis',
        'Transparent mathematical steps and logical units'
      ],
      improvements: [
        'Sanity check fast-charger vs slow-charger pricing differences',
        'Account for electricity grid utilization constraint in tier-1 hubs'
      ],
      readinessBadge: '88% Ready for Mentor Slot',
      readinessPercent: 88,
      keyTakeaway: 'Strong structure! Mentors will appreciate your logical breakdown. Prepare to defend electricity tariff assumptions.'
    }
  }
];

// Helper to generate simulated intelligent mentor AI responses
export function generateSimulatedAiResponse(
  agentType: AgentType,
  userMessage: string,
  historyCount: number,
  uploadedMaterialsText: string
): string {
  const lowerMsg = userMessage.toLowerCase();

  if (agentType === 'interview') {
    if (historyCount <= 2) {
      return `**Mentor Feedback on your response:**\n\n• **STAR Structure:** You established the Situation clearly! However, your **Situation setup took about 60% of your answer**. A senior mentor will want you to condense Situation to 20% and expand on **YOUR specific Actions**.\n• **Action Depth:** What specific framework or decision matrix did YOU use to align the team?\n• **Metrics Check:** Did you measure the final impact?\n\n**Follow-up Probing Question:**\n"Can you reframe the **Action** part in 3 crisp bullet points, highlighting one conflict management technique you used and one quantifiable metric achieved?"`;
    } else {
      return `**Excellent tightening!** That was much more crisp.\n\n• **Strengths:** Clear personal ownership ("I set up a 1-on-1 alignment session...") and great metric callout.\n• **Mentor Tip:** In your real slot with Rohan/Priya, open with a 1-sentence hook before diving into STAR: *"I led a 5-person cross-functional team that delivered our portal 2 weeks ahead of deadline despite an initial technical deadlock."*\n\nWould you like to practice another behavioral prompt (e.g. Failure/Learning or Influencing without authority) or **End Session** to review your final rubric score?`;
    }
  } else if (agentType === 'guesstimate') {
    if (lowerMsg.includes('framework') || lowerMsg.includes('equation') || lowerMsg.includes('break') || lowerMsg.includes('segment')) {
      return `**Strong initial breakdown!** Your equation separates Demand (Vehicles x Daily km / Range) and Supply (Stations x Chargers x Utilization rate).\n\n**Mentor Pushback on Assumptions:**\n1. You assumed **20% daily charging rate** for private EVs. Given home-charging availability, isn't public charging demand lower for private 4Ws?\n2. How are you accounting for peak commercial fleet charging hours (e.g., cab aggregators charging between 2 PM - 4 PM)?\n\nHow would you adjust your assumptions to refine the estimation?`;
    } else {
      return `**Good adaptation to pushback!** By separating fleet fast-charging (80% public dependency) from private slow-charging (20% public dependency), your model became much more robust.\n\n**Sanity Check:** Your final number lands at ~$120M annual market size for Tier-1 India. That equates to ~15,000 charging stations at $8,000 annual revenue each — very reasonable for current market growth.\n\nReady to **End Session** to generate your readiness summary, or try another assumption test?`;
    }
  } else {
    // Case
    if (lowerMsg.includes('clarify') || lowerMsg.includes('question') || lowerMsg.includes('revenue') || lowerMsg.includes('cost')) {
      return `**Good clarifying questions!** Here is the case data gathered from our senior mentor notes:\n\n• **Revenue side:** Passenger load factor is steady at 82%. Average fare per ticket increased by 3% (in line with inflation). However, **ancillary revenue per passenger (baggage, priority seating, meals) fell by 24%**.\n• **Cost side:** Fuel expense grew 18% due to crude prices, but jet fuel hedging was not utilized. Crew costs increased by 12% due to overtime pay during fleet delays.\n\n**Next step:** How would you structure your framework to investigate why ancillary revenue dropped while fuel hedging was missed?`;
    } else {
      return `**Solid MECE framework!** You've isolated the problem into:\n1. **Ancillary Revenue Leakage** (Booking app UX changes + revised baggage policy penalty)\n2. **Operating Cost Inflation** (Fuel unhedged exposure + crew scheduling inefficiencies)\n\n**Mentor Challenge:** The CEO has only 2 minutes. Deliver a top-down recommendation using the Pyramid Principle: **Headline Recommendation -> 2 Supporting Pillars -> Next Steps & Risks.**`;
    }
  }
}

// Generate rubric summary upon session completion
export function generateFeedbackSummary(
  agentType: AgentType,
  messageCount: number,
  topicTitle: string
): FeedbackSummary {
  const baseScores = {
    interview: { structure: 4, clarity: 4, depth: 4, assumptions: 4, solutioning: 4 },
    guesstimate: { structure: 5, clarity: 4, depth: 4, assumptions: 4, solutioning: 4 },
    case: { structure: 4, clarity: 5, depth: 4, assumptions: 4, solutioning: 4 }
  }[agentType];

  const scoreValues = Object.values(baseScores);
  const avg = Number((scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length).toFixed(1));
  const readiness = Math.min(95, Math.max(70, Math.round(avg * 18 + 5)));

  return {
    sessionId: `session-${Date.now()}`,
    agentType,
    date: 'Just now',
    topicTitle: topicTitle || `${AGENT_CONFIGS[agentType].name} Session`,
    scores: baseScores,
    overallScore: avg,
    strengths: [
      agentType === 'interview' ? 'Strong adherence to STAR framework structure' : agentType === 'guesstimate' ? 'Clear MECE breakdown with logical equation' : 'Top-down MECE framework covering revenue & cost drivers',
      'Good responsiveness to AI mentor pushback & probing'
    ],
    improvements: [
      agentType === 'interview' ? 'Quantify final business impact in Result (add 1-2 metrics)' : agentType === 'guesstimate' ? 'State sanity checks explicitly before giving final number' : 'Synthesize final recommendation using Pyramid Principle',
      'Reduce context setting time by 20% to maximize mentor discussion time'
    ],
    readinessBadge: `${readiness}% Ready for Mentor Slot`,
    readinessPercent: readiness,
    keyTakeaway: `You are in a great position! By eliminating basic structure errors now, your upcoming mentor session will focus entirely on advanced polish.`
  };
}
