import { Model, } from './Model';

export interface Address extends Model {
  formatted?: string;
  country: string;
  region: string;
  locality: string;
  street?: string;
  streetComplement?: string;
  postalCode?: string | null;
}
