"use server";

import { LoginFormState } from "@/app/(types)/type";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function login(prevState: LoginFormState, formData: FormData) {
  try {
    await signIn("credentials", formData);
    return {
      errors: {
        message: [],
      },
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: {
              message: ["認証に失敗しました", error.type],
            },
          };
        default:
          return {
            errors: {
              message: ["認証に失敗しました", error.type],
            },
          };
      }
    }
    throw error;
  }
}
