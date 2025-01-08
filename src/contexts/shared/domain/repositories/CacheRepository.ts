import { 
  Region,
  Country, 
  Locality, 
} from '../models';

export interface CacheRepository {
  cache(): Promise<void>;
  aggregateRemoteData(): Promise<{
    [key: string]: Array<Country | Region | Locality> | [],
  }>;
  getOutdatedPicklists(): Promise<Array<string>>;
  updateStoredPicklist(): Promise<void>;
  clearCache(): Promise<void>;
}