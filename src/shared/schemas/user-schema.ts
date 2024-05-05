import * as z from "zod";

const Role = ["USER", "ADMIN", "CONTRIBUTEUR"] as const;

// Définition du schéma Zod
export const roleSchema = z.enum(Role).default("USER");
export const emailSchema = z.string().email().min(5);
export const usernameSchema = z
  .string()
  .max(80)
  .min(4)
  .regex(/^[a-zA-Z0-9s]*$/);

export const passwordSchema = z
  .string()
  .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/);
export const userSchema = z.object({
  username: usernameSchema,
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
