import {
  Button,
  Form,
  Input,
  Layout,
  message,
  Menu
} from 'ant-design-vue'

export default function loadAntDesignVue (app: any) {
  app.use(Button)
  app.use(Form)
  app.use(Input)
  app.use(Layout)
  app.use(Menu)

  app.config.globalProperties.$message = message
}
