import { Question } from '@friezz/common';
import { FC } from 'react';
import { Title } from '../../shared/components/Title';

type AnswersReviewProps = {
    participantName: string;
    questions: Question[];
};
export const ReviewAnswersForQuestion: FC<AnswersReviewProps> = ({
    participantName,
    questions,
}) => {
    return (
        <div>
            <Title> {participantName} </Title>
            <div className="grid gap-6">
                {questions.map((question, questionIndex) => {
                    const answers = question.answers
                        .filter((answer) => answer.targetParticipantName === participantName)
                        .sort((answer) => (answer.creatorName === participantName ? -1 : 0));

                    return (
                        <div
                            key={questionIndex}
                            className={`p-4 border rounded-2xl border-cyan-800`}
                        >
                            <Title> {question.value} </Title>

                            {answers.map((answer) => {
                                const isUser = answer.creatorName === participantName;
                                return (
                                    <div
                                        key={answer.id}
                                        className={`flex gap-2 ${
                                            isUser ? 'text-cyan-400 font-bold' : ''
                                        }`}
                                    >
                                        <div> {answer.creatorName}: </div>
                                        <div> {answer?.value} </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
