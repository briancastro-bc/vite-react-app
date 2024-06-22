import * as z from 'zod';

export const VerificationSchema = z.object({
  code: z.coerce
    .string()
    .min(6)
    .max(6),
});

export type VerificationType = z.infer<typeof VerificationSchema>;