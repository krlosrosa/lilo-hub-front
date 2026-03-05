# Arquitetura Oficial do Front-End

Este projeto segue Clean Architecture no Front-End.

## REGRA GLOBAL AUTOMÁTICA

Sempre que o usuário disser:

"crie o caso de uso X no módulo Y"

Você deve automaticamente:

---------------------------------------------------

1️⃣ APPLICATION

- Criar DTO em:
  src/application/Y/dtos/

- Criar UseCase em:
  src/application/Y/usecases/

- Atualizar index.ts do módulo

---------------------------------------------------

2️⃣ DOMAIN

- Verificar se o método existe na interface em:
  src/domain/Y/

- Se não existir:
  - Adicionar assinatura na interface do repositório

---------------------------------------------------

3️⃣ INFRA

- Adicionar o mesmo método na implementação em:
  src/infra/db/

- O método deve conter apenas:

  throw new Error('Method not implemented.')

- Nunca implementar lógica HTTP automaticamente

---------------------------------------------------

4️⃣ PRESENTATION

- Criar hook em:
  src/presentation/modules/Y/hooks/

  Nome padrão:
  use{{UseCaseName}}

- O hook deve:
  - Chamar a factory
  - Executar o UseCase
  - Expor loading, error e execute()

- Se for um caso de uso com formulário:
  - Criar hook em:
    src/presentation/modules/Y/forms/
  - Usar react-hook-form

---------------------------------------------------

5️⃣ FACTORY

- Criar ou atualizar factory em:
  src/core/factories/Y.factory.ts

- A factory deve:
  - Instanciar o repository
  - Instanciar o UseCase
  - Retornar o UseCase

---------------------------------------------------

REGRAS FIXAS

- Nunca usar any
- Nunca misturar camadas
- Hook nunca chama infra diretamente
- Hook sempre usa factory
- UseCase nunca depende de React
- Infra nunca depende de React
- Sempre atualizar index.ts se necessário
- Sempre fazer todas as alterações necessárias em todos os arquivos afetados