import { findAppByName } from '../util'
import { performScriptForEval } from './performScript'
// 子应用生命周期，环境变量设置

// 检测是否漏掉了生命周期方法
export const isCheckLifecycle = (lifecycles) =>
  lifecycles && lifecycles.bootstrap && lifecycles.mount && lifecycles.unmount

// 创建沙箱环境
export const sandbox = (script, appName) => {
  // 获取当前子应用
  const app = findAppByName(appName)

  // 1.设置微前端环境
  window.__MICRO_WEB__ = true

  // 2.获取子应用生命周期
  const lifeCycles = performScriptForEval(script, appName)
  console.log('🚀 ~ sandbox ~ lifeCycles:', lifeCycles)

  // 检查子应用是否包含必须的方法
  const isLock = isCheckLifecycle(lifeCycles)

  if (isLock) {
    app.bootstrap = lifeCycles.bootstrap
    app.mount = lifeCycles.mount
    app.unmount = lifeCycles.unmount
  }
}
