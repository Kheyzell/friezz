import { useUserStore } from '@freizz/client/store/user.store';
import { Questionnaire } from '@friezz/common';
import { FC } from 'react';
import { AnswerForm } from './AnswerForm/AnswerForm';

type ParticipantQuestionListProps = {
    questionnaire: Questionnaire;
};
export const ParticipantQuestionList: FC<ParticipantQuestionListProps> = ({ questionnaire }) => {
    const { username } = useUserStore();

    const { participantNames, questions } = questionnaire;

    const orderUserFirst = (p1: string, p2: string) => {
        if (p1 === username) return -1;
        if (p2 === username) return 1;
        return 0;
    };

    return (
        <>
            {participantNames.sort(orderUserFirst).map((participantName, index) => {
                const isUser = username === participantName;
                return (
                    <div
                        key={`${participantName}_${index}`}
                        className={`border rounded-2xl border-cyan-800 ${
                            isUser ? 'border-2 border-cyan-300' : ''
                        }`}
                    >
                        <AnswerForm participantName={participantName} questions={questions} />
                    </div>
                );
            })}
        </>
    );
};
