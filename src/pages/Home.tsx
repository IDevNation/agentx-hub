import { Link } from "react-router-dom";
import AgentCard from "@/components/AgentCard";
import Footer from "@/components/Footer";

const agents = [
  { id: "demo-1", icon: "🔍", iconBg: "rgba(0,212,255,0.1)", name: "SmartAudit Agent", description: "Automatically scans Solidity contracts for reentrancy, overflow, and access control vulnerabilities.", tags: ["Security", "Solidity", "Web3"], price: "$0.02/scan", rating: "⭐ 4.9 (128)" },
  { id: "demo-2", icon: "📊", iconBg: "rgba(124,58,237,0.1)", name: "DeFi Analytics Pro", description: "Real-time liquidity analysis, whale tracking, and yield optimization across 15+ protocols.", tags: ["DeFi", "Analytics"], price: "$0.05/query", rating: "⭐ 4.7 (89)" },
  { id: "demo-3", icon: "⚡", iconBg: "rgba(63,185,80,0.1)", name: "Gas Optimizer", description: "Analyzes and rewrites smart contract code to minimize gas usage without changing functionality.", tags: ["Gas", "EVM"], price: "$0.03/contract", rating: "⭐ 4.8 (204)" },
];

const Home = () => (
  <div className="min-h-screen pt-[60px]">
    {/* Hero */}
    <section className="grid-bg py-20">
      <div className="container relative z-10">
        <div className="max-w-[680px]">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            🤖 AI Agent Marketplace
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight mb-4">
            The AI Agent<br /><span className="text-primary">Marketplace</span>
          </h1>
          <p className="text-muted-foreground text-base leading-[1.7] max-w-[520px]">
            Try any agent free. Pay only for what you use.
          </p>
          <div className="flex gap-2.5 mt-8 flex-wrap">
            <Link to="/marketplace" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Browse Agents →</Link>
            <Link to="/signup" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">List Your Agent →</Link>
          </div>
          <div className="flex gap-8 mt-10 flex-wrap">
            {[{ v: "200+", l: "AI Agents" }, { v: "5K+", l: "Developers" }, { v: "$0", l: "To Try" }].map((s) => (
              <div key={s.l}><h3 className="font-display text-[1.75rem] font-extrabold">{s.v}</h3><p className="text-xs text-muted-foreground">{s.l}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Featured Agents */}
    <section className="py-16">
      <div className="container">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Featured Agents</div>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-tight">Top Agents This Week</h2>
          </div>
          <Link to="/marketplace" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">View All →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a) => <AgentCard key={a.name} {...a} />)}
        </div>
      </div>
    </section>

    {/* Pay Per Use */}
    <section className="bg-bg2 border-t border-b border-border py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Our Difference</div>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-tight mb-4">Try First.<br />Pay Only What You Use.</h2>
            <p className="text-muted-foreground max-w-[520px]">Tired of paying $50/month to realize the tool doesn't work for you? We fixed that.</p>
            <div className="flex flex-col gap-5 mt-8">
              {[
                { n: "1", t: "Live Demo — Always Free", d: "Run any agent with your actual data. No credit card needed." },
                { n: "2", t: "Use What You Need", d: "Pay per query, per scan, or per task. Stop paying when you stop using." },
                { n: "3", t: "Subscribe When It Makes Sense", d: "Lock in a subscription only when you're genuinely sure." },
              ].map((s) => (
                <div key={s.n} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary font-display font-bold text-sm flex items-center justify-center shrink-0">{s.n}</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{s.t}</h4>
                    <p className="text-[0.825rem] text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-bg3 border border-border rounded-2xl p-8">
            <h4 className="font-display font-bold mb-6">Your Usage This Month</h4>
            {[
              { name: "SmartAudit Agent", count: "23 scans", pct: 65 },
              { name: "DeFi Analytics", count: "8 queries", pct: 30 },
              { name: "Gas Optimizer", count: "5 contracts", pct: 20 },
            ].map((m) => (
              <div key={m.name} className="mb-5">
                <div className="flex justify-between text-xs text-muted-foreground mb-2"><span>{m.name}</span><span>{m.count}</span></div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center p-4 bg-bg2 border border-border rounded-[10px] mt-4">
              <div>
                <div className="text-xs text-muted-foreground">Total this month</div>
                <div className="text-xs text-muted-foreground">vs $150 if subscribed to all 3</div>
              </div>
              <div className="font-display text-xl font-bold text-success">$2.71</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Acquire Portal */}
    <section id="acquire" className="grid-bg py-20">
      <div className="container relative z-10">
        <div className="max-w-[680px] mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            🤝 Acquire & Exit
          </div>
          <h2 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight mb-4">
            Acquire an AI Project
          </h2>
          <p className="text-muted-foreground text-base leading-[1.7] max-w-[520px]">
            Buy entire AI startups, SaaS tools, or agent businesses. Verified financials, escrow-protected deals.
          </p>
          <div className="flex gap-2.5 mt-8 flex-wrap">
            <Link to="/acquire" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Browse Acquisitions →</Link>
            <Link to="/acquire/list" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">List Your Project →</Link>
          </div>
          <div className="flex gap-8 mt-10 flex-wrap">
            {[{ v: "48+", l: "Active Listings" }, { v: "$10K", l: "Starting Deal Size" }, { v: "100%", l: "Escrow Protected" }].map((s) => (
              <div key={s.l}><h3 className="font-display text-[1.75rem] font-extrabold">{s.v}</h3><p className="text-xs text-muted-foreground">{s.l}</p></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "🏢", title: "Verified Projects", desc: "Due diligence docs, revenue proof, and financials verified before listing." },
            { icon: "🔒", title: "Escrow Protection", desc: "Funds held securely until deal is complete. Zero risk transfers." },
            { icon: "📊", title: "Deal Room Access", desc: "Private data room with NDA for serious buyers only." },
          ].map((c) => (
            <div key={c.title} className="bg-bg3 border border-primary/20 rounded-2xl p-6">
              <div className="text-2xl mb-3">{c.icon}</div>
              <h4 className="font-display font-bold text-sm mb-2">{c.title}</h4>
              <p className="text-[0.825rem] text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Investor Portal */}
    <section id="invest" className="bg-bg2 border-t border-b border-border py-20">
      <div className="container">
        <div className="max-w-[680px] mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            💰 Invest
          </div>
          <h2 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight mb-4">
            Invest in AI Projects
          </h2>
          <p className="text-muted-foreground text-base leading-[1.7] max-w-[520px]">
            Small investor friendly. Enter from $5,000. Exit anytime via our P2P secondary market.
          </p>
          <div className="flex gap-2.5 mt-8 flex-wrap">
            <Link to="/coming-soon" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Browse Opportunities →</Link>
            <Link to="/coming-soon" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">List for Investment →</Link>
          </div>
          <div className="flex gap-8 mt-10 flex-wrap">
            {[{ v: "$5K", l: "Minimum Entry" }, { v: "$50K", l: "Maximum Ticket" }, { v: "P2P", l: "Liquid Exit Market" }].map((s) => (
              <div key={s.l}><h3 className="font-display text-[1.75rem] font-extrabold">{s.v}</h3><p className="text-xs text-muted-foreground">{s.l}</p></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "📈", title: "Revenue Share", desc: "Earn monthly from project revenue. Transparent dashboard updated live." },
            { icon: "🔄", title: "Exit Anytime", desc: "Sell your stake on our P2P secondary market to other investors." },
            { icon: "🛡️", title: "Investor Protection", desc: "Quarterly buyback option and project health AI scoring included." },
          ].map((c) => (
            <div key={c.title} className="bg-bg3 border border-primary/20 rounded-2xl p-6">
              <div className="text-2xl mb-3">{c.icon}</div>
              <h4 className="font-display font-bold text-sm mb-2">{c.title}</h4>
              <p className="text-[0.825rem] text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-xl bg-primary px-6 py-4 text-center">
          <p className="text-sm font-semibold text-primary-foreground">🚀 AgentX is the only AI marketplace with built-in investor liquidity — enter small, exit smart.</p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Home;
