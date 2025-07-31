import type { MChar, MRole, MStatus, TTask } from "@/generated/prisma";

export type RegisterFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  isSuccess: boolean;
};

export type LoginFormState = {
  errors?: {
    message?: string[];
  };
};

export type CreateTaskFormProps = {
  chars: MChar[];
  roles: MRole[];
  statuses: MStatus[];
};

export type UpdateTaskFormProps = {
  chars: MChar[];
  roles: MRole[];
  statuses: MStatus[];
  task: TTask;
};

export type TaskFormState = {
  errors?: {
    title?: string[];
    role_id?: string[];
    char_id?: string[];
    status_code?: string[];
    comment?: string[];
  };
  isSuccess: boolean;
};
