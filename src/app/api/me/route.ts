// app/api/me/route.ts
import { tokenToUser } from "@/application/user/mappers/tokenToUser";
import { cookies } from "next/headers";

export async function GET() {
  const cookie_list = await cookies()
  const token = cookie_list.get("access_token")?.value;

  if (!token) {
    (await cookies()).delete("access_token");
    return Response.json({ user: null }, { status: 401 });
  }

  // validar token aqui (JWT ou backend)
  const user = await tokenToUser(token);

  return Response.json({ user });
}
