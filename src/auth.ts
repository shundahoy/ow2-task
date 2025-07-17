import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "./generated/prisma";
import { authValidate } from "@/app/lib/validate/validate";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await authValidate.parseAsync(
            credentials
          );

          // ユーザーをDBから取得
          const user = await prisma.tUser.findFirst({
            where: { email },
          });

          if (!user || !user.password) {
            return null;
          }

          // パスワードの検証
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) return null;

          // 認証成功時
          return {
            id: user.user_id.toString(),
            name: user.email,
            email: user.email,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub; // ← user_id がここに入る
      }
      return session;
    },
  },
});
