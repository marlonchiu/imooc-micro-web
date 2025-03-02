import { fetchResource } from '../util/fetchResource'
import { findAppByName } from '../util'

// 加载和渲染html
export const htmlLoader = async (app) => {
  // container 第一个子应用需要显示在哪里  ; entry 子应用的入口
  const { container, entry, name } = app
  const html = await parseHtml(entry, name)
  console.log('🚀 ~ htmlLoader ~ html:', html)

  let containerName = document.querySelector(container)

  if (!containerName) {
    throw Error(` ${name} 的容器不存在，请查看是否正确指定`)
  }

  containerName.innerHTML = html
}

// 解析html
export const parseHtml = async (appEntry, appName) => {
  const html = await fetchResource(appEntry)
  const div = document.createElement('div')
  div.innerHTML = html

  const list = parseJs(div, findAppByName(appName))
  console.log('🚀 ~ parseHtml ~ list:', list)

  return html
}

export const parseJs = async () => {
  return []
}
