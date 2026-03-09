/** Tipos do painel administrativo do estabelecimento (preparados para futura API). */

export type PlanoTipo = "free" | "silver" | "gold" | "premium";

export interface HorarioFuncionamento {
  dia: string;
  abre: string;
  fecha: string;
}

export interface EstabelecimentoPerfil {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  categoriaId: string;
  telefone: string;
  endereco: string;
  logo: string | null;
  fotos: string[];
  horarios: HorarioFuncionamento[];
}

export interface ServicoPlataforma {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  ativo: boolean;
}

export interface ItemMenuDigital {
  id: string;
  categoriaId: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string | null;
}

export interface CategoriaMenu {
  id: string;
  nome: string;
  ordem: number;
}

export interface OfertaPromocao {
  id: string;
  titulo: string;
  descricao: string;
  cuponsDisponiveis: number;
  validade: string;
}

export interface AgendamentoMock {
  id: string;
  cliente: string;
  servico: string;
  data: string;
  hora: string;
  status: "pendente" | "confirmado" | "cancelado";
}

export interface MetricaDashboard {
  label: string;
  valor: number;
  variacaoSemanal?: number; // percentual em relação à semana anterior
}

export interface SerieGrafico {
  nome: string;
  valor: number;
}
