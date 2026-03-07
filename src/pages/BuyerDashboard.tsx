import { useState } from "react";
import { Link } from "react-router-dom";

const sideNav = ["📊 Dashboard", "🤖 My Agents", "💳 Billing & Usage", "⚙️ Settings"];
const stats = [
  { lbl: "Total Spent", val: "$2.71", chg: "↓ 43% vs subscription" },
  { lbl: "Agents Used", val: "3", chg: "+1 this month" },
  { lbl: "Total Queries", val: "36", chg: "↑ 12 from last month" },
  { lbl: "Saved vs Subs", val: "$147", chg: "Pay-per-use savings" },
];
const rows = [
  { agent: "🔍 SmartAudit Agent", action: "Contract Scan", date: "Today", cost: "$0.02", status: "Complete", cls: "bg-success/10 text-success" },
  { agent: "📊 DeFi Analytics", action: "Yield Analysis", date: "Today", cost: "$0.05", status: "Complete", cls: "bg-success/10 text-success" },
  { agent: "⚡ Gas Optimizer", action: "Contract Rewrite", date: "Yesterday", cost: "$0.03", status: "Complete", cls: "bg-success/10 text-success" },
];

const BuyerDashboard = () => {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="min-h-screen pt-[60px]">
      <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] min-h-[calc(100vh-60px)]">
        <div className="hidden md:block bg-bg2 border-r border-border p-4 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
          <div className="text-[0.7rem] font-semibold tracking-wider uppercase text-muted-foreground px-3 mb-3">Overview</div>
          {sideNav.map((n, i) => (
            <div key={n} onClick={() => setActiveNav(i)} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors mb-0.5 ${activeNav === i ? "bg-bg3 text-primary" : "text-muted-foreground hover:bg-bg3 hover:text-foreground"}`}>{n}</div>
          ))}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h2 className="font-display font-extrabold text-2xl">Good morning 👋</h2>
              <p className="text-muted-foreground text-sm">Here's your usage overview this month.</p>
            </div>
            <Link to="/marketplace" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">+ Add Agent</Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.lbl} className="bg-card border border-border rounded-xl p-5">
                <div className="text-[0.775rem] text-muted-foreground mb-2">{s.lbl}</div>
                <div className="font-display text-2xl font-extrabold">{s.val}</div>
                <div className="text-xs text-success mt-0.5">{s.chg}</div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h3 className="font-display font-bold text-sm">Recent Usage</h3>
              <button className="px-3 py-1 rounded-lg text-xs font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors">Export</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-bg3">
                    {["Agent", "Action", "Date", "Cost", "Status"].map((h) => (
                      <th key={h} className="text-left px-6 py-2.5 text-[0.73rem] font-semibold tracking-wider uppercase text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-6 py-3 text-sm">{r.agent}</td>
                      <td className="px-6 py-3 text-sm">{r.action}</td>
                      <td className="px-6 py-3 text-sm">{r.date}</td>
                      <td className="px-6 py-3 text-sm">{r.cost}</td>
                      <td className="px-6 py-3 text-sm"><span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.73rem] font-medium ${r.cls}`}>✓ {r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
