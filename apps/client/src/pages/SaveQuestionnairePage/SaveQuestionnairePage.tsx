import { Loader } from '@freizz/client/shared/components/Loader';
import { useUserStore } from '@freizz/client/store/user.store';
import { Questionnaire } from '@friezz/common';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { QuestionnaireForm } from './components/QuestionnaireForm';
import { useQuestionnaire } from './useQuestionnaire.hook';

export const SaveQuestionnairePage: FC = () => {
    const { username } = useUserStore();
    const { questionnaireName } = useParams();

    const { questionnaire, isLoading, saveQuestionnaire } = useQuestionnaire(questionnaireName);

    const navigate = useNavigate();

    const handleQuestionFormSave = (questionnaire: Questionnaire) => {
        saveQuestionnaire(questionnaire).then(({ error }) => {
            if (error) {
                return toast.error(`Questionnaire ${questionnaire.name} couldn't be saved.`);
            }

            toast.success(`Questionnaire ${questionnaire.name} has been successfully saved.`);
            navigate(`/questionnaire/${questionnaire.name}/participant/${username}`);
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <QuestionnaireForm initialQuestionnaire={questionnaire} onSave={handleQuestionFormSave} />
    );
};
