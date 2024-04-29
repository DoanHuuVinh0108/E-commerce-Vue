<template>
  <a-flex :align="start" style="margin-bottom: 20px">
    <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
  </a-flex>

  <a-table :columns="columns" :data-source="OrdersData" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.key === 'operation'">
        <UpdateOrder :id="record.Orderid" @updated="refresh" />
      </template>
      <template v-else-if="column.key === 'Trangthai'">
        <a-tag
          :color="
            text === 'Chờ xác nhận'
              ? 'warning'
              : text === 'Đang Giao Hàng'
                ? 'blue'
                : text === 'Đã Nhận Hàng'
                  ? 'green'
                  : text === 'Đã Hủy'
                    ? 'error'
                    : ''
          "
          >{{ text.toUpperCase() }}</a-tag
        >
      </template>
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
</template>

<script>
import UpdateOrder from '@/components/Modals/UpdateOrder.vue'
export default {
  name: 'UserTable',
  components: {
    UpdateOrder
  },
  props: {
    OrdersData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      columns: [
        {
          title: 'Order ID',
          width: 100,
          dataIndex: 'Orderid',
          key: 'Orderid',
          fixed: 'left'
        },
        {
          title: 'User ID',
          width: 100,
          dataIndex: 'Userid',
          key: 'Userid'
          // fixed: 'left'
        },
        {
          title: 'Ngày Đặt Hàng',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 150
        },
        {
          title: 'Ngày Giao Hàng',
          dataIndex: 'Ngaygiaohang',
          key: 'Ngaygiaohang',
          width: 150
        },
        {
          title: 'Trạng Thái',
          dataIndex: 'Trangthai',
          key: 'Trangthai',
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
    refresh() {
      this.$emit('refreshOrders')
    }
  }
}
</script>
