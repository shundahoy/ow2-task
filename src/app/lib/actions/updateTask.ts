// app/actions/createTask.ts
"use server";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/auth";
import { TaskFormState } from "@/app/(types)/type";
import { buildTaskSchema } from "../validate/validate";

export async function updateTask(
  prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  const prisma = new PrismaClient();
  const session = await auth();
  const userId = Number(session?.user?.id);

  if (!userId) {
    throw new Error("ログインしていません");
  }

  const taskId = Number(formData.get("taskId"));
  if (!taskId) {
    throw new Error("タスクIDが未設定です");
  }

  const roles = await prisma.mRole.findMany();
  const characters = await prisma.mChar.findMany();
  const statuses = await prisma.mStatus.findMany();
  const schema = buildTaskSchema(roles, characters, statuses);
  const data = {
    title: formData.get("title")?.toString() ?? "",
    role_id: Number(formData.get("role")),
    char_id: Number(formData.get("character")),
    status_code: Number(formData.get("status")),
    comment: formData.get("comment") || "",
  };
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = {
      errors: result.error.flatten().fieldErrors,
      isSuccess: false,
    };
    return errors;
  }

  const dateStr = formData.get("date")?.toString();
  const create_date =
    dateStr && dateStr !== "" ? new Date(dateStr) : new Date();

  try {
    await prisma.tTask.update({
      where: {
        task_id: taskId,
      },
      data: {
        title: result.data?.title ?? "",
        user_id: userId,
        role_id: result.data?.role_id ?? 0,
        char_id: result.data?.char_id ?? 0,
        status_code: result.data?.status_code ?? 0,
        create_date: create_date,
        comment: result.data?.comment ?? "",
      },
    });

    return {
      errors: {
        title: [],
        role_id: [],
        char_id: [],
        comment: [],
      },
      isSuccess: true,
    };
  } catch (err) {
    return {
      errors: {
        title: [],
        role_id: [],
        char_id: [],
        comment: [],
      },
      isSuccess: false,
    };
  }
}
