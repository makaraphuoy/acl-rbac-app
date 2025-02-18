<template>
  <header class="mb-6 w-full border-b p-6 flex justify-end">
      <button class="px-4 py-1 border bg-white cursor-pointer">LOGOUT</button>
  </header>
</template>

<script setup lang="ts">
  const useAuth = useAuthStore();
  const cookie =  useCookie('tsc');
  const onLogout = () =>{
    cookie.value = null;
    useAuth.logout();
    navigateTo('/login');
  }
</script>