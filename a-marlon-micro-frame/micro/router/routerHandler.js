import { isTurnChild } from '../util'
import { lifecycle } from '../lifecycle'

// 跳转app
export const turnApp = async () => {
  if (isTurnChild()) {
    console.log('路由切换了')
    // 微前端的生命周期执行
    // 路由变化，同步修改子应用
    await lifecycle()
  }
}
