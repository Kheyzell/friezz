import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { Questionnaire } from '@friezz/common';
import { useEffect, useState } from 'react';

export const useReview = (questionnaireId: number) => {
    const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getQuestionSet = async () => {
            (await questionnaireService.getById(questionnaireId)).match({
                ok: (data) => setQuestionnaire(data),
                err: (error) => setError(error),
            });

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
