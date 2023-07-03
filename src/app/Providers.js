'use client';

import { ThemeProvider, useTheme } from "next-themes";

export default function Providers({children}) {
  const { theme, setTheme } = useTheme('dark')

  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
}