import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import loadAntDesignVue from './plugins/ant-design-vue'
import './styles/global.less'
import './mock'

const app = createApp(App)

loadAntDesignVue(app) // 引入组件库

app.use(store).use(router).mount('#app')
