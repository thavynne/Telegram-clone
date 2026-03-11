import React, { createContext, useState } from "react";

export const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev: string) => (prev === "dark" ? "light" : "dark"));
  };

  const colors =
    theme === "dark"
      ? {
          background: "#0f172a",
          card: "#1e293b",
          text: "#ffffff",
        }
      : {
          background: "#ffffff",
          card: "#f1f5f9",
          text: "#0f172a",
        };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}