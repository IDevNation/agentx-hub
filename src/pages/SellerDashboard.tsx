import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const agentSchema = z.object({
  name: z.string().trim().min(1, "Agent name is required").max(100, "Name must be under 100 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(500, "Description must be under 500 characters"),
  category: z.string().min(1, "Category is required"),
  pricing_model: z.string().min(1, "Pricing model is required"),
  price: z.string().trim().min(1, "Price is required").max(20, "Price too long"),
});

const categories = ["Smart Contract", "DeFi", "Security", "Analytics", "NFT", "DAO", "Infrastructure", "Other"];
const pricingModels = ["Per Use", "Monthly", "Annual", "Free"];
const icons = ["🔍", "📊", "⚡", "🔐", "📋", "🤖", "🛡️", "💰"];
const iconBgs = [
  "rgba(0,212,255,0.1)", "rgba(168,85,247,0.1)", "rgba(34,197,94,0.1)",
  "rgba(249,115,22,0.1)", "rgba(236,72,153,0.1)", "rgba(59,130,246,0.1)",
];

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  rating: number;
  review_count: number;
  is_published: boolean;
  icon: string;
  icon_bg: string;
  created_at: string;
}

const SellerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeNav, setActiveNav] = useState(0);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Form state
  const [form, setForm] = useState({
    name: "", description: "", category: "", pricing_model: "Per Use", price: "",
  });

  const sideNav = ["📊 Overview", "🤖 My Agents", "💰 Earnings", "📈 Analytics"];

  const fetchAgents = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("agents")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });
    setAgents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
  }, [user]);

  const totalEarnings = agents.length * 0; // Placeholder — would come from transactions
  const totalViews = agents.reduce((sum, a) => sum + a.review_count, 0);

  const stats = [
    { lbl: "Total Earnings", val: `$${totalEarnings.toFixed(2)}`, chg: "From all agents", icon: "💰" },
    { lbl: "Agents Listed", val: String(agents.length), chg: `${agents.filter(a => a.is_published).length} active`, icon: "🤖" },
    { lbl: "Total Reviews", val: String(totalViews), chg: "Across all agents", icon: "📈" },
    { lbl: "Avg Rating", val: agents.length ? (agents.reduce((s, a) => s + a.rating, 0) / agents.length).toFixed(1) : "—", chg: agents.length ? `${agents.length} agents` : "No agents yet", icon: "⭐" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const result = agentSchema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.errors.forEach((err) => { errs[err.path[0] as string] = err.message; });
      setFormErrors(errs);
      return;
    }

    if (!user) return;
    setSubmitting(true);

    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomBg = iconBgs[Math.floor(Math.random() * iconBgs.length)];
    const priceLabel = form.pricing_model === "Free" ? "Free" : `$${form.price}/${form.pricing_model === "Per Use" ? "use" : form.pricing_model === "Monthly" ? "mo" : "yr"}`;

    const { error } = await supabase.from("agents").insert({
      name: result.data.name,
      description: result.data.description,
      category: result.data.category,
      price: priceLabel,
      seller_id: user.id,
      icon: randomIcon,
      icon_bg: randomBg,
      is_published: false,
      tags: [result.data.category.toLowerCase()],
    });

    setSubmitting(false);
    if (error) {
      toast({ title: "Failed to submit agent", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Agent submitted!", description: "Your agent is pending review." });
      setForm({ name: "", description: "", category: "", pricing_model: "Per Use", price: "" });
      setShowForm(false);
      fetchAgents();
    }
  };

  const getStatusBadge = (published: boolean) => {
    if (published) return { label: "Active", cls: "bg-success/10 text-success" };
    return { label: "Pending", cls: "bg-[rgba(255,170,0,0.1)] text-[#FFAA00]" };
  };

  return (
    <div className="min-h-screen pt-[60px]">
      <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] min-h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <div className="hidden md:block bg-bg2 border-r border-border p-4 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
          <div className="text-[0.7rem] font-semibold tracking-wider uppercase text-muted-foreground px-3 mb-3">Seller Hub</div>
          {sideNav.map((n, i) => (
            <div key={n} onClick={() => setActiveNav(i)} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors mb-0.5 ${activeNav === i ? "bg-bg3 text-primary" : "text-muted-foreground hover:bg-bg3 hover:text-foreground"}`}>{n}</div>
          ))}
        </div>

        {/* Main */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h2 className="font-display font-extrabold text-2xl">Seller Dashboard</h2>
              <p className="text-muted-foreground text-sm">Track your agents' performance and earnings.</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              + List New Agent
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.lbl} className="bg-card border border-border rounded-xl p-5">
                <div className="text-[0.775rem] text-muted-foreground mb-2">{s.lbl}</div>
                <div className="font-display text-2xl font-extrabold">{s.val}</div>
                <div className="text-xs text-success mt-0.5">{s.chg}</div>
              </div>
            ))}
          </div>

          {/* Agent Submission Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
              <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display font-bold text-lg">Submit New Agent</h3>
                  <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground text-xl leading-none">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1.5">Agent Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary"
                      placeholder="e.g. SmartAudit Agent"
                      maxLength={100}
                    />
                    {formErrors.name && <p className="text-destructive text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1.5">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary resize-none"
                      placeholder="Describe what your agent does..."
                      maxLength={500}
                    />
                    {formErrors.description && <p className="text-destructive text-xs mt-1">{formErrors.description}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1.5">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary"
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {formErrors.category && <p className="text-destructive text-xs mt-1">{formErrors.category}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1.5">Pricing Model</label>
                    <div className="grid grid-cols-4 gap-2">
                      {pricingModels.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setForm({ ...form, pricing_model: m })}
                          className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                            form.pricing_model === m
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-bg2 text-muted-foreground hover:border-muted-foreground"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                    {formErrors.pricing_model && <p className="text-destructive text-xs mt-1">{formErrors.pricing_model}</p>}
                  </div>
                  {form.pricing_model !== "Free" && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1.5">Price ($)</label>
                      <input
                        type="text"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value.replace(/[^0-9.]/g, "") })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary"
                        placeholder="0.05"
                        maxLength={20}
                      />
                      {formErrors.price && <p className="text-destructive text-xs mt-1">{formErrors.price}</p>}
                    </div>
                  )}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-bg3 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit Agent"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Agents Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h3 className="font-display font-bold text-sm">Your Agents</h3>
              <span className="text-xs text-muted-foreground">{agents.length} total</span>
            </div>
            {loading ? (
              <div className="px-6 py-12 text-center text-sm text-muted-foreground">Loading agents...</div>
            ) : agents.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-muted-foreground text-sm mb-3">You haven't listed any agents yet.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  + Submit Your First Agent
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-bg3">
                      {["Agent Name", "Category", "Price", "Rating", "Reviews", "Status"].map((h) => (
                        <th key={h} className="text-left px-6 py-2.5 text-[0.73rem] font-semibold tracking-wider uppercase text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((a) => {
                      const badge = getStatusBadge(a.is_published);
                      return (
                        <tr key={a.id} className="border-t border-border">
                          <td className="px-6 py-3 text-sm">
                            <span className="mr-2">{a.icon}</span>{a.name}
                          </td>
                          <td className="px-6 py-3 text-sm text-muted-foreground">{a.category}</td>
                          <td className="px-6 py-3 text-sm">{a.price}</td>
                          <td className="px-6 py-3 text-sm">⭐ {a.rating}</td>
                          <td className="px-6 py-3 text-sm">{a.review_count}</td>
                          <td className="px-6 py-3 text-sm">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.73rem] font-medium ${badge.cls}`}>
                              ● {badge.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
