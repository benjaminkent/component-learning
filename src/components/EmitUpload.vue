<template>
  <label
    for="slot-uploader"
    class="w-full py-3 bg-purple-100 rounded border-2 border-dashed border-purple-500 flex justify-center cursor-pointer"
    >Drop file or <span class="text-purple-600 ml-1">Browse</span></label
  >
  <input
    id="slot-uploader"
    class="hidden"
    type="file"
    accept="image/*,.pdf"
    @change="handleUpload"
  />
</template>

<script setup lang="ts">
defineEmits<{}>();

function handleUpload(e: Event) {
  const target = e.target as HTMLInputElement;

  if (!target || !target.files) return;

  const uploadedFile = target.files[0];

  const fileFormData = new FormData();

  fileFormData.append(uploadedFile.name, uploadedFile);

  // emit event
}
</script>
