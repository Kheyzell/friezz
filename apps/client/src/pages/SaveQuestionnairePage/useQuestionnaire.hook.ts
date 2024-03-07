import { Questionnaire } from '@friezz/common';
import { useEffect, useState } from 'react';
import { HttpResponse } from '../../models/http-response';
import questionnaireService from '@freizz/client/core/services/questionnaire.service';

export const useQuestionnaire = (questionnaireName?: string) => {
    const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | undefined>(null);

    useEffect(() => {
        if (!questionnaireName) {
            return setLoading(false);
        }

        const getQuestionSet = async () => {
            const { data, error } = await questionnaireService.getByName(questionnaireName);

            setError(error);
            if (data) {
                setQuestionnaire(data);
            }
            setLoading(false);
        };

        getQuestionSet();
    }, [questionnaireName]);

    const saveQuestionnaire = async (
        newQuestionSet: Questionnaire,
    ): Promise<HttpResponse<void>> => {
        const { error } = await questionnaireService.save(newQuestionSet);
        setError(error);
        return { error };
    };

    return {
        questionnaire,
        isLoading,
        error,
        saveQuestionnaire,
    };
};
