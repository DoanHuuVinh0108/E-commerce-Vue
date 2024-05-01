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

async function orderProduct(Userid, cart) {
  const payload = {
    Userid: Userid,
    detailorder: cart
  }

  const api = axios.post('/api/v1/order/create', payload)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function getOrdersByUser(Userid) {
  const response = await axios.get(`/api/v1/order/get/${Userid}`)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function getNameAndImageProduct(id) {
  const response = await axios.get(`/api/v1/product/get-name-image/${id}`)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function getAllOrders() {
  const response = await axios.get('/api/v1/order/get-all')
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function searchByCategory(category) {
  const response = await axios.get(`/api/v1/product/category/${category}`)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function searchByPrice(min, max) {
  const payload = {
    min: min,
    max: max
  }
  const response = await axios.post(`/api/v1/product/price`, payload)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function searchByCategoryAndPrice(category, min, max) {
  console.log(category, min, max)
  const data = {
    categoryid: category,
    min: min,
    max: max
  }
  const response = await axios.post(`/api/v1/product/category-price`, data)
  if (response.status === 200) {
    return response.data
  }
  return false
}

export {
  registerUser,
  searchProduct,
  orderProduct,
  getOrdersByUser,
  getNameAndImageProduct,
  getAllOrders,
  searchByCategory,
  searchByPrice,
  searchByCategoryAndPrice
}
