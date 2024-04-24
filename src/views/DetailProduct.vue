<template>
  <div>
    <DetailProductComponent :Productid="this.Productid" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import DetailProductComponent from '../Layouts/DetailProduct.vue'
export default {
  setup() {
    const $route = useRoute()
    const Productid = $route.params.id
    console.log('Productid', Productid)
    return { Productid }
  },
  components: {
    DetailProductComponent
  }
}
</script>
