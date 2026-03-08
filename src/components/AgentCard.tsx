import { Link } from "react-router-dom";

interface AgentCardProps {
  id: string;
  icon: string;
  iconBg: string;
  name: string;
  description: string;
  tags: string[];
  price: string;
  tryFree?: boolean;
  rating: string;
}

const AgentCard = ({ icon, iconBg, name, description, tags, price, tryFree = true, rating }: AgentCardProps) => (
  <Link
    to="/agent-detail"
    className="block bg-card border border-border rounded-[14px] p-6 transition-all cursor-pointer hover:border-primary hover:-translate-y-[3px] hover:shadow-[0_12px_40px_hsl(var(--primary)/0.08)]"
  >
    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: iconBg }}>
      {icon}
    </div>
    <h3 className="font-display text-base font-bold mb-1">{name}</h3>
    <p className="text-[0.825rem] text-muted-foreground leading-relaxed mb-4">{description}</p>
    <div className="flex flex-wrap gap-1.5 mb-4">
      {tags.map((t) => (
        <span key={t} className="text-[0.7rem] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15 font-medium">{t}</span>
      ))}
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-border">
      <div className="font-display font-bold text-sm">
        {price} {tryFree && <span className="font-body text-xs text-success font-medium">● Try Free</span>}
      </div>
      <div className="text-sm text-muted-foreground">{rating}</div>
    </div>
  </Link>
);

export default AgentCard;
