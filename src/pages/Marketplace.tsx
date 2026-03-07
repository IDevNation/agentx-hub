import { useState } from "react";
import AgentCard from "@/components/AgentCard";

const categories = ["All", "Security", "DeFi", "NFT", "Analytics"];
const sidebarCategories = [
  "🔍 Security & Audit", "📊 Analytics", "⚡ Optimization", "🤖 Automation", "🪙 DeFi", "🎨 NFT"
];
const pricingModels = ["💳 Pay Per Use", "📅 Subscription", "🆓 Free"];
const ratings = ["⭐ 4.5+", "⭐ 4.0+", "⭐ Any"];

const agents = [
  { icon: "🔍", iconBg: "rgba(0,212,255,0.1)", name: "SmartAudit Agent", description: "Deep Solidity vulnerability scanner with 99 check types including reentrancy and access control.", tags: ["Security", "Solidity"], price: "$0.02/scan", rating: "⭐ 4.9" },
  { icon: "📊", iconBg: "rgba(124,58,237,0.1)", name: "DeFi Analytics Pro", description: "Real-time liquidity, whale tracking, yield optimization across 15+ DeFi protocols.", tags: ["DeFi", "Analytics"], price: "$0.05/query", rating: "⭐ 4.7" },
  { icon: "⚡", iconBg: "rgba(63,185,80,0.1)", name: "Gas Optimizer", description: "Rewrites smart contract code to minimize gas fees without changing functionality.", tags: ["Gas", "EVM"], price: "$0.03/contract", rating: "⭐ 4.8" },
  { icon: "🪙", iconBg: "rgba(255,170,0,0.1)", name: "Token Sniper", description: "Identifies newly launched tokens with strong fundamentals and low rug-pull risk.", tags: ["Trading", "Token"], price: "$0.10/scan", rating: "⭐ 4.6" },
  { icon: "🎨", iconBg: "rgba(0,212,255,0.08)", name: "NFT Valuator", description: "ML-based NFT price prediction using trait rarity, collection trends, and market sentiment.", tags: ["NFT", "ML"], price: "$0.01/valuation", rating: "⭐ 4.5" },
  { icon: "🔐", iconBg: "rgba(124,58,237,0.08)", name: "Wallet Guard", description: "Monitors wallet addresses for suspicious activity, drainer contracts, and phishing attempts.", tags: ["Security", "Wallet"], price: "$2/month", rating: "⭐ 4.9" },
];

const Marketplace = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCat, setActiveCat] = useState(0);
  const [activePricing, setActivePricing] = useState(0);
  const [activeRating, setActiveRating] = useState(0);

  return (
    <div className="min-h-screen pt-[60px]">
      <div className="border-b border-border py-10">
        <div className="container">
          <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-tight">AI Agent Marketplace</h1>
          <p className="text-muted-foreground mt-2">Try any agent free. Pay only for what you use.</p>
          <div className="flex gap-2 mt-5 flex-wrap">
            <input className="flex-1 min-w-[220px] px-4 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm font-body outline-none focus:border-primary placeholder:text-muted-foreground" placeholder="Search agents — e.g. 'smart contract audit'..." />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveFilter(c)}
                className={`px-3.5 py-2 rounded-lg border text-xs cursor-pointer transition-colors font-body ${
                  activeFilter === c
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border bg-bg2 text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 py-8">
          {/* Sidebar */}
          <div className="hidden md:block sticky top-20 h-fit">
            <div className="mb-6">
              <div className="text-[0.72rem] font-semibold tracking-wider uppercase text-muted-foreground mb-3">Category</div>
              {sidebarCategories.map((c, i) => (
                <div key={c} onClick={() => setActiveCat(i)} className={`flex items-center gap-2 px-2.5 py-[7px] rounded-md cursor-pointer text-sm transition-colors mb-0.5 ${activeCat === i ? "text-primary bg-bg3" : "text-muted-foreground hover:text-foreground hover:bg-bg3"}`}>{c}</div>
              ))}
            </div>
            <div className="mb-6">
              <div className="text-[0.72rem] font-semibold tracking-wider uppercase text-muted-foreground mb-3">Pricing Model</div>
              {pricingModels.map((c, i) => (
                <div key={c} onClick={() => setActivePricing(i)} className={`flex items-center gap-2 px-2.5 py-[7px] rounded-md cursor-pointer text-sm transition-colors mb-0.5 ${activePricing === i ? "text-primary bg-bg3" : "text-muted-foreground hover:text-foreground hover:bg-bg3"}`}>{c}</div>
              ))}
            </div>
            <div>
              <div className="text-[0.72rem] font-semibold tracking-wider uppercase text-muted-foreground mb-3">Rating</div>
              {ratings.map((c, i) => (
                <div key={c} onClick={() => setActiveRating(i)} className={`flex items-center gap-2 px-2.5 py-[7px] rounded-md cursor-pointer text-sm transition-colors mb-0.5 ${activeRating === i ? "text-primary bg-bg3" : "text-muted-foreground hover:text-foreground hover:bg-bg3"}`}>{c}</div>
              ))}
            </div>
          </div>

          {/* Main */}
          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Showing 48 agents</span>
              <select className="px-3 py-[7px] rounded-md border border-border bg-bg2 text-foreground text-xs font-body">
                <option>Most Popular</option><option>Newest</option><option>Highest Rated</option><option>Lowest Price</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((a) => <AgentCard key={a.name} {...a} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
