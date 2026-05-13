import { useEffect } from "react";
import { Briefcase, MapPin, DollarSign, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "./alumni";
import { opportunities } from "@/data/alumni";


const tagColor: Record<string, string> = {
  Hot: "bg-[var(--neon-pink)]/20 border-[var(--neon-pink)]/40 text-[var(--neon-pink)]",
  Featured: "bg-[var(--neon-purple)]/20 border-[var(--neon-purple)]/40 text-[var(--neon-purple)]",
  Referral: "bg-[var(--neon-cyan)]/20 border-[var(--neon-cyan)]/40 text-[var(--neon-cyan)]",
  New: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
};

function CareersPage() {
  return (
    <>
      <PageHeader title="Careers & Opportunities" subtitle="Internships · Full-time roles · Alumni referrals" />
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.04}>
              <GlassCard glow="purple" className="h-full flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="size-12 rounded-xl grid place-items-center bg-[var(--gradient-primary)]">
                    <Briefcase className="size-5 text-white" />
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full border ${tagColor[o.tag]}`}>{o.tag}</span>
                </div>
                <h4 className="mt-4 font-semibold">{o.title}</h4>
                <p className="text-sm text-[var(--neon-cyan)]">{o.company}</p>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1"><MapPin className="size-3" /> {o.location}</p>
                  <p className="flex items-center gap-1"><DollarSign className="size-3" /> {o.salary} · {o.type}</p>
                </div>
                <div className="mt-auto pt-4 flex gap-2">
                  <button className="flex-1 text-xs px-3 py-2 rounded-lg bg-[var(--gradient-primary)] text-white font-semibold">Apply</button>
                  <button className="text-xs px-3 py-2 rounded-lg glass">Refer</button>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-4">
          <Reveal>
            <GlassCard glow="pink">
              <Sparkles className="size-6 text-[var(--neon-pink)]" />
              <h3 className="mt-3 font-display text-xl font-bold">Resume Review</h3>
              <p className="text-sm text-muted-foreground mt-2">Get your resume reviewed by alumni hiring managers within 48 hours.</p>
              <button className="mt-4 px-4 py-2 rounded-lg glass text-sm">Request Review</button>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard glow="cyan">
              <Sparkles className="size-6 text-[var(--neon-cyan)]" />
              <h3 className="mt-3 font-display text-xl font-bold">Career Roadmap</h3>
              <p className="text-sm text-muted-foreground mt-2">Personalized roadmaps from senior alumni in your dream role.</p>
              <button className="mt-4 px-4 py-2 rounded-lg glass text-sm">Build Roadmap</button>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default function RouteWrapper(){
  useEffect(()=>{ document.title = "Careers — AlumniNexus"; const m=document.querySelector('meta[name="description"]')||(()=>{const e=document.createElement('meta');e.setAttribute('name','description');document.head.appendChild(e);return e;})(); m.setAttribute('content', "Internships, full-time roles and exclusive alumni referrals from top companies."); },[]);
  return <CareersPage />;
}
