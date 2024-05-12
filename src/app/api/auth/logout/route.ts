import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextResponse) {
  const cookieStore = cookies();
  cookieStore.delete("token");

  return NextResponse.redirect(new URL("/", req.url));
}
