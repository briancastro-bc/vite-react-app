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
  emailVerified: z.optional(
    z.coerce
    .boolean(),
  ),
  phoneVerified: z.optional(
    z.coerce
      .boolean(),
  ),
});

export type Security = z.infer<typeof SecuritySchema>;