import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Award, Briefcase, Calendar, MapPin, Star } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { NeonAvatar } from "@/components/Avatar";
import { stats, alumni, achievements, regions } from "@/data/alumni";


function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-24 md:pt-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="glass rounded-full px-4 py-1.5 text-xs flex items-center gap-2">
            <span className="size-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
            New: Global Summit 2026 — Registration Open
            <ArrowRight className="size-3" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-center font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          The future of<br />
          <span className="text-gradient">alumni networks</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 max-w-2xl mx-auto text-center text-muted-foreground text-lg"
        >
          Connect with thousands of pioneers across the globe. Find mentors, unlock referrals,
          attend exclusive events, and accelerate your career — all in one futuristic network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/alumni" className="px-6 py-3 rounded-xl text-sm font-semibold bg-[var(--gradient-primary)] text-white glow-purple hover:scale-105 transition-transform inline-flex items-center gap-2">
            Explore Alumni <ArrowRight className="size-4" />
          </Link>
          <Link to="/mentorship" className="px-6 py-3 rounded-xl text-sm font-semibold glass hover:border-white/30 transition-all">
            Find Mentors
          </Link>
          <Link to="/login" className="px-6 py-3 rounded-xl text-sm font-semibold border border-[var(--neon-cyan)]/40 hover:bg-[var(--neon-cyan)]/10 transition-all">
            Join Community
          </Link>
        </motion.div>

        <div className="mt-16 flex justify-center gap-2 flex-wrap">
          {["AI & ML", "Startups", "Big Tech", "Research", "Design", "Finance"].map((t) => (
            <span key={t} className="text-xs px-3 py-1 rounded-full glass text-muted-foreground hover:text-foreground transition-colors">
              {t}
            </span>
          ))}
        </div>

        {/* Floating glass cards */}
        <div className="hidden md:block absolute top-32 left-4 animate-[float_7s_ease-in-out_infinite]">
          <GlassCard className="!p-4 w-48 rotate-[-6deg]">
            <div className="flex items-center gap-3">
              <NeonAvatar initials="SK" size={36} />
              <div>
                <p className="text-xs font-semibold">Sara · OpenAI</p>
                <p className="text-[10px] text-muted-foreground">Mentoring 12 students</p>
              </div>
            </div>
          </GlassCard>
        </div>
        <div className="hidden md:block absolute top-48 right-6 animate-[float_9s_ease-in-out_infinite]">
          <GlassCard className="!p-4 w-52 rotate-[5deg]">
            <p className="text-xs text-muted-foreground">Latest referral</p>
            <p className="text-sm font-semibold mt-1">SWE @ Google</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-[var(--neon-cyan)]">
              <Star className="size-3" /> 4.9 match
            </div>
          </GlassCard>
        </div>

        {/* Stats */}
        <Reveal delay={0.2}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Alumni", value: stats.alumni, color: "purple" as const },
              { icon: Star, label: "Mentors", value: stats.mentors, color: "cyan" as const },
              { icon: Briefcase, label: "Companies", value: stats.companies, color: "pink" as const },
              { icon: Calendar, label: "Events", value: stats.events, color: "purple" as const },
            ].map(({ icon: Icon, label, value, color }) => (
              <GlassCard key={label} glow={color} className="text-center">
                <Icon className="size-6 mx-auto mb-2 text-[var(--neon-cyan)]" />
                <div className="text-3xl md:text-4xl font-bold font-display text-gradient">
                  <AnimatedCounter value={value} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Featured Alumni */}
      <Section title="Featured Alumni" subtitle="Meet the pioneers shaping the world">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {alumni.slice(0, 4).map((a, i) => (
            <Reveal key={a.id} delay={i * 0.05}>
              <GlassCard glow="purple" className="text-center">
                <NeonAvatar initials={a.avatar} size={64} />
                <h4 className="mt-3 font-semibold">{a.name}</h4>
                <p className="text-xs text-muted-foreground">{a.role} · {a.company}</p>
                <div className="mt-3 flex justify-center gap-1 flex-wrap">
                  {a.skills.slice(0, 2).map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{s}</span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/alumni" className="text-sm text-[var(--neon-cyan)] hover:underline inline-flex items-center gap-1">
            See all alumni <ArrowRight className="size-3" />
          </Link>
        </div>
      </Section>

      {/* Achievements */}
      <Section title="Hall of Achievements" subtitle="Stories that inspire generations">
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.07}>
              <GlassCard glow="pink" className="flex items-start gap-4">
                <div className="size-12 rounded-xl grid place-items-center bg-[var(--gradient-primary)] shrink-0">
                  <Award className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-[var(--neon-cyan)]">{a.category} · {a.year}</p>
                  <h4 className="font-semibold mt-1">{a.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{a.title}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Global map */}
      <Section title="Global Network" subtitle="Alumni active in 60+ countries">
        <Reveal>
          <GlassCard className="!p-6 md:!p-10">
            <div className="relative aspect-[2/1] rounded-xl overflow-hidden bg-[radial-gradient(ellipse_at_center,oklch(0.25_0.05_275)_0%,oklch(0.15_0.03_270)_100%)]">
              {/* grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 50">
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 9} y1="0" x2={i * 9} y2="50" stroke="oklch(0.85 0.18 200)" strokeWidth="0.1" />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="oklch(0.85 0.18 200)" strokeWidth="0.1" />
                ))}
              </svg>
              {regions.map((r) => (
                <div key={r.name} className="absolute" style={{ left: `${r.x}%`, top: `${r.y}%`, transform: "translate(-50%,-50%)" }}>
                  <div className="relative">
                    <div className="size-3 rounded-full bg-[var(--neon-cyan)] animate-ping absolute inset-0" />
                    <div className="size-3 rounded-full bg-[var(--neon-cyan)] glow-cyan relative" />
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs glass rounded-md px-2 py-1">
                      <span className="font-semibold">{r.name}</span>
                      <span className="text-muted-foreground ml-1">{r.count.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
              {regions.map((r) => (
                <div key={r.name} className="glass rounded-lg p-3 text-center">
                  <p className="text-muted-foreground">{r.name}</p>
                  <p className="font-bold text-[var(--neon-cyan)] mt-1">{r.count.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <GlassCard className="!p-10 md:!p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-50" />
            <Sparkles className="size-8 mx-auto text-[var(--neon-pink)] relative" />
            <h2 className="mt-4 text-3xl md:text-5xl font-display font-bold relative">
              Ready to <span className="text-gradient">connect</span>?
            </h2>
            <p className="mt-3 text-muted-foreground relative">Join the network. Shape your future.</p>
            <Link to="/login" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[var(--gradient-primary)] text-white glow-purple hover:scale-105 transition-transform relative">
              Create free account <ArrowRight className="size-4" />
            </Link>
          </GlassCard>
        </Reveal>
      </Section>
    </>
  );
}

function Section({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
      {title && (
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold">{title}</h2>
            {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          </div>
        </Reveal>
      )}
      {children}
    </section>
  );
}

export default function RouteWrapper(){
  useEffect(()=>{ document.title = "AlumniNexus — Where Pioneers Connect"; const m=document.querySelector('meta[name="description"]')||(()=>{const e=document.createElement('meta');e.setAttribute('name','description');document.head.appendChild(e);return e;})(); m.setAttribute('content', "Join 12,500+ alumni across 60+ countries. Find mentors, discover opportunities, attend events, and shape the future."); },[]);
  return <HomePage />;
}
