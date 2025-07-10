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
