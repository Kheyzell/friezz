import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { ResultError } from '@friezz/common';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useScores = (questionnaireId?: number) => {
    const { t } = useTranslation();
    const [scores, setScores] = useState<Score[]>();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<ResultError | null>(null);

    useEffect(() => {
        if (!questionnaireId) {
            return setLoading(false);
        }

        const getQuestionnaireScores = async () => {
            setLoading(true);

            (await questionnaireService.getQuestionnaireScores(questionnaireId)).match({
                ok: (scores) => setScores(scores),
                err: (error) => {
                    setError(error);
                    toast.error(t('scoresPage.useScores.fetchScoresError'));
                },
            });

            setLoading(false);
        };

        getQuestionnaireScores();
    }, [questionnaireId]);

    return {
        scores,
        isLoading,
        error,
    };
};
