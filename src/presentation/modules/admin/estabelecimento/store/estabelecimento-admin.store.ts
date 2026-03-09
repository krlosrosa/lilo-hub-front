import { create } from "zustand";
import type { EstabelecimentoPerfil } from "../types";
import { MOCK_PERFIL } from "../data/mock";

const STORAGE_KEY = "estabelecimento-admin-onboarding";

function getOnboardingConcluido(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

function setOnboardingStorage(valor: boolean) {
  if (typeof window === "undefined") return;
  if (valor) localStorage.setItem(STORAGE_KEY, "true");
  else localStorage.removeItem(STORAGE_KEY);
}

export interface EstabelecimentoAdminStore {
  onboardingConcluido: boolean;
  perfil: EstabelecimentoPerfil;
  setOnboardingConcluido: (valor: boolean) => void;
  setPerfil: (perfil: Partial<EstabelecimentoPerfil>) => void;
  resetPerfil: () => void;
  /** Carrega estado persistido (chamar no mount do client). */
  hydrate: () => void;
}

const perfilInicial = { ...MOCK_PERFIL };

export const useEstabelecimentoAdminStore = create<EstabelecimentoAdminStore>(
  (set) => ({
    onboardingConcluido: false,
    perfil: perfilInicial,
    setOnboardingConcluido: (valor) => {
      setOnboardingStorage(valor);
      set({ onboardingConcluido: valor });
    },
    setPerfil: (atualizacao) =>
      set((s) => ({ perfil: { ...s.perfil, ...atualizacao } })),
    resetPerfil: () => set({ perfil: { ...perfilInicial } }),
    hydrate: () => set({ onboardingConcluido: getOnboardingConcluido() }),
  })
);
