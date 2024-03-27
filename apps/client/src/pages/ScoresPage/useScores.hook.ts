import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useScores = (questionnaireId?: number) => {
    const { t } = useTranslation();
    const [scores, setScores] = useState<Score[]>();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | undefined>(null);

    useEffect(() => {
        if (!questionnaireId) {
            return setLoading(false);
        }

        const getQuestionnaireScores = async () => {
            const { data, error } =
                await questionnaireService.getQuestionnaireScores(questionnaireId);

            setError(error);
            setLoading(false);

            if (error) {
                return toast.error(t('scoresPage.useScores.fetchScoresError'));
            }

            if (data) {
                setScores(data);
            }
        };

        getQuestionnaireScores();
    }, [questionnaireId]);

    return {
        scores,
        isLoading,
        error,
    };
};
