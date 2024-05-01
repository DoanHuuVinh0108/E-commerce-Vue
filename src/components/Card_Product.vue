<template>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="[16, 16]">
      <a-col :span="colCard" v-for="product in products" :key="product.Productid">
        <a-card
          hoverable
          style="
            width: 280px;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <a-image-preview-group justify="center">
            <a-image :width="200" :height="200" :src="product.Images.Url" />
          </a-image-preview-group>
          <div>
            <router-link
              :to="{ name: 'product', params: { id: product.Productid } }"
              style="color: black"
              class="sanpham"
              >{{ product.Tensanpham }}</router-link
            >
            <p style="color: #f5222d">{{ formatPrice(product.Giasanpham) }}</p>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    },
    colCard: {
      type: Number,
      default: 6
    }
  },
  methods: {
    formatPrice(price) {
      // Convert the price string to a number
      // const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ''))
      // Format the number with comma as thousand separator and add currency symbol
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    }
  }
}
</script>

<style scoped>
.product-name {
  position: absolute;
  bottom: 40px;
}

.product-price {
  position: absolute;
  bottom: 0px;
}

a {
  font-size: 16px;
}

p {
  font-size: 16px;
}

.sanpham:hover {
  color: rgb(56, 56, 227);
}
</style>
