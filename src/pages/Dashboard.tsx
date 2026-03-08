import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import BuyerDashboard from "./BuyerDashboard";
import SellerDashboard from "./SellerDashboard";

const Dashboard = () => {
  const { role } = useAuth();
  const [mode, setMode] = useState<"buyer" | "seller">(role === "seller" ? "seller" : "buyer");

  return (
    <div className="min-h-screen pt-[60px]">
      {/* Mode Switcher Bar */}
      <div className="bg-bg2 border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Currently viewing: <span className="text-foreground font-semibold">{mode === "buyer" ? "Buyer" : "Seller"} Mode</span>
          </span>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium transition-colors ${mode === "buyer" ? "text-primary" : "text-muted-foreground"}`}>Buyer</span>
            <Switch
              checked={mode === "seller"}
              onCheckedChange={(checked) => setMode(checked ? "seller" : "buyer")}
            />
            <span className={`text-xs font-medium transition-colors ${mode === "seller" ? "text-primary" : "text-muted-foreground"}`}>Seller</span>
          </div>
        </div>
      </div>

      {/* Render dashboard based on mode — remove the pt-[60px] from children since we handle it here */}
      <div className="-mt-[60px]">
        {mode === "seller" ? <SellerDashboard /> : <BuyerDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
