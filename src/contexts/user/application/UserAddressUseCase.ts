import { inject, injectable, } from '@ioc/inversify';

import { UnsuccessfullyOperation, } from '@contexts/shared/domain/types';

import { UserAddressPort, } from './ports/UserAddressPort';
import type { UserRepository, } from '../domain/UserRepository';
import { LocationResponseDTO } from './dtos/LocationResponseDTO';

@injectable()
export class UserAddressUseCase implements UserAddressPort {
  constructor(
    @inject('HttpUserRepository') private readonly userRepository: UserRepository,
  ) {}

  async getAddress(): Promise<LocationResponseDTO | UnsuccessfullyOperation> {
    const result = await this.userRepository.getAddress();
    if ('error' in result && 'success' in result && (result.error || !result.success)) {
      return {
        success: result.success,
        error: result.error,
      };
    }

    return {
      ...result,
    };
  }
}