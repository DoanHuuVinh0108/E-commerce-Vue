<template>
  <div class="site-layout-background" :align="center">
    <div style="width: 400px" class="form-container">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        layout="horizontal"
      >
        <a-form-item
          label="Email"
          name="email"
          :rules="[{ type: 'email', required: true, message: 'Please input your email!' }]"
        >
          <a-input v-model:value="formState.email">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
          Or
          <a @click="register()">register now!</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue'
import { useAuth } from '../sevices/auth.service'
import { useRouter } from 'vue-router'
const { login } = useAuth()
const router = useRouter()
const formState = reactive({
  email: '',
  password: ''
  // remember: true
})

async function onFinish(values) {
  try {
    console.log('Success:', values.email, values.password)
    let res = await login(values)
    if (res.data.Tennhom === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (error) {
    console.log('Login error:', error)
  }
}

function onFinishFailed(errorInfo) {
  console.log('Failed:', errorInfo)
}

function register() {
  router.push('/register')
}

const disabled = computed(() => {
  return !(formState.email && formState.password)
})
</script>

<style scoped>
.form-container {
  width: 400px;
}

.site-layout-background {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center; /* Center vertically */
  padding-left: 30px;
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the image */
  background-attachment: fixed;
  background-image: url('/src/assets/3d-illustration-smartphone-with-products-coming-out-screen-online-shopping-e-commerce-concept.jpg');
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
