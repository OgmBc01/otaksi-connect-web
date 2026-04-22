"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAutoLogout } from "@/hooks/useAutoLogout";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  useAutoLogout(async () => {
    console.log('[AuthProvider] Inactivity timeout triggered. Logging out...');
    if (user) {
      await supabase.auth.signOut();
      setUser(null);
      router.push("/");
    }
  }, 10 * 1000); // 10 seconds inactivity (for testing)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
