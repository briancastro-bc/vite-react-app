import { inject, injectable, } from '@ioc/inversify';

import { HttpOperation, } from '@contexts/shared/domain/types';
import { HttpRepository, } from '@contexts/shared/domain/repositories';

@injectable()
export class FetchHttpRepository implements HttpRepository {
  private readonly authorization = 'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..qrus7tAAGWEnA_JPrmmiRA.WbXTKz0RP1npTntBn5hG_eKCThEICC2mAx4XCKQNx5hMhYgL6f3uNq3a1LVgQqRODvvz4zGLLBVKq22eTid4tpDfO0-79-Jc9WCd0J4uztRu9MDvN8kLApnNPliuZcWavV0WlHRjihs3d-XdCPtFBs3WfQGi4tgJXpzb6-PcWC5NidzSBs_eNgUJGGIOD8Ic0NL9kgcZh4eIMnr9Ng1HJopQHyp__GF8dgQzXs7wSmGPSQe47sQsEkXn0iScZIq3.JMXFmQVwN7HOjRQMyL_Q7AwhO8DsM04xTCqcQkH7i6w'

  constructor(
    @inject('BACKEND_URL') private readonly BACKEND_URL: string
  ) {}

  async get<T>(
    url: string, 
    params?: Record<string, any>
  ): Promise<HttpOperation<T>> {
    const endpoint = new URL(url, this.BACKEND_URL);

    const response = await fetch(endpoint, {
      ...(params && {
        ...params,
      }),
      method: 'GET',
      headers: {
        ...(this.authorization && {
          'Authorization': this.authorization,
        }),
        ...(params && params.headers && {
          ...params.headers,
        }),
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      mode: 'cors',
    });

    const data = await response.json() as HttpOperation<T>;
    return data;
  }

  async post<T>(
    url: string, 
    body: Record<string, any>, 
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>> {
    const endpoint = new URL(url, this.BACKEND_URL);

    const response = await fetch(endpoint, {
      ...(params && {
        ...params,
      }),
      method: 'POST',
      headers: {
        ...(this.authorization && {
          'Authorization': this.authorization,
        }),
        ...(params && params.headers && {
          ...params.headers,
        }),
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      mode: 'cors',
      ...(body && {
        body: JSON.stringify(body),
      }),
    });

    const data = await response.json() as HttpOperation<T>;
    return data;
  }

  async put<T>(
    url: string, 
    body: Record<string, any>, 
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>> {
    const endpoint = new URL(url, this.BACKEND_URL);

    const response = await fetch(endpoint, {
      ...(params && {
        ...params,
      }),
      method: 'PUT',
      headers: {
        ...(this.authorization && {
          'Authorization': this.authorization,
        }),
        ...(params && params.headers && {
          ...params.headers,
        }),
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      mode: 'cors',
      ...(body && {
        body: JSON.stringify(body),
      }),
    });

    const data = await response.json() as HttpOperation<T>;
    return data;
  }
  
  async patch<T>(
    url: string, 
    body: Record<string, any>, 
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>> {
    const endpoint = new URL(url, this.BACKEND_URL);

    const response = await fetch(endpoint, {
      ...(params && {
        ...params,
      }),
      method: 'PATCH',
      headers: {
        ...(this.authorization && {
          'Authorization': this.authorization,
        }),
        ...(params && params.headers && {
          ...params.headers,
        }),
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      mode: 'cors',
      ...(body && {
        body: JSON.stringify(body),
      }),
    });

    const data = await response.json() as HttpOperation<T>;
    return data;
  }

  async delete<T>(
    url: string, 
    params?: Record<string, any>,
  ): Promise<HttpOperation<T>> {
    const endpoint = new URL(url, this.BACKEND_URL);

    const response = await fetch(endpoint, {
      ...(params && {
        ...params,
      }),
      method: 'DELETE',
      headers: {
        ...(this.authorization && {
          'Authorization': this.authorization,
        }),
        ...(params && params.headers && {
          ...params.headers,
        }),
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      mode: 'cors',
    });

    const data = await response.json() as HttpOperation<T>;
    return data;
  }

  async options<T = unknown>(): Promise<HttpOperation<T>> {
    throw new Error('Method not implemented.');
  }
}