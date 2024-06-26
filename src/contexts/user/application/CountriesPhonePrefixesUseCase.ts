import { inject, injectable, } from '@ioc/inversify';

import { UnsuccessfullyOperation, } from '@contexts/shared/domain/types';
import type { RemoteRepository, } from '@contexts/shared/domain/repositories/RemoteRepository';

import { CountriesPhonePrefixesPort, } from './ports/CountriesPhonePrefixesPort';

@injectable()
export class CountriesPhonePrefixesUseCase implements CountriesPhonePrefixesPort {
  private readonly REST_COUNTRIES_API_URL = import.meta.env.VITE_REST_COUNTRIES;

  constructor(
    @inject('HttpRemoteRepository') private readonly remoteRepository: RemoteRepository,
  ) {}

  async getAll(): Promise<any | UnsuccessfullyOperation> {
    try {
      const url = `${this.REST_COUNTRIES_API_URL}/all`;

      const result = await this.remoteRepository.fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return result;
    } catch {
      return {
        success: false,
        error: 'Something went wrong',
      };
    }
  }
}