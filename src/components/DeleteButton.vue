<template>
  <a-popconfirm title="Are you sure？" @confirm="confirm">
    <template #icon><question-circle-outlined style="color: red" /></template>
    <a>Delete</a>
  </a-popconfirm>
</template>
<script>
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
export default {
  components: { QuestionCircleOutlined },
  props: ['id'],
  methods: {
    confirm() {
      this.$emit('deleted', this.id)
    }
  }
}
</script>
