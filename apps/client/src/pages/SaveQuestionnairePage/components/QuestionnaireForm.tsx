import { DEFAULT_QUESTIONS } from '@freizz/client/constants/questions.const';
import { FormInput } from '@freizz/client/shared/components/FormInput';
import { Title } from '@freizz/client/shared/components/Title';
import { PrimaryButton } from '@freizz/client/shared/components/buttons/PrimaryButton';
import { useUserStore } from '@freizz/client/store/user.store';
import { Question, Questionnaire } from '@friezz/common';
import React, { useState } from 'react';
import { getElementsAtRandomFromArray } from '../../../shared/array.utils';
import { DEFAULT_QUESTIONNAIRE } from '../questions.const';
import { ParticipantNamesForm } from './ParticipantNamesForm';
import { QuestionsForm } from './QuestionsForm';

type QuestionnaireFormProps = {
    initialQuestionnaire?: Questionnaire | null;
    onSave: (questionnaire: Questionnaire) => void;
};
export const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
    initialQuestionnaire,
    onSave,
}) => {
    const { username } = useUserStore();

    const [questionnaire, setQuestionnaire] = useState<Questionnaire>(
        initialQuestionnaire ?? {
            ...DEFAULT_QUESTIONNAIRE,
            questions: getElementsAtRandomFromArray(DEFAULT_QUESTIONS, 5).map(value => ({
                value,
                creatorName: '',
                answers: [],
            })),
            creatorName: username,
            participantNames: [username],
        },
    );

    const handleNameChange = (name: string) => {
        setQuestionnaire((prev) => ({ ...prev, name }));
    };

    const handleParticipantNamesChange = (participantNames: string[]) => {
        setQuestionnaire((prev) => ({ ...prev, participantNames }));
    };

    const handleQuestionsChange = (questions: Question[]) => {
        setQuestionnaire((prev) => ({ ...prev, questions }));
    };

    const handleSave = () => {
        onSave(questionnaire);
    };

    return (
        <div className="p-4">
            <div className="flex flex-col gap-8">
                <div>
                    <Title> Questionnaire: </Title>
                    <FormInput
                        value={questionnaire.name}
                        onChange={handleNameChange}
                        placeholder="Name..."
                    />
                </div>

                <ParticipantNamesForm
                    initialParticipantNames={[...questionnaire.participantNames]}
                    onParticipantsChange={handleParticipantNamesChange}
                />

                <QuestionsForm
                    questions={[...questionnaire.questions]}
                    onQuestionsChange={handleQuestionsChange}
                />

                <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
            </div>
        </div>
    );
};
