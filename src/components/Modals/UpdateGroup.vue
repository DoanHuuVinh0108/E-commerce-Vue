<template>
  <div>
    <a type="primary" @click="showModal">Edit</a>
    <a-modal v-model:open="visible" title="Title" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <a-form
        layout="horizontal"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        name="register"
        ref="formRef"
        class="register-form"
        :rules="rules"
      >
        <a-form-item label="Tên Nhóm" name="Tennhom" ref="Tennhom">
          <a-input v-model:value="formState.Tennhom"> </a-input>
        </a-form-item>

        <a-form-item label="Description" name="Description" ref="Description">
          <a-input v-model:value="formState.Description"> </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
import { updateGroup, getGroupById } from '@/sevices/admin.service.js'
export default defineComponent({
  setup(props, { emit }) {
    const loading = ref(false)
    const visible = ref(false)
    // groupsData.value = getAllGroup()
    // console.log('groupsData', groupsData)
    const formRef = ref(null) // Define ref here for the form

    const showModal = async () => {
      visible.value = true
    }

    const fetchGroupById = async () => {
      const group = await getGroupById(props.id)
      formState.Tennhom = group.data.Tennhom
      formState.Description = group.data.Description
    }

    const handleOk = async () => {
      if (!formRef.value) return
      loading.value = true

      try {
        // Validate specific fields if necessary
        await formRef.value.validate()
        // After successful validation, make the API call
        await updateGroup(props.id, formState)
        // Reset the form after successful submission
        formRef.value.resetFields()
        // Emit an event to notify the parent component
        emit('UpdateCreated')
      } catch (error) {
        console.log('Validation/API call error', error)
      } finally {
        loading.value = false
        visible.value = false
      }
    }

    const handleCancel = () => {
      visible.value = false
    }

    const formState = reactive({
      Tennhom: '',
      Description: ''
    })

    const rules = {
      TenNhom: [
        {
          required: true,
          message: 'Please input your group name!',
          trigger: 'blur'
        }
      ],
      Description: [
        {
          required: true,
          message: 'Please input your group description!',
          trigger: 'blur'
        }
      ]
    }
    const labelCol = {
      style: {
        width: '150px'
      }
    }
    const wrapperCol = {
      span: 14
    }
    return {
      loading,
      visible,
      showModal,
      handleOk,
      handleCancel,
      formRef, // make sure to return it
      formState,
      rules,
      labelCol,
      wrapperCol,
      fetchGroupById
    }
  },
  components: {},
  created() {
    this.fetchGroupById()
  },
  props: ['id']
})
</script>
