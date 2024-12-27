import { z } from 'zod';

export type User = {
  id: number | string;
  name: string;
  email: string;
  role: string;
};

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Name must be at least 4 characters long' })
    .max(20, { message: 'Name cannot exceed 20 characters' })
    .trim(),
  email: z
    .string()
    .min(3, { message: 'Email must be at least 3 characters long' })
    .max(100, { message: 'Email cannot exceed 20 characters' }),
  role: z
    .string()
    .min(3, { message: 'Role must be at least 3 characters long' })
    .max(20, { message: 'Role cannot exceed 20 characters' }),
});

export type FormData = z.infer<typeof CreateUserSchema>;
