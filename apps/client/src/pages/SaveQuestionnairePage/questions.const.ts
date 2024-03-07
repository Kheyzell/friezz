import { Questionnaire } from '@friezz/common';

const DEFAULT_QUESTIONS = [
    "Qu'est ce que tu fais avec 20 millions ?",
    'Quel est ton voyage de rêve ?',
    'Qui est ton premier crush ?',
    'Avec quel célébrité tu irai dinner vivante ou morte ?',
    'Quel est ton petit plaisir secret ?',
    'Quel super pouvoir tu voudrai avoir ?',
    'Quel est ton plat préféré ?',
    'Quel est ton groupe préféré ?',
    'Quel est ta couleur préférée ?',
    'Quelle est ta plus jolie bêtise ?',
    'Quelle a été ta plus grosse douleur ?',
    'Quel est ton plat préféré ?',
    'Quelle est ta boisson préférée ?',
    'Quelle est la chose dont tu as le plus honte ?',
    'Quel est ta madeleine de Proust ?',

    'Quel serait ton personnage de JDR (guerrier, mage, paladin, voleur...) ?',
    'Première action si tu deviens maître du monde ?',
];

export const DEFAULT_QUESTIONNAIRE: Questionnaire = {
    name: '',
    creatorName: '',
    participantNames: [],
    questions: DEFAULT_QUESTIONS.map((question) => ({
        value: question,
        creatorName: '',
        answers: [],
    })),
};
