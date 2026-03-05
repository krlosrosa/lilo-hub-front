import { AddressModelOutput } from "@/application/estabelecimentos/dtos/address.model";

export class AddressService{
  async findByCep(cep: string){
    const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(!response.ok) {
      throw new Error('Failed to fetch address');
    }
    return response.json() as unknown as AddressModelOutput;
  }
}