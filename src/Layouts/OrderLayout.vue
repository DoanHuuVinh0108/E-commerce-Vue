<template>
  <a-layout>
    <a-layout-header>
      <TheHeader />
    </a-layout-header>
    <a-layout-content style="background: #f5f5f5">
      <a-layout style="background: #f5f5f5; height: 100%">
        <a-layout-sider width="300" style="background: #f5f5f5">
          <a-menu v-model:selectedKeys="selectedKeys">
            <a-menu-item key="1">
              <user-outlined />
              <span class="nav-text">Profile</span>
            </a-menu-item>
            <a-menu-item key="2">
              <video-camera-outlined />
              <span class="nav-text">Đơn hàng</span>
            </a-menu-item>
            <a-menu-item key="3">
              <shop-outlined />
              <span class="nav-text">logout</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content
          v-if="ordersData.length > 0"
          :style="{ padding: '0 24px', minHeight: '280px' }"
        >
          <div style="padding: 10px; font-size: px">
            <a-typography-text strong>Đơn Hàng Đã Mua</a-typography-text>
          </div>
          <div
            style="background-color: white; padding: 10px; margin-bottom: 10px"
            v-for="order in ordersData"
            :key="order.Orderid"
          >
            <div style="display: flex; justify-content: space-between">
              <a-typography-text style="padding: 10px" strong
                >Đơn Hàng:{{ order.Orderid }}
              </a-typography-text>
              <a-typography-text style="padding: 10px" strong
                >Ngày Giao Hàng Dự Kiến: {{ order.Ngaygiaohang ? order.Ngaygiaohang : 'NULL' }}
              </a-typography-text>
              <a-typography-text style="padding: 10px">{{ order.Trangthai }}</a-typography-text>
            </div>
            <a-divider />
            <div
              v-for="detail in order.Detailorders"
              :key="detail.index"
              style="display: inline; width: 100%"
            >
              <div style="display: flex">
                <a-image :width="100" :height="120" :src="detail.info.Images.Url"></a-image>
                <div style="display: flex">
                  <a-typography>
                    <a-typography-title :level="3">
                      <a-typography-text strong>{{ detail.info.Tensanpham }}</a-typography-text>
                    </a-typography-title>

                    <a-typography-text type="danger">{{
                      formatPrice(detail.Giasanpham)
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
                        {{ detail.Soluong }}
                      </div>
                    </div>
                  </a-typography>
                </div>
              </div>

              <a-divider />
            </div>

            <div style="display: inline-block">
              <label style="padding-right: 10px">Total: </label>
              <!-- Calculate total price for the order -->
              <a-typography-text type="danger">{{
                formatPrice(calculateTotal(order))
              }}</a-typography-text>
            </div>
          </div>
        </a-layout-content>
        <a-layout-content v-else>
          <div
            style="min-height: 400px; display: flex; justify-content: center; align-items: center"
          >
            <a-empty
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              :image-style="{
                height: '60px'
              }"
            >
              <template #description>
                <span> Không có đơn hàng nào </span>
              </template>
            </a-empty>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>

    <a-layout-footer style="text-align: center; padding: 0px 0px">
      <FooterComponent />
    </a-layout-footer>
  </a-layout>
</template>
<script>
import TheHeader from '@/components/TheHeader.vue'
import { getOrdersByUser, getNameAndImageProduct } from '@/sevices/user.service'
import { userLoginStore } from '@/stores/index'
import FooterComponent from '@/components/Footer.vue'
export default {
  components: {
    TheHeader,
    FooterComponent
  },
  data() {
    return {
      ordersData: []
    }
  },
  methods: {
    async getOrder() {
      try {
        const { user } = userLoginStore()
        const userId = user._Userid
        const response = await getOrdersByUser(userId)
        console.log(response)
        this.ordersData = response.data
        console.log(this.ordersData)
      } catch (error) {
        console.log(error)
      }
    },
    async getDetail(order) {
      try {
        order.Detailorders.map(async (item) => {
          const response = await getNameAndImageProduct(item.Productid)
          item.info = response.data
        })
      } catch (error) {
        console.log(error)
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
    calculateTotal(order) {
      // Initialize total price
      let totalPrice = 0
      console.log(order)

      // Iterate through detail orders to calculate total price
      order.Detailorders.forEach((detail) => {
        // Add price of each item to the total
        totalPrice += detail.Giasanpham * detail.Soluong
      })

      // Return the total price
      return totalPrice
    }
  },
  async created() {
    await this.getOrder()
    this.ordersData.forEach(async (order) => {
      await this.getDetail(order)
    })
  },
  computed: {}
}
</script>
<style scoped>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #f5f5f5;
}
</style>
