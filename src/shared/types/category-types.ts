import * as z from "zod";

export const nameCategorySchema = z.string().max(40).min(5);

export type NameCategory = z.infer<typeof nameCategorySchema>;
