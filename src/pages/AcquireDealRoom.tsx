import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const sampleProjects: Record<string, { name: string; logo: string; desc: string; mrr: string; arr: string; growth: string; price: string; multiple: string; overview: string }> = {
  "acq-1": { name: "AutoReply AI", logo: "💬", desc: "AI customer support SaaS", mrr: "$4,200", arr: "$50,400", growth: "+22%", price: "$85,000", multiple: "1.7x", overview: "AutoReply AI automates customer support for e-commerce stores with AI-powered responses. Currently serving 120+ active merchants with a 95% satisfaction rate." },
  "acq-2": { name: "ChainScan Pro", logo: "🔍", desc: "Smart contract scanner", mrr: "$6,800", arr: "$81,600", growth: "+35%", price: "$150,000", multiple: "1.8x", overview: "ChainScan Pro provides automated smart contract vulnerability scanning for Solidity developers. 2,000+ registered users and growing 35% MoM." },
  "acq-3": { name: "DataPipe Agent", logo: "📊", desc: "ETL pipeline builder", mrr: "$3,500", arr: "$42,000", growth: "+18%", price: "$65,000", multiple: "1.5x", overview: "DataPipe Agent automates ETL pipelines for data teams. Integrates with 20+ data sources. Used by 80+ companies." },
  "acq-4": { name: "NFT Valuator", logo: "🎨", desc: "NFT price prediction", mrr: "$2,100", arr: "$25,200", growth: "+12%", price: "$42,000", multiple: "1.7x", overview: "NFT Valuator uses ML models to predict NFT values across major marketplaces. 500+ daily active users." },
  "acq-5": { name: "YieldMax Bot", logo: "⚡", desc: "DeFi yield optimizer", mrr: "$8,900", arr: "$106,800", growth: "+40%", price: "$200,000", multiple: "1.9x", overview: "YieldMax Bot optimizes DeFi yield farming across 15+ protocols. 500+ active users with $2M+ TVL managed." },
  "acq-6": { name: "CodeReview AI", logo: "🤖", desc: "Automated code review", mrr: "$5,400", arr: "$64,800", growth: "+28%", price: "$110,000", multiple: "1.7x", overview: "CodeReview AI provides automated PR reviews on GitHub. Currently integrated with 300+ repositories." },
};

const AcquireDealRoom = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [offerName, setOfferName] = useState("");
  const [offerEmail, setOfferEmail] = useState("");
  const [offerAmount, setOfferAmount] = useState("");
  const [offerMessage, setOfferMessage] = useState("");

  const project = sampleProjects[id || ""] || sampleProjects["acq-1"];

  const handleOffer = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Offer Submitted!", description: "We'll connect you with the seller within 24 hours." });
    setOfferName(""); setOfferEmail(""); setOfferAmount(""); setOfferMessage("");
  };

  return (
    <div className="min-h-screen pt-[60px]">
      <section className="py-12">
        <div className="container">
          <Link to="/acquire" className="text-sm text-primary hover:underline mb-6 inline-block">← Back to Listings</Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">{project.logo}</div>
                  <div>
                    <h1 className="font-display font-extrabold text-2xl">{project.name}</h1>
                    <p className="text-muted-foreground text-sm">{project.desc}</p>
                  </div>
                </div>
                <h3 className="font-display font-bold text-sm mb-3">Project Overview</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.overview}</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="font-display font-bold text-sm mb-4">Financial Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "MRR", value: project.mrr },
                    { label: "ARR", value: project.arr },
                    { label: "Growth", value: project.growth },
                    { label: "Multiple", value: project.multiple },
                  ].map((s) => (
                    <div key={s.label} className="bg-bg2 rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                      <div className="font-display font-bold text-lg text-primary">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NDA */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="font-display font-bold text-sm mb-4">Access Full Details</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={ndaAccepted} onChange={(e) => setNdaAccepted(e.target.checked)} className="mt-1 accent-[hsl(var(--primary))]" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    I agree to the Non-Disclosure Agreement (NDA). I understand that all financial data, customer information, and proprietary details shared in this deal room are confidential.
                  </span>
                </label>
                {ndaAccepted && (
                  <div className="mt-6 p-4 bg-bg2 rounded-lg border border-primary/20">
                    <p className="text-sm text-primary font-medium">✅ NDA accepted — full financials, customer data, and tech stack details are now visible in the documents section below.</p>
                    <div className="mt-4 space-y-2">
                      {["Revenue_Report_Q4.pdf", "Customer_Metrics.pdf", "Tech_Stack_Overview.pdf"].map((d) => (
                        <div key={d} className="flex items-center justify-between p-3 bg-bg3 rounded-lg">
                          <span className="text-sm">📄 {d}</span>
                          <span className="text-xs text-primary cursor-pointer hover:underline">Download</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="text-xs text-muted-foreground mb-1">Asking Price</div>
                  <div className="font-display font-extrabold text-3xl text-primary">{project.price}</div>
                </div>
                <button className="w-full py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity mb-3">
                  Schedule Call with Seller
                </button>
                <button className="w-full py-3 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">
                  Request More Info
                </button>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display font-bold text-sm mb-4">Make an Offer</h3>
                <form onSubmit={handleOffer} className="space-y-3">
                  <input value={offerName} onChange={(e) => setOfferName(e.target.value)} required placeholder="Your Name" className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
                  <input value={offerEmail} onChange={(e) => setOfferEmail(e.target.value)} required type="email" placeholder="Email" className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
                  <input value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} required placeholder="Offer Amount ($)" className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary" />
                  <textarea value={offerMessage} onChange={(e) => setOfferMessage(e.target.value)} rows={3} placeholder="Message to seller..." className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary resize-none" />
                  <button type="submit" className="w-full py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Submit Offer →</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AcquireDealRoom;
