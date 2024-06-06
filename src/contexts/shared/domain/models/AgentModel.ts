import { Model, } from './Model';

export interface Agent extends Model {
  verified: boolean;
  enabled: boolean;
}