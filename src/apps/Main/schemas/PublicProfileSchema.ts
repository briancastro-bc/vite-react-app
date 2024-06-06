import * as z from 'zod';

export const PublicProfileSchema = z.object({
  id: z.optional(
    z.coerce
      .string()
      .readonly()
  ),
  preferredUsername: z.optional(
    z.coerce
      .string()
      .max(250),
  ),
  givenName: z.optional(
    z.coerce
      .string()
      .max(60),
  ),
  middleName: z.optional(
    z.coerce
      .string()
      .max(50),
  ),
  familyName: z.optional(
    z.coerce
      .string()
      .max(100),
  ),
  biography: z.optional(
    z.coerce
      .string()
      .max(1000),
  ),
  birthdate: z.optional(
    z.coerce
      .date(),
  ),
});

export type PublicProfile = z.infer<typeof PublicProfileSchema>;