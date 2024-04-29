<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1" @click="getAllUser()">
          <user-outlined />
          <span class="nav-text">User Table</span>
        </a-menu-item>
        <a-menu-item key="2" @click="getAllProduct()">
          <video-camera-outlined />
          <span class="nav-text">Product Table</span>
        </a-menu-item>
        <a-menu-item key="3" @click="getAllOrder()">
          <upload-outlined />
          <span class="nav-text">Order Table</span>
        </a-menu-item>
        <a-menu-item key="4">
          <bar-chart-outlined />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
        <a-menu-item key="5">
          <cloud-outlined />
          <span class="nav-text">nav 5</span>
        </a-menu-item>
        <a-menu-item key="6">
          <appstore-outlined />
          <span class="nav-text">nav 6</span>
        </a-menu-item>
        <a-menu-item key="7">
          <team-outlined />
          <span class="nav-text">nav 7</span>
        </a-menu-item>
        <a-menu-item key="8">
          <shop-outlined />
          <span class="nav-text">logout</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <UserTable @refreshUser="getAllUser" :userData="userData" v-if="selectedKeys == 1" />
          <ProductTable
            :productData="productData"
            @refreshProduct="getAllProduct"
            v-if="selectedKeys == 2"
          />
          <OrderTable
            :OrdersData="orderData"
            @refreshOrders="getAllOrder"
            v-if="selectedKeys == 3"
          />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center; padding: 0px 0px">
        <FooterComponent />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { ref } from 'vue'
import UserTable from '@/components/UserTable.vue'
import ProductTable from '@/components/ProductTable.vue'
import OrderTable from '@/components/OrderTable.vue'
import { getAllUser, getAllProduct } from '../sevices/admin.service'
import { getAllOrders } from '../sevices/user.service'
import { userLoginStore } from '@/stores'
import FooterComponent from '@/components/Footer.vue'
export default {
  components: {
    UserTable,
    ProductTable,
    OrderTable,
    FooterComponent
  },
  data() {
    return {
      userData: [],
      productData: [],
      orderData: [],
      selectedKeys: ref(['1'])
    }
  },
  created() {
    this.getAllUser()
  },
  methods: {
    async getAllUser() {
      let res = await getAllUser()
      this.userData = res.data
    },
    async getAllProduct() {
      let res = await getAllProduct()
      this.productData = res.data
    },
    async getAllOrder() {
      let res = await getAllOrders()
      this.orderData = res.data
    }
  },
  watch: {
    selectedKeys(newValue) {
      if (newValue == 8) {
        const { logout } = userLoginStore()
        logout()
        this.$router.push('/') // Navigate to login page after logout
      }
    }
  }
}
</script>
<style scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
