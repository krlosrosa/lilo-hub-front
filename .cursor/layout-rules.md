# Regras Oficiais para Montagem de Layout

Este projeto segue separação clara entre:

- Lógica (hooks / usecases)
- Apresentação (layout / components)

---------------------------------------------------

## REGRA PRINCIPAL

Sempre que o usuário pedir:

"melhore o layout"
"crie o layout"
"ajuste a UI"

Você deve assumir que:

- Todas as informações já vêm via props
- Todas as funções já vêm via props
- Todas as ações já vêm via props

Você NÃO deve:

- Criar novas funções
- Criar novo estado (useState)
- Criar nova lógica de negócio
- Criar chamadas HTTP
- Criar hooks novos
- Mover regra para dentro do componente

---------------------------------------------------

## O que você DEVE fazer

- Melhorar estrutura visual
- Organizar grid / flex
- Ajustar responsividade
- Melhorar hierarquia visual
- Melhorar espaçamento
- Melhorar acessibilidade
- Melhorar semântica HTML
- Usar as funções recebidas por props
- Usar os dados recebidos por props

---------------------------------------------------

## Uso correto das props

Se o componente receber:

- onSubmit
- onClick
- onDelete
- loading
- error
- data

Você deve apenas:

- Conectar essas props nos elementos visuais
- Exibir loading quando necessário
- Exibir erro quando necessário
- Renderizar data corretamente

---------------------------------------------------

## Regra sobre estado

Você só pode criar estado interno se:

- For estritamente necessário para comportamento visual
  (ex: abrir/fechar modal, controlar dropdown)

Mesmo assim:
- Deve perguntar antes de criar
- Nunca criar estado relacionado a regra de negócio

---------------------------------------------------

## Regra sobre novas funções

Se parecer necessário criar nova função:

Você deve primeiro perguntar:

"Posso criar uma nova função para resolver isso?"

Sem confirmação explícita, não criar.

---------------------------------------------------

## Objetivo

Componentes de layout devem ser:

- Puros
- Previsíveis
- Reutilizáveis
- Controlados por props
- Sem regra de negócio
- Sem dependência de infra