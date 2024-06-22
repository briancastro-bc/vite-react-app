import { UnsuccessfullyOperation, } from '@contexts/shared/domain/types';

import { LocationResponseDTO } from '../dtos/LocationResponseDTO';

export interface UserAddressPort {
  getAddress(): Promise<LocationResponseDTO | UnsuccessfullyOperation>;
}