import { registerApplication, start } from 'single-spa'

export const registerApp = (appList) => {
  // 注册到微前端框架里
  appList.forEach((item) => {
    registerApplication(item)
  })

  // 启动微前端框架
  start()
}
