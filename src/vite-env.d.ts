/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_SOCKET_URL: string;
  readonly VITE_MAX_RETRIES: number;
  readonly VITE_MOBILE_SCREEN: number;
  readonly VITE_LOCATIONS_API: string;
  readonly VITE_COLOMBIAN_API: string;
  readonly VITE_REST_COUNTRIES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
