<template>
  <div class="w-full bg-white grid grid-cols-3 gap-2 p-5">
    <div v-for="index in renderSteps" :class="index === currentStep ?'rounded-xl flex justify-center text-white p-2 bg-orange-400 font-bold':'rounded-xl flex justify-center text-white p-2 bg-gray-400'">
        {{ index }}
    </div>
  </div>
  <form @submit.prevent="submitForm" class="bg-white border-2 border-pink-500" style="border: 1px pink solid;">
    <!-- Step 1: Personal Information -->
    <div v-if="currentStep === 1">
      <input v-model="name" name="name" type="text" placeholder="Name" class="outline-none border-1 border-[#ddd] rounded-sm p-2 focus:ring-1 focus:ring-amber-500" />
      <span class="text-left text-sm text-red-500">{{ errors.name }}</span>

      <input v-model="email" name="email" type="email" placeholder="Email" class="outline-none border-1 border-[#ddd] rounded-sm p-2 focus:ring-1 focus:ring-amber-500" />
      <span class="text-left text-sm text-red-500">{{ errors.email }}</span>
    </div>

    <!-- Step 2: Address Information -->
    <div v-if="currentStep === 2">
      <input v-model="street" name="street" type="text" placeholder="Street" class="outline-none border-1 border-[#ddd] rounded-sm p-2 focus:ring-1 focus:ring-amber-500" />
      <span class="text-left text-sm text-red-500">{{ errors.street }}</span>

      <input v-model="city" name="city" type="text" placeholder="City" class="outline-none border-1 border-[#ddd] rounded-sm p-2 focus:ring-1 focus:ring-amber-500" />
      <span class="text-left text-sm text-red-500">{{ errors.city }}</span>

      <input v-model="zipCode" name="zipCode" type="text" placeholder="Zip Code" class="outline-none border-1 border-[#ddd] rounded-sm p-2 focus:ring-1 focus:ring-amber-500" />
      <span class="text-left text-sm text-red-500">{{ errors.zipCode }}</span>
    </div>

    <!-- Step 3: Payment Information -->
    <div v-if="currentStep === 3">
      <input v-model="cardNumber" name="cardNumber" type="text" placeholder="Card Number" />
      <span>{{ errors.cardNumber }}</span>

      <input v-model="expiryDate" name="expiryDate" type="text" placeholder="Expiry Date" />
      <span>{{ errors.expiryDate }}</span>
    </div>

    <!-- Navigation Buttons -->
    <div>
      <button v-if="currentStep > 1" type="button" @click="prevStep" class="py-1 px-3 rounded-sm border bg-pink-100">Previous</button>
      <button v-if="currentStep < 3" type="button" @click="nextStep" class="py-1 px-3 rounded-sm border bg-pink-100">Next</button>
      <button v-if="currentStep === 3" type="submit" class="py-1 px-3 rounded-sm border bg-pink-200">Submit</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
const renderSteps = ref([1,2,3])
// Step management
const currentStep = ref(1);

// Define zod schemas for each step
const step1Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

const step2Schema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'Zip Code is required'),
});

const step3Schema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date'),
});

const schemas =[
  z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
})
,
z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'Zip Code is required'),
})
,

z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry date'),
})
]



const currentSchema = computed(() => {
  return toTypedSchema(schemas[currentStep.value-1]);
});

// Use vee-validate's `useForm` for the entire form
const { handleSubmit, errors, validate, } = useForm({
  validationSchema: currentSchema, // Initial schema for Step 1
});

// Define fields for each step
const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: street } = useField('street');
const { value: city } = useField('city');
const { value: zipCode } = useField('zipCode');
const { value: cardNumber } = useField('cardNumber');
const { value: expiryDate } = useField('expiryDate');

// Navigation functions
  const nextStep = async () => {
    // Validate the current step before proceeding
    const { valid } = await validate();
    if (valid) {
      currentStep.value++;
      // Update the validation schema for the next step
      // if (currentStep.value === 2) {
        
      //   validationSchema.value = toTypedSchema(step2Schema);
      // } else if (currentStep.value === 3) {
      //   validationSchema.value = toTypedSchema(step3Schema);
      // }
    }
  };

const prevStep = () => {
  currentStep.value--;
  // Update the validation schema for the previous step
  if (currentStep.value === 1) {
    validationSchema.value = toTypedSchema(step1Schema);
  } else if (currentStep.value === 2) {
    validationSchema.value = toTypedSchema(step2Schema);
  }
};

// Handle form submission
const submitForm = handleSubmit((values) => {
  console.log('Form submitted!',email, values);
});
</script>