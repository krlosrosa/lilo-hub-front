import { uploadImage } from "../api/service/storage/storage";

export class MinioService {
  async uploadFile(path: string, file: File, bucket: string = 'lilo-hub'): Promise<string> {
    const response = await uploadImage({
      bucket: bucket,
      path: path,
    })

    if(!response.success) {
      throw new Error(response.message);
    }
    const uploadMinioResponse = await fetch(response.data, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
    if(!uploadMinioResponse.ok) {
      throw new Error(uploadMinioResponse.statusText);
    }
    return response.data;
  }
}