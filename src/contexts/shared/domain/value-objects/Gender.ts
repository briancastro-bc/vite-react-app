export const GENDER_TYPE = {
  MALE: {
    codeName: 'M',
  },
  FEMALE: {
    codeName: 'F'
  },
  NOT_SPECIFIED: {
    codeName: 'NS'
  },
} as const;

export type GenderType = (typeof GENDER_TYPE)[keyof typeof GENDER_TYPE];
