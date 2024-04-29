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
        <a-form-item label="Order ID" name="Orderid" ref="Orderid">
          <a-input v-model:value="formState.Orderid" disabled />
        </a-form-item>

        <a-form-item label="Ngày Giao Hàng" name="Ngaygiaohang" ref="Ngaygiaohang">
          <a-date-picker v-model:value="formState.Ngaygiaohang" />
        </a-form-item>

        <a-form-item label="Trạng Thái" name="Trangthai" ref="Trangthai">
          <a-select v-model:value="formState.Trangthai">
            <a-select-option value="Đang Giao Hàng">Đang Giao Hàng</a-select-option>
            <a-select-option value="Đã Nhận Hàng">Đã Nhận Hàng</a-select-option>
            <a-select-option value="Đã Hủy">Đã Hủy</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
import { getOrdersById, updateOrder } from '../../sevices/admin.service.js'
import { DatePicker } from 'ant-design-vue'
import dayjs from 'dayjs'
export default defineComponent({
  components: {
    ADatePicker: DatePicker
  },
  setup(props, { emit }) {
    const loading = ref(false)
    const visible = ref(false)
    const DateValidate = ref('')
    const formRef = ref(null) // Define ref here for the form

    const formState = reactive({
      Orderid: '',
      Ngaygiaohang: '',
      Trangthai: ''
    })

    const fetchOrder = async () => {
      if (!props.id) return
      const response = await getOrdersById(props.id)
      formState.Orderid = response.data.Orderid
      formState.Trangthai = response.data.Trangthai
      formState.Ngaygiaohang = dayjs(response.data.Ngaygiaohang)
    }

    const updatedOrder = async (id, data) => {
      try {
        const res = await updateOrder(id, data)
        console.log('Order updated successfully!', res)
      } catch (error) {
        console.log('Error updating order', error)
      }
    }

    const showModal = async () => {
      visible.value = true
      await fetchOrder()
    }

    const handleOk = async () => {
      if (!formRef.value) return
      loading.value = true

      try {
        // Validate specific fields if necessary
        await formRef.value.validate()
        // After successful validation, make the API call
        console.log('formState', formState)
        await updateOrder(props.id, formState)
        // Reset the form after successful submission
        formRef.value.resetFields()
        // Emit an event to the parent component
        // to notify that the user has been updated
        emit('updated')
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

    const rules = {
      Ngaygiaohang: [{ required: true, message: 'Ngày giao hàng không được để trống' }],
      Trangthai: [{ required: true, message: 'Trạng thái không được để trống' }]
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
      fetchOrder,
      updatedOrder,
      DateValidate,
      dayjs
    }
  },
  created() {},
  props: ['id']
})
</script>
