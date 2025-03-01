import { isTurnChild } from '../util'

// 跳转app
export const turnApp = async () => {
  if (isTurnChild()) {
    return
  }
  console.log('路由切换了')
}
