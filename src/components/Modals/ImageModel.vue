<template>
  <div>
    <a @click="showModal">Image</a>
    <a-modal
      v-model:open="open"
      title="Image"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
      <a-space :size="32">
        <!-- Use click event directly -->
        <input type="file" multiple ref="file" @change="handleUpload" />
        <button @click="uploadFile">Upload</button> <br />

        <a-image-preview-group v-for="image in imageData" :key="image.Imageid">
          <a-image :width="200" :src="image.Url" />
        </a-image-preview-group>
      </a-space>
    </a-modal>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getImageByProductId, createImage } from '@/sevices/admin.service'
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props) {
    const open = ref(false)
    const imageData = ref([])
    const file = ref([])

    const handleUpload = (event) => {
      file.value = event.target.files
    }

    const uploadFile = async () => {
      console.log('file lenght :', file.value.length)
      if (file.value.length === 0) {
        alert('Please select at least one file.')
        return
      }

      const formData = new FormData()
      console.log('file:', file.value)
      for (let i = 0; i < file.value.length; i++) {
        formData.append('files', file.value[i])
      }
      console.log('formData:', formData)
      try {
        const response = await createImage(formData, props.id)
        await fetchImageByProductId(props.id)
        console.log('Upload image successfully:', response)
      } catch (error) {
        console.log('Failed to upload image:', error)
      }
    }

    const showModal = async () => {
      open.value = true
      await fetchImageByProductId(props.id)
    }

    const fetchImageByProductId = async (id) => {
      try {
        const response = await getImageByProductId(id)
        imageData.value = response.data
      } catch (error) {
        console.log('Failed to fetch image:', error)
      }
    }

    const handleOk = async () => {
      open.value = false
    }

    return {
      open,
      showModal,
      handleOk,
      fetchImageByProductId,
      imageData,
      file,
      handleUpload,
      uploadFile
    }
  },
  props: ['id']
})
</script>

<style>
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
