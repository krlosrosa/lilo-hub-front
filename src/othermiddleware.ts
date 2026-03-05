// middleware.ts

import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = "lvh.me:3000";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1️⃣ Ignorar arquivos estáticos, api e next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const host = request.headers.get("host")?.split(":")[0];

  if (!host) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  // 2️⃣ Evitar rewrite duplicado
  const pathParts = pathname.split("/").filter(Boolean);
  if (pathParts.length > 0) {
    // Se já estiver em formato /[territorio]/...
    // evita processar novamente
    if (pathParts[0].length > 2) {
      return NextResponse.next();
    }
  }

  // -------------------------
  // 3️⃣ LOCALHOST (DEV)
  // ex: bauru.localhost:3000
  // -------------------------
  if (host.includes("localhost")) {
    const subdomain = host.split(".")[0];

    if (subdomain !== "localhost") {
      url.pathname = `/${subdomain}${pathname}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  // -------------------------
  // 4️⃣ SUBDOMÍNIO PADRÃO
  // ex: bauru.meuguia.app
  // -------------------------
  if (host.endsWith(ROOT_DOMAIN)) {
    const subdomain = host.replace(`.${ROOT_DOMAIN}`, "");

    if (subdomain && subdomain !== "www") {
      url.pathname = `/${subdomain}${pathname}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  // -------------------------
  // 5️⃣ DOMÍNIO CUSTOMIZADO
  // ex: guiabauru.com.br
  // -------------------------

  try {
    const response = await fetch(
      `${request.nextUrl.origin}/api/resolve-dominio`,
      {
        headers: { host },
        next: { revalidate: 300 }, // 🔥 cache 5 minutos no edge
      }
    );

    if (!response.ok) {
      return NextResponse.next();
    }

    const data = await response.json();

    if (!data) {
      return NextResponse.next();
    }

    if (data.tipo === "territorio") {
      url.pathname = `/${data.slug}${pathname}`;
      return NextResponse.rewrite(url);
    }

    if (data.tipo === "estabelecimento") {
      url.pathname = `/${data.territorio_slug}/${data.estabelecimento_slug}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro ao resolver domínio:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};