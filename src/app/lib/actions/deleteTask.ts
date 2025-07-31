"use server";

import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTask(taskId: number) {
  const prisma = new PrismaClient();
  await prisma.tTask.delete({
    where: { task_id: taskId },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
