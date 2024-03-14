import { Loader } from '@freizz/client/shared/components/Loader';
import { Title } from '@freizz/client/shared/components/Title';
import { PrimaryButton } from '@freizz/client/shared/components/buttons/PrimaryButton';
import { SecondaryButton } from '@freizz/client/shared/components/buttons/SecondaryButton';
import { useUserStore } from '@freizz/client/store/user.store';
import { FC, useEffect, useState } from 'react';
import { FiEdit, FiLink2 } from 'react-icons/fi';
import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestionnaire } from '../SaveQuestionnairePage/useQuestionnaire.hook';
import { ParticipantLinks } from './components/ParticipantLinks';
import { ParticipantQuestionList } from './components/ParticipantQuestionList';

export const AnswersPage: FC = () => {
    const { username, setUsername } = useUserStore();

    const navigate = useNavigate();
    const { questionnaireId, participantName: participantNameParam } = useParams();

    const { questionnaire, isLoading } = useQuestionnaire(Number(questionnaireId));

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!username) {
            setUsername(participantNameParam ?? '');
        }
    }, [participantNameParam]);

    const onEditClick = () => navigate(`/questionnaire/edit/${questionnaire?.id}`);

    const openModal = () => setIsModalOpen(true);
    const onCloseModal = () => setIsModalOpen(false);
    const onReviewQuestionnaire = () => navigate(`/questionnaire/review/${questionnaire?.id}`);

    if (!questionnaire) {
        return <div>No questionnaire found</div>;
    }

    return (
        <>
            <Title> {questionnaire?.name} </Title>
            <div className="flex gap-2 items-center justify-center">
                <SecondaryButton onClick={onEditClick}>
                    <FiEdit />
                </SecondaryButton>
                <SecondaryButton onClick={openModal}>
                    <FiLink2 />
                </SecondaryButton>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid gap-4 mt-4">
                    <ParticipantQuestionList questionnaire={questionnaire} />

                    {questionnaire.creatorName === username && (
                        <PrimaryButton onClick={onReviewQuestionnaire}>
                            Review questionnaire
                        </PrimaryButton>
                    )}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={onCloseModal}
                className="fixed max-w-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-gray-200 rounded-2xl p-4"
            >
                <ParticipantLinks
                    questionnaireId={questionnaire.id!}
                    participantNames={questionnaire.participantNames}
                />
            </Modal>
        </>
    );
};
