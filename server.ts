import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini if key exists
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Chat AI endpoint (supports both real Gemini call and fallback/mock)
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { agentType, messages, uploadedMaterials, userResponse } = req.body;

    if (process.env.GEMINI_API_KEY && aiClient) {
      // Build prompt for Gemini based on agent type and uploaded materials
      const systemPrompts: Record<string, string> = {
        interview: `You are Mentro's AI Interview Coach for MBA/B-school students preparing for top-tier consulting, PM, and finance interviews.
You conduct rigorous behavioral & fit interviews using the STAR framework (Situation, Task, Action, Result).
Your goal:
1. Ask one targeted, realistic interview question at a time.
2. When the candidate answers, analyze their answer using a B-school mentor rubric (Structure 1-5, Clarity 1-5, Depth 1-5).
3. Provide constructive, direct B-school mentor feedback on what was strong and what needed tightening (e.g. "Action section lacked quantifiable metric", "Situation took 70% of answer time, trim to 20%").
4. Follow up with a probing question or next interview prompt.
Keep responses concise, realistic, and formatted with markdown bullet points and bold highlights.
${uploadedMaterials ? `Use these custom student notes/materials as context for questions:\n${uploadedMaterials}` : ''}`,

        guesstimate: `You are Mentro's AI Guesstimate Coach for B-school students preparing for consulting/product estimation rounds.
Your goal:
1. Present realistic market sizing or guesstimate problems (e.g., "Estimate the daily market size of EV charging stations in Mumbai", "Estimate the annual revenue of Starbucks at JFK Airport").
2. Ask the student to break down their approach (Target population, Segmentation, Usage frequency, Unit pricing, Sanity checks).
3. Interrogate their assumptions constructively (e.g., "Why did you assume 10% penetration for tier-1 cities?", "Did you account for peak vs off-peak usage?").
4. Provide structured, numeric feedback on MECE breakdown, logic, and assumption defense.
Keep responses concise, clear, and encouraging yet rigorous.
${uploadedMaterials ? `Use these custom student notes/materials as context for questions:\n${uploadedMaterials}` : ''}`,

        case: `You are Mentro's AI Case Solving Coach for B-school students targeting MBB, Big4, and Tier-1 PM roles.
Your goal:
1. Walk through realistic business cases (Profitability, Market Entry, M&A, Growth Strategy).
2. Guide the student step-by-step: Clarifying questions -> Framework -> Quantitative analysis/Guesstimate -> Creative brainstorm -> Recommendation.
3. Push back on vague frameworks (e.g., "Your framework has 3 overlapping buckets, how can we make it strictly MECE?").
4. Provide detailed mentor-level critique after each section.
Keep responses formatted with clean headings, clear feedback, and concise next steps.
${uploadedMaterials ? `Use these custom student notes/materials as context for questions:\n${uploadedMaterials}` : ''}`
      };

      const systemInstruction = systemPrompts[agentType] || systemPrompts['interview'];

      // Format conversation history
      const promptHistory = messages.map((m: any) => `${m.role === 'user' ? 'Candidate' : 'Mentor AI'}: ${m.text}`).join('\n\n');
      const fullPrompt = `${promptHistory}\n\nCandidate: ${userResponse}\n\nMentor AI:`;

      const response = await aiClient.models.generateContent({
        model: "gemini-3.6-flash",
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({ text: response.text || "I've analyzed your response. Let's dig deeper into the structure." });
    } else {
      // Fallback simulated AI logic handled directly or on client
      return res.json({ isFallback: true });
    }
  } catch (error: any) {
    console.error("API error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mentro server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
