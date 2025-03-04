import Vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import packageJson from './package.json'
import { isDev, port, r } from './scripts/utils'

export default defineConfig(({ command }) => ({
  root: r('src'),
  resolve: {
    alias: {
      '@': r('src'),
    },
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
  plugins: [
    Vue(),
    Components({
      resolvers: [IconsResolver()],
    }),
    Icons({ autoInstall: true }),
  ],
  optimizeDeps: {
    include: [
      'vue',
      'webextension-polyfill',
    ],
  },
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
    origin: `http://localhost:${port}`,
  },
  build: {
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        newTab: r('src/newTab/index.html'),
        options: r('src/options/index.html'),
      },
    },
  },
}))
