import { useState, useEffect } from "react";
import { Github } from "lucide-react";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [countdown, setCountdown] = useState({ d: "30", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const launch = new Date();
    launch.setDate(launch.getDate() + 30);
    const tick = () => {
      const diff = launch.getTime() - Date.now();
      setCountdown({
        d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleJoin = () => {
    if (email && email.includes("@")) {
      setJoined(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen pt-[60px] grid-bg">
      <div className="relative z-10 max-w-[680px] mx-auto text-center px-6 pt-20 pb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
          🚀 Launching Soon
        </div>
        <h1 className="font-display font-extrabold text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] tracking-tight mb-5">
          The AI Agent<br />Marketplace for <span className="text-primary">Web3</span>
        </h1>
        <p className="text-[1.05rem] text-muted-foreground leading-[1.7] font-light mb-8">
          Discover, try, and pay only for what you use. No surprise subscriptions. No wasted money. Just powerful AI agents when you need them.
        </p>

        <div className="flex gap-2 max-w-[420px] mx-auto mb-8 flex-wrap">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={joined ? "✓ You're on the list!" : "Enter your email for early access"}
            className="flex-1 min-w-[200px] px-4 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm font-body outline-none focus:border-primary placeholder:text-muted-foreground"
          />
          <button onClick={handleJoin} className="px-4 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Join Waitlist
          </button>
        </div>

        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          {[
            { val: countdown.d, label: "Days" },
            { val: countdown.h, label: "Hours" },
            { val: countdown.m, label: "Mins" },
            { val: countdown.s, label: "Secs" },
          ].map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-1">
              <div className="font-display text-[1.75rem] font-bold bg-bg2 border border-border rounded-[10px] px-4 py-3 min-w-[60px] text-center leading-none">{c.val}</div>
              <div className="text-[0.7rem] text-muted-foreground uppercase tracking-wider">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 justify-center mb-12">
          <a href="#" className="w-[42px] h-[42px] rounded-[10px] border border-border bg-bg2 text-muted-foreground flex items-center justify-center text-sm font-semibold transition-colors hover:text-primary hover:border-primary">𝕏</a>
          <a href="#" className="w-[42px] h-[42px] rounded-[10px] border border-border bg-bg2 text-muted-foreground flex items-center justify-center text-sm font-semibold transition-colors hover:text-primary hover:border-primary">in</a>
          <a href="#" className="w-[42px] h-[42px] rounded-[10px] border border-border bg-bg2 text-muted-foreground flex items-center justify-center transition-colors hover:text-primary hover:border-primary"><Github size={16} /></a>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[680px] mx-auto px-6 pb-16">
        {[
          { icon: "🤖", title: "AI Agent Marketplace", desc: "Discover hundreds of specialized AI agents built by developers worldwide." },
          { icon: "💳", title: "Pay Per Use", desc: "Try any agent free. Pay only for what you actually use — no surprise bills." },
          { icon: "⛓️", title: "On-Chain Reputation", desc: "Tamper-proof reviews on blockchain. Trust verified, not faked." },
        ].map((c) => (
          <div key={c.title} className="bg-bg2 border border-border rounded-xl p-5 text-left transition-colors hover:border-primary">
            <div className="text-2xl mb-3">{c.icon}</div>
            <h4 className="font-display text-sm font-bold mb-1">{c.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;
