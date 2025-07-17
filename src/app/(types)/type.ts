import type { MChar, MRole, MStatus } from "@/generated/prisma";

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

export type TaskFormProps = {
  chars: MChar[];
  roles: MRole[];
  statuses: MStatus[];
};

export type CreateTaskFormState = {
  errors?: {
    title?: string[];
    role_id?: string[];
    char_id?: string[];
    status_code?: string[];
    comment?: string[];
  };
  isSuccess: boolean;
};
