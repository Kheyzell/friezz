import { MultipleTextsInput } from '@freizz/client/shared/components/MultipleTextsInput';
import { useTranslation } from 'react-i18next';

type ParticipantsFormProps = {
    initialParticipantNames: string[];
    onParticipantsChange: (participants: string[]) => void;
};
export const ParticipantNamesForm: React.FC<ParticipantsFormProps> = ({
    initialParticipantNames,
    onParticipantsChange,
}) => {
    const { t } = useTranslation();
    return (
        <MultipleTextsInput
            title={t('saveQuestionnairePage.participantNamesForm.formTitle')}
            initialTexts={initialParticipantNames}
            onTextsChange={onParticipantsChange}
            isFirstInputDisabled={true}
        />
    );
};
