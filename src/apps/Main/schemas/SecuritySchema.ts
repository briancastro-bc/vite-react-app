import * as z from 'zod';

export const SecuritySchema = z.object({
  newPassword: z.optional(
    z.coerce
      .string()
  ),
  newPasswordConfirmation: z.optional(
    z.coerce
      .string(),
  ),
});

export type Security = z.infer<typeof SecuritySchema>;