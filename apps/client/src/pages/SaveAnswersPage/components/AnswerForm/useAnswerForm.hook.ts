import { HttpResponseError } from '@freizz/client/core/errors/http-response.errors';
import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { Answer, Question } from '@friezz/common';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { DEFAULT_ANSWER } from '../../answers.const';

export const useAnswerForm = (
    username: string,
    targetParticipantName: string,
    questions: Question[],
) => {
    const { t } = useTranslation();
    const initialAnswers = questions.map(
        (question) =>
            question.answers.find(
                (answer) =>
                    answer.creatorName === username &&
                    answer.targetParticipantName === targetParticipantName,
            ) ?? {
                ...DEFAULT_ANSWER,
                questionId: question.id!,
                creatorName: username,
                targetParticipantName: targetParticipantName,
            },
    );
    const [answers, setAnswers] = useState<Answer[]>(initialAnswers);

    const [isSaveLoading, setIsSaveLoading] = useState(false);

    const [savingError, setSavingError] = useState<HttpResponseError | null>(null);

    const saveAnswers = async (answers: Answer[]) => {
        setIsSaveLoading(true);

        (await questionnaireService.saveAnswers(answers)).match({
            ok: (data) => {
                setAnswers(data);
                toast.success(
                    t('saveAnswersPage.answerForm.saveSuccess', {
                        participantName: targetParticipantName,
                    }),
                );
            },
            err: (error) => {
                setSavingError(error);
                toast.error(
                    t('saveAnswersPage.answerForm.saveError', {
                        participantName: targetParticipantName,
                    }),
                );
            },
        });

        setIsSaveLoading(false);
    };

    return { answers, setAnswers, saveAnswers, isSaveLoading, savingError };
};
