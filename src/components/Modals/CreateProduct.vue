<template>
  <div>
    <a-button type="primary" @click="showModal">Add Product</a-button>
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
        <a-form-item label="Tên sản phẩm" name="Tensanpham" ref="Tensanpham">
          <a-input v-model:value="formState.Tensanpham">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="Giá sản phẩm" name="Giasanpham" ref="Giasanpham">
          <a-input v-model:value="formState.Giasanpham">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="Màn hình" name="Manhinh" ref="Manhinh">
          <a-input v-model:value="formState.Manhinh"> </a-input>
        </a-form-item>

        <a-form-item label="Hệ điều hành" name="Hedieuhanh" ref="Hedieuhanh">
          <a-input v-model:value="formState.Hedieuhanh"> </a-input>
        </a-form-item>

        <a-form-item label="Camera trước" name="Cameratruoc" ref="Cameratruoc">
          <a-input v-model:value="formState.Cameratruoc"> </a-input>
        </a-form-item>

        <a-form-item label="Camera sau" name="Camerasau" ref="Camerasau">
          <a-input v-model:value="formState.Camerasau"> </a-input>
        </a-form-item>

        <a-form-item label="Chip" name="Chip" ref="Chip">
          <a-input v-model:value="formState.Chip"> </a-input>
        </a-form-item>

        <a-form-item label="Ram" name="Ram" ref="Ram">
          <a-input v-model:value="formState.Ram"> </a-input>
        </a-form-item>

        <a-form-item label="Dung lượng lưu trữ" name="Dungluongluutru" ref="Dungluongluutru">
          <a-input v-model:value="formState.Dungluongluutru"> </a-input>
        </a-form-item>

        <a-form-item label="Sim" name="Sim" ref="Sim">
          <a-input v-model:value="formState.Sim"> </a-input>
        </a-form-item>

        <a-form-item label="Pin và sạc" name="Pinvasac" ref="Pinvasac">
          <a-input v-model:value="formState.Pinvasac"> </a-input>
        </a-form-item>

        <a-form-item label="Mô tả" name="Mota" ref="Mota">
          <a-textarea :rows="4" v-model:value="formState.Mota" />
        </a-form-item>

        <a-form-item label="Số lượng" name="Soluong" ref="Soluong">
          <a-input v-model:value="formState.Soluong">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="Loại sản phẩm" name="Categoryid" ref="Categoryid">
          <a-select v-model:value="formState.Categoryid">
            <a-select-option value=""> </a-select-option>
            <a-select-option
              v-for="category in categoryData"
              :key="category.Categoryid"
              :value="category.Categoryid"
              >{{ category.Tenloai.toUpperCase() }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
import { getAllCategory, createProduct } from '@/sevices/admin.service.js'
export default defineComponent({
  setup(props, { emit }) {
    const loading = ref(false)
    const visible = ref(false)
    const categoryData = ref([])
    const formRef = ref(null) // Define ref here for the form

    const formState = reactive({
      Tensanpham: '',
      Giasanpham: '',
      Soluong: '',
      Mota: '',
      Categoryid: '',
      Manhinh: '',
      Hedieuhanh: '',
      Cameratruoc: '',
      Camerasau: '',
      Chip: '',
      Ram: '',
      Dungluongluutru: '',
      Sim: '',
      Pinvasac: ''
    })

    const showModal = async () => {
      visible.value = true
    }

    async function fetchCategory() {
      try {
        const response = await getAllCategory()
        categoryData.value = response.data
      } catch (error) {
        console.error('Failed to fetch category:', error)
      }
    }

    const handleOk = async () => {
      if (!formRef.value) return
      loading.value = true

      try {
        // Validate specific fields if necessary
        await formRef.value.validate()
        // After successful validation, make the API call
        await createProduct(formState)
        console.log('formState', formState)
        // Reset the form after successful submission
        formRef.value.resetFields()
        // Emit an event to the parent component
        // to notify that the user has been updated
        emit('createdProduct')
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
      Tensanpham: [{ required: true, message: 'Please input your product name!', trigger: 'blur' }],
      Giasanpham: [
        { required: true, message: 'Please input your product price!', trigger: 'blur' }
      ],
      Soluong: [
        { required: true, message: 'Please input your product quantity!', trigger: 'blur' }
      ],
      Manhinh: [{ required: true, message: 'Please input your product screen!', trigger: 'blur' }],

      Hedieuhanh: [{ required: true, message: 'Please input your product OS!', trigger: 'blur' }],
      Cameratruoc: [
        { required: true, message: 'Please input your product front camera!', trigger: 'blur' }
      ],
      Camerasau: [
        { required: true, message: 'Please input your product rear camera!', trigger: 'blur' }
      ],
      Chip: [{ required: true, message: 'Please input your product chip!', trigger: 'blur' }],
      Ram: [{ required: true, message: 'Please input your product RAM!', trigger: 'blur' }],
      Dungluongluutru: [
        { required: true, message: 'Please input your product storage!', trigger: 'blur' }
      ],
      Sim: [{ required: true, message: 'Please input your product sim!', trigger: 'blur' }],
      Pinvasac: [
        {
          required: true,
          message: 'Please input your product battery and charger!',
          trigger: 'blur'
        }
      ],

      Mota: [
        { required: true, message: 'Please input your product description!', trigger: 'blur' }
      ],
      Categoryid: [
        { required: true, message: 'Please select your product category!', trigger: 'change' }
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
      fetchCategory,
      labelCol,
      wrapperCol,
      categoryData
    }
  },
  created() {
    this.fetchCategory()
  }
})
</script>
