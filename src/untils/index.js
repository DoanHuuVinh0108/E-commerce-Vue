import axios from 'axios'
import { POSITION, TYPE, useToast } from 'vue-toastification'
const toast = useToast()
function getErrorMessage(err) {
  let message = ''
  if (axios.isAxiosError(err)) {
    if (err.response) {
      message = err.response.data.message
    } else {
      message = 'Lỗi không có phản hồi từ server'
    }
  } else {
    const errorWithMsg = err
    message = errorWithMsg.message || 'Lỗi không xác định'
  }
  return message
}
async function toastMsgFromPromise(api) {
  try {
    const res = await api
    console.log('res--------------------', res)
    if (res.status === 200) {
      console.log('l1--------------------')
      toast(res.data?.message || 'Thành công', {
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        position: POSITION.TOP_RIGHT,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true
      })
    } else {
      toast(res.data.message, {
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        position: POSITION.TOP_RIGHT,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true
      })
    }
    return res
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const errorMsg = err.response.data.message
        toast(errorMsg, {
          type: TYPE.ERROR,
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          position: POSITION.TOP_RIGHT,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: 'button',
          icon: true
        })
      } else {
        toast('Lỗi không có phản hồi từ server', {
          type: TYPE.ERROR,
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          position: POSITION.TOP_RIGHT,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: 'button',
          icon: true
        })
      }
    } else {
      const errorWithMsg = err
      const errorMsg = errorWithMsg.message || 'Lỗi không xác định'
      toast(errorMsg, {
        type: TYPE.ERROR,
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        position: POSITION.TOP_RIGHT,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true
      })
    }
    return false
  }
}
export { getErrorMessage, toastMsgFromPromise }
