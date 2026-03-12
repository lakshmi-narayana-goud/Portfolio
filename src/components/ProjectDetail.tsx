import { useEffect } from "react";
import "./styles/ProjectDetail.css";
import { MdArrowBack, MdArrowOutward } from "react-icons/md";
import { FiGithub } from "react-icons/fi";

export interface ProjectDetailData {
  title: string;
  tagline: string;
  badge: string;
  accent: string;
  github: string;
  live: string | null;
  overview: string;
  why: string;
  architecture: { label: string; desc: string }[];
  features: { icon: string; title: string; desc: string; learned: string }[];
  techStack: { name: string; reason: string }[];
  challenges: { problem: string; solution: string }[];
  scale: { label: string; value: string }[];
  outcome: string;
  interviewNote: string;
}

const PROJECTS: Record<string, ProjectDetailData> = {
  jarvis: {
    title: "JARVIS",
    tagline: "A personal AI assistant I built to solve a real problem — my family needed a single, simple interface for reminders, notes, and music. I expanded it into a full-stack system with real-time AI.",
    badge: "PRODUCTION · CLOUD DEPLOYED",
    accent: "#06b6d4",
    github: "https://github.com/lakshmi-narayana-goud",
    live: "https://cloud-jarvis-p6zu.onrender.com/",
    overview: "JARVIS is a full-stack AI assistant I built and deployed on the cloud. It uses a FastAPI backend, WebSocket-based real-time communication, and the Groq LLaMA 3.1 API for AI responses. The frontend is plain JavaScript with the Web Speech API for voice input and output. It supports English, Hindi, and Telugu through automatic language detection.",
    why: "I wanted to understand how real AI products work end-to-end — not just call an API, but handle authentication, memory, real-time streaming, multi-user access, and deployment. Building JARVIS taught me how to think about system design, not just individual features.",
    architecture: [
      { label: "Client (Browser)", desc: "Vanilla JS frontend with Web Speech API for voice I/O. Connects to backend via WebSocket for real-time streaming responses." },
      { label: "FastAPI Server", desc: "Python backend handling all API routes, WebSocket connections, JWT authentication, and request routing. Async throughout for performance." },
      { label: "AI Engine (Groq + LLaMA 3.1)", desc: "LLaMA 3.1 model accessed via Groq's fast inference API. Responses stream token-by-token back to the client through WebSockets." },
      { label: "Memory System", desc: "Two-tier: hot memory holds recent conversation turns in-session; cold memory summarizes older conversations and stores them in the database for long-term personality learning." },
      { label: "Supabase PostgreSQL", desc: "16-table relational schema storing users, messages, memories, todos, notes, reminders, and admin data. Supabase provides hosted Postgres with a REST API layer." },
      { label: "Render Cloud", desc: "Deployed on Render's free tier as a persistent web service. Environment variables manage secrets; Supabase handles database hosting separately." },
    ],
    features: [
      { icon: "💬", title: "Real-Time AI Streaming", desc: "AI responses stream word-by-word via WebSocket so the user sees output as it generates — no waiting for a full response.", learned: "I learned how WebSocket connections work differently from HTTP — persistent, bidirectional, and stateful." },
      { icon: "🧠", title: "Two-Tier Memory", desc: "Recent conversations stay in hot memory for immediate context. Older ones are summarised and stored to let the AI remember user preferences over time.", learned: "This taught me about context window limits in LLMs and how to work around them with summarisation." },
      { icon: "🌐", title: "Multilingual Support (EN / HI / TE)", desc: "The system detects which language the user is writing in and responds in the same language using LLaMA's multilingual capability.", learned: "I learned about prompt engineering — instructing the model to detect and mirror language through the system prompt." },
      { icon: "😊", title: "Emotion Detection", desc: "Detects 9 emotional states from conversation text through keyword and pattern analysis, then adjusts the AI's tone accordingly.", learned: "This is a simple rule-based approach, not a separate ML model — I learned to distinguish when NLP rules are sufficient vs. when you need ML." },
      { icon: "🎵", title: "Music Integration", desc: "Integrates the iTunes Preview API to search for songs by title or genre and stream 30-second previews.", learned: "I learned about third-party REST API integration and how to handle async fetch calls cleanly in a WebSocket context." },
      { icon: "🔐", title: "Authentication & Admin", desc: "bcrypt password hashing, JWT tokens for session management, role-based access control separating admin and regular users.", learned: "This was my first time implementing JWT auth from scratch — I now understand token expiry, refresh logic, and why you hash passwords." },
      { icon: "✅", title: "Productivity System", desc: "Smart todos with priority and due dates, notes, birthday tracking, reminders, and family-wide announcements through the admin dashboard.", learned: "Designing the database schema for these features taught me about relational modeling and foreign key relationships." },
    ],
    techStack: [
      { name: "Python", reason: "Primary language — used for all backend logic, API routes, and database queries." },
      { name: "FastAPI", reason: "Chosen for async support and automatic OpenAPI docs generation. Faster than Flask for WebSocket workloads." },
      { name: "WebSockets", reason: "Enables real-time streaming of AI tokens — HTTP polling would introduce too much latency." },
      { name: "Groq LLaMA 3.1", reason: "Groq provides extremely fast inference for open-source LLaMA models, which was important for responsive streaming." },
      { name: "PostgreSQL + Supabase", reason: "Relational DB for structured data (users, todos, messages). Supabase handles hosting so I don't manage database infrastructure." },
      { name: "JavaScript + Web Speech API", reason: "Kept the frontend in vanilla JS to avoid framework overhead. Web Speech API handles browser-native voice input/output." },
      { name: "bcrypt + JWT", reason: "Industry-standard security — bcrypt for password hashing, JWT for stateless session tokens." },
      { name: "Render", reason: "Free-tier cloud deployment that supports persistent Python web services with environment variable management." },
    ],
    challenges: [
      { problem: "WebSocket connections kept dropping after 30 seconds on Render's free tier", solution: "Implemented a client-side heartbeat ping every 20 seconds to keep the connection alive. Also added reconnection logic on the frontend." },
      { problem: "LLaMA responses were too slow when waiting for the full completion", solution: "Switched from request-response to streaming — the model sends tokens as they generate, which I forward immediately through the WebSocket to the browser." },
      { problem: "Memory context getting too large and exceeding the LLM's context window", solution: "Built a summarisation layer — older messages get compressed into a short summary stored in the DB, while only recent turns stay in the live prompt." },
      { problem: "Multi-user isolation — one user shouldn't see another user's memory or todos", solution: "All database queries are scoped by user_id, extracted from the verified JWT token on every request." },
    ],
    scale: [
      { label: "Total Files", value: "70+" },
      { label: "Python Modules", value: "44" },
      { label: "Database Tables", value: "16" },
      { label: "API Endpoints", value: "20+" },
      { label: "JS Modules", value: "8" },
      { label: "Automated Tests", value: "40+" },
    ],
    outcome: "JARVIS is live on Render. It's the project that taught me the most — from database design to real-time systems to security. Every part of it I can explain in detail because I built it myself from a blank file.",
    interviewNote: "If asked: I can explain every part of this project — how WebSockets differ from HTTP, why I chose FastAPI over Flask, how JWT auth works, how the memory summarisation prevents context overflow, and how the deployment is structured.",
  },

  xai: {
    title: "XAI Finance Advisor",
    tagline: "An ML project I built to understand why AI models make the decisions they do — using SHAP to explain predictions in human-readable terms.",
    badge: "ML + EXPLAINABLE AI",
    accent: "#8b5cf6",
    github: "https://github.com/lakshmi-narayana-goud",
    live: null,
    overview: "XAI Finance Advisor is a machine learning system that analyses a user's financial data — income, expenses, spending patterns — and produces personalised recommendations. What makes it different from a standard ML project is the explainability layer: every prediction is accompanied by a SHAP explanation that shows exactly which features drove the output and by how much.",
    why: "I built this because I was interested in the concept of Explainable AI — the idea that a model giving you financial advice should be able to tell you why it gave that advice. Black-box predictions are a problem in high-stakes domains like finance. SHAP was the practical tool I used to explore this concept.",
    architecture: [
      { label: "Data Input Layer", desc: "User financial data (income, expenses, savings, spending categories) is loaded and structured using Pandas DataFrames." },
      { label: "Preprocessing Pipeline", desc: "Handles missing values, feature scaling with StandardScaler, and encoding categorical variables before model training." },
      { label: "ML Model (Scikit-learn)", desc: "Uses a Random Forest Classifier / Regressor trained on financial behaviour patterns to predict risk category and generate recommendations." },
      { label: "SHAP Explainability Module", desc: "After prediction, SHAP TreeExplainer calculates feature importance for each individual prediction — not just global importance, but per-user contribution of each feature." },
      { label: "Recommendation Engine", desc: "Maps the model's output (risk score, spending pattern classification) to a set of human-readable investment and savings recommendations." },
      { label: "Visualisation Output", desc: "SHAP force plots and bar charts show which features pushed the prediction higher or lower, giving users a transparent view of the AI's reasoning." },
    ],
    features: [
      { icon: "📊", title: "Financial Behaviour Analysis", desc: "Analyses income vs. expense ratios, identifies high-spend categories, and classifies the user's savings behaviour into risk profiles.", learned: "Taught me data preprocessing — handling real-world financial data is messy and requires careful feature engineering." },
      { icon: "🤖", title: "Risk Classification", desc: "ML model classifies users into Low / Medium / High financial risk based on their spending and savings patterns.", learned: "I learned the difference between classification and regression tasks and when to use each." },
      { icon: "🔍", title: "SHAP Explainability", desc: "For every prediction, SHAP computes how much each input feature (e.g. monthly savings rate, debt ratio) contributed to the final output.", learned: "SHAP taught me that model accuracy alone isn't enough — understanding why a model predicts what it does is equally important, especially in production AI." },
      { icon: "💡", title: "Personalised Recommendations", desc: "Based on the risk profile and SHAP analysis, the system generates specific, actionable recommendations — not generic advice.", learned: "Translating ML output into user-friendly recommendations required thinking about the end user, not just the model." },
      { icon: "📈", title: "Feature Importance Visualisation", desc: "Global SHAP summary plots show which features matter most across all users. Local force plots show the individual breakdown per user.", learned: "Data visualisation is a skill in itself — I learned to use matplotlib and the SHAP plotting library to communicate results clearly." },
    ],
    techStack: [
      { name: "Python", reason: "Standard language for ML work — large ecosystem, clean syntax for data manipulation." },
      { name: "Scikit-learn", reason: "Provides the ML model (Random Forest), preprocessing tools (StandardScaler, train_test_split), and evaluation metrics." },
      { name: "SHAP", reason: "The core differentiator of this project. TreeExplainer works efficiently with tree-based models like Random Forest." },
      { name: "Pandas", reason: "Data loading, cleaning, and feature engineering — the backbone of any Python data pipeline." },
      { name: "NumPy", reason: "Numerical operations and array handling underneath Pandas and Scikit-learn." },
      { name: "Matplotlib", reason: "Used for SHAP visualisation plots — force plots and summary bar charts." },
    ],
    challenges: [
      { problem: "SHAP explanations were slow for large datasets", solution: "Used TreeExplainer instead of the general KernelExplainer — TreeExplainer is optimised for tree-based models and is orders of magnitude faster." },
      { problem: "Financial data had many missing values in real test cases", solution: "Implemented median imputation for numerical fields and mode imputation for categorical fields, with a flag column indicating which values were imputed." },
      { problem: "Recommendations were too generic — not personalised to the individual", solution: "Switched from rule-based recommendations to SHAP-guided ones — if SHAP shows that high discretionary spending is the main driver, the recommendation specifically targets that." },
    ],
    scale: [
      { label: "ML Model", value: "Random Forest" },
      { label: "Explainability", value: "SHAP TreeExplainer" },
      { label: "Risk Categories", value: "3 (Low/Med/High)" },
      { label: "Feature Count", value: "12 financial features" },
      { label: "Preprocessing Steps", value: "6-stage pipeline" },
      { label: "Output Types", value: "Risk score + recommendations + SHAP plots" },
    ],
    outcome: "This project gave me a solid foundation in the ML workflow — data preprocessing, model training, evaluation, and most importantly, explainability. The SHAP component is what I'm most proud of because it reflects real-world responsible AI thinking, not just building a model that gets good accuracy.",
    interviewNote: "If asked: I can explain what SHAP values are (Shapley values from game theory adapted for ML), why explainability matters in finance, the difference between global and local feature importance, and why I chose Random Forest over other models.",
  },
};

interface Props {
  projectKey: string;
  onClose: () => void;
}

const ProjectDetail = ({ projectKey, onClose }: Props) => {
  const project = PROJECTS[projectKey];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="pd-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="pd-panel" style={{ "--pd-accent": project.accent } as React.CSSProperties}>

        {/* Header bar */}
        <div className="pd-header glass">
          <button className="pd-back" onClick={onClose} data-cursor="disable">
            <MdArrowBack /> Back
          </button>
          <div className="pd-header-links">
            <a href={project.github} target="_blank" rel="noreferrer" className="pd-link glass" data-cursor="disable">
              <FiGithub /> GitHub
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="pd-link pd-link-live glass" data-cursor="disable">
                <MdArrowOutward /> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="pd-content">

          {/* Hero */}
          <div className="pd-hero">
            <span className="pd-badge">{project.badge}</span>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-tagline">{project.tagline}</p>
          </div>

          {/* Scale metrics */}
          <div className="pd-scale-grid">
            {project.scale.map(({ label, value }) => (
              <div key={label} className="pd-scale-card glass">
                <div className="pd-scale-value">{value}</div>
                <div className="pd-scale-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Overview */}
          <section className="pd-section">
            <h2 className="pd-section-title">Overview</h2>
            <p className="pd-para">{project.overview}</p>
          </section>

          {/* Why I built it */}
          <section className="pd-section pd-section-accent">
            <h2 className="pd-section-title">Why I Built This</h2>
            <p className="pd-para">{project.why}</p>
          </section>

          {/* Architecture */}
          <section className="pd-section">
            <h2 className="pd-section-title">System Architecture</h2>
            <div className="pd-arch">
              {project.architecture.map(({ label, desc }, i) => (
                <div key={label} className="pd-arch-item">
                  <div className="pd-arch-connector">
                    <div className="pd-arch-dot"></div>
                    {i < project.architecture.length - 1 && <div className="pd-arch-line"></div>}
                  </div>
                  <div className="pd-arch-card glass">
                    <h4>{label}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features + what I learned */}
          <section className="pd-section">
            <h2 className="pd-section-title">Features & What I Learned</h2>
            <div className="pd-features-grid">
              {project.features.map(({ icon, title, desc, learned }) => (
                <div key={title} className="pd-feature-card glass">
                  <span className="pd-feature-icon">{icon}</span>
                  <h4 className="pd-feature-title">{title}</h4>
                  <p className="pd-feature-desc">{desc}</p>
                  <div className="pd-learned">
                    <span className="pd-learned-label">What I learned:</span> {learned}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech stack with reasons */}
          <section className="pd-section">
            <h2 className="pd-section-title">Tech Stack & Why Each Tool</h2>
            <div className="pd-tech-grid">
              {project.techStack.map(({ name, reason }) => (
                <div key={name} className="pd-tech-item glass">
                  <div className="pd-tech-name">{name}</div>
                  <div className="pd-tech-reason">{reason}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges */}
          <section className="pd-section">
            <h2 className="pd-section-title">Challenges & How I Solved Them</h2>
            <div className="pd-challenges">
              {project.challenges.map(({ problem, solution }, i) => (
                <div key={i} className="pd-challenge glass">
                  <div className="pd-challenge-problem">
                    <span className="pd-challenge-icon">⚠️</span>
                    <div>
                      <div className="pd-challenge-label">Problem</div>
                      <p>{problem}</p>
                    </div>
                  </div>
                  <div className="pd-challenge-solution">
                    <span className="pd-challenge-icon">✅</span>
                    <div>
                      <div className="pd-challenge-label">Solution</div>
                      <p>{solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Outcome */}
          <section className="pd-section">
            <h2 className="pd-section-title">Outcome & Reflection</h2>
            <p className="pd-para">{project.outcome}</p>
          </section>

          {/* Interview note */}
          <div className="pd-interview-note glass">
            <span className="pd-interview-icon">🎯</span>
            <div>
              <div className="pd-interview-label">Interview Readiness</div>
              <p>{project.interviewNote}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
