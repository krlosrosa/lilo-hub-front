"use client";
import { useEffect, useState } from "react";
import { Input } from "@/presentation/shared/components/ui/input";
import { Textarea } from "@/presentation/shared/components/ui/textarea";
import { Label } from "@/presentation/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/shared/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/presentation/shared/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/presentation/shared/components/ui/card";
import { Button } from "@/presentation/shared/components/ui/button";
import { HelpCircle, Store, Globe, Image as ImageIcon } from "lucide-react";
import { imageUrl } from "@/presentation/shared/lib/image-url";
import { normalizarTextSlug } from "@/presentation/shared/lib/normalizar-text-slug";
import { Controller } from "react-hook-form";
import { useEditarEstabelecimentoMutation } from "../hooks/mutations/editar-estabelecimento.mutation";
import Image from "next/image";
import { EstabelecimentoModelOutput } from "@/infra/api/model";

type TabInformacoesGeraisProps = {
  estabelecimento: EstabelecimentoModelOutput;
}

export function TabInformacoesGerais({ estabelecimento }: TabInformacoesGeraisProps) {
  const { fileImage, setFileImage, form, editarEstabelecimento } = useEditarEstabelecimentoMutation({ estabelecimento } );
  const slugPreview = form.watch("slug") ?? "";
  const logoUrl = form.watch("logoUrl");
  const coverUrl = form.watch("coverUrl");

  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (fileImage.logo) {
      const url = URL.createObjectURL(fileImage.logo);
      queueMicrotask(() => setLogoPreviewUrl(url));
      return () => {
        URL.revokeObjectURL(url);
        setLogoPreviewUrl(null);
      };
    }
    queueMicrotask(() => setLogoPreviewUrl(null));
  }, [fileImage.logo]);

  useEffect(() => {
    if (fileImage.cover) {
      const url = URL.createObjectURL(fileImage.cover);
      queueMicrotask(() => setCoverPreviewUrl(url));
      return () => {
        URL.revokeObjectURL(url);
        setCoverPreviewUrl(null);
      };
    }
    queueMicrotask(() => setCoverPreviewUrl(null));
  }, [fileImage.cover]);

  const logoImgSrc = !logoPreviewUrl ? imageUrl(logoUrl) : logoPreviewUrl;
  const coverImgSrc = !coverPreviewUrl ? imageUrl(coverUrl) : coverPreviewUrl;

  return (
    <form onSubmit={editarEstabelecimento} className="space-y-6">

      {/* ─── Seção 1: Identidade ─── */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg">Identidade do Estabelecimento</CardTitle>
              <CardDescription>Nome, slug e descrição que identificam seu negócio.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">
              Nome do Estabelecimento <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nome"
              placeholder="Ex: Restaurante Sabor & Arte"
              {...form.register("nome")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="flex items-center gap-1.5">
              Slug (URL amigável) <span className="text-destructive">*</span>
              <Tooltip>
                <TooltipTrigger asChild><HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" /></TooltipTrigger>
                <TooltipContent>Será usado na URL pública do estabelecimento. Use apenas letras minúsculas, números e hifens.</TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="slug"
              placeholder="meu-estabelecimento"
              value={slugPreview}
              onChange={(e) => form.setValue("slug", normalizarTextSlug(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">{`bauru.lilo-hub.app/${slugPreview || "..."}`}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Conte brevemente sobre o estabelecimento..."
              rows={3}
              {...form.register("descricao")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sobreNos">Sobre Nós</Label>
            <Textarea
              id="sobreNos"
              placeholder="Conte brevemente sobre o estabelecimento..."
              rows={3}
              {...form.register("sobreNos")}
            />
          </div>
        </CardContent>
      </Card>

      {/* ─── Seção 2: Imagens ─── */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg">Imagens Principais</CardTitle>
              <CardDescription>Logo e capa que representam visualmente o estabelecimento.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label>Logo</Label>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {logoImgSrc ? (
                  <div className="w-24 h-24 rounded-lg border overflow-hidden bg-muted shrink-0">
                    <Image
                      src={logoImgSrc}
                      alt="Logo"
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg border border-dashed bg-muted flex items-center justify-center shrink-0">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 space-y-1 min-w-0">
                  <Input
                    type="file"
                    accept="image/*"
                    className="text-sm"
                    onChange={(e) => setFileImage({ ...fileImage, logo: e.target.files?.[0] ?? null })}
                  />
                  <p className="text-xs text-muted-foreground">Recomendado: 200×200px, PNG ou JPG</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Imagem de Capa</Label>
              <div className="space-y-2">
                {coverImgSrc ? (
                  <div className="aspect-video max-h-32 rounded-lg border overflow-hidden bg-muted">
                    <img src={coverImgSrc} alt="Capa" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-video max-h-32 rounded-lg border border-dashed bg-muted flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  className="text-sm"
                  onChange={(e) => setFileImage({ ...fileImage, cover: e.target.files?.[0] ?? null })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Seção 3: Contato e Integração ─── */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg">Contato e Integração</CardTitle>
              <CardDescription>Telefone e integração com Google Maps.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(11) 99999-9999"
                {...form.register("telefone")}
              />
            </div>
            <div className="space-y-2">
              {/* price range */}
              <Label>Faixa de Preço</Label>
              <Controller
                name="priceRange"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value ?? ''} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="$">$ — Econômico</SelectItem>
                      <SelectItem value="$$">$$ — Moderado</SelectItem>
                      <SelectItem value="$$$">$$$ — Premium</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">Salvar alterações</Button>
      </div>
    </form>
  );
}
