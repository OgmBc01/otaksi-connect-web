"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function BodyBackground({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Use light purple for insights and single post, else dark
  const isInsights = pathname.startsWith("/insights");
  return (
    <body
      style={{
        backgroundColor: isInsights ? "#ede6fa" : "#0B0616",
        color: "#FFFFFF",
        margin: 0,
        padding: 0,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {children}
    </body>
  );
}
