'use client'
import { useUserStore } from "@/presentation/shared/store/user.store";
import { useEffect } from "react";

export function LoadUserProvider({ children }: { children: React.ReactNode }) {
  const { loadUser } = useUserStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return children;
}