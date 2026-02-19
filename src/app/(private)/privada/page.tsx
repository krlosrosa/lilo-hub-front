'use client'

import { useUserStore } from "@/src/presentation/store/user.store";

export default function Privada() {
  const { userData } = useUserStore();
  return (
    <div>
      <h1>Privada</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}