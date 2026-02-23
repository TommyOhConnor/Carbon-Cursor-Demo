'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

export type ThemeMode = 'white' | 'g10' | 'g90' | 'g100';

const THEME_CLASSES = ['cds--white', 'cds--g10', 'cds--g90', 'cds--g100'] as const;
const VALID_THEMES: ThemeMode[] = ['white', 'g10', 'g90', 'g100'];

const ThemeContext = createContext<{
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
} | null>(null);

const STORAGE_KEY = 'carbon-theme-mode';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with g100 to avoid hydration mismatch (server has no localStorage)
  const [theme, setThemeState] = useState<ThemeMode>('g100');
  const isFirstMount = useRef(true);

  // Sync state from localStorage after mount. Don't touch DOM - inline script already set html class.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const next = VALID_THEMES.includes(stored as ThemeMode) ? (stored as ThemeMode) : 'g100';
    setThemeState(next);
  }, []);

  // Sync html theme when user toggles (skip first mount; init handled above)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const root = document.documentElement;
    root.classList.remove(...THEME_CLASSES);
    root.classList.add(`cds--${theme}`);
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const isLight = prev === 'white' || prev === 'g10';
      const next: ThemeMode = isLight ? 'g100' : 'white';
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  // No Theme wrapper - Carbon styles use the cds--* class on html (set by inline script).
  // The Theme component was adding a div with its own theme class, causing a flash.
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
