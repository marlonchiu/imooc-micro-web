import { parseHtml } from './index'
import { getList } from '../const/subApps'
export const prefetch = async () => {
  // 获取所有的子应用列表 -- 不包括当前正在显示的
  const list = getList().filter((item) => !window.location.pathname.startsWith(item.activeRule))

  // 预加载剩下的所有子应用
  await Promise.all(
    list.map(async (app) => {
      await parseHtml(app.entry, app.name)
    })
  )
}
