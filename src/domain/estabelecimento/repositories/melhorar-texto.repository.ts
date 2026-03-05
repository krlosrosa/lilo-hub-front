export interface MelhorarTextoRepository {
  melhorarTextoDb(texto: string): Promise<string>;
}