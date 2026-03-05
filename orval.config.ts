// orval.config.ts
import { defineConfig } from 'orval';

export default defineConfig({
  // Bloco 1: Gera o cliente React Query e os tipos TypeScript normais
  unnoqApi: {
    input: {
      target: 'http://localhost:4000/docs-json',
    },
    output: {
      headers: true,
      prettier: true,
      mode: 'tags-split',
      target: 'src/infra/api/service', // Cliente e hooks vão para cá
      schemas: 'src/infra/api/model', // Tipos TS (interfaces) vão para cá
      client: 'axios-functions',
      override: {
        mutator: {
          path: './src/infra/http/axios.http.ts',
          name: 'axiosFetcher',
        },
      },
    },
  },

  // Bloco 2: Gera APENAS os schemas Zod
  unnoqApiZod: {
    input: {
      target: 'http://localhost:4000/docs-json',
    },
    output: {
      client: 'zod',
      target: 'src/infra/api/schema',
      fileExtension: '.zod.ts',
      mode: 'tags-split', // É bom manter o mesmo modo para consistência
    },
  },
});
