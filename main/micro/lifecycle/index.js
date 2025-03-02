import { findAppByRoute } from '../util'
import { getMainLifecycle } from '../const/mainLifeCycles'
import { htmlLoader } from '../loader'

// 改变了路由，重新装载新的子应用
export const lifecycle = async () => {
  // 获取上一个子应用
  const prevApp = findAppByRoute(window.__ORIGIN_APP__)
  // 获取跳转后的子应用
  const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__)

  if (!nextApp) {
    return
  }

  if (prevApp && prevApp.unmount) {
    // 卸载上一个应用
    await unmount(prevApp)
  }

  // 还原 prevApp 快照
  // prevApp.sandBox.active()

  // 加载渲染下一个应用
  const app = await bootstrap(nextApp)

  await mount(app)
}

// 装载应用
export const bootstrap = async (app) => {
  await runMainLifeCycle('beforeLoad')

  // 获取子应用的dom结构
  await htmlLoader(app)
  app && app.bootstrap && (await app.bootstrap())

  const appContext = null
  return appContext
}

// 渲染应用
export const mount = async (app) => {
  app && (await app.mount(app))

  await runMainLifeCycle('mounted')
}

// 卸载
export const unmount = async (app) => {
  app && app.unmount && (await app.unmount(app))

  await runMainLifeCycle('destroyed')
}

// 执行主应用生命周期
export const runMainLifeCycle = async (type) => {
  const mainLifeCycle = getMainLifecycle()

  // 因为主应用里配置的生命周期是一个数组，所以需要执行数组中的所有内容
  await Promise.all(mainLifeCycle[type].map(async (item) => await item()))
}
