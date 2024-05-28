import * as z from 'zod';
import {
  emailSchema,
  loginUserSchema,
  passwordSchema,
  promiseUserSchema,
  roleSchema,
  usernameSchema,
} from '../schemas/user-schema';
export type Username = z.infer<typeof usernameSchema>;

export type Password = z.infer<typeof passwordSchema>;

export type Email = z.infer<typeof emailSchema>;

export type Role = z.infer<typeof roleSchema>;

export type PromiseUser = z.infer<typeof promiseUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
