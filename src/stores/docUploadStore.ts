import { defineStore } from 'pinia';

export const documentUpload = defineStore('doc upload', () => {
  // mock api call that uploads document to the server
  async function uploadDocument() {
    const p = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 5000);
    });

    return p;
  }

  return { uploadDocument };
});
