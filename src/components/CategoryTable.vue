<template>
  <a-flex style="margin-bottom: 20px">
    <CreateCategory @CategoryCreated="refresh()" />
    <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
  </a-flex>

  <a-table :columns="columns" :data-source="CategoryData">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.key === 'operation'">
        <DeleteComponent :id="record.Categoryid" @deleted="DeleteCategory" />
        <UpdateCategory :id="record.Categoryid" @CategoryCreated="refresh" />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
</template>

<script>
import CreateCategory from '@/components/Modals/CreateCategory.vue'
import DeleteComponent from '@/components/DeleteButton.vue'
import UpdateCategory from '@/components/Modals/UpdateCategory.vue'
import { deleteCategory } from '@/sevices/admin.service.js'
export default {
  name: 'CategoryTable',
  components: {
    CreateCategory,
    DeleteComponent,
    UpdateCategory
  },
  props: {
    CategoryData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      columns: [
        {
          title: 'Categories Id',
          width: 100,
          dataIndex: 'Categoryid',
          key: 'Categoryid'
        },
        {
          title: 'Tên Loại',
          width: 100,
          dataIndex: 'Tenloai',
          key: 'Tenloai'
        },
        {
          title: 'Action',
          key: 'operation',
          width: 100
        }
      ]
    }
  },
  methods: {
    refresh() {
      this.$emit('refreshCategory')
    },
    async DeleteCategory(id) {
      await deleteCategory(id)
      this.refresh()
    }
  }
}
</script>
