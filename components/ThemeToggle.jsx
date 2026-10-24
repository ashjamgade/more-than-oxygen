"use client";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.dataset.theme || "dark");
    const preference = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => {
      let saved;
      try { saved = localStorage.getItem("oxygen-theme"); } catch {}
      const next = saved === "light" || saved === "dark" ? saved : preference.matches ? "light" : "dark";
      root.dataset.theme = next;
      root.style.colorScheme = next;
      setTheme(next);
    };
    const storage = event => { if (event.key === "oxygen-theme" || event.key === null) sync(); };
    preference.addEventListener("change", sync);
    window.addEventListener("storage", storage);
    sync();
    return () => { preference.removeEventListener("change", sync); window.removeEventListener("storage", storage); };
  }, []);
  function toggle() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    setTheme(next);
    try { localStorage.setItem("oxygen-theme", next); } catch {}
  }
  return <button className="theme-toggle" onClick={toggle} aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
    <svg className="theme-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
    <svg className="theme-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/></svg>
    <span className="theme-label">{theme === "light" ? "Dark" : "Light"}</span>
  </button>;
}
