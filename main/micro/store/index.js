export const createStore = (initData = {}) =>
  (() => {
    let store = initData
    let observers = [] // 管理所有的订阅依赖
    const getStore = () => store

    const updateStore = (newValue) =>
      new Promise((res) => {
        if (newValue !== store) {
          let oldValue = store
          store = newValue
          res(store)

          observers.forEach((fn) => fn(newValue, oldValue))
        }
      })

    // 订阅更新
    const subscribeStore = (fn) => observers.push(fn)

    return {
      getStore,
      update: updateStore,
      subscribe: subscribeStore
    }
  })()
