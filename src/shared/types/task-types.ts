import { contentTaskSchema, titleTaskSchema } from "@shared/schemas";
import { z } from "zod";

export type TitleTask = z.infer<typeof titleTaskSchema>;
export type ContentTask = z.infer<typeof contentTaskSchema>;
