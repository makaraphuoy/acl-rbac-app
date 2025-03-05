<template>
  <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-4 bg-slate-100">
    <div class="gird grid-cols-1">
      <label for="email">Email:</label>
      <input v-model="email" name="email" v-validate="'required|email'" class="w-full" />
      <span class="text-left text-red-500 text-sm">{{ errors.email }}</span>
    </div>
    <div class="grid grid-cols-1">
      <label for="password">Password:</label>
      <input type="password" v-model="password" name="password" v-validate="'required'" />
      <span>{{ errors.password }}</span>  
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

  const {t} = useI18n()
const schema = toTypedSchema(z.object({
  email: z.string()
    .email(t('required'))
    .nonempty('Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .nonempty('Password is required')
}));

interface IForm{
  email: string;
  password: string;
}

const { handleSubmit, errors } = useForm({ validationSchema: schema } );
const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit((values)=>{
  console.log(errors.value, values)
})
</script>