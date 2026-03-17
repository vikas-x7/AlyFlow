"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-8 h-8" />;
    }

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-panel text-foreground shadow-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <LuSun className="h-4 w-4" />
            ) : (
                <LuMoon className="h-4 w-4" />
            )}
        </button>
    );
}
