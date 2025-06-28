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
