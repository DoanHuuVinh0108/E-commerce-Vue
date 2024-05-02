<template>
  <a-layout-header
    :style="{
      position: 'asolute',
      zIndex: 1,
      width: '100%',
      display: 'flex'
    }"
  >
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
      style="float: left; display: flex; justify-content: flex-start; width: 30%"
    >
      <a-menu-item key="1"><RouterLink to="/">Home</RouterLink></a-menu-item>
      <a-menu-item key="3"><RouterLink to="/search">Search Page</RouterLink></a-menu-item>
    </a-menu>
    <div
      style="display: flex; justify-content: center; align-items: center; background-color: #001529"
    >
      <a-input-search placeholder="input search text" enter-button @search="onSearch" />
    </div>
    <a-menu
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
      style="float: right; display: flex; justify-content: flex-end; width: 60%"
    >
      <a-menu-item>
        <RouterLink to="/cart">
          <Badge :count="1">
            <ShoppingCartOutlined />
          </Badge>
        </RouterLink>
      </a-menu-item>
      <a-menu-item key="3" v-if="!user._Userid">
        <RouterLink to="/login">Login</RouterLink>
      </a-menu-item>
      <a-menu-item v-else>
        <div class="demo-dropdown-wrap">
          <a-dropdown>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1">
                  <UserOutlined />
                  profile
                </a-menu-item>
                <a-menu-item key="2">
                  <LogoutOutlined />
                  logout
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              <UserOutlined />
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
      </a-menu-item>
    </a-menu>
  </a-layout-header>

  <RouterView />
</template>

<script>
import {
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons-vue'
import { userLoginStore } from '../stores/index.js'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup(props, { emit }) {
    const user = ref({})
    const router = useRouter()

    const handleMenuClick = (e) => {
      const { logout } = userLoginStore()
      if (e.key == 1) {
        router.push('/order')
      }
      if (e.key == 2) {
        logout()
        router.push('/') // Navigate to login page after logout
      }
    }

    const onSearch = async (searchValue) => {
      console.log('use value', searchValue)
      emit('searchHandle', searchValue)
    }

    const updateUser = () => {
      const { user: updatedUser } = userLoginStore()
      user.value = updatedUser
    }

    watch(updateUser)

    return { user, handleMenuClick, onSearch }
  },
  components: {
    UserOutlined,
    DownOutlined,
    LogoutOutlined,
    ShoppingCartOutlined
  }
}
</script>

<style scoped>
.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
