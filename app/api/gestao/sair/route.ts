import { NextResponse } from "next/server";
import { COOKIE } from "@/lib/gestao/auth";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/gestao/entrar", req.url), 303);
  res.cookies.set(COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
