"use client";

import { ThemeProvider, useTheme } from "next-themes";

export default function Providers({ children }) {
  useTheme("dark");

  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
}
