import type {
  EstabelecimentoPerfil,
  HorarioFuncionamento,
  ServicoPlataforma,
  CategoriaMenu,
  ItemMenuDigital,
  OfertaPromocao,
  AgendamentoMock,
  MetricaDashboard,
  SerieGrafico,
} from "../types";

export const MOCK_HORARIOS: HorarioFuncionamento[] = [
  { dia: "Segunda", abre: "09:00", fecha: "18:00" },
  { dia: "Terça", abre: "09:00", fecha: "18:00" },
  { dia: "Quarta", abre: "09:00", fecha: "18:00" },
  { dia: "Quinta", abre: "09:00", fecha: "18:00" },
  { dia: "Sexta", abre: "09:00", fecha: "20:00" },
  { dia: "Sábado", abre: "09:00", fecha: "14:00" },
  { dia: "Domingo", abre: "Fechado", fecha: "Fechado" },
];

export const MOCK_PERFIL: EstabelecimentoPerfil = {
  id: "est-1",
  nome: "Pizzaria do Bairro",
  descricao:
    "Pizzaria artesanal com forno a lenha, massas frescas e ingredientes selecionados. Ambiente familiar e delivery rápido.",
  categoria: "Restaurante",
  categoriaId: "restaurante",
  telefone: "(11) 98765-4321",
  endereco: "Rua das Flores, 123 - Centro",
  logo: null,
  fotos: [],
  horarios: MOCK_HORARIOS,
};

export const MOCK_SERVICOS_PLATAFORMA: ServicoPlataforma[] = [
  {
    id: "menu-digital",
    nome: "Menu Digital",
    descricao: "Exiba seu cardápio online para os clientes do guia.",
    icone: "UtensilsCrossed",
    ativo: true,
  },
  {
    id: "caca-niquel",
    nome: "Participação no Caça-Níquel",
    descricao: "Ofertas gamificadas que atraem mais clientes.",
    icone: "Gamepad2",
    ativo: true,
  },
  {
    id: "agendamento",
    nome: "Sistema de Agendamento",
    descricao: "Receba reservas e agendamentos direto pelo guia.",
    icone: "CalendarCheck",
    ativo: true,
  },
  {
    id: "cupons",
    nome: "Cupons Promocionais",
    descricao: "Crie e gerencie cupons de desconto.",
    icone: "Ticket",
    ativo: false,
  },
  {
    id: "destaque",
    nome: "Destaque no Guia",
    descricao: "Seu estabelecimento em evidência nas buscas.",
    icone: "Star",
    ativo: true,
  },
  {
    id: "campanhas",
    nome: "Campanhas promocionais",
    descricao: "Lance campanhas e acompanhe resultados.",
    icone: "Megaphone",
    ativo: false,
  },
];

export const MOCK_CATEGORIAS_MENU: CategoriaMenu[] = [
  { id: "cat-1", nome: "Pizzas", ordem: 1 },
  { id: "cat-2", nome: "Bebidas", ordem: 2 },
  { id: "cat-3", nome: "Sobremesas", ordem: 3 },
];

export const MOCK_ITENS_MENU: ItemMenuDigital[] = [
  {
    id: "item-1",
    categoriaId: "cat-1",
    nome: "Pizza Margherita",
    preco: 45.9,
    descricao: "Molho de tomate, mussarela e manjericão fresco.",
    imagem: null,
  },
  {
    id: "item-2",
    categoriaId: "cat-1",
    nome: "Pizza Calabresa",
    preco: 42.9,
    descricao: "Calabresa fatiada, cebola e azeitonas.",
    imagem: null,
  },
  {
    id: "item-3",
    categoriaId: "cat-2",
    nome: "Refrigerante 2L",
    preco: 10.0,
    descricao: "Coca-Cola, Guaraná ou Fanta.",
    imagem: null,
  },
  {
    id: "item-4",
    categoriaId: "cat-3",
    nome: "Brownie",
    preco: 18.0,
    descricao: "Brownie caseiro com sorvete.",
    imagem: null,
  },
];

export const MOCK_OFERTA_PROMOCAO: OfertaPromocao = {
  id: "oferta-1",
  titulo: "20% de desconto em qualquer pizza",
  descricao: "Válido para pedidos acima de R$ 60. Apresente o cupom no balcão.",
  cuponsDisponiveis: 100,
  validade: "30 dias",
};

export const MOCK_AGENDAMENTOS: AgendamentoMock[] = [
  {
    id: "ag-1",
    cliente: "João Silva",
    servico: "Corte de cabelo",
    data: "2025-03-10",
    hora: "14:00",
    status: "pendente",
  },
  {
    id: "ag-2",
    cliente: "Maria Souza",
    servico: "Limpeza de pele",
    data: "2025-03-10",
    hora: "16:30",
    status: "confirmado",
  },
  {
    id: "ag-3",
    cliente: "Carlos Lima",
    servico: "Corte + barba",
    data: "2025-03-10",
    hora: "18:00",
    status: "pendente",
  },
];

export const MOCK_METRICAS_DASHBOARD: MetricaDashboard[] = [
  { label: "Visualizações do perfil", valor: 1842, variacaoSemanal: 12 },
  { label: "Cliques para contato", valor: 326, variacaoSemanal: 8 },
  { label: "Cupons utilizados", valor: 54, variacaoSemanal: -3 },
  { label: "Giros no caça-níquel", valor: 291, variacaoSemanal: 22 },
  { label: "Agendamentos recebidos", valor: 37, variacaoSemanal: 15 },
];

export const MOCK_GRAFICO_SEMANAL: SerieGrafico[] = [
  { nome: "Seg", valor: 240 },
  { nome: "Ter", valor: 380 },
  { nome: "Qua", valor: 420 },
  { nome: "Qui", valor: 310 },
  { nome: "Sex", valor: 520 },
  { nome: "Sáb", valor: 180 },
  { nome: "Dom", valor: 90 },
];

export const MOCK_PLANO = {
  nome: "Premium",
  valorMensal: 149.9,
  dataRenovacao: "2025-04-08",
  beneficios: [
    "Perfil destacado no guia",
    "Participação em promoções gamificadas",
    "Analytics completo",
    "Ferramentas de marketing",
    "Menu digital ilimitado",
    "Sistema de agendamento",
  ],
};

export const MOCK_CATEGORIAS_ESTABELECIMENTO = [
  { id: "restaurante", nome: "Restaurante" },
  { id: "barbearia", nome: "Barbearia" },
  { id: "academia", nome: "Academia" },
  { id: "loja", nome: "Loja" },
  { id: "beleza", nome: "Beleza" },
  { id: "saude", nome: "Saúde" },
];
