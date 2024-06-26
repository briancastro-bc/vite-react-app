import {
  get,
  getMany,
  set,
  update,
  del,
  delMany,
  createStore,
  clear,
  entries,
  UseStore,
} from 'idb-keyval';

import { injectable, } from '@ioc/inversify';

import { DatabaseOperation, } from '@contexts/shared/domain/types';
import type { DatabaseService, } from '@contexts/shared/domain/services/DatabaseService';

const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.0.0';

@injectable()
export class IndexedDatabaseService implements DatabaseService {
  async get<T>(key: IDBValidKey): Promise<DatabaseOperation<T> | undefined> {
    return await get(key) as DatabaseOperation<T> | undefined;
  }

  async getMany<T>(keys: Array<IDBValidKey>): Promise<Array<DatabaseOperation<T>> | undefined> {
    return await getMany(keys) as Array<DatabaseOperation<T>> | undefined;
  }

  async set(key: IDBValidKey, value: DatabaseOperation<any>): Promise<void> {
    const data: DatabaseOperation<any> = {
      payload: value,
      version: APP_VERSION,
      timestamp: Date.now(),
    };
    return await set(key, { ...data, });
  }

  async setMany(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update<T>(key: IDBValidKey, callback: (oldValue: DatabaseOperation<T> | undefined) => DatabaseOperation<T>): Promise<void> {
    return await update(key, callback);
  }

  async delete(key: IDBValidKey): Promise<void> {
    return await del(key)
  }

  async deleteMany(keys: Array<IDBValidKey>): Promise<void> {
    return await delMany(keys);
  }

  createStore<T = UseStore>(dbName: string, storeName: string): T {
    return createStore(dbName, storeName) as T;
  }

  async clear(): Promise<void> {
    return await clear();
  }

  async entries(): Promise<Array<[IDBValidKey, DatabaseOperation<any>]>> {
    return await entries();
  }
}