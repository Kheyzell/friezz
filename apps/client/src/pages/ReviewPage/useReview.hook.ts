import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { Questionnaire } from '@friezz/common';
import { useEffect, useState } from 'react';

export const useReview = (questionnaireId: number) => {
    const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | undefined>(null);

    useEffect(() => {
        const getQuestionSet = async () => {
            const { data, error } = await questionnaireService.getById(questionnaireId);

            setError(error);
            if (data) {
                setQuestionnaire(data);
            }
            setLoading(false);
        };

        getQuestionSet();
    }, [questionnaireId]);

    const questions = questionnaire?.questions ?? [];
    const participantNames = questionnaire?.participantNames ?? [];

    return {
        questions,
        participantNames,
        isLoading,
        error,
    };
};
