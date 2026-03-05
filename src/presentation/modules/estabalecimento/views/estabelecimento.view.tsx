'use client';

import { ModaCadastroEstabelecimento } from "../components/modaCadastroEstabelecimento";
import { useCriarEstabelecimentoMutation } from "../hooks/mutations/criar-estabelecimento.mutation";

export function EstabelecimentoView() {
  const { form, criarEstabelecimento } = useCriarEstabelecimentoMutation();

  return (
    <div className="mx-auto max-w-2xl py-6">
      <ModaCadastroEstabelecimento form={form} onSubmit={criarEstabelecimento} />
    </div>
  );
}
