import { Title } from '@freizz/client/shared/components/Title';
import { SecondaryButton } from '@freizz/client/shared/components/buttons/SecondaryButton';
import { FC } from 'react';
import { FiClipboard } from 'react-icons/fi';
import { generatePath } from 'react-router-dom';

type ParticipantLinksProps = {
    questionnaireId: number;
    participantNames: string[];
};
export const ParticipantLinks: FC<ParticipantLinksProps> = ({
    questionnaireId,
    participantNames,
}) => {
    return (
        <div className="grid">
            <Title> Links to answers pages </Title>
            <div className='grid gap-2'>
                {participantNames
                    .map((participantName) => ({
                        participantName,
                        path: generatePath(
                            `${window.location.origin}/questionnaire/:questionnaireId/participant/:participantName`,
                            { questionnaireId: questionnaireId.toString(), participantName },
                        ),
                    }))
                    .map(({ participantName, path }, index) => (
                        <div key={index} className="grid grid-cols-2">
                            {participantName}:
                            <div>
                                <SecondaryButton onClick={() => navigator.clipboard.writeText(path)}>
                                    <FiClipboard />
                                </SecondaryButton>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
