import * as React from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, children, glow, ...props }: React.HTMLAttributes<HTMLDivElement> & { glow?: "purple" | "cyan" | "pink" }) {
  const glowClass = glow === "purple" ? "hover:shadow-[0_0_40px_oklch(0.7_0.28_300/0.4)]"
    : glow === "cyan" ? "hover:shadow-[0_0_40px_oklch(0.85_0.18_200/0.4)]"
    : glow === "pink" ? "hover:shadow-[0_0_40px_oklch(0.75_0.25_350/0.4)]"
    : "";
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20",
        glowClass,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
