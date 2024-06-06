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
  id: string;
  email?: string;
  password: string;
  name: string;
  givenName: string;
  middleName?: string;
  familyName: string;
  preferredUsername: string;
  personType: PersonType;
  profile: Profile;
  address: Address;
  isAgent: boolean;
  agent: Agent;
  company: Company;
  groups: Array<Group>;
  permissions: Array<Permission>;
  refreshToken?: any;
  legalRepresentative: boolean;
  phoneNumber: string;
  phoneNumberPrefix: string;
  photo?: File;
  zoneInfo: string;
  locale: string;
  disabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  bucketId: string;
  resetCode: string;
  resetCodeExpiration: Date;
}