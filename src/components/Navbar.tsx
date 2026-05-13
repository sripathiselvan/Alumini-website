import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { navLinks } from "@/data/alumni";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong border-b border-white/10" : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg grid place-items-center bg-[var(--gradient-primary)] glow-purple">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Alumni<span className="text-gradient">Nexus</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-[var(--gradient-cyber)]"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Login
          </Link>
          <Link
            to="/login"
            className="relative px-4 py-2 text-sm font-semibold rounded-lg text-white bg-[var(--gradient-primary)] glow-purple hover:scale-105 transition-transform"
          >
            Join Network
          </Link>
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden p-2 rounded-md glass"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-white/10 overflow-hidden"
          >
            <ul className="p-4 space-y-1">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block px-4 py-3 rounded-lg hover:bg-white/5 hover:text-[var(--neon-cyan)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 flex gap-2">
                <Link to="/login" className="flex-1 text-center px-4 py-3 rounded-lg glass">Login</Link>
                <Link to="/login" className="flex-1 text-center px-4 py-3 rounded-lg bg-[var(--gradient-primary)] text-white font-semibold">Join</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
