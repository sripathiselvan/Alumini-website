import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import { Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";


function LoginPage() {
  const [mode, setMode] = useState<"login" | "join">("login");
  return (
    <section className="min-h-[80vh] grid place-items-center px-4 py-16">
      <GlassCard glow="purple" className="!p-8 w-full max-w-md neon-border">
        <div className="text-center">
          <div className="size-12 rounded-2xl mx-auto grid place-items-center bg-[var(--gradient-primary)] glow-purple">
            <Sparkles className="size-6 text-white" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">
            {mode === "login" ? "Welcome back" : "Join the network"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Sign in to your AlumniNexus account" : "Create your free account in seconds"}
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {mode === "join" && (
            <Field icon={Sparkles} placeholder="Full name" type="text" />
          )}
          <Field icon={Mail} placeholder="Email" type="email" />
          <Field icon={Lock} placeholder="Password" type="password" />

          <button className="w-full px-6 py-3 rounded-xl font-semibold bg-[var(--gradient-primary)] text-white glow-purple hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2">
            {mode === "login" ? "Login" : "Create account"} <ArrowRight className="size-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? "New here? " : "Already a member? "}
          <button onClick={() => setMode(mode === "login" ? "join" : "login")} className="text-[var(--neon-cyan)] hover:underline">
            {mode === "login" ? "Join the network" : "Sign in"}
          </button>
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to home</Link>
        </p>
      </GlassCard>
    </section>
  );
}

function Field({ icon: Icon, placeholder, type }: { icon: React.ComponentType<{ className?: string }>; placeholder: string; type: string }) {
  return (
    <div className="relative">
      <Icon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        required type={type} placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-[var(--neon-cyan)]/60 focus:ring-2 focus:ring-[var(--neon-cyan)]/20"
      />
    </div>
  );
}

export default function RouteWrapper(){
  useEffect(()=>{ document.title = "Login · Join — AlumniNexus"; const m=document.querySelector('meta[name="description"]')||(()=>{const e=document.createElement('meta');e.setAttribute('name','description');document.head.appendChild(e);return e;})(); m.setAttribute('content', "Sign in or join AlumniNexus."); },[]);
  return <LoginPage />;
}
