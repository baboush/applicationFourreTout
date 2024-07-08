import { z } from "zod";

export const titleTaskSchema = z.string().min(10).max(50);
export const contentTaskSchema = z.string().min(50).max(400);
export const dateFinishTaskSchema = z.date();
