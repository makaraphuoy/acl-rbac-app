export default defineNuxtRouteMiddleware(async (to, from) =>{
  const cookie = useCookie('tsc');
  const useAuth = useAuthStore()
  //console.log(useAuth.isAuthenticated);
  if(!cookie.value && !useAuth.isAuthenticated){
    return navigateTo('/login');
  }else{
    const user = await useAuth.getUserById(cookie.value?.toString() || '')
    if(user){
      useAuth.setUser(user);
    }
  }
})

