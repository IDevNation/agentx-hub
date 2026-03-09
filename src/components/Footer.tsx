import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Footer = () => (
  <footer className="bg-bg2 border-t border-border py-12">
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div>
          <Link to="/" className="font-display font-extrabold text-lg text-foreground flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))] animate-pulse-dot" />
            AgentX
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
            The AI agent marketplace built for Web3. Try, use, pay — in that order.
          </p>
          <div className="flex gap-2 mt-4">
            <a href="#" className="w-[42px] h-[42px] rounded-[10px] border border-border bg-bg2 text-muted-foreground flex items-center justify-center text-sm font-semibold transition-colors hover:text-primary hover:border-primary">𝕏</a>
            <a href="#" className="w-[42px] h-[42px] rounded-[10px] border border-border bg-bg2 text-muted-foreground flex items-center justify-center text-sm font-semibold transition-colors hover:text-primary hover:border-primary">in</a>
            <a href="#" className="w-[42px] h-[42px] rounded-[10px] border border-border bg-bg2 text-muted-foreground flex items-center justify-center transition-colors hover:text-primary hover:border-primary"><Github size={14} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-4">Platform</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link>
            <Link to="/acquire" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Acquire</Link>
            <Link to="/invest" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Invest</Link>
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-4">Company</h4>
          <div className="flex flex-col gap-2">
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-4">Legal</h4>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-border flex flex-wrap justify-between items-center text-sm text-muted-foreground">
        <span>© 2025 AgentX. All rights reserved.</span>
        <span>Built for Web3 🔷</span>
      </div>
    </div>
  </footer>
);

export default Footer;
