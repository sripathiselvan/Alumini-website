import { useMemo, useState , useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Briefcase, X, Globe } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { NeonAvatar } from "@/components/Avatar";
import { alumni } from "@/data/alumni";


const depts = ["All", "CSE", "ECE", "EEE", "MECH", "CIVIL"];
const batches = ["All", "2015", "2016", "2017", "2018", "2019", "2020", "2021"];

function AlumniPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [batch, setBatch] = useState("All");
  const [selected, setSelected] = useState<typeof alumni[number] | null>(null);

  const filtered = useMemo(() => alumni.filter((a) => {
    if (dept !== "All" && a.dept !== dept) return false;
    if (batch !== "All" && a.batch !== batch) return false;
    if (q) {
      const s = q.toLowerCase();
      return [a.name, a.company, a.location, ...a.skills].join(" ").toLowerCase().includes(s);
    }
    return true;
  }), [q, dept, batch]);

  return (
    <>
      <PageHeader title="Alumni Network" subtitle="Discover, connect and grow with our global community." />

      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal>
          <GlassCard className="!p-4 md:!p-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name, company, skill, location…"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-[var(--neon-cyan)]/60 focus:ring-2 focus:ring-[var(--neon-cyan)]/20"
                />
              </div>
              <Select value={dept} onChange={setDept} options={depts} label="Dept" />
              <Select value={batch} onChange={setBatch} options={batches} label="Batch" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{filtered.length} alumni found</div>
          </GlassCard>
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.03}>
              <GlassCard glow="purple" className="cursor-pointer h-full" onClick={() => setSelected(a)}>
                <div className="flex items-start gap-3">
                  <NeonAvatar initials={a.avatar} size={56} />
                  <div className="min-w-0">
                    <h4 className="font-semibold truncate">{a.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{a.role}</p>
                    <p className="text-xs text-[var(--neon-cyan)] mt-0.5 truncate">{a.company}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" /> {a.location}
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {a.skills.map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{s}</span>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Batch {a.batch} · {a.dept}</span>
                  <span className="text-[var(--neon-pink)]">View →</span>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-8 max-w-md w-full relative neon-border"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10">
                <X className="size-4" />
              </button>
              <div className="flex items-center gap-4">
                <NeonAvatar initials={selected.avatar} size={72} />
                <div>
                  <h3 className="text-xl font-bold">{selected.name}</h3>
                  <p className="text-sm text-muted-foreground">{selected.role}</p>
                  <p className="text-sm text-[var(--neon-cyan)]">{selected.company}</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <Info icon={Briefcase} label="Department" value={selected.dept} />
                <Info icon={Globe} label="Batch" value={selected.batch} />
                <Info icon={MapPin} label="Location" value={selected.location} />
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {selected.skills.map((s) => (
                    <span key={s} className="text-xs px-2 py-1 rounded-full bg-[var(--neon-purple)]/20 border border-[var(--neon-purple)]/40">{s}</span>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-lg bg-[var(--gradient-primary)] text-white font-semibold text-sm">Connect</button>
                <button className="flex-1 px-4 py-2 rounded-lg glass">Message</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-12 text-center">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-6xl font-bold">
        <span className="text-gradient">{title}</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 text-muted-foreground max-w-xl mx-auto">
        {subtitle}
      </motion.p>
    </section>
  );
}

function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <div className="relative">
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white/5 border border-white/10 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:border-[var(--neon-cyan)]/60"
      >
        {options.map((o) => <option key={o} value={o} className="bg-background">{label}: {o}</option>)}
      </select>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="glass rounded-lg p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="size-3" /> {label}</div>
      <p className="mt-1 font-semibold text-sm">{value}</p>
    </div>
  );
}

export default function RouteWrapper(){
  useEffect(()=>{ document.title = "Alumni Directory — AlumniNexus"; const m=document.querySelector('meta[name="description"]')||(()=>{const e=document.createElement('meta');e.setAttribute('name','description');document.head.appendChild(e);return e;})(); m.setAttribute('content', "Search 12,500+ alumni by department, batch, company, location and skills."); },[]);
  return <AlumniPage />;
}
