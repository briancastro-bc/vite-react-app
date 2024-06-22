import { 
  User, 
  Address,
  Profile,
} from '@contexts/shared/domain/models';
import { SuccessfullyOperation, UnsuccessfullyOperation } from '@contexts/shared/domain/types';

import { PersonalData } from './models/PersonalData';

export interface UserRepository {
  getAccount(): Promise<Partial<User> | UnsuccessfullyOperation>;
  getNaturalData(): Promise<Partial<User> | null>;
  getPersonalData(): Promise<Partial<PersonalData> | UnsuccessfullyOperation>;
  getProfileData(): Promise<Partial<Profile> | UnsuccessfullyOperation>;
  getAddress(): Promise<{ 
    address: Address; 
    locale: string, 
    zoneinfo: string; 
  } | UnsuccessfullyOperation>;
  getPhoneNumber(): Promise<Pick<User, 'phoneNumberPrefix' | 'phoneNumber'> | null>;
  getAgent(): Promise<any | null>;
  findUserByEmail(email: string): Promise<Partial<User> | null>;
  create(user: User): Promise<Partial<User> | null>;
  sendEmailVerificationCode(): Promise<SuccessfullyOperation | UnsuccessfullyOperation>;
  verifyEmail(code: string): Promise<SuccessfullyOperation | UnsuccessfullyOperation>;
  sendPhoneVerificationCode(): Promise<SuccessfullyOperation | UnsuccessfullyOperation>;
  verifyPhone(code: string): Promise<SuccessfullyOperation | UnsuccessfullyOperation>;
}