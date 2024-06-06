import { 
  CompanyType,
} from '../value-objects';

import { Model, } from './Model';

export interface Company extends Model {
  name: string;
  certificate: File;
  ein: string;
  type: CompanyType;
  verified: boolean;
  disabled: boolean;
}