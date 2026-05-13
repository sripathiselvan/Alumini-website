import { useState , useEffect } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "./alumni";
import { blogPosts } from "@/data/alumni";
import { NeonAvatar } from "@/components/Avatar";


const cats = ["All", "Career", "Startup", "Interviews"];

function BlogPage() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <PageHeader title="Blog & Insights" subtitle="Stories, lessons and ideas from the network." />
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex gap-2 flex-wrap mb-8 justify-center">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                cat === c ? "bg-[var(--gradient-primary)] text-white glow-purple" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {featured && (
          <Reveal>
            <GlassCard glow="purple" className="!p-8 md:!p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-30" />
              <div className="relative">
                <span className="text-xs text-[var(--neon-pink)] font-semibold uppercase tracking-wider">Featured · {featured.category}</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">{featured.title}</h2>
                <p className="mt-3 text-muted-foreground max-w-2xl">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3">
                  <NeonAvatar initials={featured.author.split(" ").map(n => n[0]).join("")} size={40} />
                  <div className="text-sm">
                    <p className="font-semibold">{featured.author}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="size-3" /> {featured.date} · {featured.read}</p>
                  </div>
                  <button className="ml-auto inline-flex items-center gap-1 text-sm text-[var(--neon-cyan)] hover:underline">
                    Read article <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        )}

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <GlassCard glow="cyan" className="h-full flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[var(--neon-cyan)]">{p.category}</span>
                <h4 className="mt-2 font-semibold leading-snug">{p.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{p.author} · {p.date}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Clock className="size-3" /> {p.read}</span>
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
  useEffect(()=>{ document.title = "Blog & Insights — AlumniNexus"; const m=document.querySelector('meta[name="description"]')||(()=>{const e=document.createElement('meta');e.setAttribute('name','description');document.head.appendChild(e);return e;})(); m.setAttribute('content', "Stories, interview prep, placement experiences and industry insights from alumni."); },[]);
  return <BlogPage />;
}
