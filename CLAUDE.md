# CLAUDE.md — Lilo Hub Front

Guia de referência para IA desenvolver neste projeto com consistência e alinhamento aos padrões estabelecidos.

---

## Stack e Ferramentas

- **Framework**: Next.js 15+ com App Router e React Server Components
- **Linguagem**: TypeScript 5 (strict mode)
- **UI**: shadcn/ui (estilo `new-york`) + Radix UI + Tailwind CSS 4
- **Ícones**: Lucide React
- **Formulários**: React Hook Form + Zod (resolver)
- **Estado global**: Zustand
- **HTTP**: Axios com interceptors customizados
- **Geração de código**: Orval (a partir de spec OpenAPI) → tipos, schemas Zod e funções Axios
- **Validação em runtime**: Zod 4
- **Gestor de pacotes**: npm

---

## Arquitetura: Clean Architecture

As camadas seguem esta hierarquia (dependências apontam para dentro):

```
Presentation → Application → Domain ← Infrastructure
                    ↑
                  Main (factories / DI)
```

### Camadas e Responsabilidades

| Camada | Pasta | Responsabilidade |
|--------|-------|-----------------|
| **Presentation** | `src/presentation/` | UI, hooks de mutation/query, formulários, estado |
| **Application** | `src/application/` | Use cases, DTOs, mappers |
| **Domain** | `src/domain/` | Entidades, modelos (Zod), interfaces de repositório |
| **Infrastructure** | `src/infra/` | Implementações de repositórios, HTTP client, serviços externos |
| **Main** | `src/main/` | Factories (injeção de dependência), providers React |
| **App** | `src/app/` | Rotas Next.js, API routes, layouts |

---

## Convenções de Nomenclatura

### Arquivos

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Use case | `kebab-case.usecase.ts` | `criar-estabelecimento.usecase.ts` |
| Factory | `kebab-case.factory.ts` | `criar-estabelecimento.factory.ts` |
| Repositório interface | `kebab-case.repository.ts` | `estabelecimento.repository.ts` |
| Repositório impl | `kebab-case.db.ts` | `estabelecimento.db.ts` |
| Mutation hook | `kebab-case.mutation.ts` | `criar-estabelecimento.mutation.ts` |
| Query hook | `kebab-case.hook.ts` | `servico.hook.ts` |
| Formulário hook | `kebab-case.form.ts` | `estabelecimento.form.ts` |
| View | `kebab-case.view.tsx` | `estabelecimento.view.tsx` |
| Store | `kebab-case.store.ts` | `user.store.ts` |
| Componente | `PascalCase.tsx` | `ModaCadastroEstabelecimento.tsx` |

### Identificadores

| Elemento | Padrão | Exemplo |
|----------|--------|---------|
| Use case class | `PascalCaseUsecase` | `CriarEstabelecimentoUsecase` |
| Factory function | `makePascalCaseFactory()` | `makeCriarEstabelecimentoFactory()` |
| Mutation hook | `usePascalCaseMutation()` | `useCriarEstabelecimentoMutation()` |
| Form hook | `usePascalCaseForm()` | `useEstabelecimentoForm()` |
| Store hook | `usePascalCaseStore` | `useUserStore` |
| Repository interface | `PascalCaseRepository` | `EstabelecimentoRepository` |
| Repository class | `PascalCaseDb` | `EstabelecimentoDb` |
| Métodos do repositório | `camelCaseDb()` | `criarEstabelecimentoDb()` |
| DTO | `PascalCaseDto` | `CriarEstabelecimentoDto` |
| Domain model | `PascalCaseModel` | `EstabelecimentoModel` |

---

## Padrões por Camada

### Domain (`src/domain/`)

```ts
// Modelo de domínio com Zod
export const estabelecimentoModel = z.object({
  id: z.number(),
  nome: z.string(),
});
export type EstabelecimentoModel = z.infer<typeof estabelecimentoModel>;

// Interface de repositório (contrato)
export interface EstabelecimentoRepository {
  criarEstabelecimentoDb(dto: CriarEstabelecimentoDto): Promise<ApiResponse<number>>;
  getEstabelecimentoDb(id: string): Promise<ApiResponse<EstabelecimentoModel>>;
}
```

### Application (`src/application/`)

```ts
// Use case
export class CriarEstabelecimentoUsecase {
  constructor(private repository: EstabelecimentoRepository) {}

  async execute(dto: CriarEstabelecimentoDto): Promise<number> {
    const result = await this.repository.criarEstabelecimentoDb(dto);
    if (!result.success) throw new Error(result.message);
    return result.data;
  }
}

// Mapper
export function tokenToUser(token: string): UserModel {
  return jwtDecode<UserModel>(token);
}
```

### Infrastructure (`src/infra/`)

```ts
// Implementação do repositório usa funções geradas pelo Orval
export class EstabelecimentoDb implements EstabelecimentoRepository {
  async criarEstabelecimentoDb(dto: CriarEstabelecimentoDto) {
    return criarEstabelecimento(dto); // função Orval gerada
  }
}
```

**Envelope de resposta padrão (todos os endpoints):**
```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  statusCode: number;
}
```

### Main (`src/main/factories/`)

```ts
// Factory — injeção de dependência manual
export function makeCriarEstabelecimentoFactory() {
  const db = new EstabelecimentoDb();
  return new CriarEstabelecimentoUsecase(db);
}
```

### Presentation (`src/presentation/`)

#### View (container)
```tsx
'use client';
export function EstabelecimentoView() {
  const { form, criarEstabelecimento } = useCriarEstabelecimentoMutation();
  return <ModaCadastroEstabelecimento form={form} onSubmit={criarEstabelecimento} />;
}
```

#### Mutation hook
```ts
export function useCriarEstabelecimentoMutation() {
  const [loading, setLoading] = useState(false);
  const form = useEstabelecimentoForm();
  const router = useRouter();

  const criarEstabelecimento = form.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const usecase = makeCriarEstabelecimentoFactory();
      const id = await usecase.execute(data);
      router.push(`/estabelecimento/${id}/admin`);
    } finally {
      setLoading(false);
    }
  });

  return { form, criarEstabelecimento, loading };
}
```

#### Form hook (React Hook Form + Zod)
```ts
export function useEstabelecimentoForm() {
  return useForm<CriarEstabelecimentoDto>({
    resolver: zodResolver(CriarEstabelecimentoBody),
    defaultValues: { nome: '' },
  });
}
```

#### Zustand store
```ts
export const useUserStore = create<UserStore>((set) => ({
  userData: { email: '', name: '', sub: '' },
  setUserData: (data) => set({ userData: data }),
  loadUser: async () => {
    const res = await fetch('/api/me');
    if (res.ok) set({ userData: (await res.json()).user });
  },
}));
```

### App Router (`src/app/`)

```tsx
// page.tsx — delegate para view, sem lógica
export default function EstabelecimentoPage() {
  return <EstabelecimentoView />;
}

// API route
export async function GET() {
  const token = (await cookies()).get('access_token')?.value;
  return Response.json({ user: tokenToUser(token!) });
}
```

---

## Estrutura de Módulo (feature)

Cada feature em `src/presentation/modules/<feature>/`:

```
modules/estabelecimento/
├── components/        # Componentes específicos da feature
├── views/             # Containers (view.tsx)
├── hooks/
│   ├── *.mutation.ts  # Ações (POST, PUT, DELETE)
│   └── *.hook.ts      # Queries (GET)
└── forms/
    └── *.form.ts      # Definição do formulário
```

---

## Componentes UI

- Usar componentes de `@/presentation/shared/components/ui/` (shadcn/ui)
- Usar `cn()` de `@/presentation/shared/lib/utils` para compor classes
- Variantes com CVA (`class-variance-authority`)
- Nunca criar componente UI do zero se existir um shadcn equivalente
- Para adicionar componentes shadcn: `npx shadcn@latest add <component>`

```tsx
import { cn } from '@/presentation/shared/lib/utils';
import { Button } from '@/presentation/shared/components/ui/button';
```

---

## Geração de Código com Orval

Os arquivos em `src/infra/api/` são **gerados automaticamente** — não editar manualmente.

```bash
npx orval  # gera a partir da spec OpenAPI em localhost:4000/docs-json
```

Saídas geradas:
- `src/infra/api/model/` → tipos TypeScript
- `src/infra/api/schema/` → schemas Zod
- `src/infra/api/service/` → funções Axios por tag

---

## Paths Aliases

```ts
'@/*' → 'src/*'

// Exemplos de uso:
import { Button } from '@/presentation/shared/components/ui/button';
import { useUserStore } from '@/presentation/shared/store/user.store';
import { makeCriarEstabelecimentoFactory } from '@/main/factories/criar-estabelecimento.factory';
import { EstabelecimentoRepository } from '@/domain/estabelecimento/repositories/estabelecimento.repository';
```

---

## Multi-Tenancy

- O middleware (`src/middleware.ts`) detecta subdomínios e faz rewrite de rotas
- Fluxo: subdomínio → resolve domínio → rewrite para `/[territorio]/[slug]`
- Não adicionar lógica de negócio no middleware

---

## Autenticação

- JWT armazenado em cookie HTTP-only `access_token`
- Decodificado via `jwt-decode` no endpoint `/api/me`
- Estado global do usuário em `useUserStore` (Zustand)
- Provider `LoadUserProvider` em `src/main/providers/` carrega o usuário nas rotas privadas

---

## Regras Gerais

1. **Nunca misturar camadas** — presentation não acessa infra diretamente; sempre via use case + factory
2. **Sem lógica nas pages** — pages delegam para views (`<FeatureView />`)
3. **Use cases são a única fonte de verdade** para regras de negócio
4. **Repositórios no domínio são interfaces** — implementações ficam em infra
5. **Factories criam o grafo de dependências** — hooks chamam factories, não instanciam diretamente
6. **Código em português** — nomes de domínio de negócio em pt-BR (estabelecimento, territorio, etc.)
7. **Orval é a fonte de tipos de API** — não criar tipos de API manualmente
8. **Componentes UI via shadcn** — não reinventar componentes que já existem
9. **Zod para validação** — tanto em runtime (API responses) quanto em formulários
10. **Sem React Query** — use cases são chamados diretamente via hooks com estado manual

---

## Idioma

- Código e domínio de negócio: **português do Brasil**
- Padrões técnicos (interface, repository, usecase, factory): **inglês**
- Comunicação com o usuário deste projeto: **português**
