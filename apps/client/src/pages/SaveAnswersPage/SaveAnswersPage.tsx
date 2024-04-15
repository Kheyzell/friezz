import { HowToModal } from '@freizz/client/shared/components/HowToModal';
import { Loader } from '@freizz/client/shared/components/Loader';
import { Title } from '@freizz/client/shared/components/Title';
import { PrimaryButton } from '@freizz/client/shared/components/buttons/PrimaryButton';
import { SecondaryButton } from '@freizz/client/shared/components/buttons/SecondaryButton';
import { useUserStore } from '@freizz/client/store/user.store';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiLink2 } from 'react-icons/fi';
import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { ParticipantLinks } from '../../shared/components/ParticipantLinks';
import { useQuestionnaire } from '../SaveQuestionnairePage/useQuestionnaire.hook';
import { ParticipantQuestionList } from './components/ParticipantQuestionList';

export const SaveAnswersPage: FC = () => {
    const { t } = useTranslation();
    const { username, setUsername } = useUserStore();

    const navigate = useNavigate();
    const { questionnaireId, participantName: participantNameParam } = useParams();

    const { questionnaire, isLoading } = useQuestionnaire(Number(questionnaireId));

    const [isParticipantLinksModalOpen, setIsParticipantLinksModalOpen] = useState(false);
    const [isHowToModalOpen, setIsHowToModalOpen] = useState(false);

    useEffect(() => {
        if (!username) {
            setUsername(participantNameParam ?? '');
        }
    }, [participantNameParam]);

    const onEditClick = () => navigate(`/questionnaire/edit/${questionnaire?.id}`);

    const openParticipantLinksModal = () => setIsParticipantLinksModalOpen(true);
    const openHowToModal = () => setIsHowToModalOpen(true);
    const onCloseParticipantLinksModal = () => setIsParticipantLinksModalOpen(false);
    const onCloseHowToModal = () => setIsHowToModalOpen(false);
    const onReviewQuestionnaire = () => navigate(`/questionnaire/${questionnaire?.id}/review`);

    if (!questionnaire) {
        return <div>{t('saveAnswersPage.noQuestionnaireFound')}</div>;
    }

    return (
        <>
            <Title> {questionnaire?.name} </Title>
            <div className="flex gap-2 items-center justify-center">
                <SecondaryButton onClick={onEditClick}>
                    <FiEdit />
                </SecondaryButton>
                <SecondaryButton onClick={openParticipantLinksModal}>
                    <FiLink2 />
                </SecondaryButton>
                <SecondaryButton
                    className="w-8 h-8 flex justify-center items-center"
                    onClick={openHowToModal}
                >
                    ?
                </SecondaryButton>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid gap-4 mt-4">
                    <ParticipantQuestionList questionnaire={questionnaire} />

                    {questionnaire.creatorName === username && (
                        <PrimaryButton onClick={onReviewQuestionnaire}>
                            {t('saveAnswersPage.reviewQuestionnaire')}
                        </PrimaryButton>
                    )}
                </div>
            )}

            <Modal
                isOpen={isParticipantLinksModalOpen}
                onRequestClose={onCloseParticipantLinksModal}
                className="fixed max-w-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-2xl p-4"
            >
                <ParticipantLinks
                    questionnaireId={questionnaire.id!}
                    participantNames={questionnaire.participantNames}
                />
            </Modal>

            <HowToModal isModalOpen={isHowToModalOpen} onCloseModal={onCloseHowToModal} />
        </>
    );
};
