import * as loading from './loading'

// import * as appInfo from '../store'

function createScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject

    const first = document.getElementsByTagName('script')[0]
    console.log('🚀 ~ return newPromise ~ first:', first)
    first.parentNode.insertBefore(script, first)
  })
}
async function createCSS(url) {
  const res = await fetch(url)
  const cssText = await res.text()

  const style = document.createElement('style')
  style.innerHTML = cssText
  document.body.appendChild(style)
}

async function loadApp(urls, name, cssList) {
  // await Promise.all(urls.map(async (url) => await createScript(url)))
  urls[0] && (await createScript(urls[0]))
  urls[1] && (await createScript(urls[1]))

  if (cssList.length) {
    await Promise.all(cssList.map(async (url) => await createCSS(url)))
  }

  // 取消loading
  loading.closeLoading()
  return window[name]
}

// 子应用参数
//  name: 'appName',
//  app: () => System.import('appName'),
//  activeWhen: '/appName'
//  customProps: {}

export const navList = [
  {
    name: 'react15', // 唯一
    // single-spa
    // 通过此函数获取到子应用的所有资源 js css
    app: () => {},
    activeWhen: '/react15',
    customProps: {}
  },
  {
    name: 'react16',
    app: loadApp(['http://localhost:9003/react16.js'], 'react16', ['http://localhost:9003/path.css']),
    activeWhen: '/react16',
    customProps: {}
  },
  {
    name: 'vue2',
    app: loadApp(['http://localhost:9004/static/js/chunk-vendors.js', 'http://localhost:9004/vue2.js'], 'vue2'),
    // activeWhen: '/vue2',
    activeWhen: (location) => location.pathname.startsWith('/vue2'),
    customProps: {}
  },
  {
    name: 'vue3',
    app: loadApp(['http://localhost:9005/static/js/chunk-vendors.js', 'http://localhost:9005/vue3.js'], 'vue3'),
    activeWhen: (location) => location.pathname.startsWith('/vue3'),
    customProps: {}
  }
]
