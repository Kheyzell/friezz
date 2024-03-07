import { Answer, Question } from '@friezz/common';
import { useState } from 'react';
import { toast } from 'sonner';
import { DEFAULT_ANSWER } from '../../answers.const';
import questionnaireService from '@freizz/client/core/services/questionnaire.service';

export const useAnswerForm = (
    username: string,
    targetParticipantName: string,
    questions: Question[],
) => {
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
        const { error } = await questionnaireService.saveAnswers(answers);
        setSavingError(error as string);
        setIsSaveLoading(false);

        if (error) {
            return toast.error(`Your answers couldn't be saved for ${targetParticipantName}`);
        }

        toast.success(`Your answers have been saved for ${targetParticipantName}`);
    };

    return { answers, setAnswers, saveAnswers, isSaveLoading, savingError };
};
