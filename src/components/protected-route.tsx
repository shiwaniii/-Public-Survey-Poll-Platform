// ============================================================
// Auth Chapter 5 — Protected Routes: Guarding Pages
// ============================================================
// Focus: redirect unauthenticated users using useAuth + Navigate
//
// The route guard component and demo are pre-built.
// Fill in the blanks in ProtectedRoute and AppRoutes.
// ============================================================

import { Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

// ==================== ProtectedRoute ====================

export function ProtectedRoute({ children }: { children: ReactNode }) {
  // TODO: get user and loading from useAuth()
  const { user, loading } = useAuth();

  // TODO: while loading, show a loading message
  if (loading) return <p>Checking authentication...</p>;

  // TODO: if no user, redirect to /signin
  if (!user) return <Navigate to="/login" replace />;

  // TODO: if authenticated, render children
  return <>{children}</>;
}
