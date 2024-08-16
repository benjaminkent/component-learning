<template>
  <div class="relative w-full mb-5">
    <label
      for="fancy-uploader"
      class="w-full py-3 bg-purple-100 rounded border-2 border-dashed border-purple-500 flex justify-center cursor-pointer"
      >Drop file or <span class="text-purple-600 ml-1">Browse</span></label
    >
    <input
      ref="fancyUploader"
      id="fancy-uploader"
      class="hidden"
      type="file"
      accept="image/*,.pdf"
      @change="handleUpload"
    />
    <p v-if="uploadedFile" class="text-purple-100 absolute flex items-center">
      Uploaded file:
      <span class="text-purple-500 ml-1">{{ uploadedFile?.name }}</span>
      <span
        class="bg-purple-100 text-purple-900 h-5 w-5 flex justify-center items-center rounded-full mx-2 border-purple-500 pb-1 cursor-pointer"
        @click="removeFile"
        >x</span
      >
    </p>
  </div>
  <div>
    <p>some content below to make sure it's not moving</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineEmits<{}>();

const fancyUploader = ref<HTMLInputElement | null>(null);
const uploadedFile = ref<File | null>(null);

function handleUpload(e: Event) {
  const target = e.target as HTMLInputElement;

  if (!target || !target.files) return;

  uploadedFile.value = target.files[0];

  const fileFormData = new FormData();

  fileFormData.append(uploadedFile.value.name, uploadedFile.value);

  (fancyUploader.value as HTMLInputElement).value = '';

  // emit event
}

function removeFile() {
  uploadedFile.value = null;
}
</script>
