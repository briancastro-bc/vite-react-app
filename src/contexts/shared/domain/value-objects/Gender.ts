export const GENDER_TYPE = {
  MALE: 'M',
  FEMALE: 'F',
  NOT_SPECIFIED: 'NS',
} as const;

export type GenderType = (typeof GENDER_TYPE)[keyof typeof GENDER_TYPE];
