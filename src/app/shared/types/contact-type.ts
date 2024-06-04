import { z } from 'zod';
import {
  nameContactSchema,
  emailContactSchema,
  messageContactSchema,
} from '@shared/schemas';

export type NameContact = z.infer<typeof nameContactSchema>;
export type EmailContact = z.infer<typeof emailContactSchema>;
export type MessageContact = z.infer<typeof messageContactSchema>;
