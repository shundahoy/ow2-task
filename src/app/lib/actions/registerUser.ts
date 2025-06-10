"use server";
import { PrismaClient } from "../../../generated/prisma/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

type State = {
  errors: {
    email: string;
    password: string;
  };
  success: boolean;
};

export async function registerUser(state: State, formData: FormData) {
  const prisma = new PrismaClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      errors: {
        email: "メールアドレスは必須です",
        password: "パスワードは必須です",
      },
      success: false,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.tUser.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return {
    errors: {
      email: "",
      password: "",
    },
    success: true,
  };
}
