<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1"><RouterLink to="/">Home</RouterLink></a-menu-item>
      <a-menu-item key="2"><RouterLink to="/about">About</RouterLink></a-menu-item>
      <a-menu-item key="3"><RouterLink to="/login">Login</RouterLink></a-menu-item>
    </a-menu>
  </a-layout-header>

  <RouterView />
</template>

<script></script>
