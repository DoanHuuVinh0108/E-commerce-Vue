<template>
  <a-layout>
    <TheHeader @searchHandle="searchProduct"></TheHeader>
    <!-- <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }"> -->
    <a-layout-content>
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <!--  -->
        <Card_Product :products="productData" />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import Card_Product from '@/components/Card_Product.vue'
import { getListProduct } from '@/sevices/admin.service'
import { searchProduct } from '@/sevices/user.service'

export default {
  components: {
    TheHeader,
    Card_Product
  },
  data() {
    return {
      productData: []
    }
  },
  methods: {
    async fetchListProduct() {
      const offset = 0
      const res = await getListProduct(offset)
      this.productData = res.data
    },
    async searchProduct(searchValue) {
      const res = await searchProduct(searchValue)
      this.productData = res.data
      console.log('this.productData', this.productData)
      console.log('response', res.data)
    }
  },
  created() {
    this.fetchListProduct()
  }
}
</script>

<style scoped>
/* Your scoped styles */
</style>
