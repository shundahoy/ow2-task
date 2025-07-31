import UpdateForm from "@/app/(components)/UpdateForm";
import { PrismaClient } from "@/generated/prisma";

export default async function UpdatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const prisma = new PrismaClient();
  const chars = await prisma.mChar.findMany();
  const roles = await prisma.mRole.findMany();
  const statuses = await prisma.mStatus.findMany();

  const params = await props.params;
  const taskId = Number(params.id);

  const task = await prisma.tTask.findUnique({
    where: { task_id: taskId },
  });

  if (!task) {
    return <>ないよ</>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-md shadow-md mt-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">タスク編集</h1>
      <UpdateForm chars={chars} roles={roles} statuses={statuses} task={task} />
    </div>
  );
}
