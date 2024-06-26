import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入node提供内置模块path:可以获取绝对路径
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // src文件夹别名配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  // 配置代理跨域
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://syt.atguigu.cn',
        changeOrigin: true,
      },
    }
  }
})
