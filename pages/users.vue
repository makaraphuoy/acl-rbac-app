<script setup lang="ts">
import InfoForm from '~/components/InfoForm.vue';

  //const authStore = useAuthStore();

  definePageMeta({
    middleware: ["auth","rbac"]
  })

  //  const isAdmin = computed(() => authStore.getUserRole === 'admin');
  //  console.log("IS...", isAdmin?.value)
</script>

<template>
  <h1 class="text-center p-6 text-3xl">
    User allowed view this page
  </h1>
  <!-- <FormTest/> -->
  <CustomForm/>
  <!-- <InfoForm/>  -->
</template>
