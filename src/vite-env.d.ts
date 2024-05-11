/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_MOBILE_SCREEN: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
