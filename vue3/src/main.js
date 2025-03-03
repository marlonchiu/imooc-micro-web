import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let instance = null

function render() {
  instance = createApp(App)
  instance.use(router).mount('#app')
}

if (!window.__MICRO_WEB__) {
  render()
}

export async function bootstrap() {
  console.log('vue3.0 app bootstrap')
}

export async function mount() {
  // window.a = 1
  window._custom.emit('custom-event-test', { a: 1 })
  render()
  console.log('vue3.0 app mount 渲染')
}

export async function unmount() {
  // instance.unmount()
  // instance = null
  console.log('vue3.0 app unmount 卸载')
}
