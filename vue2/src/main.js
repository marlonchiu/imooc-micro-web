import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const render = () => {
  new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#app-vue')
}

if (!window.singleSpaNavigate) {
  render()
}

const vueLifeCycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    render: (h) => h(App)
  }
})

export const bootstrap = vueLifeCycles.bootstrap
export const mount = vueLifeCycles.mount
export const unmount = vueLifeCycles.unmount
