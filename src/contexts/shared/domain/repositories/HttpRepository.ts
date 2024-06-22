import { HttpResponse, } from '../models/HttpResponseModel';

export interface HttpRepository {
  get<T>(
    url: string, 
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>>;
  post<T>(
    url: string, 
    body: Record<string, any>, 
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>>;
  put<T>(
    url: string,
    body: Record<string, any>,
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>>;
  patch<T>(
    url: string,
    body: Record<string, any>,
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>>;
  delete<T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>>;
  options<T = unknown>(
    url: string,
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>>;
}