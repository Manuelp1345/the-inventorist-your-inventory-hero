import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = cookies();
  cookieStore.delete("token");

  return Response.redirect(new URL("/", req.url));
}
