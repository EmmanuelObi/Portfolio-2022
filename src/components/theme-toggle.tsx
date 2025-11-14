"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme-preference");
    if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      // Default to dark mode
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    const next = isDark ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem("theme-preference", next);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
      className="fixed top-4 right-4 z-50 glass w-10 h-10"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
