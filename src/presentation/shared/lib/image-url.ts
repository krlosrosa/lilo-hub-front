/**
 * Base URL do bucket R2 onde as imagens do estabelecimento são armazenadas.
 */
export const R2_IMAGE_BASE =
  "https://pub-8e9c78adb7584806afb74c8dbf1e6c49.r2.dev/";

/**
 * Retorna a URL completa da imagem. Se o path já for uma URL (começa com http),
 * devolve como está; caso contrário, adiciona o prefixo R2.
 */
export function imageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.replace(/^\//, "");
  return `${R2_IMAGE_BASE}${normalized}`;
}
