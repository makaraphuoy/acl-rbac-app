import type { User } from "~/types/user";

// Example usage:
// const userTEST: User = {
//   id: 1,
//   username: "mark",
//   email: "mark@gmail.com",
//   role: "member",
//   permissions: ["view-dashboard", "edit-profile"]
// };

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false)
  const cookie = useCookie('tsc');
  const tscookie = useCookie('hi',{
    httpOnly: true,
    secure: true,
    domain: 'localhost:3000'
  })

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

  // Actions
  async function login(userData: User) {
    await sessionStorage.setItem('hello-tsc',token);
    tscookie.value = 'same-site'
    if(userData){
      const { data } = await useAsyncData('users', () => $fetch('/api/user'));
      if(data){
        const us = data.value?.some((d) =>{
            return  d.email === userData.email && d.password === userData.password
        })
        if(us){
          const usData = data.value?.filter((us) => us.email === userData.email)[0]
          isAuthenticated.value = true;
          user.value = usData || null;;
          cookie.value = usData?.id.toString();
        }
      }
    }else{
      isAuthenticated.value = false;
    }
  }

  async function getUserById(id:string){
    const { data } = await useAsyncData(`'user${id}`, () => $fetch('/api/user'));
    if(data){
      return data.value?.filter((f) => f.id === Number(id))[0]
    }
    return null;
  }

  function setUser(data: User){
    user.value = data;
    isAuthenticated.value = true;
  }

  function logout() {
    user.value = null;
    cookie.value = null;
  }

  function setUserRole(role: string) {
    if (user.value) {
      user.value.role = role;
    }
  }

  function setUserPermissions(permissions: string[]) {
    if (user.value) {
      user.value.permissions = permissions;
    }
  }

  // Getters
  const getUser = computed(() => user.value);
  const getUserRole = computed(() => user.value?.role);
  const getUserPermissions = computed(() => user.value?.permissions);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    setUser,
    getUserById,
    setUserRole,
    setUserPermissions,
    getUser,
    getUserRole,
    getUserPermissions,
  };
})