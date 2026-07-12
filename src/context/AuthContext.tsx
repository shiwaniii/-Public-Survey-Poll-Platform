// import React, { createContext, useContext, useEffect, useState } from "react";
// import type { ReactNode } from "react";
// import type { User } from "@supabase/supabase-js";
// import { supabase } from "../utils/supabase";

// type Profile = {
//   id: string;
//   full_name?: string;
//   role?: string;
//   [key: string]: any;
// };

// type AuthContextType = {
//   user: User | null;
//   profile: Profile | null;
//   loading: boolean;
//   logout: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   profile: null,
//   loading: true,
//   logout: async () => {},
// });

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loading, setLoading] = useState(true);

//   const loadProfile = async (userId: string) => {
//     const { data, error } = await supabase
//       .from("Profile")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (!error && data) {
//       setProfile(data);
//     } else {
//       setProfile(null);
//     }
//   };

//   useEffect(() => {
//     let isMounted = true;

//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (!isMounted) return;
//       setUser(session?.user ?? null);
//       if (session?.user) loadProfile(session.user.id);
//       setLoading(false);
//     });

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//       if (session?.user) {
//         loadProfile(session.user.id);
//       } else {
//         setProfile(null);
//       }
//     });

//     return () => {
//       isMounted = false;
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//     setProfile(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, profile, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";

type Profile = {
  id: string;
  full_name?: string;
  role?: string;
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("Profile")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setProfile(data);
    } else {
      setProfile(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
