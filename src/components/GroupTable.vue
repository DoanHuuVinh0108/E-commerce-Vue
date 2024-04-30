<template>
  <a-flex style="margin-bottom: 20px">
    <CreateGroup @GroupCreated="refresh()" />
    <a-button @click="refresh" style="margin-left: 20px" type="primary">Refresh</a-button>
  </a-flex>

  <a-table :columns="columns" :data-source="GroupData">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.key === 'operation'">
        <DeleteComponent :id="record.Groupid" @deleted="DeleteGroup" />
        <UpdateGroup :id="record.Groupid" @UpdateCreated="refresh" />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
</template>

<script>
import CreateGroup from '@/components/Modals/CreateGroup.vue'
import DeleteComponent from '@/components/DeleteButton.vue'
import UpdateGroup from '@/components/Modals/UpdateGroup.vue'
import { deleteGroup } from '@/sevices/admin.service.js'
export default {
  name: 'CategoryTable',
  components: {
    DeleteComponent,
    CreateGroup,
    UpdateGroup
  },
  props: {
    GroupData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      columns: [
        {
          title: 'Group Id',
          width: 100,
          dataIndex: 'Groupid',
          key: 'Groupid'
        },
        {
          title: 'Tên Nhóm',
          width: 100,
          dataIndex: 'Tennhom',
          key: 'Tennhom'
        },
        {
          title: 'Description',
          width: 100,
          dataIndex: 'Description',
          key: 'Description'
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
      this.$emit('refreshGroup')
    },
    async DeleteGroup(id) {
      await deleteGroup(id)
      this.refresh()
    }
  }
}
</script>
