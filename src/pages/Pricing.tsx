import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      tier: "Free", amount: "$0", sub: "", desc: "Try any agent. No card needed.",
      features: ["3 free demos per agent", "Access all marketplace agents", "Basic usage dashboard", "Community support"],
      cta: "Get Started Free", featured: false,
    },
    {
      tier: "Pay Per Use", amount: "$0.01–0.10", sub: "/use", desc: "Pay exactly for what you use.",
      features: ["Unlimited agent access", "Per-query / per-task billing", "Usage analytics dashboard", "Priority support", "Wallet + card payments", "On-chain usage receipts"],
      cta: "Start Using →", featured: true,
    },
    {
      tier: "Pro Subscription", amount: "$29", sub: "/mo", desc: "For power users. Lock in lower rates.",
      features: ["Everything in Pay Per Use", "Up to 60% lower per-use rates", "Unlimited demos", "API access", "Team collaboration (3 seats)", "Dedicated support"],
      cta: "Start 14-Day Trial", featured: false,
    },
  ];

  return (
    <div className="min-h-screen pt-[60px]">
      <section className="py-16">
        <div className="container text-center">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Pricing</div>
          <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-tight">Pay Only What You Use</h1>
          <p className="text-muted-foreground mt-4 max-w-[520px] mx-auto">No surprise bills. No locked contracts. Start free, pay as you grow.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {plans.map((p) => (
              <div key={p.tier} className={`bg-card border rounded-2xl p-8 relative transition-transform hover:-translate-y-1 ${p.featured ? "border-primary bg-gradient-to-br from-primary/5 to-card" : "border-border"}`}>
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[0.7rem] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Most Popular</div>
                )}
                <div className="text-[0.78rem] font-semibold tracking-wider uppercase text-muted-foreground mb-2">{p.tier}</div>
                <div className="font-display text-[2.4rem] font-extrabold tracking-tight mb-1">
                  <sup className="text-base align-super">$</sup>{p.amount.replace("$", "")}
                  {p.sub && <sub className="text-sm font-body text-muted-foreground font-normal">{p.sub}</sub>}
                </div>
                <div className="text-sm text-muted-foreground mb-6 leading-relaxed">{p.desc}</div>
                <ul className="flex flex-col gap-2.5 mb-8 text-left">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm flex items-center gap-2"><span className="text-success font-bold shrink-0">✓</span> {f}</li>
                  ))}
                </ul>
                <Link to="/signup" className={`block w-full px-4 py-3 rounded-lg text-sm font-medium text-center transition-all ${p.featured ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border text-foreground hover:border-primary hover:text-primary"}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
