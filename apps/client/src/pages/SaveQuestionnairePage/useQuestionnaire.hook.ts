import { HttpResponseError } from '@freizz/client/core/errors/http-response.errors';
import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { useQuestionnaireStore } from '@freizz/client/store/questionnaire.store';
import { Questionnaire, Result } from '@friezz/common';
import { useEffect, useState } from 'react';

export const useQuestionnaire = (questionnaireId?: number) => {
    const { currentQuestionnaire, setCurrentQuestionnaire } = useQuestionnaireStore();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<HttpResponseError | null>(null);

    useEffect(() => {
        if (!questionnaireId) {
            return setLoading(false);
        }

        const getQuestionSet = async () => {
            (await questionnaireService.getById(questionnaireId)).match({
                ok: (data) => setCurrentQuestionnaire(data),
                err: (error) => setError(error),
            });

            setLoading(false);
        };

        getQuestionSet();
    }, [questionnaireId]);

    const saveQuestionnaire = async (
        newQuestionnaire: Questionnaire,
    ): Promise<Result<Questionnaire, HttpResponseError>> => {
        return (await questionnaireService.save(newQuestionnaire))
            .tap((questionnaire) => setCurrentQuestionnaire(questionnaire))
            .catchErr((error) => setError(error));
    };

    return {
        questionnaire: currentQuestionnaire,
        isLoading,
        error,
        saveQuestionnaire,
    };
};
