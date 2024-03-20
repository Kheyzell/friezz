import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEn from './translations/translations.en.json';
import translationFr from './translations/translations.fr.json';
import homePageEn from './translations/pages/HomePage/HomePage.translation.en.json';
import homePageFr from './translations/pages/HomePage/HomePage.translation.fr.json';

export const resources = {
    en: {
        translation: {
            ...translationEn,
            ...homePageEn,
        },
    },
    fr: {
        translation: {
            ...translationFr,
            ...homePageFr,
        },
    },
} as const;

// const lang = localStorageService.loadLanguage() || undefined

i18n.use(initReactI18next)
    .use(detector)
    .init({
        fallbackLng: 'en',
        resources,

        interpolation: {
            escapeValue: false,
        },
    });
