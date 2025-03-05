import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

Vue.config.productionTip = false

let instance = null
console.log(instance)

const render = () => {
  instance = new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#app-vue')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('vue2 app bootstrap 加载')
}

export async function mount() {
  render()
  console.log('vue2 app mount 渲染')
}

export async function unmount(ctx) {
  console.log('vue2 app unmount 卸载')
  instance = null
  const { container } = ctx
  if (container) {
    // document.querySelector(container).innerHTML = ''
    container.innerHTML = ''
  }
}
