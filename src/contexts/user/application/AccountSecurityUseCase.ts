import { inject, injectable, } from '@ioc/inversify';

import { 
  SuccessfullyOperation, 
  UnsuccessfullyOperation, 
} from '@contexts/shared/domain/types';

import type { UserRepository } from '../domain/UserRepository';
import { AccountSecurityPort, } from './ports/AccountSecurityPort';

@injectable()
export class AccountSecurityUseCase implements AccountSecurityPort {
  constructor(
    @inject('HttpUserRepository') private readonly userRepository: UserRepository,
  ) {}
  
  async sendEmailVerificationCode(): Promise<boolean> {
    const result = await this.userRepository.sendEmailVerificationCode();
    if ('error' in result && 'success' in result && (result.error || !result.success)) {
      return false;
    }
    
    return true;
  }
  
  async verifyEmail(code: string): Promise<boolean> {
    const result = await this.userRepository.verifyEmail(code);
    if ('error' in result && 'success' in result && (result.error || !result.success)) {
      return false;
    }
    
    return true;
  }
  
  async sendPhoneVerificationCode(): Promise<boolean> {
    const result = await this.userRepository.sendPhoneVerificationCode();
    if ('error' in result && 'success' in result && (result.error || !result.success)) {
      return false;
    }
    
    return true;
  }

  async verifyPhone(code: string): Promise<boolean> {
    const result = await this.userRepository.verifyPhone(code);
    if ('error' in result && 'success' in result && (result.error || !result.success)) {
      return false;
    }
    
    return true;
  }
  
  async validatePassword(): Promise<SuccessfullyOperation | UnsuccessfullyOperation> {
    throw new Error('Method not implemented.');
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<SuccessfullyOperation | UnsuccessfullyOperation> {
    throw new Error('Method not implemented.');
  }
}