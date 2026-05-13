import { useEffect } from "react";
import { Star, Calendar, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { NeonAvatar } from "@/components/Avatar";
import { PageHeader } from "./alumni";
import { mentors } from "@/data/alumni";


function MentorshipPage() {
  return (
    <>
      <PageHeader title="Mentorship" subtitle="Get guidance from alumni shaping the industry today." />
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentors.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.04}>
              <GlassCard glow="cyan" className="h-full flex flex-col">
                <div className="flex items-start gap-3">
                  <NeonAvatar initials={m.avatar} size={64} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold truncate">{m.name}</h4>
                      {m.rating >= 4.9 && <Sparkles className="size-3 text-[var(--neon-pink)]" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-[var(--neon-cyan)]">
                        <Star className="size-3 fill-current" /> {m.rating}
                      </span>
                      <span className="text-muted-foreground">{m.sessions} sessions</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1">
                  {m.expertise.map((e) => (
                    <span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--neon-cyan)]/15 border border-[var(--neon-cyan)]/30">{e}</span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className={`text-xs flex items-center gap-1.5 ${m.available ? "text-emerald-400" : "text-muted-foreground"}`}>
                    <span className={`size-2 rounded-full ${m.available ? "bg-emerald-400 animate-pulse" : "bg-muted-foreground"}`} />
                    {m.available ? "Available" : "Busy"}
                  </span>
                  <button
                    disabled={!m.available}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[var(--gradient-primary)] text-white font-semibold disabled:opacity-40 inline-flex items-center gap-1 hover:scale-105 transition-transform"
                  >
                    <Calendar className="size-3" /> Book
                  </button>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default function RouteWrapper(){
  useEffect(()=>{ document.title = "Mentorship — AlumniNexus"; const m=document.querySelector('meta[name="description"]')||(()=>{const e=document.createElement('meta');e.setAttribute('name','description');document.head.appendChild(e);return e;})(); m.setAttribute('content', "Book 1:1 sessions with industry mentors across product, engineering, research and startups."); },[]);
  return <MentorshipPage />;
}
