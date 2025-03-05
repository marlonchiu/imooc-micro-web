import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

function render() {
  createApp(App).use(router).mount('#app')
}

const vueLifeCycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          // name: this.name,
          // mountParcel: this.mountParcel,
          // singleSpa: this.singleSpa
        }
      })
    }
  },
  handleInstance(instance) {
    // handle instance
    instance.use(router)
  }
})

if (!window.singleSpaNavigate) {
  render()
}

export const bootstrap = vueLifeCycles.bootstrap
export const mount = vueLifeCycles.mount
export const unmount = vueLifeCycles.unmount
