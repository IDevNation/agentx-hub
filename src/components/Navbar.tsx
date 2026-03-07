import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/pricing", label: "Pricing" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-nav border-b border-border flex items-center justify-between px-6 backdrop-blur-xl">
        <Link to="/coming-soon" className="font-display font-extrabold text-lg text-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))] animate-pulse-dot" />
          AgentX
        </Link>

        <ul className="hidden md:flex gap-1 list-none">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-muted-foreground text-sm font-medium px-3 py-1.5 rounded-md transition-colors hover:text-foreground hover:bg-bg3"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link to="/buyer-dashboard" className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground transition-colors hover:border-primary hover:text-primary">
            Dashboard
          </Link>
          <Link to="/marketplace" className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Browse Agents
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg border border-border bg-bg3"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 z-40 bg-bg2 border-b border-border flex flex-col p-4 pt-2">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="text-muted-foreground text-sm font-medium p-3 rounded-lg transition-colors hover:text-foreground hover:bg-bg3"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <Link to="/buyer-dashboard" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground">Dashboard</Link>
            <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground">Browse</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
