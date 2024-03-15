import { Questionnaire } from '@friezz/common';
import { create } from 'zustand';

type QuestionnaireState = {
    currentQuestionnaire?: Questionnaire;
    setCurrentQuestionnaire: (questionnaire?: Questionnaire) => void;
};

export const useQuestionnaireStore = create<QuestionnaireState>((set) => ({
    setCurrentQuestionnaire: (questionnaire?: Questionnaire) => set({ currentQuestionnaire: questionnaire }),
}));
