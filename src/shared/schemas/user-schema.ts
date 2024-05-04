import * as z from 'zod';

const Role = ['USR', 'ADMIN', 'CONTRIBUTEUR'] as const;

// Définition du schéma Zod
export const roleSchema = z.enum(Role).default('USR');
export const emailSchema = z.string().email().min(5);
export const usernameSchema = z
  .string()
  .max(80)
  .min(4)
  .regex(/^[a-zA-Z0-9s]*$/);

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+]{8,20}$/,
  );
export const userSchema = z.object({
  usrname: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
  role: roleSchema,
});

export const loginUserSchema = z.object({
  id: z.number(),
  username: usernameSchema,
  password: passwordSchema,
});

export const promiseUserSchema = loginUserSchema.promise();
