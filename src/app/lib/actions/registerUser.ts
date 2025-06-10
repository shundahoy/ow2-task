"use server";
import { PrismaClient } from "../../../generated/prisma/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const prisma = new PrismaClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("メールアドレスとパスワードは必須です");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.tUser.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  redirect("/login?register=true");
}
