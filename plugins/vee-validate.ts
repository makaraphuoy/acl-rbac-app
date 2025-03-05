import { localize } from '@vee-validate/i18n';
import { configure} from 'vee-validate';
import en from '@vee-validate/i18n/dist/locale/en.json';
import km from '@vee-validate/i18n/dist/locale/km.json';
import {  toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export default defineNuxtPlugin((nuxtApp) => {
  configure({
    generateMessage: localize({
      en,
      km,
    }),
    validateOnInput: true,
  });
  nuxtApp.provide('zod', z);
  nuxtApp.provide('toTypedSchema', toTypedSchema);
});