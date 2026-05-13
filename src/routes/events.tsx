import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "./alumni";
import { events } from "@/data/alumni";


function useCountdown(target: string) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(target).getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function EventsPage() {
  const featured = events[0];
  const cd = useCountdown(featured.date);

  return (
    <>
      <PageHeader title="Events" subtitle="Summits · Webinars · Meetups · Reunions" />
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Featured with countdown */}
        <Reveal>
          <GlassCard className="!p-8 md:!p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-40" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs text-[var(--neon-pink)] font-semibold uppercase tracking-wider">Featured · Flagship</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">{featured.title}</h2>
                <p className="mt-3 text-muted-foreground flex items-center gap-2">
                  <MapPin className="size-4" /> {featured.location}
                </p>
                <p className="mt-1 text-muted-foreground flex items-center gap-2">
                  <Users className="size-4" /> {featured.attending.toLocaleString()} attending
                </p>
                <button className="mt-6 px-6 py-3 rounded-xl font-semibold bg-[var(--gradient-primary)] text-white glow-purple hover:scale-105 transition-transform">
                  RSVP Now
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { v: cd.d, l: "Days" },
                  { v: cd.h, l: "Hours" },
                  { v: cd.m, l: "Min" },
                  { v: cd.s, l: "Sec" },
                ].map((b) => (
                  <div key={b.l} className="glass rounded-xl p-4 text-center">
                    <div className="text-3xl md:text-4xl font-bold font-display text-gradient tabular-nums">
                      {String(b.v).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{b.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Timeline */}
        <h3 className="mt-16 mb-6 font-display text-2xl font-bold">Upcoming Timeline</h3>
        <div className="relative pl-6 md:pl-8 space-y-4 before:absolute before:left-2 md:before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-[var(--neon-cyan)] before:via-[var(--neon-purple)] before:to-[var(--neon-pink)]">
          {events.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.05}>
              <div className="relative">
                <div className="absolute -left-[22px] md:-left-[26px] top-6 size-3 rounded-full bg-[var(--neon-cyan)] glow-cyan" />
                <GlassCard glow="cyan">
                  <div className="flex flex-wrap items-start gap-4 justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{e.image}</div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[var(--neon-cyan)]">{e.type}</span>
                        <h4 className="font-semibold mt-1">{e.title}</h4>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="size-3" /> {new Date(e.date).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" })}</span>
                          <span className="flex items-center gap-1"><MapPin className="size-3" /> {e.location}</span>
                          <span className="flex items-center gap-1"><Users className="size-3" /> {e.attending}</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-xs rounded-lg glass hover:border-[var(--neon-cyan)]/40 inline-flex items-center gap-1">
                      <Calendar className="size-3" /> Register
                    </button>
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default function RouteWrapper(){
  useEffect(()=>{ document.title = "Events — AlumniNexus"; const m=document.querySelector('meta[name="description"]')||(()=>{const e=document.createElement('meta');e.setAttribute('name','description');document.head.appendChild(e);return e;})(); m.setAttribute('content', "Join summits, webinars and meetups with the global alumni community."); },[]);
  return <EventsPage />;
}
