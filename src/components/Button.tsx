import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Props = { to?: string; href?: string; variant?: "outline" | "blue"; className?: string; children: ReactNode; type?: "button" | "submit"; disabled?: boolean };

export default function Button({ to, href, variant = "outline", className = "", children, type = "button", disabled }: Props) {
  const cls = `pill ${variant === "blue" ? "pill-blue" : ""} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>;
  return <button type={type} disabled={disabled} className={cls}>{children}</button>;
}
