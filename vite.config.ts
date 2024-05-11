import { resolve, } from 'node:path';

import { defineConfig, loadEnv } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode, }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      origin: env.VITE_BACKEND_URL,
      proxy: {}
    },
    resolve: {
      alias: {
        '@ioc': resolve(import.meta.dirname, 'src/ioc'),
        '@apps': resolve(import.meta.dirname, 'src/apps'),
        '@assets': resolve(import.meta.dirname, 'src/assets'),
        '@contexts': resolve(import.meta.dirname, 'src/contexts'),
      }
    }
  };
})
