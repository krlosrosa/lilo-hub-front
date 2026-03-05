import axios from 'axios';
import type { AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 1. Definição da interface padrão de resposta da API (Standardized Enveloping)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  statusCode: number;
}

// 2. Criação da Instância
export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. Interceptor de Requisição (Inject Token & Content-Type Logic)
AXIOS_INSTANCE.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Lógica de Content-Type automático
    if (
      !config.headers['Content-Type'] && 
      config.method && 
      ['post', 'put', 'patch'].includes(config.method.toLowerCase())
    ) {
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
    }

    // Nota: A injeção do Bearer Token do Keycloak geralmente entra aqui.
    // Exemplo: config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

// 4. Interceptor de Resposta (Padronização de Sucesso e Erro)
AXIOS_INSTANCE.interceptors.response.use(
  (response: AxiosResponse) => {
    const body = response.data as Record<string, unknown>;
    const isAlreadyEnvelope =
      typeof body === 'object' &&
      body !== null &&
      'success' in body &&
      'data' in body;

    if (isAlreadyEnvelope) {
      // Backend já retornou no formato ApiResponse; normalizar sem envelopar de novo
      response.data = {
        data: body.data,
        success: body.success === true,
        message: typeof body.message === 'string' ? body.message : undefined,
        statusCode: typeof body.statusCode === 'number' ? body.statusCode : response.status,
      } as ApiResponse<unknown>;
    } else {
      // Backend retornou só o payload; envelopar
      response.data = {
        data: response.data,
        success: true,
        statusCode: response.status,
        message: (response.data as Record<string, unknown>)?.message as string | undefined || 'Operação realizada com sucesso',
      } as ApiResponse<unknown>;
    }
    return response;
  },
  (error: AxiosError) => {
    // Padronização de erro para o Frontend
    const errorData = error.response?.data as Record<string, unknown> | undefined;
    
    const standardizedError: ApiResponse<null> = {
      data: null,
      success: false,
      statusCode: error.response?.status || 500,
      message: (typeof errorData?.message === 'string' ? errorData.message : typeof errorData?.detail === 'string' ? errorData.detail : undefined) ?? error.message ?? 'Erro inesperado no servidor',
    };

    // O reject passa o objeto padronizado para o .catch() ou try/catch
    return Promise.reject(standardizedError);
  }
);

// 5. Fetcher compatível com a assinatura do customInstance (Orval / React Query)
export const axiosFetcher = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => { // <--- Mudança aqui: O retorno agora é fixo como ApiResponse
  const source = axios.CancelToken.source();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    withCredentials: true,
    headers: {
      ...config.headers,
      ...options?.headers,
    },
    cancelToken: source.token,
  }).then(({ data }) => data as ApiResponse<T>);

  return promise;
};

// Tipos extras para compatibilidade
export type ErrorType<Error> = ApiResponse<Error>; // Erro agora usa nossa interface
export type BodyType<BodyData> = BodyData;