import { FormInput } from '@freizz/client/shared/components/FormInput';
import { Loader } from '@freizz/client/shared/components/Loader';
import { Title } from '@freizz/client/shared/components/Title';
import { useUserStore } from '@freizz/client/store/user.store';
import { Question } from '@friezz/common';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle } from 'react-icons/fi';
import { useAnswerForm } from './useAnswerForm.hook';

type AnswerFormProps = {
    participantName: string;
    questions: Question[];
};
export const AnswerForm: React.FC<AnswerFormProps> = ({ participantName, questions }) => {
    const { t } = useTranslation();

    const { username } = useUserStore();

    const { answers, setAnswers, saveAnswers, isSaveLoading } = useAnswerForm(
        username,
        participantName,
        questions,
    );

    const [isSaved, setIsSaved] = useState<boolean>(
        answers.filter((answer) => !!answer.value).length > 0,
    );

    const handleAnswerChange = (questionIndex: number, answerValue: string) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex].value = answerValue;
        setAnswers(newAnswers);
        setIsSaved(false);
    };

    const handleSave = () => {
        saveAnswers(answers).then(() => setIsSaved(true));
    };

    return (
        <div className="p-4">
            <Title>
                <span className="underline"> {participantName} </span>
            </Title>

            {questions.map((question, questionIndex) => {
                const answer = answers.find((answer) => answer.questionId === question.id);
                return (
                    <div key={answer?.questionId} className="mb-4">
                        <p className="font-semibold mb-2">{question.value}</p>
                        <FormInput
                            value={answer?.value}
                            onChange={(answerValue) =>
                                handleAnswerChange(questionIndex, answerValue)
                            }
                        />
                    </div>
                );
            })}

            <div className="flex justify-center">
                {isSaved ? (
                    <div className="bg-green-500 text-white rounded-full border-2 border-green-500">
                        {' '}
                        <FiCheckCircle />{' '}
                    </div>
                ) : (
                    <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
                        {isSaveLoading ? <Loader /> : t('save')}
                    </button>
                )}
            </div>
        </div>
    );
};
