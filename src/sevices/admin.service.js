import axios from '../axios/index'
import { toastMsgFromPromise } from '@/untils/index'

async function getAllUser() {
  const response = await axios.get('/api/v1/user/get-all')
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function deleteUser(id) {
  const api = axios.delete(`/api/v1/user/delete/${id}`)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function createUser(data) {
  const api = axios.post('/api/v1/user/create', data)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function getAllGroup() {
  const response = await axios.get('/api/v1/group/get-all')
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function getUserById(id) {
  const response = await axios.get(`/api/v1/user/get/${id}`)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function updatedUser(id, data) {
  const api = axios.put(`/api/v1/user/update/${id}`, data)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function getAllProduct() {
  const response = await axios.get('api/v1/product/get-all')
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function deleteProduct(id) {
  const api = axios.delete(`/api/v1/product/delete/${id}`)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function createProduct(data) {
  const api = axios.post('/api/v1/product/create', data)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function updateProduct(id, data) {
  const api = axios.put(`/api/v1/product/update/${id}`, data)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function getAllCategory() {
  const response = await axios.get('api/v1/category/get-all')
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function getProductById(id) {
  const response = await axios.get(`/api/v1/product/get/${id}`)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function getImageByProductId(id) {
  const response = await axios.get(`/api/v1/image/get/${id}`)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function createImage(formData, id) {
  console.log(formData)
  const api = axios.post(`/api/v1/image/upload/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function getListProduct(offset) {
  const response = await axios.get(`/api/v1/product/get-list/${offset}`)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function getOrdersById(id) {
  const response = await axios.get(`/api/v1/order/get-orderid/${id}`)
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function updateOrder(id, data) {
  const api = axios.put(`/api/v1/order/update/${id}`, data)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function getCountProduct() {
  const response = await axios.get('/api/v1/product/count')
  if (response.status === 200) {
    return response.data
  }
  return false
}

async function createCategory(data) {
  const api = axios.post('/api/v1/category/create', data)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function updateCategory(data) {
  const api = axios.put('/api/v1/category/update', data)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function deleteCategory(id) {
  const api = axios.delete(`/api/v1/category/delete/${id}`)
  const response = await toastMsgFromPromise(api)
  if (response.status === 200) {
    return true
  }
  return false
}

async function getCategoryById(id) {
  const response = await axios.get(`/api/v1/category/get/${id}`)
  if (response.status === 200) {
    return response.data
  }
  return false
}

export {
  getAllUser,
  deleteUser,
  createUser,
  getAllGroup,
  getUserById,
  updatedUser,
  getAllProduct,
  deleteProduct,
  getAllCategory,
  createProduct,
  updateProduct,
  getProductById,
  getImageByProductId,
  createImage,
  getListProduct,
  getOrdersById,
  updateOrder,
  getCountProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById
}
