import { AddressService } from "@/infra/services/address.service";
import { BuscarEnderecoPorCepUseCase } from "@/application/estabelecimentos/buscar-info-por-cep.usecase";

export function makeBuscarEnderecoPorCepFactory() {
  const addressService = new AddressService();
  const buscarEnderecoPorCepUseCase = new BuscarEnderecoPorCepUseCase(addressService);
  return buscarEnderecoPorCepUseCase;
}
