
export default defineNuxtRouteMiddleware(() => {
  const languageCookie = useCookie('language');

  // Default values if no cookie is set
  const defaultLanguage = languageCookie.value || 'en';

  // Set the language and direction for SSR
  useHead({
      htmlAttrs: {
          lang: defaultLanguage,
      }
  });

  // Set the locale for i18n
  const { $i18n } = useNuxtApp();
  $i18n.setLocale(defaultLanguage);
});