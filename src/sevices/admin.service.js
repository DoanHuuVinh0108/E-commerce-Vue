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

export { getAllUser, deleteUser, createUser, getAllGroup, getUserById, updatedUser }
