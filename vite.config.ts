import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
import path from 'path';
import { svgBuilder } from './src/plugin/svgBuilder'; 

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [vue(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    }),
    svgBuilder('./src/assets/svg/')
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port:3001,
    // 代理
    proxy: {
      '^/api': 'http://xuanxiaocheng.top:3000' // API服务器的地址*
      // '^/api': 'http://localhost:2000' // API服务器的地址
  },
},
})


