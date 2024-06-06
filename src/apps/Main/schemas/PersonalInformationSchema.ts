import * as z from 'zod';

export const PersonalInformationSchema = z.object({
  gender: z.optional(
    z.coerce
      .string()
  ),
});

export type PersonalInformation = z.infer<typeof PersonalInformationSchema>;