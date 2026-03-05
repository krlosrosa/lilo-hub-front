import { create } from "zustand";

export type UserStoreData = {
  email: string;
  name: string;
  sub: string;
} 

export type UserStore = {
  userData: UserStoreData;
  setUserData: (data: UserStoreData) => void;
  claer: ()=> void;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  userData: {
    email: '',
    name: '',
    sub: '',
  },
  setUserData: (data: UserStoreData) => set({ userData: data }),
  claer() {
    set({ userData: undefined });
  },
  loadUser: async () => {
    try {
      const res = await fetch("/api/me");
  
      if (!res.ok) {
        set({ userData: undefined });
        return;
      }
  
      const data = await res.json();
      set({ userData: data.user });
    } catch {
      set({ userData: undefined });
    }
  },
  logout: async () => {
    try {
      const res = await fetch("/api/logout");
  
      if (!res.ok) {
        set({ userData: undefined });
        return;
      }
  
      const data = await res.json();
      set({ userData: data.user });
    } catch {
      set({ userData: undefined });
    }
  }
}))