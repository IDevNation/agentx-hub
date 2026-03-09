import { useState } from "react";
import { Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const contactItems = [
  { icon: "📧", title: "Email", desc: "hello@agentx.io" },
  { icon: "𝕏", title: "Twitter / X", desc: "@agentx_io" },
  { icon: "in", title: "LinkedIn", desc: "linkedin.com/company/agentx" },
];

const subjects = ["General", "Acquisition Inquiry", "Investment", "Partnership", "Support"];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "General", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "General", message: "" });
  };

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen pt-[60px]">
      <section className="py-8 pb-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-8 items-start">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Contact Us</div>
              <h1 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-tight mb-4">Let's Talk</h1>
              <p className="text-muted-foreground max-w-[520px] mb-10">Have questions? Want to list your agents? Interested in enterprise?</p>

              <div className="flex flex-col gap-6">
                {contactItems.map((c) => (
                  <div key={c.title} className="flex gap-4 items-start">
                    <div className="w-[42px] h-[42px] rounded-[10px] bg-primary/10 border border-primary/15 flex items-center justify-center text-base shrink-0">{c.icon}</div>
                    <div><h4 className="font-semibold text-sm mb-0.5">{c.title}</h4><p className="text-[0.825rem] text-muted-foreground">{c.desc}</p></div>
                  </div>
                ))}
                <div className="flex gap-4 items-start">
                  <div className="w-[42px] h-[42px] rounded-[10px] bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0"><Github size={16} /></div>
                  <div><h4 className="font-semibold text-sm mb-0.5">GitHub</h4><p className="text-[0.825rem] text-muted-foreground">github.com/agentx-io</p></div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-bg2 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground">📬 Average response time: <strong className="text-foreground">under 24 hours</strong></p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-display font-bold mb-6">Send a Message</h3>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Your Name</label>
                  <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="John Doe" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm font-body outline-none transition-colors focus:border-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Email Address</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required placeholder="john@company.com" className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm font-body outline-none transition-colors focus:border-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Subject</label>
                  <select value={form.subject} onChange={(e) => update("subject", e.target.value)} className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm font-body outline-none transition-colors focus:border-primary">
                    {subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Message</label>
                  <textarea rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} required placeholder="Tell us what you're looking for..." className="px-3.5 py-2.5 rounded-lg border border-border bg-bg2 text-foreground text-sm font-body outline-none transition-colors focus:border-primary resize-none" />
                </div>
                <button type="submit" className="w-full px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Send Message →</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
