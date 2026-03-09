import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const AcquireList = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", url: "", category: "SaaS", mrr: "", price: "", description: "", whySelling: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Project Submitted!", description: "Our team will review your listing within 48 hours." });
    setForm({ name: "", url: "", category: "SaaS", mrr: "", price: "", description: "", whySelling: "", email: "" });
  };

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen pt-[60px]">
      <section className="py-12">
        <div className="container max-w-2xl">
          <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">List Your Project</div>
          <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-tight mb-2">Sell Your AI Project</h1>
          <p className="text-muted-foreground mb-10">Fill out the details below. Our team will verify and list your project within 48 hours.</p>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Project Name *</label>
                <input value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="e.g. AutoReply AI" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Project URL</label>
                <input value={form.url} onChange={(e) => update("url", e.target.value)} placeholder="https://..." className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Category *</label>
                <select value={form.category} onChange={(e) => update("category", e.target.value)} className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary">
                  <option>SaaS</option><option>Bot</option><option>Agent</option><option>Tool</option><option>DeFi</option><option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Monthly Revenue *</label>
                <input value={form.mrr} onChange={(e) => update("mrr", e.target.value)} required placeholder="$4,200" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Asking Price *</label>
                <input value={form.price} onChange={(e) => update("price", e.target.value)} required placeholder="$85,000" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Description *</label>
              <textarea value={form.description} onChange={(e) => update("description", e.target.value)} required rows={4} placeholder="Describe your project, tech stack, user base..." className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary resize-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Why are you selling?</label>
              <textarea value={form.whySelling} onChange={(e) => update("whySelling", e.target.value)} rows={2} placeholder="Moving on to a new project, need capital..." className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary resize-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Upload Financials (PDF)</label>
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

export default AcquireList;
