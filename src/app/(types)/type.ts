export type RegisterFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  isSuccess: boolean;
};
