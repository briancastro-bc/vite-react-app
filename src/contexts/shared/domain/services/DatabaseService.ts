import { DatabaseOperation, } from '../types';

export interface DatabaseService {
  get<T>(...args: Array<unknown>): Promise<DatabaseOperation<T> | undefined>;
  getMany<T>(...args: Array<unknown>): Promise<Array<DatabaseOperation<T>> | undefined>;
  set(...args: Array<unknown>): Promise<void>;
  setMany(...args: Array<unknown>): Promise<void>
  update<T>(...args: Array<unknown>): Promise<void>;
  delete(...args: Array<unknown>): Promise<void>;
  deleteMany(...args: Array<unknown>): Promise<void>;
  createStore<T = any>(...args: Array<unknown>): T;
  clear(...args: Array<unknown>): Promise<void>;
  entries(): Promise<Array<[any, any]>>;
}