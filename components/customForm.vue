<script setup lang="ts">
import { Form, Field, ErrorMessage, type GenericObject } from 'vee-validate';
import * as z from 'zod';
import { ref, reactive, computed } from 'vue';
import { toTypedSchema } from '@vee-validate/zod';
import type { RefSymbol } from '@vue/reactivity';

const currentStep = ref(0);
const info = ref({
  //1
  name: '',
  email: "",
  //2
  password: "",
  confirmPassword: "",
  //3
  address: "",
  postalCode: "",
  //4
  terms: false
})

// Each step should have its own validation schema
const schemas = [
  z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty('SSS').email(),
  }),
  z.object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // This makes the error appear under confirmPassword
  }),
  z.object({
    address: z.string().nonempty(),
    postalCode: z.string().nonempty().regex(/^[0-9]+$/, 'Must be numeric'),
  }),
  z.object({
    terms: z.boolean().refine(val => val === true, {
      message: 'Terms must be accepted',
    }),
  }),
];

const currentSchema = computed(() => {
  return toTypedSchema(schemas[currentStep.value]);
});

function nextStep(values: GenericObject ) {
  if(currentStep.value===0 && values){
    info.value.name = values.name;
    info.value.email = values.email;
  }else if(currentStep.value === 1 && values){
    info.value.password = values.password;
    info.value.confirmPassword = values.confirmPassword;
  }else if(currentStep.value === 2 && values){
    info.value.address = values.address;
    info.value.postalCode = values.postalCode;
  }else{
    info.value.terms = values.terms
  }
  
  if(currentStep.value!== 3 && currentStep.value < 3){
    currentStep.value++
  }
  console.log(info.value)

}

function prevStep() {
  if (currentStep.value <= 0) {
    return;
  }

  currentStep.value--;
}

</script>

<template>
  <div>
    <h1>vee-validate form wizard</h1>
    <p class="hidden">
      This example showcases a simple multi-step form (form wizard), basically
      we use the `handleSubmit` function before moving to the next step, which
      allows us to validate the current step without having to submit the form.

      <br />
      <br />

      For this use-case you should pass `keepValues` to the form to let
      vee-validate keep the values across steps.
    </p>

    <Form
      @submit="nextStep"
      :validation-schema="currentSchema"
      keep-values
      v-slot="{ handleSubmit, values }"
      class="bg-white"
    >
      <template v-if="currentStep === 0">
        <label for="name">Name</label>
        <Field name="name" id="name" />
        <ErrorMessage name="name" />

        <label for="email">Email</label>
        <Field name="email" id="email" type="email" />
        <ErrorMessage name="email" />
      </template>

      <template v-if="currentStep === 1">
        <label for="password">Password</label>
        <Field name="password" type="password" id="password" />
        <ErrorMessage name="password" />

        <label for="confirmation">Confirm Password</label>
        <Field name="confirmPassword" type="password" id="confirmation" />
        <ErrorMessage name="confirmPassword" />
      </template>

      <template v-if="currentStep === 2">
        <label for="address">Address</label>
        <Field as="textarea" name="address" id="address" />
        <ErrorMessage name="address" />

        <label for="postalCode">Postal Code</label>
        <Field name="postalCode" id="postalCode" />
        <ErrorMessage name="postalCode" />
      </template>

      <template v-if="currentStep === 3">
        <label for="terms">Agree to terms and conditions</label>
        <Field name="terms" type="checkbox" id="terms" :value="true" />
        <ErrorMessage name="terms" />
      </template>

      <button v-if="currentStep !== 0" type="button" @click="prevStep">
        Previous
      </button>

      <button v-if="currentStep !== 3" type="submit" class="bg-amber-200 p-2">Next</button>

      <button v-if="currentStep === 3" type="submit">Finish</button>

      <pre>{{ values }}</pre>
    </Form>
  </div>
</template>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 500px;
  padding-bottom: 100px;
}

input {
  display: block;
}

span {
  display: block;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 20px;
}

button {
  display: block;
  margin-top: 10px;
}

button[type='submit'] {
  margin-top: 10px;
}

form {
  padding: 20px;
  border: 1px solid black;
}

p {
  font-size: 14px;
}
</style>
