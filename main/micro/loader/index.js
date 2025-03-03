import { fetchResource } from '../util/fetchResource'
import { findAppByName } from '../util'
import { sandbox } from '../sandbox'

// 应用缓存
const cache = {} // 根据应用名称作缓存

// 加载和渲染html
export const htmlLoader = async (app) => {
  // window.__MICRO_WEB__ = false
  // container 第一个子应用需要显示在哪里  ; entry 子应用的入口
  const { container, entry, name } = app

  const [dom, scriptsArray] = await parseHtml(entry, name)
  // console.log('🚀 ~ htmlLoader ~ html:', dom, scriptsArray)

  let containerName = document.querySelector(container)

  if (!containerName) {
    throw Error(` ${name} 的容器不存在，请查看是否正确指定`)
  }

  containerName.innerHTML = dom

  scriptsArray.map((item) => {
    sandbox(item, name)
  })

  return app
}

// 解析html
export const parseHtml = async (appEntry, appName) => {
  if (cache[appName]) {
    // 缓存请求到的script，感觉有点粗暴
    return cache[appName]
  }

  const html = await fetchResource(appEntry)

  const div = document.createElement('div')
  div.innerHTML = html

  let scriptsArray = []
  const [scriptUrls, scripts, elements] = getResources(div, findAppByName(appName))

  const fetchedScript = await Promise.all(scriptUrls.map((url) => fetchResource(url)))
  scriptsArray = scripts.concat(fetchedScript)

  cache[appName] = [elements, scriptsArray]

  return [elements, scriptsArray]
}

// 解析 js 内容
export const getResources = (root, app) => {
  const scriptUrls = []
  const scripts = []
  const dom = root.outerHTML

  function deepParse(element) {
    const children = element.children
    const parent = element.parentNode

    // 处理位于 link 标签中的 js 文件
    if (element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src')
      if (!src) {
        // 直接在 script 标签中书写的内容
        let script = element.outerHTML
        scripts.push(script)
      } else {
        if (src.startsWith('http')) {
          scriptUrls.push(src)
        } else {
          // fetch 时 添加 publicPath
          scriptUrls.push(`http:${app.entry}/${src}`)
        }
      }

      if (parent) {
        let comment = document.createComment('此 js 文件已被微前端替换')
        // 在 dom 结构中删除此文件引用
        parent.replaceChild(comment, element)
      }
    }

    // 处理位于 link 标签中的 js 文件
    if (element.nodeName.toLowerCase() === 'link') {
      const href = element.getAttribute('href')
      if (href.endsWith('.js')) {
        if (href.startsWith('http')) {
          scriptUrls.push(href)
        } else {
          // fetch 时 添加 publicPath
          scriptUrls.push(`http:${app.entry}/${href}`)
        }
      }
    }

    for (let i = 0; i < children.length; i++) {
      deepParse(children[i])
    }
  }

  deepParse(root)

  return [scriptUrls, scripts, dom]
}
