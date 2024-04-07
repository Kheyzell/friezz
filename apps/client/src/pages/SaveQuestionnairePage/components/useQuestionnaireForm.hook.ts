import { Question, Questionnaire } from '@friezz/common';
import { useState } from 'react';

export const useQuestionnaireForm = (initialQuestionnaire: Questionnaire) => {
    const [creatorName, setCreatorName] = useState<string>(initialQuestionnaire.creatorName ?? '');
    const [questionnaireName, setQuestionnaireName] = useState<string>(
        initialQuestionnaire.name ?? '',
    );
    const [otherParticipantNames, setOtherParticipantNames] = useState<string[]>(
        initialQuestionnaire.participantNames.slice(1) ?? [],
    );
    const [questions, setQuestions] = useState<Question[]>(initialQuestionnaire.questions ?? []);

    return {
        creatorName,
        questionnaireName,
        otherParticipantNames,
        questions,
        setCreatorName,
        setQuestionnaireName,
        setOtherParticipantNames,
        setQuestions,
    };
};
