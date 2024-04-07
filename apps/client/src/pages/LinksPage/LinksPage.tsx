import { useUserStore } from '@freizz/client/store/user.store';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader';
import { PrimaryButton } from '../../shared/components/buttons/PrimaryButton';
import { ParticipantLinks } from '../../shared/components/ParticipantLinks';
import { useQuestionnaire } from '../SaveQuestionnairePage/useQuestionnaire.hook';

export const LinksPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { username } = useUserStore();
    const { questionnaireId } = useParams();
    const { questionnaire, isLoading } = useQuestionnaire(Number(questionnaireId));

    const onShowAnswersPage = () =>
        navigate(
            `/questionnaire/${questionnaire?.id}/participant/${
                username ? username : questionnaire?.creatorName
            }`,
        );

    return (
        <div className="grid gap-8">
            {isLoading ? (
                <Loader />
            ) : (
                <ParticipantLinks
                    questionnaireId={questionnaire?.id ?? 0}
                    participantNames={questionnaire?.participantNames ?? []}
                />
            )}

            <PrimaryButton onClick={onShowAnswersPage}>{t('linksPage.showAnswers')}</PrimaryButton>
        </div>
    );
};
