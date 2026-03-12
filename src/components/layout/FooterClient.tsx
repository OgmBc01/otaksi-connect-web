"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/sections/Footer";

export default function FooterClient() {
  const pathname = usePathname();
  // Hide Footer on all /dashboard and subroutes
  if (pathname.startsWith("/dashboard")) return null;
  return <Footer />;
}
