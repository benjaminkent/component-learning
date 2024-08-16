<template>
  <div class="flex flex-col items-center gap-8 bg-zinc-700 h-screen pt-56">
    <div class="w-1/2">
      <EmitUpload
        ref="emitUpload"
        @document-uploaded="handleDocumentUploaded"
      />
      <div class="flex items-center mt-10">
        <button
          class="bg-purple-800 text-white px-4 py-1 rounded hover:bg-purple-900"
          @click="handleUpload"
        >
          Submit File
        </button>
        <ArrowPathIcon
          v-if="uploadLoading"
          class="h-7 w-7 text-purple-300 ml-3 animate-spin"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EmitUpload from '@/components/EmitUpload.vue';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';
import { documentUpload } from '@/stores/docUploadStore';

const { uploadDocument } = documentUpload();

const emitUpload = ref<typeof EmitUpload | null>(null);
const documentForUpload = ref<File | null>(null);
const uploadLoading = ref(false);

function handleDocumentUploaded(file: File) {
  console.log('foo', file);
  documentForUpload.value = file;
}

async function handleUpload() {
  uploadLoading.value = true;

  await uploadDocument();

  emitUpload.value?.removeFile();

  uploadLoading.value = false;
}
</script>
