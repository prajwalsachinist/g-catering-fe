"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Whatever the document is actually showing right now. */
function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : systemTheme();
}

/**
 * Switches between the light and dark palettes.
 *
 * With no stored choice the site follows the operating system; the first
 * press pins an explicit theme. The blocking script in the root layout is
 * what applies a stored choice before paint, so this component only has to
 * handle the change itself.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<Theme | null>(null);

  React.useEffect(() => {
    setTheme(currentTheme());

    // Keep following the OS while the visitor has not chosen for themselves.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!document.documentElement.hasAttribute("data-theme")) {
        setTheme(systemTheme());
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the choice simply will not persist.
    }
    setTheme(next);
  }

  // Until mounted the active theme is unknown on the server, so render a
  // same-sized placeholder to keep the header from shifting.
  if (theme === null) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={className}
        aria-hidden="true"
        tabIndex={-1}
      >
        <Sun aria-hidden="true" />
      </Button>
    );
  }

  const nextLabel = theme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={toggle}
      title={`Switch to ${nextLabel} theme`}
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" />
      ) : (
        <Moon aria-hidden="true" />
      )}
      <span className="sr-only">Switch to {nextLabel} theme</span>
    </Button>
  );
}
