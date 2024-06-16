import * as z from 'zod';

export const AddressSchema = z.object({
  formatted: z.optional(
    z.coerce
      .string()
      .max(10)
      .readonly(),
  ),
  country: z.optional(
    z.coerce
      .string(),
  ),
  region: z.optional(
    z.coerce
      .string(),
  ),
  locality: z.optional(
    z.coerce
      .string(),
  ),
  street: z.optional(
    z.coerce
      .string(),
  ),
  streetComplement: z.optional(
    z.coerce
      .string(),
  ),
  postalCode: z.optional(
    z.coerce
      .string(),
  ),
});

export type Address = z.infer<typeof AddressSchema>;