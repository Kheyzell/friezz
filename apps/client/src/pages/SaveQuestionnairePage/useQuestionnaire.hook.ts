import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { useQuestionnaireStore } from '@freizz/client/store/questionnaire.store';
import { Questionnaire } from '@friezz/common';
import { useEffect, useState } from 'react';
import { HttpResponse } from '../../models/http-response';

export const useQuestionnaire = (questionnaireId?: number) => {
    const { currentQuestionnaire, setCurrentQuestionnaire } = useQuestionnaireStore();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | undefined>(null);

    useEffect(() => {
        if (!questionnaireId) {
            return setLoading(false);
        }

        const getQuestionSet = async () => {
            const { data, error } = await questionnaireService.getById(questionnaireId);

            setError(error);
            if (data) {
                setCurrentQuestionnaire(data);
            }
            setLoading(false);
        };

        getQuestionSet();
    }, [questionnaireId]);

    const saveQuestionnaire = async (newQuestionnaire: Questionnaire): Promise<HttpResponse<Questionnaire>> => {
        const { data, error } = await questionnaireService.save(newQuestionnaire);
        setError(error);

        if (data) {
            setCurrentQuestionnaire(data);
        }
        return { data, error };
    };

    return {
        questionnaire: currentQuestionnaire,
        isLoading,
        error,
        saveQuestionnaire,
    };
};
