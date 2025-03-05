<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." @input="filterTable" />
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script lang="ts" setup>
  const searchQuery = ref('')
  const items = ref([
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        { id: 3, name: 'Sam Johnson', age: 35 },
      ])
  const filteredItems = ref<any[]>([])
  onMounted(()=>{
    filteredItems.value = items.value
  })
 
  const filterTable = () => {
    filteredItems.value = items.value.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  };


</script>

