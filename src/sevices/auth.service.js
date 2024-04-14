import axios from '../axios/index'
// import axios from "axios";
import { userLoginStore } from '../stores/index.js'
import { toastMsgFromPromise } from '../untils/index'
import { ref, watch } from 'vue'
export function useAuth() {
  const {
    login: saveLoginToStore,
    logout: logoutToStore,
    user,
    saveToken,
    saveProfile
  } = userLoginStore()

  // access_token_local_storage
  const access_token_local_storage = window.localStorage.getItem('accessToken')
  const access_token = access_token_local_storage ? JSON.parse(access_token_local_storage) : ''
  if (access_token) {
    saveToken(access_token)
  }
  const userLogin = ref({
    Userid: user._Userid,
    Hoten: user._Hoten,
    Diachi: user._Diachi,
    TenNhom: user._TenNhom,
    Sodienthoai: user._Sodienthoai,
    Email: user._Email
  })

  // Fetch profile
  // axios
  //   .get('/api/v1/auth/profile')
  //   .then((response) => {
  //     if (response.status === 200) {
  //       userLogin.value = {
  //         _id: response.data?.data?._id,
  //         ho_ten_KH: response?.data?.data?.ho_ten_KH,
  //         role: response?.data?.data?.role,
  //         dia_chi: response?.data?.data?.dia_chi,
  //         so_dien_thoai: response?.data?.data?.so_dien_thoai
  //       }
  //       saveProfile({
  //         _id: response?.data?.data?._id,
  //         ho_ten_KH: response?.data?.data?.ho_ten_KH,
  //         role: response?.data?.data?.role,
  //         dia_chi: response?.data?.data?.dia_chi,
  //         so_dien_thoai: response?.data?.data?.so_dien_thoai
  //       })
  //     }
  //   })
  //   .catch((error) => {
  //     console.log('error', error)
  //   })
  async function login({ email, password }) {
    console.log('email', email)
    console.log('password', password)
    const api = axios.post('/api/v1/auth/signin', {
      email,
      password
    })
    const res = await toastMsgFromPromise(api)
    console.log('res', res.status)
    if (res.status === 200) {
      console.log('res.data', res.data.data)
      saveLoginToStore({
        accessToken: res.data?.accessToken,
        data: {
          ...res.data.data
        }
      })
      return res.data
    }
    return false
  }
  async function logout() {
    try {
      const api = axios.delete('/api/v1/auth/logout')
      const res = await toastMsgFromPromise(api)
      if (res.status === 200) {
        logoutToStore()
        return res.data
      }
      return null
    } catch (error) {
      console.log(error)
    }
  }
  watch(
    () => userLoginStore().user,
    (newUser) => {
      userLogin.value = {
        _id: newUser._id,
        ho_ten_KH: newUser._ho_ten_KH,
        dia_chi: newUser._dia_chi,
        role: newUser._role,
        so_dien_thoai: newUser._so_dien_thoai
      }
    }
  )
  return {
    login,
    user: userLogin,
    logout
  }
}
