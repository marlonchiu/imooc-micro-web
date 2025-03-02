import { setList, getList } from './const/subApps'
import { rewriteRouter } from './router/rewriteRouter'
import { currentApp } from './util'
import { setMainLifecycle } from './const/mainLifeCycles'

// 包装路由跳转事件，增加拦截功能 todo 相当重要，子应用跳转都依赖此方法
rewriteRouter()

// 注册子应用列表
export const registerMicroApps = (apps, mainLifecycle) => {
  // console.log(apps)
  console.log('mainLifecycle', mainLifecycle)
  // apps.forEach(app => window.appList.push(app))
  // 注册子应用
  setList(apps)

  // mainLifecycle.beforeLoad[0]()
  // setTimeout(() => {
  //   mainLifecycle.mounted[0]()
  // }, 3000)

  // 保留主应用的生命周期
  setMainLifecycle(mainLifecycle)
}

export const start = async () => {
  // 获取子应用列表
  const apps = getList()

  if (!apps.length) {
    throw Error('子应用列表为空，请查看是否正确注册')
  } else {
    // 跳转到第一个子应用
    const app = currentApp()
    console.log('跳转到第一个子应用 ', app)

    if (app) {
      const { pathname, hash } = window.location
      const url = pathname + hash
      window.history.pushState(url, app.name, url || app.activeRule)
    }

    // 将当前子应用做标记
    window.__CURRENT_SUB_APP__ = app.activeRule
  }
}
