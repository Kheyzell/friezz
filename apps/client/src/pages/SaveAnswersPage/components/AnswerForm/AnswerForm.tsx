import { FormInput } from '@freizz/client/shared/components/FormInput';
import { Loader } from '@freizz/client/shared/components/Loader';
import { Title } from '@freizz/client/shared/components/Title';
import { useUserStore } from '@freizz/client/store/user.store';
import { Question } from '@friezz/common';
import React from 'react';
import { useAnswerForm } from './useAnswerForm.hook';

type AnswerFormProps = {
    participantName: string;
    questions: Question[];
};
export const AnswerForm: React.FC<AnswerFormProps> = ({ participantName, questions }) => {
    const { username } = useUserStore();

    const { answers, setAnswers, saveAnswers, isSaveLoading } = useAnswerForm(
        username,
        participantName,
        questions,
    );

    const handleAnswerChange = (questionIndex: number, answerValue: string) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex].value = answerValue;
        setAnswers(newAnswers);
    };

    const handleSave = () => {
        saveAnswers(answers);
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
            <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
                {isSaveLoading ? <Loader /> : 'Save'}
            </button>
        </div>
    );
};
