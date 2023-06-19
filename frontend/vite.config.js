import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
// https://vitejs.dev/config/

const PATH_DATA = [
  {
    find: '@',
    url: './src',
  },
  {
    find: '@atoms',
    url: './src/components/atoms',
  },
  {
    find: '@organisms',
    url: './src/components/organisms',
  },
  {
    find: '@templates',
    url: './src/components/templates',
  },
  {
    find: '@pages',
    url: './src/pages',
  },
  {
    find: '@organisms',
    url: './src/components/organisms',
  },
  {
    find: '@assets',
    url: './src/assets',
  },
  {
    find: '@styles',
    url: './src/styles',
  },
  {
    find: '@hooks',
    url: './src/hooks',
  },
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      ...PATH_DATA.map((path) => ({
        find: path.find,
        replacement: fileURLToPath(new URL(path.url, import.meta.url)),
      })),
    ],
  },
});
