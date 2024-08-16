<template>
  <div class="flex flex-col items-center gap-8 bg-zinc-700 h-screen pt-28">
    <div class="w-1/2">
      <EmitUpload />
    </div>
  </div>
</template>

<script setup lang="ts">
import EmitUpload from '@/components/EmitUpload.vue';
</script>
