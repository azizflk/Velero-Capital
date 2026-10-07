import { useEffect } from "react";

export function useTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title === "Home" ? "Velero Capital | Access is the edge." : `${title} | Velero Capital`;
    if (description) {
      let m = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
      m.content = description;
    }
  }, [title, description]);
}
