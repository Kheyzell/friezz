import { Loader } from '@freizz/client/shared/components/Loader';
import { useQuestionnaireStore } from '@freizz/client/store/questionnaire.store';
import { Questionnaire } from '@friezz/common';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { QuestionnaireForm } from './components/QuestionnaireForm';
import { useQuestionnaire } from './useQuestionnaire.hook';

type SaveQuestionnairePageProps = { isCreation?: boolean };
export const SaveQuestionnairePage: FC<SaveQuestionnairePageProps> = ({ isCreation }) => {
    const { t } = useTranslation();
    const { questionnaireId } = useParams();

    const { setCurrentQuestionnaire } = useQuestionnaireStore();
    const { questionnaire, isLoading, saveQuestionnaire } = useQuestionnaire(
        Number(questionnaireId),
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (isCreation) {
            setCurrentQuestionnaire(); // reset questionnaire store
        }
    }, [isCreation]);

    const handleQuestionFormSave = (questionnaire: Questionnaire) => {
        saveQuestionnaire(questionnaire).then(({ data, error }) => {
            if (error) {
                return toast.error(
                    t('saveQuestionnairePage.saveError', { name: questionnaire.name }),
                );
            }

            toast.success(t('saveQuestionnairePage.saveSuccess', { name: questionnaire.name }));
            navigate(`/questionnaire/${data?.id}/links`);
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <QuestionnaireForm initialQuestionnaire={questionnaire} onSave={handleQuestionFormSave} />
    );
};
