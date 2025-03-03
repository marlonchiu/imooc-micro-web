let defaultValue = {}

// 代理沙箱
export class ProxySandBox {
  constructor() {
    this.proxy = null

    this.active()
  }

  active() {
    this.proxy = new Proxy(window, {
      get(target, propKey) {
        // console.log('propKey', propKey)
        if (typeof target[propKey] === 'function') {
          return target[propKey].bind(target)
        }
        return defaultValue[propKey] || target[propKey]
      },
      set(target, propKey, value) {
        defaultValue[propKey] = value
        return true
      }
    })
  }

  inactive() {
    defaultValue = {}
    console.log('关闭沙箱')
  }
}
