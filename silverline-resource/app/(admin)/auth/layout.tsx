"use client";

import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
    // Check if user is logged in
    const token = localStorage.getItem("cms-auth-token");
    const userData = localStorage.getItem("cms-user");

    if (token || userData) {
      router.push("/dashboard");
      return;
    }
  }, [router]);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      {" "}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </div>
  );
}
