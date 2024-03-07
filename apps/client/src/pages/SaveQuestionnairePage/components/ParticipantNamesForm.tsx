import { MultipleTextsInput } from '@freizz/client/shared/components/MultipleTextsInput';

type ParticipantsFormProps = {
    initialParticipantNames: string[];
    onParticipantsChange: (participants: string[]) => void;
};
export const ParticipantNamesForm: React.FC<ParticipantsFormProps> = ({
    initialParticipantNames,
    onParticipantsChange,
}) => (
    <MultipleTextsInput
        title="Participants:"
        initialTexts={initialParticipantNames}
        onTextsChange={onParticipantsChange}
    />
);
