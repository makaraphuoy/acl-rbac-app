export default defineNuxtPlugin((nuxtApp) => {
  const languageCookie = useCookie('language');

  const defaultLanguage = languageCookie.value || 'en';

  nuxtApp.$i18n.setLocale(defaultLanguage);

  if (process.client) {
      useHead({
          htmlAttrs: {
              lang: defaultLanguage,
          }
      });
  }

  nuxtApp.$i18n.onLanguageSwitched = (oldLocale, newLocale) => {
      languageCookie.value = newLocale;

      if (process.client) {
          useHead({
              htmlAttrs: {
                  lang: newLocale,
              }
          });
      }
  };
});