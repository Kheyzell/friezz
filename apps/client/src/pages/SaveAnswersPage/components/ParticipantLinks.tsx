import { Title } from '@freizz/client/shared/components/Title';
import { SecondaryButton } from '@freizz/client/shared/components/buttons/SecondaryButton';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FiClipboard } from 'react-icons/fi';
import { generatePath } from 'react-router-dom';
import { toast } from 'sonner';

type ParticipantLinksProps = {
    questionnaireId: number;
    participantNames: string[];
};
export const ParticipantLinks: FC<ParticipantLinksProps> = ({
    questionnaireId,
    participantNames,
}) => {
    const { t } = useTranslation();

    const handleCopyLinkToClipboard = (participantName: string, path: string) => {
        navigator.clipboard.writeText(path);
        toast.info(t('saveAnswersPage.participantLinks.linkCopied', { participantName }));
    };

    return (
        <div className="grid">
            <Title>{t('saveAnswersPage.participantLinks.linksToAnswersPagesTitle')}</Title>
            <div className="grid gap-2">
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
                                <SecondaryButton
                                    onClick={() => handleCopyLinkToClipboard(participantName, path)}
                                >
                                    <FiClipboard />
                                </SecondaryButton>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
