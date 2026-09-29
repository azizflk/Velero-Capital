import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  to?: string;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({ to, href, variant = "primary", className = "", children, type = "button", disabled }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-cyan text-ink hover:bg-teal hover:shadow-[0_0_30px_-5px_#08d2eb]"
      : "border border-line bg-white/5 text-white hover:border-cyan/60 hover:bg-white/10";
  const cls = `${base} ${styles} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>;
  return <button type={type} disabled={disabled} className={cls}>{children}</button>;
}
