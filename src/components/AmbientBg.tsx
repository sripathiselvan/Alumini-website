export function AmbientBg() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="ambient-glow" style={{ width: 500, height: 500, top: -100, left: -100, background: "oklch(0.7 0.28 300 / 0.6)" }} />
      <div className="ambient-glow animate-[float_8s_ease-in-out_infinite]" style={{ width: 600, height: 600, top: "30%", right: -200, background: "oklch(0.85 0.18 200 / 0.45)" }} />
      <div className="ambient-glow" style={{ width: 450, height: 450, bottom: -100, left: "30%", background: "oklch(0.75 0.25 350 / 0.4)" }} />
    </div>
  );
}
