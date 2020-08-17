import Vue from 'vue'
import App from './App.vue'
import Carousel from './lib'

Vue.use(Carousel)

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
