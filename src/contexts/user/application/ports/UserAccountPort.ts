import { User, } from '@contexts/shared/domain/models';
import { UnsuccessfullyOperation } from '@contexts/shared/domain/types';

export interface UserAccountPort {
  getPersonalInformation(): Promise<Partial<User> | UnsuccessfullyOperation>
}