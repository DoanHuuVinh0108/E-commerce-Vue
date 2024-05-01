<template>
  <a-layout>
    <TheHeader />

    <a-layout-content>
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-row :gutter="[16, 8]">
        <a-col :span="12">
          <a-carousel arrows>
            <template #prevArrow>
              <div class="custom-slick-arrow" style="left: 10px">
                <left-circle-outlined />
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow" style="right: 10px">
                <right-circle-outlined />
              </div>
            </template>

            <a-image-preview-group v-for="image in images" :key="image.Productid">
              <!-- Use v-if to start from the second image -->
              <a-image :height="400" :src="image.Url" />
            </a-image-preview-group>
          </a-carousel>
          <a-divider style="height: 2px; background-color: #7cb305" />
          <div class="product-description">
            <h2>Mô tả sản phẩm</h2>
            <p>{{ productData.Mota }}</p>
          </div>
        </a-col>
        <a-col :span="12" style="background-color: #fff">
          <h1>{{ productData.Tensanpham }}</h1>
          <h2 style="color: red">{{ formatPrice(productData.Giasanpham) }}</h2>
          <br />
          <div>
            <a-row style="margin: 20px">
              <!-- 1 -->
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="16"
                :push="8"
                >{{ productData.Manhinh }}</a-col
              >
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="8"
                :pull="16"
                >{{ columns[0].title }}:</a-col
              >
              <!-- 2 -->
              <a-col style="font-size: 18px; padding: 10px" :span="16" :push="8">{{
                productData.Hedieuhanh
              }}</a-col>
              <a-col style="font-size: 18px; padding: 10px" :span="8" :pull="16"
                >{{ columns[1].title }}:</a-col
              >
              <!-- 3 -->
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="16"
                :push="8"
                >{{ productData.Camerasau }}</a-col
              >
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="8"
                :pull="16"
                >{{ columns[2].title }}:</a-col
              >
              <!-- 4 -->
              <a-col style="font-size: 18px; padding: 10px" :span="16" :push="8">{{
                productData.Cameratruoc
              }}</a-col>
              <a-col style="font-size: 18px; padding: 10px" :span="8" :pull="16"
                >{{ columns[3].title }}:</a-col
              >
              <!-- 5 -->
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="16"
                :push="8"
                >{{ productData.Chip }}</a-col
              >
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="8"
                :pull="16"
                >{{ columns[4].title }}:</a-col
              >
              <!-- 6 -->
              <a-col style="font-size: 18px; padding: 10px" :span="16" :push="8">{{
                productData.Ram
              }}</a-col>
              <a-col style="font-size: 18px; padding: 10px" :span="8" :pull="16"
                >{{ columns[5].title }}:</a-col
              >
              <!-- 7 -->
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="16"
                :push="8"
                >{{ productData.Dungluongluutru }}</a-col
              >
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="8"
                :pull="16"
                >{{ columns[6].title }}:</a-col
              >
              <!-- 8 -->
              <a-col style="font-size: 18px; padding: 10px" :span="16" :push="8">{{
                productData.Sim
              }}</a-col>
              <a-col style="font-size: 18px; padding: 10px" :span="8" :pull="16"
                >{{ columns[7].title }}:</a-col
              >
              <!-- 9 -->
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="16"
                :push="8"
                >{{ productData.Pinvasac }}</a-col
              >
              <a-col
                style="background-color: #f5f5f5; font-size: 18px; padding: 10px"
                :span="8"
                :pull="16"
                >{{ columns[8].title }}:</a-col
              >
            </a-row>
          </div>
          <div class="mua-ngay-button">
            <a-button type="primary" @click="this.addProducToCart()">Thêm Vào Giỏ Hàng</a-button>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer style="text-align: center; padding: 0px 0px">
      <FooterComponent />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
import { getImageByProductId, getProductById } from '@/sevices/admin.service.js'
import { cartStore } from '@/stores/index.js'
import FooterComponent from '@/components/Footer.vue'
import { POSITION, useToast } from 'vue-toastification'
export default {
  components: {
    TheHeader,
    LeftCircleOutlined,
    RightCircleOutlined,
    FooterComponent
  },
  props: {
    Productid: Number
  },
  data() {
    return {
      productData: [],
      images: [],
      columns: [
        {
          title: 'Màn hình'
        },
        {
          title: 'Hệ điều hành'
        },
        {
          title: 'Camera sau'
        },
        {
          title: 'Camera trước'
        },
        {
          title: 'Chip'
        },
        {
          title: 'RAM'
        },
        {
          title: 'Dung lượng lưu trữ'
        },
        {
          title: 'SIM'
        },
        {
          title: 'Pin, Sạc'
        }
      ],
      firstImage: ''
    }
  },
  methods: {
    async fetchProductById(id) {
      try {
        const response = await getProductById(id)
        this.productData = response.data
        console.log('response', response)
      } catch (error) {
        console.log('Failed to fetch product:', error)
      }
    },

    async fetchImageByProductid(id) {
      try {
        const response = await getImageByProductId(id)
        this.images = response.data
        this.firstImage = this.images[0].Url
        this.images.shift()
        console.log('response', response)
      } catch (error) {
        console.log('Failed to fetch image:', error)
      }
    },

    formatPrice(price) {
      // Convert the price string to a number
      // const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ''))
      // Format the number with comma as thousand separator and add currency symbol
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },

    addProducToCart() {
      const { addToCart } = cartStore()
      addToCart({
        Productid: this.productData.Productid,
        Soluong: 1,
        Giasanpham: this.productData.Giasanpham,
        Tensanpham: this.productData.Tensanpham,
        image: this.firstImage
      })
      const toast = useToast()
      toast('Thêm vào giỏ hàng thành công', {
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
  },
  created() {
    console.log('Productid', this.Productid)
    this.fetchProductById(this.Productid)
    this.fetchImageByProductid(this.Productid)
  }
}
</script>

<style scoped>
/* For demo */

:deep(.slick-slide) {
  text-align: center;
  height: 400px;
  line-height: 400px;
  background: #fff;
  overflow: hidden;
  position: relative;
}

.mua-ngay-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 35px;
  height: 35px;
  font-size: 35px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
