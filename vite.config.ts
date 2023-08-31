import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig, loadEnv, Plugin, ResolvedConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import mockerAPI from 'mocker-api'
import express from 'express'

const APP_ENV = process.env.VITE_APP_ENV as string

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

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
      target: 'esnext',
      // 主要解决 GitHub 页面阻止了以下划线字符开头的文件 https://github.com/vitejs/vite/issues/9119
      rollupOptions: {
        output: {
          // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
          sanitizeFileName(name) {
            const match = DRIVE_LETTER_REGEX.exec(name)
            const driveLetter = match ? match[0] : ''
            // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
            // Otherwise, avoid them because they can refer to NTFS alternate data streams.
            return (
              driveLetter +
              name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
            )
          }
        }
      }
    },
    plugins: [legacy(), vue(), vueJsx(), HTTPMockerPlugin()]
  }
})
