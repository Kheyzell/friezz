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

    const otherParticipants = participantNames.filter(participantName => participantName != username);

    return (
        <>
            <div className='text-xl'> Answer the questions </div>

            <div key={`${username}_`} className={`rounded-2xl border-2 border-cyan-300`}>
                <AnswerForm participantName={username} questions={questions} />
            </div>

            <div className='mt-8 text-xl'> Now, guess what the others have replied </div>
            {otherParticipants.map((participantName, index) => {
                return (
                    <div key={`${participantName}_${index}`} className={`border rounded-2xl border-cyan-800`}>
                        <AnswerForm participantName={participantName} questions={questions} />
                    </div>
                );
            })}
        </>
    );
};
