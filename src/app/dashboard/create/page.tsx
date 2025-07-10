import CreateForm from "@/app/(components)/CreateForm";
import { PrismaClient } from "@/generated/prisma";

export default async function CreatePage() {
  const prisma = new PrismaClient();
  const chars = await prisma.mChar.findMany();
  const roles = await prisma.mRole.findMany();
  const statuses = await prisma.mStatus.findMany();
  return (
    <div className="max-w-3xl mx-auto p-6  rounded-md shadow-md mt-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">タスク登録</h1>
      <CreateForm chars={chars} roles={roles} statuses={statuses} />
    </div>
  );
}
