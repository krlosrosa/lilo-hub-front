import imageCompression from "browser-image-compression";

export async function converterParaWebp(
  arquivo: File,
  opcoes?: {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    quality?: number; // 0 a 1
  }
): Promise<File> {
  const options = {
    maxSizeMB: opcoes?.maxSizeMB ?? 2,
    maxWidthOrHeight: opcoes?.maxWidthOrHeight ?? 1920,
    initialQuality: opcoes?.quality ?? 0.8,
    useWebWorker: true,
    fileType: "image/webp",
  };

  const arquivoConvertido = await imageCompression(arquivo, options);

  // Garante extensão .webp
  const nomeWebp = arquivo.name.replace(/\.\w+$/, ".webp");

  return new File([arquivoConvertido], nomeWebp, {
    type: "image/webp",
    lastModified: Date.now(),
  });
}