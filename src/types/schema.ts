import { z } from 'zod';

export const loginSchema = z.object({
 username: z
  .string()
  .trim()
  .min(1, { message: 'Username required!' }),
 password: z
  .string()
  .trim()
  .min(1, { message: 'Password required!' })
});