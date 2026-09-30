import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input(p: InputHTMLAttributes<HTMLInputElement>) { return <input {...p} className={`field ${p.className ?? ""}`} />; }
export function Textarea(p: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea rows={4} {...p} className={`field resize-y ${p.className ?? ""}`} />; }
export function Select(p: SelectHTMLAttributes<HTMLSelectElement>) { return <select {...p} className={`field ${p.className ?? ""}`} />; }
export function Label({ children, htmlFor }: { children: string; htmlFor: string }) { return <label htmlFor={htmlFor} className="field-label">{children}</label>; }
