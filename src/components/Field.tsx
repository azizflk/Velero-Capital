import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const cls = "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-white placeholder:text-muted/70 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan";

export function Input(p: InputHTMLAttributes<HTMLInputElement>) { return <input {...p} className={`${cls} ${p.className ?? ""}`} />; }
export function Textarea(p: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea rows={5} {...p} className={`${cls} ${p.className ?? ""}`} />; }
export function Select(p: SelectHTMLAttributes<HTMLSelectElement>) { return <select {...p} className={`${cls} ${p.className ?? ""}`} />; }
export function Label({ children, htmlFor }: { children: string; htmlFor: string }) { return <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-muted">{children}</label>; }
