import { Address, } from '@contexts/shared/domain/models';

export interface LocationResponseDTO {
  address?: Address;
  locale: string;
  zoneinfo: string;
}