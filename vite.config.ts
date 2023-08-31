import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig, loadEnv, Plugin, ResolvedConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import mockerAPI from 'mocker-api'
import express from 'express'

const APP_ENV = process.env.VITE_APP_ENV as string

const HTTPMockerPlugin = (): Plugin => {
  let config: ResolvedConfig | undefined
  return {
    name: 'http-mocker',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    configureServer(server) {
      if (config?.command === 'serve' && APP_ENV === 'mock') {
        const app = express()
        mockerAPI(app, path.resolve(__dirname, './src/mock/index.js'), {
          priority: 'mocker',
          proxy: {
            '/base/(.*)': 'http://alpha-api.xxx.com'
          },
          pathRewrite: {
            '^/base/': ''
          }
        })
        server.middlewares.use(app)
      }
    }
  }
}

export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), '')
  return {
    base: config.command === 'serve' ? '/' : './',
    define: {
      __APP_ENV__: `'${env.VITE_APP_ENV}'`
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      target: 'esnext'
    },
    plugins: [legacy(), vue(), vueJsx(), HTTPMockerPlugin()]
  }
})
