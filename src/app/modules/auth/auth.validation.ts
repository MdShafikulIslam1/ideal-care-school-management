import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'user ID must be required',
    }),
    password: z.string({
      required_error: 'password must be required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
