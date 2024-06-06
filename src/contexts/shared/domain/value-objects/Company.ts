export const COMPANY_TYPE = {
  CLIENT: 'client',
  LAWYER: 'lawyer',
} as const;

export type CompanyType = (typeof COMPANY_TYPE)[keyof typeof COMPANY_TYPE];
