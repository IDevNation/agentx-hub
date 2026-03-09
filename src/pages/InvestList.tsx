import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const InvestList = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", category: "SaaS", fundingAmount: "", investType: "Revenue Share", revenueShare: "", useOfFunds: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Submitted!", description: "Our investment team will review your listing within 48 hours." });
    setForm({ name: "", category: "SaaS", fundingAmount: "", investType: "Revenue Share", revenueShare: "", useOfFunds: "", email: "" });
  };

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen pt-[60px]">
      <section className="py-12">
        <div className="container max-w-2xl">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">List for Investment</div>
          <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-tight mb-2">Raise Capital for Your AI Project</h1>
          <p className="text-muted-foreground mb-10">Submit your project details. Our team reviews every application.</p>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Project Name *</label>
                <input value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="e.g. YieldMax Bot" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Category *</label>
                <select value={form.category} onChange={(e) => update("category", e.target.value)} className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary">
                  <option>SaaS</option><option>Bot</option><option>Agent</option><option>DeFi</option><option>Security</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Funding Amount Needed *</label>
                <input value={form.fundingAmount} onChange={(e) => update("fundingAmount", e.target.value)} required placeholder="$50,000" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Investment Type *</label>
                <select value={form.investType} onChange={(e) => update("investType", e.target.value)} className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary">
                  <option>Revenue Share</option><option>Equity</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Revenue Share % / Equity %</label>
              <input value={form.revenueShare} onChange={(e) => update("revenueShare", e.target.value)} placeholder="e.g. 15% revenue share" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Use of Funds *</label>
              <textarea value={form.useOfFunds} onChange={(e) => update("useOfFunds", e.target.value)} required rows={3} placeholder="Marketing, hiring, infrastructure..." className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary resize-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Financial Projections (PDF)</label>
              <input type="file" accept=".pdf" className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-border file:bg-bg2 file:text-foreground file:text-sm file:font-medium file:cursor-pointer" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Contact Email *</label>
              <input value={form.email} onChange={(e) => update("email", e.target.value)} required type="email" placeholder="you@company.com" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
            </div>
            <button type="submit" className="w-full py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Submit for Review →</button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InvestList;
