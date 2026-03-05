import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/guia/comercial/busca")}
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-left text-muted-foreground shadow-sm transition-shadow hover:shadow-md"
    >
      <Search className="h-5 w-5 shrink-0" />
      <span className="text-sm">Buscar empresas, serviços...</span>
    </button>
  );
};

export default SearchBar;
