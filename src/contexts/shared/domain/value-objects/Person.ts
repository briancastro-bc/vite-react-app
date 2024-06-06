export const PERSON_TYPE = {
  NATURAL: 'natural',
  LEGAL: 'legal',
} as const;

export type PersonType = (typeof PERSON_TYPE)[keyof typeof PERSON_TYPE];
