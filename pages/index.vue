<template>
  <h1 v-if="isAdmin" class="text-center text-3xl p-8">You are Admin</h1>
  <h1 v-else class="text-center text-3xl">Your are Member</h1>
  <div v-if="isAdmin" class="flex justify-between p-6">
    <h1 class="text-center text-3xl">Permission allow listing</h1>
    <button class="p-2 border bg-white cursor-pointer hover:bg-amber-50 rounded" @click="logoutHandler">LOGOUT</button>
  </div>
  <div v-else="isAdmin" class="flex justify-between p-6">
    <h1 class="text-center text-3xl">Permission listing Not allow</h1>
    <button class="p-2 border bg-white" @click="logoutHandler">LOGOUT</button>
  </div>
  <div class="w-full flex justify-center">
    <button @click="router.push('/users')" class="p-2 broder border-red-500 bg-orange-400 text-white cursor-pointer">Want to challeng accessing? Plz click</button>
  </div>
  <ul v-if="hasPermission(useAuth.user,'list-user')" class="bg-white p-10 grid grid-cols-4 gap-8">
    <li v-for="sm in sampleList" :key="sm.id">
      <img :src="sm.profile" alt="ss">
    {{ sm.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  const router = useRouter()

  const sampleList = ref(
    [
  {
    "id": 1,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "John Doe"
  },
  {
    "id": 2,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "Jane Smith"
  },
  {
    "id": 3,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "Alice Johnson"
  },
  {
    "id": 4,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "Michael Brown"
  },
  {
    "id": 5,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "Emma Wilson"
  },
  {
    "id": 6,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "Liam Davis"
  },
  {
    "id": 7,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "Olivia Martinez"
  },
  {
    "id": 8,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "William Taylor"
  },
  {
    "id": 9,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "Sophia Anderson"
  },
  {
    "id": 10,
    "profile": "https://imgs.search.brave.com/ETyy6vWXedOG24w8K56FzhSkSfwQKH6abQRlBtyX4aA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzM3LzY1Lzk2/LzM2MF9GXzkzNzY1/OTYyNV9MM3JGU2Fv/THFtQktVdmxyajdE/WXdkdGJCcWNja2ZY/Ny5qcGc",
    "name": "James White"
  }
]
   
)
  definePageMeta({
    middleware: ["auth"]
  })
  const useAuth = useAuthStore();
  const isAdmin = computed(() => useAuth.user?.role && useAuth.user?.role === 'admin')
  
  const logoutHandler = () =>{
      useAuth.logout();
      navigateTo('/login')
  }
</script>