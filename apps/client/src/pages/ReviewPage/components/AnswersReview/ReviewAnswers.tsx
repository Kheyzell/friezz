import { Question } from '@friezz/common';
import { FC } from 'react';
import { Title } from '../../../../shared/components/Title';
import { AnswerReview } from './AnswerReview';

type AnswersReviewProps = {
    participantName: string;
    questions: Question[];
};
export const ReviewAnswers: FC<AnswersReviewProps> = ({
    participantName,
    questions,
}) => (
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

                        <div className='grid gap-2'>
                            {answers.map((answer) =>
                                <AnswerReview key={answer.id} answer={answer} participantName={participantName} />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);