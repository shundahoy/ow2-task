"use client";
import React, { useActionState } from "react";
import { TaskFormState, UpdateTaskFormProps } from "../(types)/type";
import { useState, useEffect, useRef } from "react";
import { MChar } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { updateTask } from "../lib/actions/updateTask";

const INITIAL_STATE: TaskFormState = {
  errors: {
    title: [],
    role_id: [],
    char_id: [],
    status_code: [],
    comment: [],
  },
  isSuccess: false,
};

const UpdateForm = ({ chars, roles, statuses, task }: UpdateTaskFormProps) => {
  const [filteredChars, setFilteredChars] = useState<MChar[]>([]);

  const [selectedCharId, setSelectedCharId] = useState<number>(task.char_id);

  const [selectedRoleId, setSelectedRoleId] = useState<number>(task.role_id);

  const [state, formAction] = useActionState(updateTask, INITIAL_STATE);

  const router = useRouter();

  // キャラの絞り込み
  const autoCharSelect = (roleId: number) => {
    const activeChars = filterCharsByRole(roleId);
    setFilteredChars(activeChars);
    setSelectedCharId(activeChars[0].char_id);
  };

  const filterCharsByRole = (roleId: number) => {
    const activeChars = chars.filter((char) => char.role_id === roleId);
    return activeChars;
  };

  // 初期値セット
  useEffect(() => {
    const activeChars = filterCharsByRole(task.role_id);
    setFilteredChars(activeChars);
    setSelectedCharId(task.char_id);
  }, [task.role_id, state]);

  useEffect(() => {
    if (state.isSuccess) {
      router.push("/dashboard");
    }
  }, [state.isSuccess]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roleId = Number(e.target.value);
    setSelectedRoleId(roleId);
    autoCharSelect(roleId);
  };

  const handleCharChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCharId(Number(e.target.value));
  };

  return (
    <form className="space-y-4" action={formAction}>
      <div>タスクのID現在はこれよ；{selectedCharId}</div>
      <input type="hidden" name="taskId" value={task.task_id} />
      <div>
        <label className="block font-semibold">タイトル</label>
        <input
          type="text"
          name="title"
          className="w-full mt-1 border rounded px-3 py-2"
          placeholder="タスクタイトル"
          defaultValue={task.title}
        />
        {state.errors?.title?.map((err, index) => (
          <p key={index} className="text-red-500 text-xs mt-1">
            {err}
          </p>
        ))}
      </div>

      <div className="border p-8">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold">ロール</label>
            <select
              name="role"
              className="w-full mt-1 border rounded px-3 py-2"
              onChange={handleRoleChange}
              value={selectedRoleId}
            >
              {roles.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name}
                </option>
              ))}
            </select>
            {state.errors?.role_id?.map((err, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">
                {err}
              </p>
            ))}
          </div>

          <div>
            <label className="block font-semibold">キャラ</label>
            <select
              name="character"
              className="w-full mt-1 border rounded px-3 py-2"
              value={selectedCharId}
              onChange={handleCharChange}
            >
              {filteredChars.map((char) => (
                <option key={char.char_id} value={char.char_id}>
                  {char.char_name}
                </option>
              ))}
            </select>
            {state.errors?.char_id?.map((err, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">
                {err}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold">登録日</label>
            <input
              type="date"
              name="date"
              className="w-full mt-1 border rounded px-3 py-2"
              defaultValue={
                new Date(task.create_date).toISOString().split("T")[0]
              }
            />
          </div>

          <div>
            <label className="block font-semibold">ステータス</label>
            <select
              name="status"
              className="w-full mt-1 border rounded px-3 py-2"
              defaultValue={task.status_code}
            >
              {statuses.map((status) => (
                <option key={status.status_code} value={status.status_code}>
                  {status.status_name}
                </option>
              ))}
            </select>
            {state.errors?.status_code?.map((err, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">
                {err}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">コメント</label>
          <textarea
            name="comment"
            rows={4}
            className="w-full mt-1 border rounded px-3 py-2"
            defaultValue={task.comment}
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => router.push("/dashboard/task/" + task.task_id)}
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          完了
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
