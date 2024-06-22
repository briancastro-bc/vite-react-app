import { inject, injectable, } from '@ioc/inversify';

import { HttpResponse, } from '@contexts/shared/domain/models';
import { HttpRepository, } from '@contexts/shared/domain/repositories';

@injectable()
export class FetchHttpRepository implements HttpRepository {
  private readonly authorization = 'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..Lu86R8YsDIa6wY4I7UHJEA.pkdr7Qxvez3FvqG3AmBV1J7_BJSYv_2Nd00o0o3K59lEtgQINiNSII_oZpbpWLebCrXxKluX4PRvaU73pI4YVVx24MxnEw8_kAKyTXUSPz5rLHgv80wz9eWUvnC6EaW40pXQ5mwWQeUbatIHUJt6y9I7RpAUC3hzwue8AZlYlb7sLRQrUpODVcE1IJLaP2g5mBql62m8my4SkX2hf0Q8mkXC1CqhAU-KMDvJA7ONPyDiCXlH2MXGFKuHJTZ-8Mfu.HdLP9r7xrJE0BIzHFCOuDw8Rqhfd8a9CzvdBBOuuQ7A';

  constructor(
    @inject('BACKEND_URL') private readonly BACKEND_URL: string
  ) {}

  async get<T>(
    url: string, 
    params?: Record<string, any>
  ): Promise<HttpResponse<T>> {
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

    const data = await response.json() as HttpResponse<T>;
    return data;
  }

  async post<T>(
    url: string, 
    body: Record<string, any>, 
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>> {
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

    const data = await response.json() as HttpResponse<T>;
    return data;
  }

  async put<T>(
    url: string, 
    body: Record<string, any>, 
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>> {
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

    const data = await response.json() as HttpResponse<T>;
    return data;
  }
  
  async patch<T>(
    url: string, 
    body: Record<string, any>, 
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>> {
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

    const data = await response.json() as HttpResponse<T>;
    return data;
  }

  async delete<T>(
    url: string, 
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>> {
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

    const data = await response.json() as HttpResponse<T>;
    return data;
  }

  async options<T = unknown>(): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }
}