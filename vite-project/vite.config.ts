import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [vue(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    // 代理
    proxy:{'^/api': 'http://xuanxiaocheng.top:3000' // API服务器的地址
  },
},
})


