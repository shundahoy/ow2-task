"use server";
import { RegisterFormState } from "@/app/(types)/type";
import { PrismaClient } from "../../../generated/prisma/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData
) {
  const prisma = new PrismaClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      errors: {
        email: "emailは必須です",
        password: "passwordは必須です",
      },
      isSuccess: false,
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
    isSuccess: true,
  };
}
