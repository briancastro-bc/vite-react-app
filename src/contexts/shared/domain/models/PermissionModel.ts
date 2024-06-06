import { Model, } from './Model';

export interface Permission extends Model {
  codeName: string;
  description: string;
}
