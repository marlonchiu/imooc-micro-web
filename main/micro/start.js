import { setList } from './const/subApps'

// 注册子应用列表
export const registerMicroApps = (apps) => {
  // apps.forEach(app => window.appList.push(app))
  // 注册子应用
  setList(apps)
}
