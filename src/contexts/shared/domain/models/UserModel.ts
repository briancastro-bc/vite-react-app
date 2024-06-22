import { 
  PersonType, 
} from '../value-objects';

import { Agent, } from './AgentModel';
import { Group, } from './GroupModel';
import { Address, } from './AddressModel';
import { Company, } from './CompanyModel';
import { Profile, } from './ProfileModel';
import { Permission, } from './PermissionModel';

export interface User {
  id?: string;
  email?: string;
  password?: string | null;
  name?: string;
  givenName: string;
  middleName?: string;
  familyName: string;
  preferredUsername: string;
  personType: PersonType;
  profile: Profile;
  address: Address;
  isAgent: boolean;
  agent?: Agent;
  company?: Company | null;
  groups: Array<Group> | null;
  permissions: Array<Permission> | null;
  refreshToken?: any | null;
  legalRepresentative?: boolean;
  phoneNumber: string;
  phoneNumberPrefix: string;
  photo?: string;
  zoneInfo?: string;
  locale?: string;
  disabled: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  bucketId?: string | null; 
  resetCode?: string | null;
  resetCodeExpiration?: Date | null;
  updatedAt?: Date | string | null;
}
