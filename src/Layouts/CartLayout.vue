<template>
  <a-space
    direction="vertical"
    :style="{ width: '100%' }"
    :size="[0, 48]"
    style="background-color: #f5f5f5"
  >
    <a-layout>
      <TheHeader />
      <a-layout-content
        v-if="cartData.length > 0"
        :style="contentStyle"
        style="background-color: #f5f5f5"
      >
        <a-row>
          <a-col :span="12" :offset="6" :style="{ width: '100%' }">
            <!-- Ensure cartData is properly populated before rendering cards -->
            <br />
            <a-card
              v-for="(cart, index) in cartData"
              :key="cart.Productid"
              :style="cardStyle"
              :body-style="{ padding: 0, overflow: 'hidden' }"
            >
              <a-flex justify="space-between">
                <div justify="center" align="center">
                  <img
                    alt="avatar"
                    :width="200"
                    :height="200"
                    :src="cart.image"
                    :style="imgStyle"
                  />

                  <a-button @click="removeProduct(index)" type="dashed" danger>
                    <DeleteOutlined
                  /></a-button>
                </div>

                <a-flex
                  vertical
                  align="flex-end"
                  justify="space-between"
                  :style="{ padding: '32px' }"
                >
                  <a-typography>
                    <a-typography-title :level="3">
                      <router-link
                        :to="{ name: 'product', params: { id: cart.Productid } }"
                        style="color: black"
                        >{{ cart.Tensanpham }}</router-link
                      >
                    </a-typography-title>

                    <a-typography-text type="danger">{{
                      formatPrice(cart.Giasanpham)
                    }}</a-typography-text>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding-top: 10px;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <label style="margin-right: 8px">Quantity:</label>
                        <a-input-number
                          id="inputNumber"
                          v-model:value="cart.Soluong"
                          :min="1"
                          :max="10"
                        />
                      </div>
                      <div>
                        <label style="margin-right: 8px">Total:</label>
                        <a-typography-text type="danger">{{
                          formatPrice(cart.Giasanpham * cart.Soluong)
                        }}</a-typography-text>
                      </div>
                    </div>
                  </a-typography>
                </a-flex>
              </a-flex>
            </a-card>

            <div
              style="
                display: flex;
                justify-content: right;
                align-items: center;
                padding: 10px;
                background-color: #ffff;
                border-radius: 10px 10px 0px 0px;
                width: 100%;
              "
            >
              <div style="display: inline-block">
                <label style="padding-right: 10px">Total: </label>
                <a-typography-text type="danger">{{ formatPrice(total) }}</a-typography-text>
              </div>
            </div>
            <div
              style="
                display: inline-block;
                width: 100%;
                justify-content: right;
                display: flex;
                background-color: #ffff;
                border-radius: 0px 0px 10px 10px;
                padding: 10px;
              "
            >
              <a-button @click="showConfirm" type="primary">Đặt Hàng</a-button>
              <!-- Add a button here -->
            </div>
          </a-col>
        </a-row>
      </a-layout-content>

      <a-layout-content v-else>
        <div style="min-height: 400px; display: flex; justify-content: center; align-items: center">
          <a-empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            :image-style="{
              height: '60px'
            }"
          >
            <template #description>
              <span>
                Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.
              </span>
            </template>
          </a-empty>
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center; padding: 0px 0px">
        <FooterComponent> </FooterComponent>
      </a-layout-footer>
    </a-layout>
  </a-space>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { orderProduct } from '@/sevices/user.service.js'
import { userLoginStore, cartStore } from '@/stores/index.js'
import FooterComponent from '@/components/Footer.vue'
export default {
  components: {
    TheHeader,
    DeleteOutlined,
    FooterComponent
  },
  setup() {
    const showConfirm = () => {
      Modal.confirm({
        title: 'Xác nhận đặt hàng?',
        icon: createVNode(ExclamationCircleOutlined),
        content: 'Quý khách có chắc chắn muốn đặt hàng không?',
        async onOk() {
          try {
            const { user } = userLoginStore()
            const id = user._Userid
            const { cart, clearCart } = cartStore()
            const order = cart
            const result = await orderProduct(id, order)
            clearCart()
            console.log('result', result)
            console.log('id', id)
          } catch (error) {
            console.error('Error ordering product:', error)
          }
        },

        onCancel() {}
      })
    }
    return {
      showConfirm
    }
  },
  data() {
    return {
      cartData: []
    }
  },
  created() {
    this.getCart()
  },
  methods: {
    async getCart() {
      try {
        const { cart } = cartStore()
        this.cartData = cart
        console.log('cartData', this.cartData)
      } catch (error) {
        console.error('Error fetching cart data:', error)
      }
    },
    async removeProduct(index) {
      try {
        const { removeFromCart } = cartStore()
        removeFromCart(index)
        this.getCart()
        console.log('cartData', this.cartData)
      } catch (error) {
        console.error('Error fetching cart data:', error)
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    }
  },
  computed: {
    total() {
      return this.cartData.reduce((acc, item) => acc + item.Giasanpham * item.Soluong, 0)
    }
  }
}
</script>
