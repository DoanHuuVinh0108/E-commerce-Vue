import axios from '../axios/index'
import { toastMsgFromPromise } from '../untils/index'

async function registerUser({ Email, Matkhau, Hoten, Sodienthoai, Diachi }) {
  const api = axios.post('/api/v1/auth/signup', {
    Email,
    Matkhau,
    Hoten,
    Sodienthoai,
    Diachi
  })
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function searchProduct(name) {
  const response = await axios.get(`/api/v1/product/search?name=${name}`)

  if (response.status === 200) {
    return response.data
  }
  return false
}

export { registerUser, searchProduct }
