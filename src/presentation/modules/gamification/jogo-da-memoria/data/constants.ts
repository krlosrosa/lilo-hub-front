/** Nomes fictícios de empresas para o Jogo da Memória */
export const COMPANIES = [
  "Auto Peças Silva",
  "Padaria Estrela",
  "Farmácia Saúde+",
  "Pet Shop Amigo",
  "Ótica Visão",
  "Loja TechNow",
  "Barbearia Classic",
  "Açaí da Praça",
];

/** Ícones para cada empresa (lucide icon names) */
export const COMPANY_ICONS: Record<string, string> = {
  "Auto Peças Silva": "car",
  "Padaria Estrela": "cake",
  "Farmácia Saúde+": "pill",
  "Pet Shop Amigo": "dog",
  "Ótica Visão": "glasses",
  "Loja TechNow": "smartphone",
  "Barbearia Classic": "scissors",
  "Açaí da Praça": "cherry",
};

/** Perguntas do Pergunta Relâmpago */
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Qual o melhor dia da semana para promoções no comércio local?",
    options: ["Segunda-feira", "Quarta-feira", "Sexta-feira", "Sábado"],
    correctIndex: 3,
  },
  {
    question: "O que significa a sigla CNPJ?",
    options: [
      "Cadastro Nacional de Pessoa Jurídica",
      "Código Nacional de Pessoa Jurídica",
      "Certificado Nacional de Pessoa Jurídica",
      "Central Nacional de Pessoa Jurídica",
    ],
    correctIndex: 0,
  },
  {
    question: "Qual desses é um direito do consumidor?",
    options: [
      "Trocar produto sem nota fiscal",
      "Devolver produto em 7 dias (compra online)",
      "Exigir desconto em qualquer loja",
      "Não pagar frete nunca",
    ],
    correctIndex: 1,
  },
  {
    question: "Qual a principal vantagem de comprar no comércio local?",
    options: [
      "Produtos sempre mais baratos",
      "Fortalece a economia da região",
      "Nunca precisa de garantia",
      "Entrega mais rápida que online",
    ],
    correctIndex: 1,
  },
  {
    question: "O que é um MEI?",
    options: [
      "Micro Empresa Individual",
      "Microempreendedor Individual",
      "Mercado de Empreendedorismo Individual",
      "Ministério do Empreendedor Individual",
    ],
    correctIndex: 1,
  },
  {
    question: "Qual imposto é cobrado sobre serviços?",
    options: ["ICMS", "ISS", "IPI", "IOF"],
    correctIndex: 1,
  },
  {
    question: "O que significa 'ponto comercial'?",
    options: [
      "Nota do comércio",
      "Local onde funciona o negócio",
      "Tipo de imposto",
      "Sistema de pagamento",
    ],
    correctIndex: 1,
  },
  {
    question: "Qual prática ajuda a fidelizar clientes?",
    options: [
      "Aumentar preços frequentemente",
      "Bom atendimento e pós-venda",
      "Reduzir horário de funcionamento",
      "Não aceitar cartão",
    ],
    correctIndex: 1,
  },
];

/** Jogadores fictícios para o ranking */
export const FAKE_PLAYERS = [
  { name: "Maria Silva", baseScore: 85 },
  { name: "João Santos", baseScore: 120 },
  { name: "Ana Oliveira", baseScore: 65 },
  { name: "Carlos Lima", baseScore: 95 },
  { name: "Lucia Costa", baseScore: 45 },
];
