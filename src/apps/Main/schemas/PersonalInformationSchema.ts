import * as z from 'zod';

export const PersonalInformationSchema = z.object({
  gender: z.optional(
    z.coerce
      .string()
  ),
  identificationNumber: z.optional(
    z.coerce
      .string()
      .readonly(),
  ),
  identificationType: z.optional(
    z.coerce
      .string()
      .readonly(),
  ),
  identificationIssueDate: z.optional(
    z.coerce
      .date()
      .readonly(),
  ),
  phoneNumberPrefix: z.optional(
    z.coerce
      .string(),
  ),
  phoneNumber: z.optional(
    z.coerce
      .string(),
  ),
});

export type PersonalInformation = z.infer<typeof PersonalInformationSchema>;