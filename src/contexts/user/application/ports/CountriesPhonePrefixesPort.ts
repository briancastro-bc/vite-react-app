import { UnsuccessfullyOperation, } from '@contexts/shared/domain/types';

export interface CountriesPhonePrefixesPort {
  getAll(): Promise<any | UnsuccessfullyOperation>;
}