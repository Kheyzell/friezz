import { HttpResponseError } from '@freizz/client/core/errors/http-response.errors';
import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { Answer, Result } from '@friezz/common';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useAnswerReview = (initialAnswer: Answer) => {
    const { t } = useTranslation();
    const [answer, setAnswer] = useState(initialAnswer);

    const validate = async () => await evaluate(true);
    const reject = async () => await evaluate(false);
    const cancel = async () => await evaluate(null);

    const evaluate = async (evalutationValue: boolean | null) => {
        if (!answer.id) {
            return showErrorToast();
        }

        const oldIsValid = answer.isValid;

        // optimistic update
        setAnswer({ ...answer, isValid: evalutationValue });

        let evaluationResult: Result<void, HttpResponseError>;
        switch (evalutationValue) {
            case true:
                evaluationResult = await questionnaireService.validateAnswer(answer.id);
                break;

            case false:
                evaluationResult = await questionnaireService.rejectAnswer(answer.id);
                break;

            case null:
                evaluationResult = await questionnaireService.cancelAnswer(answer.id);
        }

        evaluationResult.catchErr(() => {
            setAnswer({ ...answer, isValid: oldIsValid });
            showErrorToast();
        });
    };

    const showErrorToast = () => toast.error(t('reviewPage.useAnswerReview.saveAnswerError'));

    return { answer, validate, reject, cancel };
};
