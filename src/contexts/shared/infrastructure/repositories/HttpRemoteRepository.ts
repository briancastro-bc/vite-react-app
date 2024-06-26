import { injectable, } from '@ioc/inversify';
import { RemoteRepository, } from '@contexts/shared/domain/repositories/RemoteRepository';

@injectable()
export class HttpRemoteRepository implements RemoteRepository {
  async fetch<T = any>(
    url: string, 
    params: Record<string, any>
  ): Promise<T> {
    const endpoint = new URL(url);

    const response = await fetch(endpoint, {
      ...(params && {
        ...params,
      }),
    });

    const data = await response.json() as T;
    return data;
  }
}