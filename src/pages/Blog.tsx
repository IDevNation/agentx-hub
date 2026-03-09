import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const posts = [
  { icon: "🔍", tag: "AI Agents", title: "Top 10 Smart Contract Vulnerabilities in 2025", desc: "A deep dive into the most exploited vulnerabilities in Solidity contracts this year.", read: "5 min read", date: "Mar 2025" },
  { icon: "🤖", tag: "Platform Updates", title: "Why Pay-Per-Use is the Future of AI Tooling", desc: "The subscription model is broken for AI tools. Here's why usage-based pricing wins.", read: "4 min read", date: "Feb 2025" },
  { icon: "⛓️", tag: "AI Agents", title: "On-Chain Reputation: Why Your Reviews Should Live on Blockchain", desc: "Centralized reviews are broken. Here's how blockchain changes the trust game.", read: "6 min read", date: "Jan 2025" },
  { icon: "💰", tag: "Investing", title: "How to Evaluate an AI Startup for Acquisition", desc: "A practical guide to due diligence, valuation multiples, and red flags in AI M&A.", read: "7 min read", date: "Mar 2025" },
  { icon: "🏢", tag: "Acquisitions", title: "The Rise of Micro-Acquisitions in AI", desc: "Why buying small AI projects ($10K-$100K) is the smartest investment move in 2025.", read: "5 min read", date: "Feb 2025" },
  { icon: "📈", tag: "Investing", title: "Revenue Share vs Equity: Which Is Better for AI Investments?", desc: "Comparing two popular investment models for fractional AI project ownership.", read: "6 min read", date: "Jan 2025" },
];

const categories = ["All", "AI Agents", "Investing", "Acquisitions", "Platform Updates"];

const Blog = () => {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? posts : posts.filter((p) => p.tag === activeCat);

  return (
    <div className="min-h-screen pt-[60px]">
      <section className="py-16">
        <div className="container">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Resources</div>
          <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-tight">Blog & Insights</h1>
          <p className="text-muted-foreground mt-2 max-w-[520px]">Deep dives on AI agents, investing, acquisitions, and platform updates.</p>

          <div className="flex gap-2 mt-6 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCat(c)} className={`px-3.5 py-2 rounded-lg border text-xs transition-colors ${activeCat === c ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>{c}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filtered.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-[14px] overflow-hidden transition-all cursor-pointer hover:border-primary hover:-translate-y-[3px]">
                <div className="h-[150px] bg-gradient-to-br from-bg3 to-bg2 flex items-center justify-center text-5xl border-b border-border">{p.icon}</div>
                <div className="p-5">
                  <div className="text-[0.7rem] font-semibold tracking-wider uppercase text-primary mb-2">{p.tag}</div>
                  <h3 className="font-display text-[0.95rem] font-bold leading-snug mb-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="flex justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                    <span>{p.read}</span>
                    <span>{p.date}</span>
                  </div>
                  <span className="text-xs text-primary font-medium mt-3 inline-block hover:underline cursor-pointer">Read More →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
