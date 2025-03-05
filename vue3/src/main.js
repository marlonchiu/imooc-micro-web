import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { setMain } from './utils/global'

let instance = null

function render() {
  instance = createApp(App)
  instance.use(router).mount('#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('vue3.0 app bootstrap')
}

export async function mount(props) {
  console.log('🚀 ~ 66666666666666 mount ~ props:', props)
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev)
  })

  setTimeout(() => {
    console.log('vue3 子应用触发全局')
    props.setGlobalState({
      a: 2,
      b: 3,
      name: 'vue3.0'
    })
  }, 3000)
  // setMain(app)
  render()
  console.log('vue3.0 app mount 渲染')
}

export async function unmount(ctx) {
  instance.unmount()
  instance = null
  const { container } = ctx
  if (container) {
    // document.querySelector(container).innerHTML = ''
    container.innerHTML = ''
  }
}
