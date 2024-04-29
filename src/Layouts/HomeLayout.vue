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
        <a-pagination v-model:current="current" :total="this.Total" :pageSize="12" />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }" style="padding: 0px 0px">
      <FooterComponent />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import Card_Product from '@/components/Card_Product.vue'
import { getListProduct, getCountProduct } from '@/sevices/admin.service'
import { searchProduct } from '@/sevices/user.service'
import FooterComponent from '@/components/Footer.vue'
import { ref } from 'vue'
export default {
  components: {
    TheHeader,
    Card_Product,
    FooterComponent
  },
  data() {
    return {
      productData: [],
      current: 1,
      Total: ref(0)
    }
  },
  methods: {
    async fetchListProduct() {
      const offset = (this.current - 1) * 12
      const res = await getListProduct(offset)
      this.productData = res.data
      console.log('current', this.current)
      console.log('this.productData', this.productData)
    },
    async searchProduct(searchValue) {
      const res = await searchProduct(searchValue)
      this.productData = res.data
      this.Total = res.data.length
      console.log('this.productData', this.productData)
      console.log('response', res.data)
    },
    async totalProduct() {
      const res = await getCountProduct()
      console.log('res', res.data)
      this.Total = res.data
    }
  },
  created() {
    this.fetchListProduct()
    this.totalProduct()
  },
  watch: {
    current(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchListProduct()
      }
    }
  }
}
</script>

<style scoped>
/* Your scoped styles */
</style>
