<template>
  <a-flex :align="start" style="margin-bottom: 20px">
    <ModalCreateUser justify="flex-start" @userCreated="refresh" />
    <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
  </a-flex>

  <a-table :columns="columns" :data-source="userData" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.key === 'operation'">
        <DeleteButton :id="record.Userid" @deleted="deleteUser" />
        <UpdateUser :id="record.Userid" @updated="refresh" />
      </template>
      <template v-else-if="column.key === 'Tennhom'">
        <a-tag :color="text === 'user' ? 'geekblue' : text === 'admin' ? 'volcano' : ''">{{
          text.toUpperCase()
        }}</a-tag>
      </template>
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
</template>

<script>
import DeleteButton from './DeleteButton.vue'
import { deleteUser } from '../sevices/admin.service'
import ModalCreateUser from './Modals/CreateUser.vue'
import UpdateUser from './Modals/UpdateUser.vue'
export default {
  name: 'UserTable',
  components: {
    DeleteButton,
    ModalCreateUser,
    UpdateUser
  },
  props: {
    userData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      columns: [
        {
          title: 'User ID',
          width: 100,
          dataIndex: 'Userid',
          key: 'Userid',
          fixed: 'left'
        },
        {
          title: 'Full Name',
          width: 100,
          dataIndex: 'Hoten',
          key: 'Hoten'
          // fixed: 'left'
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'Email',
          width: 150
        },
        {
          title: 'Phone Number',
          dataIndex: 'Sodienthoai',
          key: 'Sodienthoai',
          width: 150
        },
        {
          title: 'Address',
          dataIndex: 'Diachi',
          key: 'Diachi',
          width: 150
        },
        {
          title: 'Group Name',
          dataIndex: 'Group.Tennhom',
          key: 'Tennhom',
          width: 150
        },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100
        }
      ]
    }
  },
  methods: {
    async deleteUser(id) {
      await deleteUser(id)
      this.refresh()
    },
    refresh() {
      this.$emit('refreshUser')
    }
  }
}
</script>
