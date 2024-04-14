<template>
  <a-form
    layout="horizontal"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    name="register"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    ref="formRef"
    class="register-form"
    :rules="rules"
  >
    <a-form-item label="Họ và tên" name="Hoten" ref="Hoten">
      <a-input v-model:value="formState.Hoten">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="Email" name="Email" ref="Email">
      <a-input v-model:value="formState.Email">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="Mật khẩu" name="Matkhau" ref="Matkhau">
      <a-input-password v-model:value="formState.Matkhau">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item label="Địa chỉ" name="Diachi" ref="Diachi">
      <a-input v-model:value="formState.Diachi">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="Số điện thoại" name="Sodienthoai" ref="Sodienthoai">
      <a-input v-model:value="formState.Sodienthoai">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item class="button">
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        Submit
      </a-button>
      Or
      <a @click="login()">login now</a>
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive } from 'vue'
import { registerUser } from '../sevices/user.service'
export default {
  data() {
    return {
      formState: reactive({
        Email: '',
        Matkhau: '',
        Hoten: '',
        Diachi: '',
        Sodienthoai: ''
      }),
      formRef: null,
      rules: {
        Hoten: [
          { required: true, message: 'Vui lòng nhập họ và tên!' },
          { min: 6, message: 'Họ và tên phải lớn hơn 6 ký tự!' }
        ],
        Email: [
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Email không hợp lệ!' }
        ],
        Matkhau: [
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          { min: 8, message: 'Mật khẩu phải lớn hơn 8 ký tự!' },
          { max: 20, message: 'Mật khẩu phải nhỏ hơn 20 ký tự!' },
          {
            type: 'string',
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số!'
          }
        ],
        Diachi: [{ required: true, message: 'Vui lòng nhập địa chỉ!' }],
        Sodienthoai: [
          { required: true, message: 'Vui lòng nhập số điện thoại!' },
          { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ!' },
          { min: 10, message: 'Số điện thoại phải lớn hơn 10 số!' },
          { max: 11, message: 'Số điện thoại phải nhỏ hơn 11 số!' }
        ]
      },
      labelCol: {
        style: {
          width: '150px'
        }
      },
      wrapperCol: {
        span: 14
      }
    }
  },
  methods: {
    onFinish() {
      this.$refs.formRef
        .validate(['Hoten', 'Email', 'Matkhau', 'Diachi', 'Sodienthoai'], {
          scroll: { offsetTop: 100 }
        })
        .then(() => {
          registerUser(this.formState)
            .then((res) => {
              console.log('res', res)
              this.$router.push('/login')
            })
            .catch((error) => {
              console.log('error', error)
            })
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    onFinishFailed() {
      console.log('onFinishFailed')
    },
    login() {
      this.$router.push('/login')
    }
  },
  computed: {
    disabled() {
      return !(
        this.formState.Email &&
        this.formState.Matkhau &&
        this.formState.Hoten &&
        this.formState.Diachi &&
        this.formState.Sodienthoai
      )
    }
  }
}
</script>

<style>
.button {
  margin-left: 50px;
}
</style>
