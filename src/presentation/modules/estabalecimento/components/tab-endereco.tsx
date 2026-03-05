import { Input } from "@/presentation/shared/components/ui/input";
import { Label } from "@/presentation/shared/components/ui/label";
import { Button } from "@/presentation/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/shared/components/ui/select";
import { Save, Search } from "lucide-react";
import { ESTADOS_BR } from "../mocks/estados";
import { Controller } from "react-hook-form";
import { EnderecoModel } from "@/infra/api/model";
import { useCadastrarEnderecoMutation } from "../hooks/mutations/cadastrar-endereco.mutation";

type TabEnderecoProps = {
  endereco: EnderecoModel;
}

export function TabEndereco({ endereco }: TabEnderecoProps) {

  const { form, handleCadastrarEndereco, buscarEnderecoPorEstabelecimento } = useCadastrarEnderecoMutation({ endereco });

  return (
    <div className="space-y-6">
      <form onSubmit={handleCadastrarEndereco}>
      
      {/* CEP */}
      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <div className="flex gap-2">
          <Input
            id="cep"
            placeholder="00000-000"
            className="max-w-[200px]"
            {...form.register("cep")}
          />
          <Button onClick={buscarEnderecoPorEstabelecimento} type="button" variant="outline">
            <Search className="mr-1.5 h-4 w-4" /> Buscar CEP
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="rua">Rua</Label>
          <Input id="rua" placeholder="Rua, Avenida..." {...form.register("rua")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="numero">Número</Label>
          <Input id="numero" placeholder="123" {...form.register("numero")} />
          {form.formState.errors.numero && <p className="text-destructive text-sm">{form.formState.errors.numero?.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="complemento">Complemento</Label>
          <Input id="complemento" placeholder="Apto, Sala, Loja..." {...form.register("complemento")} />
          {form.formState.errors.complemento && <p className="text-destructive text-sm">{form.formState.errors.complemento?.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input id="bairro" placeholder="Bairro" {...form.register("bairro")} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade</Label>
          <Input id="cidade" placeholder="Cidade" {...form.register("cidade")} />
        </div>
        <div className="space-y-2">
          <Label>Estado</Label>
          <Controller
            name="estado"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {ESTADOS_BR.map((uf) => (
                    <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <Button type="submit">
        <Save className="mr-1.5 h-4 w-4" /> Salvar
      </Button>
      </form>

      <div className=" hidden gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input id="latitude" placeholder="-23.5505" {...form.register("latitude")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input id="longitude" placeholder="-46.6333" {...form.register("longitude")} />
        </div>
      </div>
    </div>
  );
}
