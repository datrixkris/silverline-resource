import type React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {" "}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </DashboardLayout>
  );
}
