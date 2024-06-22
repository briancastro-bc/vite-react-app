import { inject, injectable, }  from '@ioc/inversify';

import { User } from '@contexts/shared/domain/models';
import { UnsuccessfullyOperation } from '@contexts/shared/domain/types';
import type { UserRepository } from '@contexts/user/domain/UserRepository';

import { UserAccountPort } from './ports/UserAccountPort';

@injectable()
export class UserAccountUseCase implements UserAccountPort {
  constructor(
    @inject('HttpUserRepository') private readonly userRepository: UserRepository,
  ) {}

  async getPersonalInformation(): Promise<Partial<User> | UnsuccessfullyOperation> {
    const [ personalData, account, profile, ] = await Promise.all([
      this.userRepository.getPersonalData(),
      this.userRepository.getAccount(),
      this.userRepository.getProfileData(),
    ]);

    if ('error' in personalData && 'success' in personalData && (personalData.error || !personalData.success)) {
      return {
        success: personalData.success,
        error: personalData.error,
      };
    }

    if ('error' in account && 'success' in account && (account.error || !account.success)) {
      return {
        success: account.success,
        error: account.error,
      };
    }

    if ('error' in profile && 'success' in profile && (profile.error || !profile.success)) {
      return {
        success: profile.success,
        error: profile.error,
      };
    }

    console.log('profile data', profile);

    const userData = {
      ...personalData,
      ...account,
      ...profile,
    } as User;

    return userData;
  }
}