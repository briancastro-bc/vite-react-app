export interface RemoteRepository {
  fetch<T = any>(
    url: string,
    params: Record<string, any>,
  ): Promise<T>;
}