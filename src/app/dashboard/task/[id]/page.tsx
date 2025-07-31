import { PrismaClient } from "@/generated/prisma";
import React from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";

import DeleteButton from "@/app/(components)/DeleteButton";
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
    <div className="max-w-3xl mx-auto p-6 rounded-md shadow-md mt-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">タスク詳細</h1>
      <div className="mb-6">
        <div className="rounded-md">
          <div
            className="w-full mt-1 border rounded px-3 py-2 mb-4 break-words break-all"
            style={{ wordBreak: "keep-all" }}
          >
            <span>{task.title}</span>
          </div>

          <div className="border rounded p-8">
            <div className="flex flex-row justify-around">
              <div className="flex-col flex w-6/12 mb-10">
                <span className="font-semibold">ロール</span>
                <span className="">{task.role.role_name}</span>
              </div>
              <div className="flex-col flex w-6/12 mb-10">
                <span className="font-semibold">キャラ</span>
                <span className="">{task.char.char_name}</span>
              </div>
            </div>
            <div className="flex flex-row justify-around">
              <div className="flex-col flex w-6/12 mb-10">
                <span className="font-semibold">登録日</span>
                <span className="">
                  {format(new Date(task.create_date), "yyyy/MM/dd（EEE）", {
                    locale: ja,
                  })}
                </span>
              </div>
              <div className="flex-col flex w-6/12 mb-10">
                <span className="font-semibold">ステータス</span>
                <span className="">{task.status.status_name}</span>
              </div>
            </div>
            <div className="flex flex-row justify-around">
              <div className="w-full mt-2">
                <span className="font-semibold">コメント</span>
                <p
                  className="whitespace-pre-wrap break-words break-all"
                  style={{ wordBreak: "keep-all" }}
                >
                  {task.comment}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Link
          href="/dashboard"
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          キャンセル
        </Link>
        <div className="flex gap-4">
          <Link
            href={`/dashboard/task/${task.task_id}/edit`}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            編集
          </Link>

          <DeleteButton taskId={task.task_id} />
        </div>
      </div>
    </div>
  );
}
