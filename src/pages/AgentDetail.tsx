import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ReviewSection from "@/components/ReviewSection";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [selected, setSelected] = useState(0);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [demosUsed, setDemosUsed] = useState(0);
  const [demoLoading, setDemoLoading] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const fetchAgent = async () => {
      if (!id) { setLoading(false); return; }
      const { data } = await supabase.from("agents").select("*").eq("id", id).single();
      if (data) setAgent(data);
      setLoading(false);
    };
    fetchAgent();
  }, [id]);

  useEffect(() => {
    const fetchDemoUsage = async () => {
      if (!user || !id) return;
      const { count } = await supabase
        .from("demo_usage")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("agent_id", id);
      setDemosUsed(count ?? 0);
    };
    fetchDemoUsage();
  }, [user, id]);

  const remainingDemos = FREE_DEMO_LIMIT - demosUsed;
  const hasFreeDemos = remainingDemos > 0;

  const handleRunDemo = async () => {
    if (!user) { toast.error("Please sign in to run the demo"); return; }
    if (!hasFreeDemos) return;
    if (!id) return;

    setDemoLoading(true);
    const { error } = await supabase.from("demo_usage").insert({ user_id: user.id, agent_id: id });
    if (error) {
      toast.error("Failed to run demo");
    } else {
      setDemosUsed((prev) => prev + 1);
      toast.success("Demo executed successfully!");
    }
    setDemoLoading(false);
  };

  const parsePrice = (priceStr: string): number => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 99 : num;
  };

  const handlePayment = useCallback(async () => {
    if (!user || !agent || !id) return;

    setPaymentLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load payment gateway");
      setPaymentLoading(false);
      return;
    }

    const amount = parsePrice(agent.price);

    // Get session token
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;
    if (!token) {
      toast.error("Please sign in to make a payment");
      setPaymentLoading(false);
      return;
    }

    // Create order via edge function
    const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
      body: { agent_id: id, amount, agent_name: agent.name },
    });

    if (error || !data?.order_id) {
      toast.error("Failed to create payment order");
      setPaymentLoading(false);
      return;
    }

    const razorpayOptions = {
      key: data.key_id,
      amount: data.amount,
      currency: data.currency,
      name: "Agent Marketplace",
      description: `Purchase: ${agent.name}`,
      order_id: data.order_id,
      handler: async (response: any) => {
        // Record transaction
        const { error: txError } = await supabase.from("transactions").insert({
          agent_id: id,
          buyer_id: user.id,
          action: "purchase",
          cost: amount,
          status: "complete",
        });
        if (txError) {
          toast.error("Payment recorded but failed to save transaction");
        } else {
          toast.success("Payment successful! You now have access to this agent.");
        }
        setPaymentModalOpen(false);
      },
      modal: {
        ondismiss: () => {
          setPaymentLoading(false);
        },
      },
      prefill: {
        email: user.email,
      },
      theme: {
        color: "#6366f1",
      },
    };

    const rzp = new window.Razorpay(razorpayOptions);
    rzp.on("payment.failed", (resp: any) => {
      toast.error("Payment failed: " + (resp.error?.description || "Unknown error"));
    });
    rzp.open();
    setPaymentLoading(false);
    setPaymentModalOpen(false);
  }, [user, agent, id]);

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
                {hasFreeDemos ? (
                  <>
                    <textarea
                      className="w-full bg-background border border-border rounded-lg p-4 text-foreground text-sm font-mono resize-y min-h-[120px] outline-none focus:border-primary placeholder:text-muted-foreground"
                      placeholder="// Paste your input here to try for free..."
                    />
                    <div className="flex gap-3 mt-4 flex-wrap items-center">
                      <button
                        onClick={handleRunDemo}
                        disabled={demoLoading}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {demoLoading ? "Running..." : "▶ Run Free Demo"}
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {remainingDemos} free demo{remainingDemos !== 1 ? "s" : ""} remaining
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-foreground font-semibold mb-2">Free demos used up</p>
                    <p className="text-muted-foreground text-sm mb-4">Upgrade to continue using this agent.</p>
                    <button
                      onClick={() => setPaymentModalOpen(true)}
                      className="px-6 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Pay ₹{parsePrice(agent.price)} to Continue
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            <ReviewSection agentId={agent.id} />
          </div>

          {/* Buy Box */}
          <div>
            <div className="sticky top-20 bg-card border border-border rounded-2xl p-6">
              <div className="font-display text-[2rem] font-extrabold mb-1">
                ₹{parsePrice(agent.price)} <span className="text-base font-body text-muted-foreground font-normal">/ use</span>
              </div>
              <div className={`text-xs mb-6 ${hasFreeDemos ? "text-green-500" : "text-destructive"}`}>{hasFreeDemos ? `✓ ${remainingDemos} free demo${remainingDemos !== 1 ? "s" : ""} remaining` : "✗ Free demos used"}</div>

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

              {hasFreeDemos ? (
                <button
                  onClick={handleRunDemo}
                  disabled={demoLoading}
                  className="w-full px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity mb-2 disabled:opacity-50"
                >
                  {demoLoading ? "Running..." : "Start Free Demo"}
                </button>
              ) : (
                <button
                  onClick={() => setPaymentModalOpen(true)}
                  className="w-full px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity mb-2"
                >
                  Pay ₹{parsePrice(agent.price)} Now
                </button>
              )}
              <button className="w-full px-4 py-3 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">Add to Workspace</button>

              <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground flex flex-col gap-1.5">
                <span>✓ No credit card for demo</span>
                <span>✓ Pay only what you use</span>
                <span>✓ Secure Razorpay checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Access</DialogTitle>
            <DialogDescription>
              Pay ₹{agent ? parsePrice(agent.price) : 0} to get full access to {agent?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: agent?.icon_bg }}>{agent?.icon}</div>
              <div>
                <p className="font-semibold text-sm">{agent?.name}</p>
                <p className="text-xs text-muted-foreground">{agent?.category}</p>
              </div>
              <div className="ml-auto font-bold text-lg">₹{agent ? parsePrice(agent.price) : 0}</div>
            </div>
            <button
              onClick={handlePayment}
              disabled={paymentLoading}
              className="w-full px-4 py-3 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {paymentLoading ? "Processing..." : `Pay ₹${agent ? parsePrice(agent.price) : 0} with Razorpay`}
            </button>
            <p className="text-center text-xs text-muted-foreground">Secured by Razorpay · INR payments</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentDetail;
