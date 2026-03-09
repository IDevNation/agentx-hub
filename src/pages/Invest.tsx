import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const opportunities = [
  { id: "inv-1", name: "AutoReply AI", category: "SaaS", type: "Revenue Share", minTicket: "$5,000", target: "$50,000", funded: 67, returns: "18-24%", logo: "💬" },
  { id: "inv-2", name: "ChainScan Pro", category: "Security", type: "Equity", minTicket: "$10,000", target: "$100,000", funded: 42, returns: "20-30%", logo: "🔍" },
  { id: "inv-3", name: "DataPipe Agent", category: "Data", type: "Revenue Share", minTicket: "$5,000", target: "$35,000", funded: 85, returns: "15-20%", logo: "📊" },
  { id: "inv-4", name: "NFT Valuator", category: "NFT", type: "Equity", minTicket: "$5,000", target: "$25,000", funded: 30, returns: "22-28%", logo: "🎨" },
  { id: "inv-5", name: "YieldMax Bot", category: "DeFi", type: "Revenue Share", minTicket: "$10,000", target: "$75,000", funded: 55, returns: "25-35%", logo: "⚡" },
  { id: "inv-6", name: "CodeReview AI", category: "DevTool", type: "Revenue Share", minTicket: "$5,000", target: "$40,000", funded: 72, returns: "16-22%", logo: "🤖" },
];

const secondaryListings = [
  { project: "AutoReply AI", stake: "5%", askingPrice: "$8,500", originalInvested: "$5,000" },
  { project: "YieldMax Bot", stake: "3%", askingPrice: "$12,000", originalInvested: "$7,500" },
  { project: "DataPipe Agent", stake: "8%", askingPrice: "$6,200", originalInvested: "$4,000" },
];

const portfolioItems = [
  { project: "ChainScan Pro", invested: "$10,000", currentValue: "$13,200", monthly: "$420", type: "Equity" },
  { project: "AutoReply AI", invested: "$5,000", currentValue: "$6,100", monthly: "$185", type: "Revenue Share" },
];

const Invest = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"opportunities" | "secondary" | "portfolio">("opportunities");
  const [investModal, setInvestModal] = useState<string | null>(null);
  const [investAmount, setInvestAmount] = useState("5000");
  const [investType, setInvestType] = useState("Revenue Share");
  const [kycChecked, setKycChecked] = useState(false);

  const handleInvest = () => {
    if (!kycChecked) { toast({ title: "KYC Required", description: "Please confirm your eligibility.", variant: "destructive" }); return; }
    toast({ title: "Investment Initiated!", description: "You'll receive payment instructions via email." });
    setInvestModal(null);
    setKycChecked(false);
  };

  const tabs = [
    { key: "opportunities" as const, label: "Active Opportunities" },
    { key: "secondary" as const, label: "Secondary Market (Exit)" },
    { key: "portfolio" as const, label: "My Portfolio" },
  ];

  return (
    <div className="min-h-screen pt-[60px]">
      {/* Hero */}
      <section className="grid-bg py-20">
        <div className="container relative z-10">
          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
              💰 Invest
            </div>
            <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight mb-4">
              Invest in AI Projects — $5K to $50K
            </h1>
            <p className="text-muted-foreground text-base leading-[1.7] max-w-[520px]">
              Revenue share deals. P2P exit market. Built-in liquidity.
            </p>
            <div className="flex gap-8 mt-10 flex-wrap">
              {[{ v: "$5K", l: "Minimum Entry" }, { v: "$50K", l: "Maximum Ticket" }, { v: "P2P", l: "Liquid Exit Market" }].map((s) => (
                <div key={s.l}><h3 className="font-display text-[1.75rem] font-extrabold">{s.v}</h3><p className="text-xs text-muted-foreground">{s.l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border">
        <div className="container flex gap-0">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} className={`px-5 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === t.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {/* Active Opportunities */}
          {activeTab === "opportunities" && (
            <>
              <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h2 className="font-display font-extrabold text-xl">Investment Opportunities</h2>
                <Link to="/invest/list" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">List for Investment →</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {opportunities.map((o) => (
                  <div key={o.id} className="bg-card border border-border rounded-[14px] p-6 transition-all hover:border-primary hover:-translate-y-[3px]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">{o.logo}</div>
                      <div>
                        <h3 className="font-display font-bold text-sm">{o.name}</h3>
                        <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{o.category}</span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{o.type}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Min Ticket</span><span className="font-medium">{o.minTicket}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Target Raise</span><span className="font-medium">{o.target}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Expected Returns</span><span className="font-medium text-primary">{o.returns}</span></div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Funded</span><span>{o.funded}%</span></div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${o.funded}%` }} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setInvestModal(o.id)} className="flex-1 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Invest Now →</button>
                      <button className="flex-1 py-2 rounded-lg text-xs font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">Learn More</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Secondary Market */}
          {activeTab === "secondary" && (
            <>
              <h2 className="font-display font-extrabold text-xl mb-8">Secondary Market — Buy Stakes</h2>
              <div className="space-y-3">
                {secondaryListings.map((s, i) => (
                  <div key={i} className="bg-card border border-border rounded-[14px] p-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-sm">{s.project}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Stake: {s.stake} · Original: {s.originalInvested}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-lg text-primary">{s.askingPrice}</div>
                      <button className="mt-1 px-4 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Buy This Stake →</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Portfolio */}
          {activeTab === "portfolio" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-card border border-border rounded-[14px] p-6 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Total Invested</div>
                  <div className="font-display font-extrabold text-2xl text-primary">$15,000</div>
                </div>
                <div className="bg-card border border-border rounded-[14px] p-6 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Current Value</div>
                  <div className="font-display font-extrabold text-2xl">$19,300</div>
                </div>
                <div className="bg-card border border-border rounded-[14px] p-6 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Monthly Earnings</div>
                  <div className="font-display font-extrabold text-2xl text-success">$605</div>
                </div>
              </div>
              <h2 className="font-display font-extrabold text-xl mb-4">Active Investments</h2>
              <div className="space-y-3">
                {portfolioItems.map((p, i) => (
                  <div key={i} className="bg-card border border-border rounded-[14px] p-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-sm">{p.project}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{p.type} · Invested: {p.invested}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm"><span className="text-muted-foreground">Value:</span> <span className="font-bold">{p.currentValue}</span></div>
                      <div className="text-sm"><span className="text-muted-foreground">Monthly:</span> <span className="font-bold text-success">{p.monthly}</span></div>
                      <button className="mt-2 px-4 py-1.5 rounded-lg text-xs font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">List for Sale</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Invest Modal */}
      {investModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md">
            <h3 className="font-display font-bold text-lg mb-6">Invest Now</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Investment Amount ($5,000 minimum)</label>
                <input value={investAmount} onChange={(e) => setInvestAmount(e.target.value)} type="number" min="5000" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Investment Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Revenue Share", "Equity Stake"].map((t) => (
                    <button key={t} onClick={() => setInvestType(t)} className={`py-2.5 rounded-lg text-xs font-medium border transition-colors ${investType === t ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="bg-bg2 rounded-lg p-4 text-xs text-muted-foreground space-y-1">
                <p><strong className="text-foreground">Terms:</strong> Monthly revenue distributions for Revenue Share. Equity vests over 12 months.</p>
                <p>Exit available via P2P secondary market at any time.</p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={kycChecked} onChange={(e) => setKycChecked(e.target.checked)} className="mt-1 accent-[hsl(var(--primary))]" />
                <span className="text-xs text-muted-foreground">I confirm I am an accredited/eligible investor and have read the investment terms.</span>
              </label>
              <div className="flex gap-2">
                <button onClick={handleInvest} className="flex-1 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Proceed to Payment</button>
                <button onClick={() => setInvestModal(null)} className="flex-1 py-3 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="bg-primary py-4">
        <div className="container text-center">
          <p className="text-sm font-semibold text-primary-foreground">🚀 AgentX is the only AI marketplace with built-in investor liquidity — enter small, exit smart.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Invest;
