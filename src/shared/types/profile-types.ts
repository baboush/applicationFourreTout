import * as z from "zod";
import { nameSchema, surnameSchema } from "@shared/schemas";

export type Name = z.infer<typeof nameSchema>;

export type Surname = z.infer<typeof surnameSchema>;
