import { 
  GenderType,
  IdentificationType, 
} from '../value-objects';

export interface Profile {
  nickname?: string;
  biography?: string;
  identificationNumber: string;
  identificationType?: IdentificationType;
  identificationIssueDate?: Date;
  profile?: string;
  gender?: GenderType;
  birthdate?: Date;
  digitalRecord?: File[] | null;
}