import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const listings = [
  { id: "acq-1", name: "AutoReply AI", desc: "AI-powered customer support SaaS for e-commerce.", mrr: "$4,200", price: "$85,000", multiple: "1.7x", tags: ["SaaS", "AI", "Profitable"], logo: "💬" },
  { id: "acq-2", name: "ChainScan Pro", desc: "Smart contract vulnerability scanner with 2K+ users.", mrr: "$6,800", price: "$150,000", multiple: "1.8x", tags: ["Security", "Web3", "Growing"], logo: "🔍" },
  { id: "acq-3", name: "DataPipe Agent", desc: "Automated ETL pipeline builder for data teams.", mrr: "$3,500", price: "$65,000", multiple: "1.5x", tags: ["Data", "AI", "B2B"], logo: "📊" },
  { id: "acq-4", name: "NFT Valuator", desc: "AI-driven NFT price prediction and valuation tool.", mrr: "$2,100", price: "$42,000", multiple: "1.7x", tags: ["NFT", "AI", "Niche"], logo: "🎨" },
  { id: "acq-5", name: "YieldMax Bot", desc: "DeFi yield optimization bot with 500+ active users.", mrr: "$8,900", price: "$200,000", multiple: "1.9x", tags: ["DeFi", "Bot", "Profitable"], logo: "⚡" },
  { id: "acq-6", name: "CodeReview AI", desc: "Automated code review agent for GitHub repos.", mrr: "$5,400", price: "$110,000", multiple: "1.7x", tags: ["DevTool", "AI", "SaaS"], logo: "🤖" },
];

const priceRanges = ["All", "$10K–$50K", "$50K–$200K", "$200K+"];
const categories = ["All", "SaaS", "Bot", "Security", "DeFi", "NFT", "DevTool"];

const Acquire = () => {
  const [priceFilter, setPriceFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");

  const filtered = listings.filter((l) => {
    if (catFilter !== "All" && !l.tags.includes(catFilter)) return false;
    if (priceFilter === "$10K–$50K") { const p = parseInt(l.price.replace(/[^0-9]/g, "")); if (p < 10000 || p > 50000) return false; }
    if (priceFilter === "$50K–$200K") { const p = parseInt(l.price.replace(/[^0-9]/g, "")); if (p < 50000 || p > 200000) return false; }
    if (priceFilter === "$200K+") { const p = parseInt(l.price.replace(/[^0-9]/g, "")); if (p < 200000) return false; }
    return true;
  });

  return (
    <div className="min-h-screen pt-[60px]">
      {/* Hero */}
      <section className="grid-bg py-20">
        <div className="container relative z-10">
          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
              🤝 Acquire & Exit
            </div>
            <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight mb-4">
              Acquire AI Projects & Startups
            </h1>
            <p className="text-muted-foreground text-base leading-[1.7] max-w-[520px]">
              Browse verified AI businesses for sale. Escrow-protected. Due diligence included.
            </p>
            <div className="flex gap-8 mt-10 flex-wrap">
              {[{ v: "48+", l: "Active Listings" }, { v: "$10K", l: "Starting Deal Size" }, { v: "100%", l: "Escrow Protected" }].map((s) => (
                <div key={s.l}><h3 className="font-display text-[1.75rem] font-extrabold">{s.v}</h3><p className="text-xs text-muted-foreground">{s.l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border py-6">
        <div className="container flex flex-wrap gap-3 items-center">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">Price:</span>
          {priceRanges.map((r) => (
            <button key={r} onClick={() => setPriceFilter(r)} className={`px-3 py-1.5 rounded-lg border text-xs transition-colors ${priceFilter === r ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>{r}</button>
          ))}
          <div className="w-px h-6 bg-border mx-2 hidden sm:block" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">Category:</span>
          {categories.map((c) => (
            <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-lg border text-xs transition-colors ${catFilter === c ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>{c}</button>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section className="py-12">
        <div className="container">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="font-display font-extrabold text-xl">Available Projects</h2>
            <Link to="/acquire/list" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">List Your Project →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((l) => (
              <div key={l.id} className="bg-card border border-border rounded-[14px] p-6 transition-all hover:border-primary hover:-translate-y-[3px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">{l.logo}</div>
                  <div>
                    <h3 className="font-display font-bold text-sm">{l.name}</h3>
                    <p className="text-xs text-muted-foreground">{l.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-bg2 rounded-lg p-2.5 text-center">
                    <div className="text-[0.65rem] text-muted-foreground mb-0.5">MRR</div>
                    <div className="font-display font-bold text-sm text-primary">{l.mrr}</div>
                  </div>
                  <div className="bg-bg2 rounded-lg p-2.5 text-center">
                    <div className="text-[0.65rem] text-muted-foreground mb-0.5">Asking</div>
                    <div className="font-display font-bold text-sm">{l.price}</div>
                  </div>
                  <div className="bg-bg2 rounded-lg p-2.5 text-center">
                    <div className="text-[0.65rem] text-muted-foreground mb-0.5">Multiple</div>
                    <div className="font-display font-bold text-sm">{l.multiple}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {l.tags.map((t) => (
                    <span key={t} className="text-[0.7rem] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15 font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link to={`/acquire/${l.id}`} className="flex-1 text-center px-3 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">View Deal Room →</Link>
                  <button className="flex-1 px-3 py-2 rounded-lg text-xs font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">Express Interest</button>
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

export default Acquire;
