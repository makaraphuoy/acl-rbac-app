export type User = {
  id: number;
  username: string;
  email: string;
  role?: string; // Optional property for role-based access control
  password: string;
  permissions?: string[]; // Optional property for access control list
}

