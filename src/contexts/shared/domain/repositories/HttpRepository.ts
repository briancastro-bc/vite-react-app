import { HttpOperation, } from '../types/HttpOperation';

export interface HttpRepository {
  get<T>(
    url: string, 
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>>;
  post<T>(
    url: string, 
    body: Record<string, any>, 
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>>;
  put<T>(
    url: string,
    body: Record<string, any>,
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>>;
  patch<T>(
    url: string,
    body: Record<string, any>,
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>>;
  delete<T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>>;
  options<T = unknown>(
    url: string,
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>>;
}