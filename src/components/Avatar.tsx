export function NeonAvatar({ initials, size = 48 }: { initials: string; size?: number }) {
  return (
    <div
      className="rounded-full grid place-items-center font-bold text-white shrink-0"
      style={{
        width: size, height: size,
        background: "linear-gradient(135deg, oklch(0.7 0.28 300), oklch(0.75 0.25 350) 60%, oklch(0.85 0.18 200))",
        boxShadow: "0 0 20px oklch(0.7 0.28 300 / 0.4), inset 0 0 20px oklch(1 0 0 / 0.1)",
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
}
