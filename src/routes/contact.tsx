import { useState , useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, MapPin, Phone, Plus, Globe, MessageCircle } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "./alumni";


const faqs = [
  { q: "How do I join the network?", a: "Click 'Join Network' in the navbar and create your free account in seconds." },
  { q: "Is mentorship free?", a: "Yes — most mentors offer free 30-min intro sessions. Premium long-form mentorship is optional." },
  { q: "Can I post jobs as a recruiter?", a: "Verified alumni can post referrals. For company-wide hiring, please contact us." },
  { q: "Do you have regional chapters?", a: "Yes — chapters in 18 cities. Reach out to join or start one in your city." },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHeader title="Get in Touch" subtitle="Questions, ideas, partnerships — we read every message." />
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-8">
        <Reveal>
          <GlassCard glow="purple" className="!p-8">
            <h3 className="font-display text-2xl font-bold">Send a message</h3>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); }}
              className="mt-6 space-y-4"
            >
              <Field label="Name" type="text" />
              <Field label="Email" type="email" />
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Message</label>
                <textarea
                  required rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--neon-cyan)]/60 focus:ring-2 focus:ring-[var(--neon-cyan)]/20"
                />
              </div>
              <button className="w-full px-6 py-3 rounded-xl font-semibold bg-[var(--gradient-primary)] text-white glow-purple hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2">
                <Send className="size-4" /> Send Message
              </button>
              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-sm text-emerald-400 text-center"
                  >
                    ✓ Message sent! We'll be in touch soon.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </GlassCard>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-3">
              {[Globe, Mail, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="glass rounded-xl p-4 grid place-items-center hover:border-[var(--neon-cyan)]/40 hover:text-[var(--neon-cyan)] transition-all">
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <GlassCard className="space-y-3">
              <Detail icon={Mail} label="Email" value="hello@alumninexus.io" />
              <Detail icon={Phone} label="Phone" value="+91 98765 43210" />
              <Detail icon={MapPin} label="HQ" value="Bangalore · SF · London" />
            </GlassCard>
          </Reveal>
          <Reveal delay={0.2}>
            <GlassCard glow="pink">
              <h3 className="font-display text-xl font-bold mb-3">FAQ</h3>
              <div className="space-y-2">
                {faqs.map((f, i) => (
                  <div key={i} className="border-b border-white/10 last:border-0 pb-2">
                    <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-2 text-left">
                      <span className="text-sm font-semibold">{f.q}</span>
                      <Plus className={`size-4 transition-transform ${open === i ? "rotate-45" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {open === i && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="text-sm text-muted-foreground overflow-hidden"
                        >
                          <span className="block pb-2">{f.a}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1.5">{label}</label>
      <input required type={type}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--neon-cyan)]/60 focus:ring-2 focus:ring-[var(--neon-cyan)]/20" />
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-lg grid place-items-center bg-[var(--gradient-primary)]">
        <Icon className="size-4 text-white" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
}

export default function RouteWrapper(){
  useEffect(()=>{ document.title = "Contact — AlumniNexus"; const m=document.querySelector('meta[name="description"]')||(()=>{const e=document.createElement('meta');e.setAttribute('name','description');document.head.appendChild(e);return e;})(); m.setAttribute('content', "Get in touch with the AlumniNexus team. We"); },[]);
  return <ContactPage />;
}
