// ============================================================
// Auth Chapter 4 — Auth Context: Sharing Auth State App-Wide
// ============================================================
// Focus: createContext + Provider + useAuth hook
//
// The provider skeleton and consumer component are pre-built.
// Fill in the blanks to complete the AuthContext wiring.
// ============================================================

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "../utils/supabase";
import type { User } from "@supabase/supabase-js";

// TODO: create the context
// Hint: createContext<AuthContextType | null>(null)
const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  profile: { id: string; full_name: string; role: string } | null;
  getProfile: () => Promise<{ data: { id: string; full_name: string; role: string } | null; error: any }>;

};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<({ id: string; full_name: string; role: string } | null)>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // TODO: subscribe to onAuthStateChange
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
    
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function getProfile() {
    if (user) {
      const { data, error } = await supabase.from("Profile").select("*").eq("id", user.id).single();
      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
      return { data, error };
    }
    return { data: null, error: null };
  }
  // TODO: provide user, loading, and signOut to consumers
  return (
    <AuthContext.Provider value={{ user, loading, signOut, profile,getProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// TODO: create a useAuth hook that reads from AuthContext
// Hint: useContext(AuthContext), check for null, throw if outside provider
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ==================== Consumer example (pre-built) ====================

// function UserProfile() {
//   const { user, loading, signOut, getProfile } = useAuth();

//   if (loading) return <p>Loading auth...</p>;

//   return (
//     <div className="card">
//       <div className="card-body">
//         {user ? (
//           <>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>ID:</strong> {user.id}</p>
//             <button className="btn btn-outline-danger btn-sm" onClick={signOut}>
//               Sign Out
//             </button>
//           </>
//         ) : (
//           <p className="text-muted">Not signed in.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// ==================== Demo page (pre-built) ====================



// ============================================================
// Check your understanding
// ============================================================
// 1. Why do we use Context instead of prop drilling for auth state?
// 2. What happens if useAuth() is called outside of AuthProvider?
// 3. Why does the Provider value need to include user, loading, and signOut?
