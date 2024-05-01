<template>
  <a-layout>
    <TheHeader @searchHandle="searchProduct"></TheHeader>
    <a-layout>
      <a-layout-sider class="siderStyle">
        <h2>Tìm kiếm nâng cao</h2>
        <a-form>
          <a-radio-group v-model:value="formState.categoryid">
            <a-radio
              v-for="category in CategoryData"
              :key="category.Categoryid"
              :value="category.Categoryid"
              :style="{ marginBottom: '10px' }"
              style="width: 100%; padding-left: 10px"
            >
              {{ category.Tenloai.toUpperCase() }}
            </a-radio>
          </a-radio-group>
          <a-slider
            style="margin: 20px"
            v-model:value="priceRange"
            :tip-formatter="formatter"
            range
          />
          <a-button @click="searchHandle" type="primary" style="margin: 20px">Tìm kiếm</a-button>
        </a-form>
      </a-layout-sider>
      <a-layout-content class="contentStyle">
        <div :style="{ background: '#fff', padding: '24px', minHeight: '380px', margin: '12px' }">
          <!--  -->
          <Card_Product :products="productData" :colCard="8" />
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-footer :style="{ textAlign: 'center' }" style="padding: 0px 0px" align="flex-end">
      <FooterComponent />
    </a-layout-footer>
  </a-layout>
</template>
<script>
import TheHeader from '../components/TheHeader.vue'
import FooterComponent from '@/components/Footer.vue'
import { getAllCategory } from '@/sevices/admin.service'
import { searchByCategory, searchByPrice, searchByCategoryAndPrice } from '@/sevices/user.service'
import { reactive } from 'vue'
import Card_Product from '@/components/Card_Product.vue'

export default {
  components: {
    TheHeader,
    Card_Product,
    FooterComponent
  },
  data() {
    return {
      formState: reactive({
        categoryid: ''
      }),
      CategoryData: reactive([]),
      radioStyle: reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px'
      }),
      priceRange: reactive(['', '']),
      formatter: (value) => {
        return `${value} Triệu VND`
      },
      productData: []
    }
  },
  methods: {
    async fetchCategory() {
      const res = await getAllCategory()
      this.CategoryData = res.data
      console.log(this.CategoryData)
    },

    async searchHandle() {
      const { categoryid } = this.formState
      const [minPrice, maxPrice] = this.priceRange
      console
      if (categoryid && (minPrice || maxPrice)) {
        // If both category and price range are selected, search by category and price
        await this.getProductByCategoryAndPrice(categoryid, minPrice, maxPrice)
      } else if (categoryid) {
        // If only category is selected, search by category
        await this.getProductByCategory(categoryid)
      } else if (minPrice || maxPrice) {
        // If only price range is selected, search by price

        await this.getProductByPrice(minPrice, maxPrice)
      } else {
        // If neither category nor price range is selected, handle as per your requirement
        // For example, you can show a message to the user to select at least one filter
      }
    },
    async getProductByPrice(min, max) {
      const res = await searchByPrice(min, max)
      this.productData = res.data
    },
    async getProductByCategory(categoryid) {
      const res = await searchByCategory(categoryid)
      this.productData = res.data
    },
    async getProductByCategoryAndPrice(categoryid, min, max) {
      const res = await searchByCategoryAndPrice(categoryid, min, max)
      this.productData = res.data
    }
  },
  created() {
    this.fetchCategory()
  }
}
</script>

<style scoped>
/* Your scoped styles */
.contentStyle {
  text-align: center;
}

.siderStyle {
  text-align: center;
  min-height: 400px;
  color: black;
  background-color: #fff;
}
</style>
