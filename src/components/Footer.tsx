import { Link } from "react-router-dom";
import { Sparkles, Globe, Mail, MessageCircle, Send } from "lucide-react";
import { navLinks } from "@/data/alumni";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="absolute inset-x-0 -top-40 h-40 pointer-events-none bg-gradient-to-b from-transparent to-background/0" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg grid place-items-center bg-[var(--gradient-primary)]">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg">Alumni<span className="text-gradient">Nexus</span></span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            The futuristic global alumni network. Connect, mentor, and grow with thousands of pioneers.
          </p>
          <div className="flex gap-3 mt-5">
            {[Globe, Mail, MessageCircle, Send].map((Icon, i) => (
              <a key={i} href="#" className="size-9 rounded-lg glass grid place-items-center hover:text-[var(--neon-cyan)] hover:border-white/30 transition-colors">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {navLinks.map((l) => <li key={l.to}><Link to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@alumninexus.io</li>
            <li>+91 98765 43210</li>
            <li>Bangalore · SF · London</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted-foreground">
        © 2026 AlumniNexus. Built with light & code.
      </div>
    </footer>
  );
}
