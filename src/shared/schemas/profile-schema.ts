import * as z from "zod";
export const nameSchema = z
  .string()
  .max(40)
  .min(3)
  .regex(/^[A-Z][a-zA-Z]*$/)
  .nullable();

export const surnameSchema = z
  .string()
  .max(50)
  .min(3)
  .regex(/^[A-Z][a-zA-Z]*$/)
  .nullable();
