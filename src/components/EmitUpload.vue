<template>
  <div class="relative w-full mb-5">
    <label
      v-if="draggingOver"
      class="w-full py-3 bg-purple-100 rounded border-2 border-dashed border-purple-500 flex justify-center text-purple-500"
      @dragstart="draggingOver = true"
      @dragleave="draggingOver = false"
      @drop.prevent="handleDrop"
      @dragenter.prevent
      @dragover.prevent
      >Drop file</label
    >
    <label
      v-else
      for="fancy-uploader"
      class="w-full py-3 bg-purple-100 rounded border-2 border-dashed border-purple-500 flex justify-center cursor-pointer"
      @dragover="draggingOver = true"
      >Drop file or <span class="text-purple-600 ml-1">Browse</span></label
    >
    <input
      ref="fancyUploader"
      id="fancy-uploader"
      class="hidden"
      type="file"
      accept="image/*,.pdf"
      multiple="false"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  docUploaded: [val: File];
}>();

const fancyUploader = ref<HTMLInputElement | null>(null);
const uploadedFile = ref<File | null>(null);
const draggingOver = ref(false);

function handleDrop(e: DragEvent) {
  if (!e.dataTransfer?.files) return;

  setFile(e.dataTransfer.files[0]);
  emitFile();
}

function handleUpload(e: Event) {
  const target = e.target as HTMLInputElement;

  if (!target || !target.files) return;

  setFile(target.files[0]);

  emitFile();
}

function setFile(files: File) {
  uploadedFile.value = files;

  const fileFormData = new FormData();

  fileFormData.append(uploadedFile.value.name, uploadedFile.value);

  (fancyUploader.value as HTMLInputElement).value = '';

  draggingOver.value = false;
}

function emitFile() {
  if (!uploadedFile.value) return;

  emit('docUploaded', uploadedFile.value);
}

function removeFile() {
  uploadedFile.value = null;
}
</script>
