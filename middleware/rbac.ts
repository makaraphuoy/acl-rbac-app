export default defineNuxtRouteMiddleware((to, from) =>{
  const userAuth = useAuthStore();
  const userRole = userAuth.user?.role;
  const requiredRole = 'admin';
  const sessoin = sessionStorage.getItem('hello-tsc')

  console.log(userRole)
  if (!userRole || userRole !== requiredRole) {
    return navigateTo('/unauthorized');
  }
})