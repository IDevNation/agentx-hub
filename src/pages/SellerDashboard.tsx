import { useState } from "react";

const sideNav = ["📊 Overview", "🤖 My Agents", "💰 Earnings", "📈 Analytics", "➕ List New Agent"];
const stats = [
  { lbl: "Total Earnings", val: "$847", chg: "↑ 23% this month" },
  { lbl: "Active Agents", val: "4", chg: "1 pending review" },
  { lbl: "Total Uses", val: "12,483", chg: "↑ 18% from last month" },
  { lbl: "Avg Rating", val: "4.8 ⭐", chg: "204 reviews" },
];
const rows = [
  { name: "🔍 SmartAudit Agent", uses: "8,234", rev: "$612", rating: "⭐ 4.9", status: "Live", cls: "bg-success/10 text-success" },
  { name: "⚡ Gas Optimizer Pro", uses: "3,102", rev: "$189", rating: "⭐ 4.7", status: "Live", cls: "bg-success/10 text-success" },
  { name: "🔐 Access Control Checker", uses: "1,147", rev: "$46", rating: "⭐ 4.6", status: "Pending", cls: "bg-[rgba(255,170,0,0.1)] text-[#FFAA00]" },
  { name: "📋 ABI Decoder", uses: "—", rev: "—", rating: "—", status: "In Review", cls: "bg-accent/10 text-accent" },
];

const SellerDashboard = () => {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="min-h-screen pt-[60px]">
      <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] min-h-[calc(100vh-60px)]">
        <div className="hidden md:block bg-bg2 border-r border-border p-4 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
          <div className="text-[0.7rem] font-semibold tracking-wider uppercase text-muted-foreground px-3 mb-3">Seller Hub</div>
          {sideNav.map((n, i) => (
            <div key={n} onClick={() => setActiveNav(i)} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors mb-0.5 ${activeNav === i ? "bg-bg3 text-primary" : "text-muted-foreground hover:bg-bg3 hover:text-foreground"}`}>{n}</div>
          ))}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h2 className="font-display font-extrabold text-2xl">Seller Dashboard</h2>
              <p className="text-muted-foreground text-sm">Track your agents' performance and earnings.</p>
            </div>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">+ List New Agent</button>
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
              <h3 className="font-display font-bold text-sm">Your Agents</h3>
              <button className="px-3 py-1 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">+ Add New</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-bg3">
                    {["Agent Name", "Uses", "Revenue", "Rating", "Status"].map((h) => (
                      <th key={h} className="text-left px-6 py-2.5 text-[0.73rem] font-semibold tracking-wider uppercase text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-6 py-3 text-sm">{r.name}</td>
                      <td className="px-6 py-3 text-sm">{r.uses}</td>
                      <td className="px-6 py-3 text-sm">{r.rev}</td>
                      <td className="px-6 py-3 text-sm">{r.rating}</td>
                      <td className="px-6 py-3 text-sm"><span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.73rem] font-medium ${r.cls}`}>● {r.status}</span></td>
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

export default SellerDashboard;
