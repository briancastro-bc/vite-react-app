import { injectable, inject, } from '@ioc/inversify';

import { Country, Locality, Region, } from '@contexts/shared/domain/models';
import { DatabaseOperation, } from '@contexts/shared/domain/types';
import type { DatabaseService, } from '@contexts/shared/domain/services/DatabaseService';
import type { CacheRepository, } from '@contexts/shared/domain/repositories/CacheRepository';
import type { PicklistRepository, } from '@contexts/shared/domain/repositories/PicklistRepository';

const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.0.0';
const SEVEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 7;

@injectable()
export class LocalCacheRepository implements CacheRepository {
  constructor(
    @inject('IndexedDatabaseService') private readonly databaseService: DatabaseService,
    @inject('HttpPicklistRepository') private readonly picklistRepository: PicklistRepository,
  ) { }

  async cache(): Promise<void> {
    const picklists = await this.aggregateRemoteData();
    const outdatedPicklists = await this.getOutdatedPicklists();

    Object.keys(picklists).forEach(async (key) => {
      const storedPicklist = await this.databaseService.get(key) as DatabaseOperation<any>;
      if (!storedPicklist)
        return await this.databaseService.set(key, picklists[key]);
      if (outdatedPicklists.includes(key))
        return await this.updateStoredPicklist(key, picklists[key]);
    });
  }

  async aggregateRemoteData(): Promise<{
    [key: string]: Array<Country | Region | Locality> | []
  }> {
    const [ 
      countries,
      storedCountries,
      regions,
      storedRegions,
      localities,
      storedLocalities,
    ] = await Promise.all([
      this.picklistRepository.getAllCountries(),
      this.databaseService.get('countries'),
      this.picklistRepository.getAllRegions(),
      this.databaseService.get('regions'),
      this.picklistRepository.getAllLocalities(),
      this.databaseService.get('localities'),
    ]);

    return {
      countries: storedCountries?.payload as Array<Country> ?? countries ?? [],
      regions: storedRegions?.payload as Array<Region> ?? regions ?? [],
      localities: storedLocalities?.payload as Array<Locality> ?? localities ?? [],
    };
  }

  async getOutdatedPicklists(): Promise<Array<string>> {
    const storedPicklists = await this.databaseService.entries() as Array<[IDBValidKey, DatabaseOperation<any>]>;

    const now = Date.now();
    
    const outdated = storedPicklists?.map(
      ([key, value,]) => {
        if (value.version !== APP_VERSION) return key;
        if (now >= value.timestamp + SEVEN_DAYS_IN_MS) return key;
        return;
      }
    )?.filter(e => e);

    return outdated as Array<string>;
  }

  async updateStoredPicklist(
    key?: IDBValidKey, 
    value?: any
  ): Promise<void> {
    if (!key || !value) {
      const updatedPicklists = await this.aggregateRemoteData();
      Object.entries(updatedPicklists).forEach(async ([k, v]) => {
        await this.databaseService.update(k, () => v);
      });

      return;
    }

    await this.databaseService.update(key, () => value);
  }

  async clearCache(): Promise<void> {
    return await this.databaseService.clear();
  }
}