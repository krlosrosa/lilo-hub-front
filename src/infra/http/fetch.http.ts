import { ApiResponse } from "./axios.http";

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${process.env.API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }

  const data = await response.json() as ApiResponse<T>;
  return data.data;
}

export { fetchJson };