import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const dashboardPath = "/dashboard";

  const handleNavClick = (to: string) => {
    if (to.includes("#")) {
      const hash = to.split("#")[1];
      if (location.pathname === "/") {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/#acquire", label: "Acquire" },
    { to: "/#invest", label: "Invest" },
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
              <Link to={l.to} onClick={(e) => { if (l.to.includes("#")) { e.preventDefault(); handleNavClick(l.to); } }} className="text-muted-foreground text-sm font-medium px-3 py-1.5 rounded-md transition-colors hover:text-foreground hover:bg-bg3">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to={dashboardPath} className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground transition-colors hover:border-primary hover:text-primary">
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-bg3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground transition-colors hover:border-primary hover:text-primary">
                Sign In
              </Link>
              <Link to="/signup" className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Get Started
              </Link>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg border border-border bg-bg3"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 z-40 bg-bg2 border-b border-border flex flex-col p-4 pt-2">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={(e) => { if (l.to.includes("#")) { e.preventDefault(); handleNavClick(l.to); } setMobileOpen(false); }} className="text-muted-foreground text-sm font-medium p-3 rounded-lg transition-colors hover:text-foreground hover:bg-bg3">
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            {user ? (
              <>
                <Link to={dashboardPath} onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground">Dashboard</Link>
                <button onClick={() => { signOut(); setMobileOpen(false); }} className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium bg-bg3 text-muted-foreground">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
