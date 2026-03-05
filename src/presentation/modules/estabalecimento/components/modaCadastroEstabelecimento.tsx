import { Dialog, DialogContent, DialogTrigger } from "@/presentation/shared/components/ui/dialog";
import { Button } from "@/presentation/shared/components/ui/button";
import { Input } from "@/presentation/shared/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CriarEstabelecimentoDto } from "@/infra/api/model";
import { FormField } from "./form-field";

type ModaCadastroEstabelecimentoProps = {
  form: UseFormReturn<CriarEstabelecimentoDto>;
  onSubmit: () => void;
}

export function ModaCadastroEstabelecimento({ form, onSubmit }: ModaCadastroEstabelecimentoProps) {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cadastrar Estabelecimento</Button>
      </DialogTrigger>
      <DialogContent>
        <FormField label="Nome" htmlFor="nome" error={errors.nome?.message}>
          <Input placeholder="Nome do Estabelecimento" {...register('nome')} />
        </FormField>
        <Button type="button" onClick={handleSubmit(onSubmit)}>Cadastrar</Button>
      </DialogContent>
    </Dialog>
  )
}