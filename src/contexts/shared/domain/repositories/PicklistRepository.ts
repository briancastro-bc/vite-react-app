import { 
  Region,
  Country,
  Locality,
} from '../models';

export interface PicklistRepository {
  getAllCountries(): Promise<Array<Country>>;
  getAllRegions(): Promise<Array<Region>>;
  getAllLocalities(): Promise<Array<Locality>>;
}