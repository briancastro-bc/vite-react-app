export interface DatabaseOperation<T> {
  timestamp: number;
  version: string;
  payload: T;
}