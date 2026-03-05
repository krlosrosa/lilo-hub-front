import { AddressService } from "@/infra/services/address.service";
import { AddressModelOutput } from "./dtos/address.model";

export class BuscarEnderecoPorCepUseCase {
  constructor(
    private readonly addressService: AddressService
  ){}
  async execute(cep: string): Promise<AddressModelOutput> {
    const address = await this.addressService.findByCep(cep);
    return address;
  }
}