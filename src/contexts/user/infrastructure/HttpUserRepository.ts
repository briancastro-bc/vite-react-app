import { inject, injectable } from '@ioc/inversify';

import { User, Address, Profile, } from '@contexts/shared/domain/models';
import { SuccessfullyOperation, UnsuccessfullyOperation } from '@contexts/shared/domain/types';
import type { HttpRepository } from '@contexts/shared/domain/repositories';

import { PersonalData } from '../domain/models/PersonalData';
import { UserRepository, } from '../domain/UserRepository';

@injectable()
export class HttpUserRepository implements UserRepository {
  constructor(
    @inject('FetchHttpRepository') private readonly http: HttpRepository,
  ) {}

  async getAccount(): Promise<Partial<User> | UnsuccessfullyOperation> {
    try {
      const response = await this.http
        .get<{ user: User, }>('/api/v1/users');
      if (!response.success || response.error) return { ...response, };
  
      const { user, } = response.data;
      return user;
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      };
    }
  }

  async getNaturalData(): Promise<Partial<User> | null> {
    throw new Error('Method not implemented.');
  }

  async getPersonalData(): Promise<Partial<PersonalData> | UnsuccessfullyOperation> {
    try {
      const response = await this.http
        .get<{ user: PersonalData }>('/api/v1/users/personal-data');
      if (!response.success || response.error) return { ...response, };
  
      const { user, } = response.data;
      return user;
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      };
    }
  }
  
  async getProfileData(): Promise<Partial<Profile> | UnsuccessfullyOperation> {
    try {
      const response = await this.http
        .get<{ profile: Profile }>('/api/v1/users/profile');
      if (!response.success || response.error) return { ...response, };

      const { profile, } = response.data;
      return profile;
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      }
    }
  }

  async getAddress(): Promise<{ 
    address: Address; 
    locale: string; 
    zoneinfo: string; 
  } | UnsuccessfullyOperation> {
    try {
      const response = await this.http
        .get<{ user: any, }>('/api/v1/users/location');
      if (!response.success || response.error) return { ...response, };

      const { user, } = response.data;
      return user;
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      };
    }
  }

  async getPhoneNumber(): Promise<Pick<User, 'phoneNumberPrefix' | 'phoneNumber'> | null> {
    throw new Error('Method not implemented.');
  }
  
  async getAgent(): Promise<any | null> {
    throw new Error('Method not implemented.');
  }

  async findUserByEmail(email: string): Promise<Partial<User> | null> {
    console.log(email);
    throw new Error('Method not implemented.');
  }

  async create(user: User): Promise<Partial<User> | null> {
    console.log(user);
    throw new Error('Method not implemented.');
  }

  async update(user: User): Promise<SuccessfullyOperation | UnsuccessfullyOperation> {
    try {
      const response = await this.http
        .put<SuccessfullyOperation>('/api/v1/users/personal-data', user);
      if (!response.success || response.error) return { ...response, };

      return { ...response, };
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      };
    }
  }

  async sendEmailVerificationCode(): Promise<SuccessfullyOperation | UnsuccessfullyOperation> {
    try {
      const response = await this.http
        .post<SuccessfullyOperation>('/api/v1/accounts/verifications/email/send-code', {});

      if (!response.success || response.error) return { ...response, };

      return  { ...response, };
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      };
    }
  }

  async verifyEmail(code: string): Promise<SuccessfullyOperation | UnsuccessfullyOperation> {
    try {
      const response = await this.http
        .patch<SuccessfullyOperation>(`/api/v1/accounts/verifications/email/${code}`, {});
      
      if (!response.success || response.error) return { ...response, };

      return {  ...response, };
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      };
    }
  }

  async sendPhoneVerificationCode(): Promise<SuccessfullyOperation | UnsuccessfullyOperation> {
    try {
      const response = await this.http
        .post<SuccessfullyOperation>('/api/v1/accounts/verifications/phone/send-code', {});

      if (!response.success || response.error) return { ...response, };

      return  { ...response, };
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      };
    }
  }

  async verifyPhone(code: string): Promise<SuccessfullyOperation | UnsuccessfullyOperation> {
    try {
      const response = await this.http
        .patch<SuccessfullyOperation>(`/api/v1/accounts/verifications/phone/${code}`, {});
      
      if (!response.success || response.error) return { ...response, };

      return {  ...response, };
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      };
    }
  }
}