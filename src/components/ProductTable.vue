<template>
  <a-flex :align="start" style="margin-bottom: 20px">
    <CreateProduct justify="flex-start" @createdProduct="refresh" />
    <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
  </a-flex>

  <a-table :columns="columns" :data-source="productData" :scroll="{ x: 1500, y: 300 }">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.key === 'operation'">
        <DeleteButton :id="record.Productid" @deleted="deleteUser" />
        <UpdateProduct :id="record.Productid" @updated="refresh" />
        <ImageModel :id="record.Productid" />
      </template>
      <template v-else-if="column.key === 'Tennhom'">
        <a-tag :color="text === 'user' ? 'geekblue' : text === 'admin' ? 'volcano' : ''">{{
          text.toUpperCase()
        }}</a-tag>
      </template>
      <template v-else-if="column.key === 'Mota'">
        <a-typography-paragraph
          :ellipsis="ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false"
          :content="text"
        />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
</template>

<script>
import DeleteButton from './DeleteButton.vue'
import { deleteProduct } from '../sevices/admin.service'
import CreateProduct from './Modals/CreateProduct.vue'
import UpdateProduct from './Modals/UpdateProduct.vue'
import ImageModel from './Modals/ImageModel.vue'
import { ref } from 'vue'

export default {
  name: 'UserTable',
  components: {
    DeleteButton,
    CreateProduct,
    UpdateProduct,
    ImageModel
  },
  props: {
    productData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      columns: [
        {
          title: 'Product ID',
          width: 100,
          dataIndex: 'Productid',
          key: 'Productid',
          fixed: 'left'
        },
        {
          title: 'Name',
          width: 100,
          dataIndex: 'Tensanpham',
          key: 'Tensanpham'
          // fixed: 'left'
        },
        {
          title: 'Giá Sản Phẩm',
          dataIndex: 'Giasanpham',
          key: 'Giasanpham',
          width: 150
        },
        {
          title: 'Số Lượng',
          dataIndex: 'Soluong',
          key: 'Soluong',
          width: 150
        },
        {
          title: 'Mô Tả Sản Phẩm',
          dataIndex: 'Mota',
          key: 'Mota',
          width: 150
        },
        {
          title: 'Loại Sản Phẩm',
          dataIndex: 'Category.Tenloai',
          key: 'Tenloai',
          width: 150
        },
        {
          title: 'Màn Hình',
          dataIndex: 'Manhinh',
          key: 'Manhinh',
          width: 150
        },
        {
          title: 'Hệ Điều Hành',
          dataIndex: 'Hedieuhanh',
          key: 'Hedieuhanh',
          width: 150
        },
        {
          title: 'Camera Trước',
          dataIndex: 'Cameratruoc',
          key: 'Cameratruoc',
          width: 150
        },
        {
          title: 'Camera Sau',
          dataIndex: 'Camerasau',
          key: 'Camerasau',
          width: 150
        },
        {
          title: 'Chip',
          dataIndex: 'Chip',
          key: 'Chip',
          width: 150
        },
        {
          title: 'RAM',
          dataIndex: 'Ram',
          key: 'Ram',
          width: 150
        },
        {
          title: 'Dung lượng Lưu Trữ',
          dataIndex: 'Dungluongluutru',
          key: 'Dungluongluutru',
          width: 150
        },

        {
          title: 'Sim',
          dataIndex: 'Sim',
          key: 'Sim',
          width: 150
        },
        {
          title: 'Pin và Sạc',
          dataIndex: 'Pinvasac',
          key: 'Pinvasac',
          width: 150
        },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100
        }
      ],
      ellipsis: ref(true)
    }
  },
  methods: {
    async deleteUser(id) {
      await deleteProduct(id)
      console.log('Deleted product', id)
      this.refresh()
    },
    refresh() {
      this.$emit('refreshProduct')
    }
  }
}
</script>
