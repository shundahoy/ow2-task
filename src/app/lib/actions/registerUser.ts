"use server";
import { RegisterFormState } from "@/app/(types)/type";
import { PrismaClient } from "../../../generated/prisma/client";
import bcrypt from "bcrypt";
import { authValidate } from "../validate/validate";
import { signIn } from "../../../auth";

export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData
) {
  const prisma = new PrismaClient();

  const validateResult = authValidate.safeParse({
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validateResult.success) {
    const errors = {
      errors: validateResult.error.flatten().fieldErrors,
      isSuccess: false,
    };
    return errors;
  }

  const hashedPassword = await bcrypt.hash(validateResult.data.password, 10);
  await prisma.tUser.create({
    data: {
      email: validateResult.data.email,
      password: hashedPassword,
    },
  });

  const result = await signIn("credentials", {
    redirect: false,
    email: validateResult.data.email,
    password: validateResult.data.password,
  });

  return {
    errors: {
      email: [],
      password: [],
    },
    isSuccess: true,
  };
}
