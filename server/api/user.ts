// server/api/hello.ts
export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      username: "mark",
      email: "mark@gmail.com",
      role: "admin",
      password: '123456',
      permissions: ["view-dashboard", "list-user","list-view","grid-view"]
    },
    {
      id: 2,
      username: "xiexie",
      email: "xiexieni@gmail.com",
      role: "member",
      password: '123456',
      permissions: ["view-dashboard","grid-view"]
    }
  ]
});
///const userTEST = 