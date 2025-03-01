import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { registerApp } from './utils/index'
import { navList } from './store/leftNav'

registerApp(navList)
// import { starMicroApp } from './utils/startMicroApp'

// 注册、加载、启动子应用
// starMicroApp()

createApp(App).use(router()).mount('#micro_web_main_app')
