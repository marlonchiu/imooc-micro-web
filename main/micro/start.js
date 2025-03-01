import { setList } from './const/subApps'
import { rewriteRouter } from './router/rewriteRouter'

// 包装路由跳转事件，增加拦截功能 todo 相当重要，子应用跳转都依赖此方法。
rewriteRouter()

// 注册子应用列表
export const registerMicroApps = (apps) => {
  // apps.forEach(app => window.appList.push(app))
  // 注册子应用
  setList(apps)
}
