import { createApp } from 'vue'
// 引入清楚默认样式
import '@/style/reset.scss'
import App from '@/App.vue'

// 引入全局组件--顶部、底部都是全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalButton from '@/components/hospital_button/index.vue'
import Login from '@/components/login/index.vue'
// 引入vue-router核心插件并安装
import router from './router'

// 引入element-plus 插件
import ElementPlus, { autocompleteEmits } from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Visitor from './components/visitor/visitor.vue'
// 引入pinia仓库
import pinia from '@/store'

const app = createApp(App)
// 就诊人全局组件
app.component('Visitor', Visitor )
app.component('HospitalTop', HospitalTop)
app.component('HospitalButton', HospitalButton)
app.component('Login', Login)
// 安装vue-router
app.use(router) 

// 安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn,
  })

// 安装pinia仓库
app.use(pinia)

// 引入路由鉴权文件
import './permisstion'

// 挂载
app.mount('#app')

