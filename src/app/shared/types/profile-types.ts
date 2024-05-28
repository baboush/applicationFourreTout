import * as z from 'zod';
import { nameSchema, surnameSchema } from '../schemas';

export type Name = z.infer<typeof nameSchema>;

export type Surname = z.infer<typeof surnameSchema>;
