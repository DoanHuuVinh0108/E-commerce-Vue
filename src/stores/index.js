import { defineStore } from 'pinia'

export const userLoginStore = defineStore('user', {
  state: () => ({
    _accessToken: '',
    _data: {
      _Userid: '',
      _Hoten: '',
      _TenNhom: '',
      _Diachi: '',
      _Sodienthoai: '',
      _Email: ''
    }
  }),
  getters: {
    accessToken(state) {
      // autocompletion! ✨
      return state._accessToken
    },
    user(state) {
      return state._data
    }
  },
  actions: {
    setDefault() {
      this._accessToken = ''
      this._data = {
        _Userid: '',
        _Hoten: '',
        _TenNhom: '',
        _Diachi: '',
        _Sodienthoai: '',
        _Email: ''
      }
    },
    login(payload) {
      this._accessToken = payload.accessToken
      window.localStorage.setItem('accessToken', JSON.stringify(payload.accessToken))
      // console.log('pinia', payload)
      this._data = {
        _Userid: payload.data?.Userid || '',
        _Hoten: payload.data.Hoten,
        _Sodienthoai: payload.data.Sodienthoai,
        _TenNhom: payload.data.Tennhom,
        _Diachi: payload.data.Diachi,
        _Email: payload.data.Email
      }
    },
    saveToken(access_token) {
      window.localStorage.setItem('accessToken', JSON.stringify(access_token))
      this._accessToken = access_token
    },
    saveProfile(payload) {
      this._data = {
        _id: payload?._id || '',
        _ho_ten_KH: payload.ho_ten_KH,
        _so_dien_thoai: payload.so_dien_thoai,
        _role: payload.role,
        _dia_chi: payload.dia_chi
      }
    },
    logout() {
      window.localStorage.removeItem('accessToken')
      this.setDefault()
    }
  }
})

export const cartStore = defineStore('cart', {
  state: () => ({
    _cart: []
  }),
  getters: {
    cart(state) {
      return state._cart
    }
  },
  actions: {
    addToCart(payload) {
      if (this.findProduct(payload.Productid)) {
        this.findProduct(payload.Productid)._quantity++
        return
      }
      this._cart.push(payload)
    },
    removeFromCart(index) {
      this._cart.splice(index, 1)
      console.log(index)
    },
    clearCart() {
      this._cart = []
    },
    findProduct(id) {
      return this._cart.find((item) => item.Productid === id)
    }
  }
})
