"use client";

import { ThemeProvider } from "./context/ThemeContext";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
