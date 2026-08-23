import type { AltEntranceRole } from "@/lib/animations/alt-entrance";

type AltLoadEntranceMotionProps = {
  children: React.ReactNode;
  role: AltEntranceRole;
  className?: string;
  style?: React.CSSProperties;
};

/** CSS-only load entrance. Hidden by stylesheet before first paint — no JS flash. */
export function AltLoadEntranceMotion({
  children,
  role,
  className,
  style,
}: AltLoadEntranceMotionProps) {
  return (
    <div
      className={`alt-load-entrance ${className ?? ""}`.trim()}
      data-role={role}
      style={style}
    >
      {children}
    </div>
  );
}
