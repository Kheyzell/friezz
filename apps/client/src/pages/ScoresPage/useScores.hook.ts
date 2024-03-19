import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useScores = (questionnaireId?: number) => {
    const [scores, setScores] = useState<Score[]>();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | undefined>(null);

    useEffect(() => {
        if (!questionnaireId) {
            return setLoading(false);
        }

        const getQuestionnaireScores = async () => {
            const { data, error } = await questionnaireService.getQuestionnaireScores(questionnaireId);

            setError(error);
            setLoading(false);

            if (error) {
                return toast.error("The scores couldn't be fetch for this questionnaire");
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
