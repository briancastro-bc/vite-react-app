/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_SOCKET_URL: string;
  readonly VITE_MAX_RETRIES: number;
  readonly VITE_MOBILE_SCREEN: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
