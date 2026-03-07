const posts = [
  { icon: "🔍", tag: "Security", title: "Top 10 Smart Contract Vulnerabilities in 2025", desc: "A deep dive into the most exploited vulnerabilities in Solidity contracts this year.", read: "5 min read", date: "Mar 2025" },
  { icon: "🤖", tag: "AI Agents", title: "Why Pay-Per-Use is the Future of AI Tooling", desc: "The subscription model is broken for AI tools. Here's why usage-based pricing wins.", read: "4 min read", date: "Feb 2025" },
  { icon: "⛓️", tag: "Web3", title: "On-Chain Reputation: Why Your Reviews Should Live on Blockchain", desc: "Centralized reviews are broken. Here's how blockchain changes the trust game.", read: "6 min read", date: "Jan 2025" },
];

const Blog = () => (
  <div className="min-h-screen pt-[60px]">
    <section className="py-16">
      <div className="container">
        <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Resources</div>
        <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-tight">Blog & Insights</h1>
        <p className="text-muted-foreground mt-2 max-w-[520px]">Deep dives on AI agents, Web3 security, and decentralized automation.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {posts.map((p) => (
            <div key={p.title} className="bg-card border border-border rounded-[14px] overflow-hidden transition-all cursor-pointer hover:border-primary hover:-translate-y-[3px]">
              <div className="h-[150px] bg-gradient-to-br from-bg3 to-bg2 flex items-center justify-center text-5xl border-b border-border">{p.icon}</div>
              <div className="p-5">
                <div className="text-[0.7rem] font-semibold tracking-wider uppercase text-primary mb-2">{p.tag}</div>
                <h3 className="font-display text-[0.95rem] font-bold leading-snug mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="flex justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  <span>{p.read}</span>
                  <span>{p.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
