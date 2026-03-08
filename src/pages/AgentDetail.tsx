import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ReviewSection from "@/components/ReviewSection";
import { toast } from "sonner";

const FREE_DEMO_LIMIT = 3;

const options = [
  { id: 0, icon: "💳", title: "Pay Per Use", desc: "$0.02 per scan · No commitment" },
  { id: 1, icon: "📅", title: "Monthly — $9/mo", desc: "Unlimited scans · Best for active projects" },
  { id: 2, icon: "🏢", title: "Enterprise", desc: "Custom pricing · API access" },
];

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  icon_bg: string;
  category: string;
  tags: string[];
  price: string;
  rating: number;
  review_count: number;
}

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState(0);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      if (!id) { setLoading(false); return; }
      const { data } = await supabase.from("agents").select("*").eq("id", id).single();
      if (data) setAgent(data);
      setLoading(false);
    };
    fetchAgent();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-[60px] flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!agent) return <div className="min-h-screen pt-[60px] flex items-center justify-center text-muted-foreground">Agent not found</div>;

  return (
    <div className="min-h-screen pt-[60px]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 py-10">
          {/* Left */}
          <div>
            <div className="flex items-start gap-4 mb-8 pb-8 border-b border-border">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[2rem] shrink-0" style={{ background: agent.icon_bg }}>{agent.icon}</div>
              <div>
                <h1 className="font-display text-2xl font-extrabold mb-1">{agent.name}</h1>
                <p className="text-muted-foreground text-sm">{agent.review_count} reviews · ⭐ {agent.rating}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {agent.tags.map((t) => (
                    <span key={t} className="text-[0.7rem] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15 font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-display font-bold mb-4">About This Agent</h3>
              <p className="text-muted-foreground text-sm leading-[1.7]">{agent.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-display font-bold mb-4">Live Demo — Free</h3>
              <div className="bg-card border border-border rounded-xl p-6">
                <textarea
                  className="w-full bg-background border border-border rounded-lg p-4 text-foreground text-sm font-mono resize-y min-h-[120px] outline-none focus:border-primary placeholder:text-muted-foreground"
                  placeholder="// Paste your input here to try for free..."
                />
                <div className="flex gap-3 mt-4 flex-wrap items-center">
                  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">▶ Run Free Demo</button>
                  <span className="text-xs text-muted-foreground">3 free scans remaining</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <ReviewSection agentId={agent.id} />
          </div>

          {/* Buy Box */}
          <div>
            <div className="sticky top-20 bg-card border border-border rounded-2xl p-6">
              <div className="font-display text-[2rem] font-extrabold mb-1">
                {agent.price} <span className="text-base font-body text-muted-foreground font-normal">/ use</span>
              </div>
              <div className="text-xs text-green-500 mb-6">✓ Try 3 scans completely free</div>

              <div className="flex flex-col gap-2 mb-6">
                {options.map((o) => (
                  <div
                    key={o.id}
                    onClick={() => setSelected(o.id)}
                    className={`p-3 rounded-[10px] border cursor-pointer transition-colors ${
                      selected === o.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <h4 className="text-sm font-semibold mb-0.5">{o.icon} {o.title}</h4>
                    <p className="text-[0.775rem] text-muted-foreground">{o.desc}</p>
                  </div>
                ))}
              </div>

              <button className="w-full px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity mb-2">Start Free Demo</button>
              <button className="w-full px-4 py-3 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">Add to Workspace</button>

              <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground flex flex-col gap-1.5">
                <span>✓ No credit card for demo</span>
                <span>✓ Pay only what you use</span>
                <span>✓ On-chain verified reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
