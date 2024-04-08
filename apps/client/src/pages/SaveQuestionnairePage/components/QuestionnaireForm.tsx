import { DEFAULT_QUESTIONS } from '@freizz/client/constants/questions.const';
import { FormInput } from '@freizz/client/shared/components/FormInput';
import { Title } from '@freizz/client/shared/components/Title';
import { PrimaryButton } from '@freizz/client/shared/components/buttons/PrimaryButton';
import { useUserStore } from '@freizz/client/store/user.store';
import { Question, Questionnaire } from '@friezz/common';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getElementsAtRandomFromArray } from '../../../shared/array.utils';
import { DEFAULT_QUESTIONNAIRE } from '../questions.const';
import { OtherParticipantNamesForm } from './ParticipantNamesForm';
import { QuestionsForm } from './QuestionsForm';
import { useQuestionnaireForm } from './useQuestionnaireForm.hook';

type QuestionnaireFormProps = {
    initialQuestionnaire?: Questionnaire | null;
    onSave: (questionnaire: Questionnaire) => void;
};
export const QuestionnaireForm: FC<QuestionnaireFormProps> = ({ initialQuestionnaire, onSave }) => {
    const { t, i18n } = useTranslation();
    const { username, setUsername } = useUserStore();

    const randomQuestions = getElementsAtRandomFromArray(
        DEFAULT_QUESTIONS[i18n.language] || DEFAULT_QUESTIONS['en'],
        5,
    ).map((value) => ({
        value,
        creatorName: '',
        answers: [],
    }));
    const questionnaire = initialQuestionnaire ?? {
        ...DEFAULT_QUESTIONNAIRE,
        questions: randomQuestions,
        creatorName: username,
        participantNames: username ? [username] : [],
    };

    const {
        creatorName,
        questionnaireName,
        otherParticipantNames,
        questions,
        setCreatorName,
        setQuestionnaireName,
        setOtherParticipantNames,
        setQuestions,
    } = useQuestionnaireForm(questionnaire);

    const handleCreatorNameChange = (creatorName: string) => {
        setUsername(creatorName);
        setCreatorName(creatorName);
    };

    const handleQuestionnaireNameChange = (name: string) => {
        setQuestionnaireName(name);
    };

    const handleOtherParticipantNamesChange = (otherParticipantNames: string[]) => {
        setOtherParticipantNames(otherParticipantNames);
    };

    const handleQuestionsChange = (questions: Question[]) => {
        setQuestions(questions);
    };

    const handleSave = () => {
        onSave({
            name: questionnaireName,
            creatorName,
            participantNames: [creatorName, ...otherParticipantNames],
            questions,
        });
    };

    return (
        <div className="p-4">
            <div className="flex flex-col gap-8">
                <div>
                    <Title>{t('saveQuestionnairePage.enterName')}</Title>
                    <FormInput
                        placeholder={t('saveQuestionnairePage.yourName')}
                        value={username}
                        onChange={handleCreatorNameChange}
                    />
                </div>

                <div>
                    <Title> {t('saveQuestionnairePage.questionnaireForm.title')} </Title>
                    <FormInput
                        value={questionnaireName}
                        onChange={handleQuestionnaireNameChange}
                        placeholder={t(
                            'saveQuestionnairePage.questionnaireForm.questionnaireNamePlaceholder',
                        )}
                    />
                </div>

                {!!username && (
                    <>
                        <OtherParticipantNamesForm
                            initialParticipantNames={otherParticipantNames}
                            onParticipantsChange={handleOtherParticipantNamesChange}
                        />

                        <QuestionsForm
                            questions={questions}
                            onQuestionsChange={handleQuestionsChange}
                        />

                        <PrimaryButton onClick={handleSave}>{t('save')}</PrimaryButton>
                    </>
                )}
            </div>
        </div>
    );
};
