import { createApp } from 'vue'
import App from './App.vue'
import mavonEditor from 'mavon-editor'
import axios from './assets/axios'
import router from './router'
import { Form, Input, Button, Divider, Row, Popover, Select, Dropdown } from "ant-design-vue"
import "ant-design-vue/dist/antd.css";
import 'mavon-editor/dist/css/index.css'

const app = createApp(App)
app.use(mavonEditor)
app.use(Form)
app.use(Input)
app.use(Button)
app.use(Divider)
app.use(Popover)
app.use(Select)
app.use(Row)
app.use(Dropdown)
app.config.globalProperties.$axios = axios
app.use(router).mount('#app')
