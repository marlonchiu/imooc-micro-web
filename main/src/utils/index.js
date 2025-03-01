import { registerMicroApps, start } from '../../micro/index'
import { loading } from '../store'

export const registerApp = (list) => {
  // 注册到微前端框架里
  registerMicroApps(
    list, // 生命周期
    {
      beforeLoad: [
        () => {
          loading.openLoading()
          // console.log('开始加载 -- ', app.name)
        }
      ],
      mounted: [
        () => {
          loading.closeLoading()
          // console.log('加载完成 -- ', app.name)
        }
      ],
      destroyed: [
        (app) => {
          console.log('卸载完成 -- ', app.name)
        }
      ]
    }
  )

  // 启动微前端框架
  start()
}
