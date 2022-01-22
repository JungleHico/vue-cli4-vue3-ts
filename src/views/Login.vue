<template>
  <div class="login">
    <img class="logo" src="@/assets/images/logo.png" />

    <a-form
      ref="formRef"
      class="form"
      :model="formState"
      :rules="rules">
      <a-form-item name="username">
        <a-input
          v-model:value="formState.username"
          size="large"
          placeholder="用户名 admin" />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="formState.password"
          size="large"
          placeholder="密码 123456" />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          size="large"
          block
          :loading="loading"
          @click="onSubmit">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, UnwrapRef, toRaw } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import md5 from 'md5'

interface FormState {
  username: string,
  password: string
}

export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const formRef = ref()
    const formState: UnwrapRef<FormState> = reactive({
      username: '',
      password: ''
    })
    const loading = ref(false)
    const rules = {
      username: [{ required: true, message: '请输入用户名' }],
      password: [{ required: true, message: '请输入密码' }]
    }

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          login(toRaw(formState))
        })
    }
    const login = async ({ username, password }: any) => {
      loading.value = true

      try {
        await store.dispatch('Login', {
          username: username,
          password: md5(password)
        })
        // 登录成功，重定向到首页
        router.push('/')
      } catch (error) {
        // 登陆失败
        localStorage.removeItem('token')
        return Promise.reject(error)
      } finally {
        loading.value = false
      }
    }

    return {
      formRef,
      formState,
      rules,
      loading,
      onSubmit,
      login
    }
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  .logo {
    width: 256px;
    height: auto;
    margin: 32px 0;
  }
  .form {
    width: 360px;
    .alert {
      margin-bottom: 24px;
    }
  }
}
</style>
