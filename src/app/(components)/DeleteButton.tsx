"use client";

import React from "react";
import { deleteTask } from "../lib/actions/deleteTask";

type DeleteButtonProps = {
  taskId: number;
};
const DeleteButton = (props: DeleteButtonProps) => {
  const handleDelete = async () => {
    const ok = confirm("本当に削除しますか？");
    if (ok) {
      await deleteTask(props.taskId);
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
    >
      削除
    </button>
  );
};

export default DeleteButton;
