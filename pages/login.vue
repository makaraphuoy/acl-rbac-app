<template>
  <main class="w-full flex justify-center p-6">
    <div class="relative flex flex-col rounded-xl border bg-white p-3 border-[#ddd]">
      <h4 class="block text-xl font-medium text-slate-800">
        Sign In
      </h4>
      <p class="text-slate-500 font-light">
        Nice to meet you! Enter your details to signin.
      </p>
      <Form 
      @submit="onSubmit" 
      :validation-schema="validationSchema" class="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div class="mb-1 flex flex-col gap-6">
          <div class="w-full max-w-sm min-w-[200px]">
            <label class="block mb-2 text-sm text-slate-600">Your Name</label>
            <Field name="name" v-model="name" type="text" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Name" />
            <ErrorMessage name="name" class="text-left text-sm/tight text-red-400" />
          </div>
          <div class="w-full max-w-sm min-w-[200px]">
            <label class="block mb-2 text-sm text-slate-600">Email</label>
            <Field name="email" v-model="email" type="email" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Email" />
            <ErrorMessage name="email" class="text-left text-sm/tight text-red-400" />
          </div>
          <div class="w-full max-w-sm min-w-[200px]">
            <label class="block mb-2 text-sm text-slate-600">Password</label>
            <Field name="password" v-model="password" type="password" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Password" />
            <ErrorMessage name="password" class="text-left text-sm/tight text-red-400" />
          </div>
        </div>
        <div class="hidden w-full max-w-sm min-w-[200px]">
          <label hidden for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select role</label>
          <Field hidden aria-disabled="true" as="select" name="role" v-model="role" id="role" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option disabled value="member">Member</option>
            <option disabled value="admin">Admin</option>
            <option disabled value="user">User</option>
          </Field>
          <ErrorMessage name="role" class="text-left text-sm/tight text-red-400" />
        </div>
        <div class="inline-flex items-center mt-2">
          <label class="flex items-center cursor-pointer relative" for="check-2">
            <Field name="rememberMe" type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id="check-2" />
            <span class="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </span>
          </label>
          <label class="cursor-pointer ml-2 text-slate-600 text-sm" for="check-2">Remember Me</label>
        </div>
        <button type="submit" class="mt-4 w-full cursor-pointer rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none">Sign In</button>
        <p class="flex justify-center mt-6 text-sm text-slate-600">Don't have an account? <a href="" class="ml-1 text-sm font-semibold text-slate-700 underline">Sign up</a></p>
        <p class="text-center my-3 text-red-400" v-if="msmErrors">Credentails incorrect!</p>
      </Form>
    </div>
  </main>
  <div class="flex justify-center">
    <div class="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 grid-cols-1 gap-4">
      <pre class="bg-amber-50 pt-4 pr-4 rounded-2xl">
        {
          "name": "ACL & RBAC App",
          "email": "mark@gmail.com",
          "password": "123456",
          "role": "admin"
        }
      </pre>
      <pre class="bg-amber-50 pt-4 pr-4 rounded-2xl">
        {
          "name": "ACL & RBAC App",
          "email": "xiexieni@gmail.com",
          "password": "123456",
          "role": "member"
        }
      </pre>
    </div>
  </div>
</template>


<script setup lang="ts">
  import { Form, Field, ErrorMessage, useForm, useField } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import *as z from 'zod';
import type { User } from '~/types/user';
  const useAuth = useAuthStore();
  const msmErrors = ref(false)

  const validationSchema = toTypedSchema(
    z.object({
      name: z.string().min(1, { message: 'Name is required' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
      role: z.enum(['member', 'admin', 'user'], { message: 'Role is required' }).optional(),
      rememberMe: z.boolean().optional(),
    })
  );
  const { value: email } = useField('email');
  const { value: password } = useField('password');
  const { value: name } = useField('name');
  const { value: role } = useField('role');
  const { value: rememberMe } = useField('rememberMe');

  const { handleSubmit, errors } = useForm({
      validationSchema: validationSchema,
    });

    // const onSubmit = handleSubmit(values => {
    //   console.log('Form Submitted:', values);
    // });
    const onSubmit = async (values:any) => {
      const preData: User = {
        id: 1,
        username: values.name,
        email: values.email,
        role: values.role,
        password: values.password,
        permissions: ["view-dashboard", "edit-profile"]
      } 
      await useAuth.login(preData);
      if(useAuth.isAuthenticated){
        msmErrors.value = false;
        navigateTo('/');
      }else{
        msmErrors.value = true;
      }
    }
 
</script>