import { useAuthStore } from "~/stores/auth";
import type { User } from "~/types/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  const userPermissions = auth.user as User;
  const requiredPermission = 'view-dashboard';
  //console.log(userPermissions)
  if (userPermissions.permissions && !userPermissions.permissions.includes(requiredPermission)) {
    return navigateTo('/unauthorized');
  }
})

