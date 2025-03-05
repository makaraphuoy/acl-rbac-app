<template>
  <div>
    <template v-if="route.path !== '/login'">
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </template>
    <template v-else>
      <NuxtPage/>
    </template>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
</script>
