import { z } from 'zod';

export const nameContactSchema = z.string().min(3).max(50);
export const emailContactSchema = z.string().email();
export const messageContactSchema = z.string().min(50).max(400);
