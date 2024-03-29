import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { HttpResponse } from '@freizz/client/models/http-response';
import { Answer } from '@friezz/common';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useAnswerReview = (initialAnswer: Answer) => {
    const { t } = useTranslation();
    const [answer, setAnswer] = useState(initialAnswer);

    const validate = async () => await evaluate(true);
    const reject = async () => await evaluate(false);
    const cancel = async () => await evaluate(undefined);

    const evaluate = async (evalutationValue?: boolean) => {
        if (!answer.id) {
            return showErrorToast();
        }

        const oldIsValid = answer.isValid;

        // optimistic update
        setAnswer({ ...answer, isValid: evalutationValue });

        let response: HttpResponse<void>;
        switch (evalutationValue) {
            case true:
                response = await questionnaireService.validateAnswer(answer.id);
                break;

            case false:
                response = await questionnaireService.rejectAnswer(answer.id);
                break;

            case undefined:
                response = await questionnaireService.cancelAnswer(answer.id);
        }

        const { error } = response;
        if (error) {
            setAnswer({ ...answer, isValid: oldIsValid });
            return showErrorToast();
        }
    };

    const showErrorToast = () => toast.error(t('reviewPage.useAnswerReview.saveAnswerError'));

    return { answer, validate, reject, cancel };
};
