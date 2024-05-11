import 'dotenv/config';
import { resolve, } from 'node:path';

import { defineConfig, } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
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
