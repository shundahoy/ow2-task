import { PrismaClient } from "@/generated/prisma";
import React from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
export default async function TaskDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const prisma = new PrismaClient();
  const taskId = Number(params.id);

  const task = await prisma.tTask.findUnique({
    where: { task_id: taskId },
    include: {
      status: true,
      role: true,
      char: true,
    },
  });

  if (!task) {
    return (
      <div className="text-center mt-10 text-xl">タスクが見つかりません</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-8 space-y-6">
      <h2 className="text-2xl font-bold">タスク詳細</h2>

      <div className="flex flex-wrap gap-x-6 gap-y-4">
        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-500">タイトル</p>
          <p className="text-lg font-medium text-gray-900">{task.title}</p>
        </div>

        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-500">登録日</p>
          <p className="text-lg">
            {format(new Date(task.create_date), "yyyy/MM/dd（EEEE）", {
              locale: ja,
            })}
          </p>
        </div>

        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-500">ステータス</p>
          <p className="text-lg">{task.status.status_name}</p>
        </div>

        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-500">ロール</p>
          <p className="text-lg">{task.role.role_name}</p>
        </div>

        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-500">キャラクター</p>
          <p className="text-lg">{task.char.char_name}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-500">コメント</p>
        <p className="text-base whitespace-pre-wrap text-gray-800">
          {task.comment}
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Link
          href={`/dashboard/task/${task.task_id}/edit`}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          編集
        </Link>
        <Link
          href="/dashboard"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          完了
        </Link>
      </div>
    </div>
  );
}
