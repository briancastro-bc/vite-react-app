import { injectable, inject, } from '@ioc/inversify';

import { 
  Region,
  Country, 
  Locality, 
} from '@contexts/shared/domain/models';
import { PicklistRepository, } from '@contexts/shared/domain/repositories/PicklistRepository';
import type { RemoteRepository } from '@contexts/shared/domain/repositories/RemoteRepository';

@injectable()
export class HttpPicklistRepository implements PicklistRepository {
  constructor(
    @inject('HttpRemoteRepository') private readonly remoteRepository: RemoteRepository,
  ) {}

  async getAllCountries(): Promise<Array<Country>> {
    const endpoint = `${import.meta.env.VITE_REST_COUNTRIES}/all`;
    const result = await this.remoteRepository.fetch(endpoint, { method: 'GET', });

    const countries: Array<Country> = result?.map((c: any) => ({
      name: c?.name?.common,
      isoAlpha2: c?.cca2,
      isoAlpha3: c?.cca3,
      flag: c?.flags?.svg,
      flagIcon: c?.flag,
      phoneSuffixes: {
        root: c?.idd?.root,
        suffixes: c?.idd?.suffixes?.map((suffix: string) => ({
          raw: suffix,
          formated: `${c?.idd?.root}${suffix}`,
        })),
      }
    })).sort((a: Country, b: Country) => a.name.localeCompare(b.name)) ?? [];

    return countries;
  }

  async getAllRegions(): Promise<Array<Region>> {
    const endpoint = `${import.meta.env.VITE_COLOMBIAN_API}/Department`;
    const result = await this.remoteRepository.fetch(endpoint, { method: 'GET', }) as Array<any>;

    const regions: Array<Region> = result?.map((r: any) => ({
      id: r?.id,
      name: r?.name,
      description: r?.description,
      municipalities: r?.municipalities,
      countryId: 'COL',
    })).sort((a: Region, b: Region) => a.name.localeCompare(b.name)) ?? [];

    return regions;
  }

  async getAllLocalities(): Promise<Array<Locality>> {
    const regions = await this.getAllRegions();

    const regionsIds = regions.map((r) => r.id);

    const localities: Array<Locality> = [];
    regionsIds.forEach(async (regionId) => {
      const endpoint = `${import.meta.env.VITE_COLOMBIAN_API}/Department/${regionId}/cities`;
      const result = (await this.remoteRepository.fetch(endpoint, { method: 'GET', })) as Array<any>;

      const formatedLocalities = result?.map((locality: any) => ({
        id: locality?.id,
        departmentId: locality?.departmentId,
        name: locality?.name,
        description: locality?.description,
      })).sort((a: Locality, b: Locality) => a.name.localeCompare(b.name)) ?? [];

      localities.push(...formatedLocalities);
    });

    console.log('localities', localities);

    return localities;
  }
}