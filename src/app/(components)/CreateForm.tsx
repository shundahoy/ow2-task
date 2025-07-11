"use client";
import React from "react";
import { TaskFormProps } from "../(types)/type";
import { useState, useEffect, useRef } from "react";
import { MChar } from "@/generated/prisma";

const CreateForm = ({ chars, roles, statuses }: TaskFormProps) => {
  const [filteredChars, setFilteredChars] = useState<MChar[]>([]);
  const selectRef = useRef<HTMLSelectElement>(null);
  const autoCharSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleId = Number(e.target.value);
    const activeChars = chars.filter((char) => char.role_id === selectedRoleId);
    setFilteredChars(activeChars);
  };

  useEffect(() => {
    console.log(selectRef);
    if (selectRef.current) {
      const event = new Event("change", { bubbles: true });
      selectRef.current.dispatchEvent(event);
    }
  }, []);
  return (
    <form className="space-y-4">
      <div>
        <label className="block font-semibold"></label>
        <input
          type="text"
          name="title"
          className="w-full mt-1 border rounded px-3 py-2"
          placeholder="タスクタイトル"
        />
      </div>
      <div className="border p-8">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold">ロール</label>
            <select
              name="role"
              className="w-full mt-1 border rounded px-3 py-2"
              onChange={autoCharSelect}
              ref={selectRef}
            >
              {roles.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold">キャラ</label>
            <select
              name="character"
              className="w-full mt-1 border rounded px-3 py-2"
            >
              {filteredChars.map((char) => (
                <option key={char.char_id} value={char.char_id}>
                  {char.char_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label className="block font-semibold">登録日</label>
            <input
              type="date"
              name="date"
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">ステータス</label>
            <select
              name="status"
              className="w-full mt-1 border rounded px-3 py-2"
            >
              {statuses.map((status) => (
                <option key={status.status_code} value={status.status_code}>
                  {status.status_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">コメント</label>
          <textarea
            name="comment"
            rows={4}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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

export default CreateForm;
