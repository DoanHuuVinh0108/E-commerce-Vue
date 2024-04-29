<template>
  <div>
    <a-button type="primary" @click="showModal">Add User<PlusCircleOutlined /></a-button>
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
        <a-form-item label="Categories ID" name="CategoriesId" ref="CategoriesId">
          <a-input v-model:value="formState.Categoryid" disabled> </a-input>
        </a-form-item>

        <a-form-item label="Tên Loại" name="Tenloai" ref="Tenloai">
          <a-input v-model:value="formState.Tenloai"> </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { createCategory } from '@/sevices/admin.service.js'
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

    const handleOk = async () => {
      if (!formRef.value) return
      loading.value = true

      try {
        // Validate specific fields if necessary
        await formRef.value.validate()
        // After successful validation, make the API call
        await createCategory(formState)
        // Reset the form after successful submission
        formRef.value.resetFields()
        // Emit an event to notify the parent component
        emit('CategoryCreated')
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
      Categoryid: '',
      Tenloai: ''
    })

    const rules = {
      Tenloai: [
        {
          required: true,
          message: 'Please input category name!',
          trigger: 'blur'
        }
      ],
      Categoryid: [
        {
          required: true,
          message: 'Please input category id!',
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
      wrapperCol
    }
  },
  components: {
    PlusCircleOutlined
  },
  created() {}
})
</script>
