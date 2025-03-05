import { registerMicroApps, start, initGlobalState } from 'qiankun'
import { loading } from '../store'

// 初始化 state
const actions = initGlobalState({
  a: 1,
  b: 2,
  name: 'marlon'
})

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev)
})

setTimeout(() => {
  console.log('main 主应用触发全局')
  actions.setGlobalState({
    a: 1111,
    b: 3333,
    name: 'main '
  })
}, 6000)
// actions.setGlobalState(state)
// actions.offGlobalStateChange()

export const registerApp = (list) => {
  // 注册到微前端框架里
  registerMicroApps(
    list, // 生命周期
    {
      beforeLoad: [
        () => {
          loading.openLoading()
          console.log('开始加载 -- ')
        }
      ],
      afterMount: [
        () => {
          loading.closeLoading()
          console.log('加载完成 -- ')
        }
      ],
      afterUnmount: [
        () => {
          console.log('卸载完成 -- ')
        }
      ]
    }
  )

  // 启动微前端框架
  start()
}
