<template>
  <TheHeader />
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
export default {
  components: {
    TheHeader
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
