import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.has("access_token");
  const { pathname } = request.nextUrl;

  // Permitir rota pública
  if (pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Se não estiver autenticado, redireciona para /auth
  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

// Evita rodar middleware em arquivos estáticos
export const config = {
  matcher: [
    /*
      Aplica para todas as rotas
      exceto:
      - _next (arquivos internos)
      - favicon.ico
      - imagens
    */
    "/((?!_next|favicon.ico|.*\\..*).*)",
  ],
};
