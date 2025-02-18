import type { User } from "~/types/user";

export function hasPermission(user: User, permission: string) {
  if(user && user?.permissions){
    return user.permissions.includes(permission);
  }
  return false;
}