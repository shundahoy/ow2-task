// app/api/auth/session/route.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user }, { status: 200 });
};
