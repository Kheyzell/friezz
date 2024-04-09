import { Answer, Question } from '@friezz/common';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { DEFAULT_ANSWER } from '../../answers.const';
import questionnaireService from '@freizz/client/core/services/questionnaire.service';

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

    const [savingError, setSavingError] = useState<string | null>(null);

    const saveAnswers = async (answers: Answer[]) => {
        setIsSaveLoading(true);
        const { data, error } = await questionnaireService.saveAnswers(answers);
        setSavingError(error as string);
        setIsSaveLoading(false);

        if (error) {
            return toast.error(
                t('saveAnswersPage.answerForm.saveError', {
                    participantName: targetParticipantName,
                }),
            );
        }

        setAnswers(data ?? []);

        toast.success(
            t('saveAnswersPage.answerForm.saveSuccess', { participantName: targetParticipantName }),
        );
    };

    return { answers, setAnswers, saveAnswers, isSaveLoading, savingError };
};
