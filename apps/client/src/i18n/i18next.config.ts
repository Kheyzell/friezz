import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import commonEn from './translations/en/common.en.json';
import homePageEn from './translations/en/pages/HomePage.translation.en.json';
import SaveQuestionnairePageEn from './translations/en/pages/SaveQuestionnairePage.en.json';
import SaveAnswersPageEn from './translations/en/pages/SaveAnswersPage.en.json';
import ReviewPageEn from './translations/en/pages/ReviewPage.en.json';
import ScoresPageEn from './translations/en/pages/ScoresPage.en.json';
import commonFr from './translations/fr/common.fr.json';
import homePageFr from './translations/fr/pages/HomePage.translation.fr.json';
import SaveQuestionnairePageFr from './translations/fr/pages/SaveQuestionnairePage.fr.json';
import SaveAnswersPageFr from './translations/fr/pages/SaveAnswersPage.fr.json';
import ReviewPageFr from './translations/fr/pages/ReviewPage.fr.json';
import ScoresPageFr from './translations/fr/pages/ScoresPage.fr.json';

export const resources = {
    en: {
        translation: {
            ...commonEn,
            ...homePageEn,
            ...SaveQuestionnairePageEn,
            ...SaveAnswersPageEn,
            ...ReviewPageEn,
            ...ScoresPageEn,
        },
    },
    fr: {
        translation: {
            ...commonFr,
            ...homePageFr,
            ...SaveQuestionnairePageFr,
            ...SaveAnswersPageFr,
            ...ReviewPageFr,
            ...ScoresPageFr,
        },
    },
} as const;

i18n.use(initReactI18next)
    .use(detector)
    .init({
        fallbackLng: 'en',
        resources,
        interpolation: {
            escapeValue: false,
        },
    });