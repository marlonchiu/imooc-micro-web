import { registerMicroApps, start, createStore } from '../../micro/index'
import { loading } from '../store'

const store = createStore()
const storeData = store.getStore()

window.store = store
store.subscribe((newValue, oldValue) => {
  console.log('全局订阅store', newValue, oldValue)
})

store.update({
  ...storeData,
  a: 1
})

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
      mounted: [
        () => {
          loading.closeLoading()
          console.log('加载完成 -- ')
        }
      ],
      destroyed: [
        () => {
          console.log('卸载完成 -- ')
        }
      ]
    }
  )

  // 启动微前端框架
  start()
}
