import { Model, } from './Model';
import { Permission } from './PermissionModel';

export interface Group extends Model {
  codeName: string;
  description?: string;
  permissions: Array<Permission>;
}