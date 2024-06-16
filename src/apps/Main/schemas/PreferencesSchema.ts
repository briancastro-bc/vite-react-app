import * as z from 'zod';

export const PreferencesSchema = z.object({
  locale: z.optional(
    z.coerce
      .string()
      .readonly(),
  ),
  zoneinfo: z.optional(
    z.coerce
      .string()
      .readonly(),
  ),
  language: z.optional(
    z.coerce
      .string(),
  ),
  theme: z.optional(
    z.coerce
      .string(),
  ),
});

export type Preferences = z.infer<typeof PreferencesSchema>;
