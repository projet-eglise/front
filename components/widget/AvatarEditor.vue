<template>
  <label for="avatar">
    <div class="circle d-flex align-center justify-center mt-10 mb-10 ml-auto mr-auto" style="cursor: pointer">
      <i v-if="image === null && !chargingImage" class="fas fa-user-edit user-icon ml-4" />
      <v-progress-circular v-else-if="chargingImage" indeterminate color="primary" />
      <v-img v-else class="image-preview" height="100%" :src="createImage()" />
      <v-file-input
        id="avatar"
        ref="avatar"
        v-model="uploadedImage"
        name="avatar"
        style="display: none"
        accept=".png, .jpg, .jpeg"
        multiple
        @change="displayImagePreview"
      />
    </div>
  </label>
</template>

<script>
import imageCompression from 'browser-image-compression'

export default {
  data() {
    return {
      chargingImage: false,
      image: null,
      uploadedImage: null,
    }
  },
  methods: {
    displayImagePreview(uploadedImage) {
      if (uploadedImage[0] === undefined) {
        this.image = null
        return
      }

      const imageFile = uploadedImage[0]
      this.chargingImage = true

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }

      try {
        imageCompression(imageFile, options).then(
          function (compressedFile) {
            const file = new File([compressedFile], compressedFile.name, {
              type: compressedFile.type,
              lastModified: new Date().getTime(),
            })

            const container = new DataTransfer()

            container.items.add(file)

            this.chargingImage = false
            this.image = container.files[0]
            this.$emit('input', this.image)
          }.bind(this)
        )
      } catch (error) {
        this.chargingImage = false
      }
    },
    createImage() {
      return URL.createObjectURL(this.image)
    },
  },
}
</script>

<style scoped>
.circle {
  clip-path: circle(50%);
  height: 100%;
  width: 100%;
  background-color: #dfe6ed;

  height: 8em;
  width: 8em;
}

.user-icon {
  font-size: 4em;
  color: #9fadba;
}
</style>
