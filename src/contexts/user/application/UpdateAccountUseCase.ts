import { inject, injectable, } from '@ioc/inversify';

import { User, } from '@contexts/shared/domain/models';
import { SuccessfullyOperation, UnsuccessfullyOperation } from '@contexts/shared/domain/types';

import { UpdateAccountPort, } from './ports/UpdateAccountPort';
import type { UserRepository } from '../domain/UserRepository';

@injectable()
export class UpdateAccountUseCase implements UpdateAccountPort {
  constructor(
    @inject('HttpUserRepository') private readonly userRepository: UserRepository,
  ) {}

  async updateUserData(user: User): Promise<SuccessfullyOperation | UnsuccessfullyOperation> {
    const result = await this.userRepository.update({
      ...user,
    });

    if ('error' in result && 'success' in result && (result.error || !result.success)) {
      return {
        success: result.success,
        error: result.error,
      };
    }

    return { ...result, };
  }
}