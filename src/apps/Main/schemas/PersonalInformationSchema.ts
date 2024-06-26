import * as z from 'zod';

import { GENDER_TYPE, IDENTIFICATION_TYPE } from '@contexts/shared/domain/value-objects';

export const PersonalInformationSchema = z.object({
  gender: z.optional(
    z.enum([
      GENDER_TYPE.MALE.codeName,
      GENDER_TYPE.FEMALE.codeName,
      GENDER_TYPE.NOT_SPECIFIED.codeName,
    ]),
  ),
  identificationNumber: z.optional(
    z.coerce
      .string()
      .readonly(),
  ),
  identificationType: z.optional(
    z.enum([ 
      IDENTIFICATION_TYPE.CC.codeName, 
      IDENTIFICATION_TYPE.CD.codeName,
      IDENTIFICATION_TYPE.CE.codeName,
      IDENTIFICATION_TYPE.DE.codeName,
      IDENTIFICATION_TYPE.NIP.codeName,
      IDENTIFICATION_TYPE.PA.codeName,
      IDENTIFICATION_TYPE.RC.codeName,
    ])
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