import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    // Update profile role after signup
    if (data.user) {
      await supabase.from("profiles").update({ role }).eq("user_id", data.user.id);
    }
    setLoading(false);
    toast({ title: "Account created!", description: "Check your email to confirm your account." });
    navigate(role === "seller" ? "/seller-dashboard" : "/login");
  };

  const handleGoogleSignup = async () => {
    // Store selected role in localStorage so we can apply it after OAuth redirect
    localStorage.setItem("signup_role", role);
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/buyer-dashboard",
    });
    if (result?.error) {
      toast({ title: "Google signup failed", description: String(result.error), variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[60px] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-display font-extrabold text-2xl mb-2">Create Account</h1>
            <p className="text-muted-foreground text-sm">Join AgentX and start using AI agents</p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="block text-sm text-muted-foreground mb-2">I want to</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                  role === "buyer"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-bg2 text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                <span className="text-2xl">🛒</span>
                <span>Use Agents</span>
                <span className="text-xs font-normal opacity-70">Browse & pay per use</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("seller")}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                  role === "seller"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-bg2 text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                <span className="text-2xl">🚀</span>
                <span>Sell Agents</span>
                <span className="text-xs font-normal opacity-70">List & earn revenue</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border bg-bg2 text-foreground text-sm font-medium hover:border-primary hover:text-primary transition-colors mb-6 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Creating account..." : `Create ${role === "seller" ? "Seller" : "Buyer"} Account`}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
