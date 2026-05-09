import Antd from 'ant-design-vue'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import 'element-plus/dist/index.css'

createApp(App).use(Antd).use(ElementPlus).mount('#app')
