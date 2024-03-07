import { Title } from '@freizz/client/shared/components/Title';
import { SecondaryButton } from '@freizz/client/shared/components/buttons/SecondaryButton';
import { FC } from 'react';
import { FiClipboard } from 'react-icons/fi';
import { generatePath } from 'react-router-dom';

type ParticipantLinksProps = {
    questionsSetName: string;
    participantNames: string[];
};
export const ParticipantLinks: FC<ParticipantLinksProps> = ({
    questionsSetName,
    participantNames,
}) => {
    return (
        <div className="grid">
            <Title> Links to answers pages </Title>
            {participantNames
                .map((participantName) => ({
                    participantName,
                    path: generatePath(
                        `${window.location.origin}/questionnaire/:questionsSetName/participant/:participantName`,
                        { questionsSetName, participantName },
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
    );
};
