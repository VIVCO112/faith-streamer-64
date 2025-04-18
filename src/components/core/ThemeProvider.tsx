
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "rustic" | "monochrome";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => {
      const savedTheme = localStorage.getItem("theme");
      // If the saved theme is 'sepia', default to 'light' instead
      if (savedTheme === 'sepia') {
        return defaultTheme;
      }
      return (savedTheme as Theme) || defaultTheme;
    }
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark", "rustic", "monochrome", "sepia");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
      // Force a rerender by toggling a class
      const root = window.document.documentElement;
      root.classList.add('theme-transition');
      setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 100);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
