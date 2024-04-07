import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { FormInput } from '@freizz/client/shared/components/FormInput';
import LangSelector from '@freizz/client/shared/components/LangSelector';
import { Title } from '@freizz/client/shared/components/Title';
import { PrimaryButton } from '@freizz/client/shared/components/buttons/PrimaryButton';
import { useUserStore } from '@freizz/client/store/user.store';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const HomePage: FC = () => {
    const { t } = useTranslation();
    const questionnaireNameInputRef = useRef<HTMLInputElement | null>(null);
    const { username } = useUserStore();
    const navigate = useNavigate();

    const handleQuestionnareLoad = () => {
        const name = questionnaireNameInputRef.current?.value;
        if (name) {
            questionnaireService.getByName(name).then(({ data: questionnaire }) => {
                if (!questionnaire) {
                    return toast.error(t('error.questionnaireNotFound', { name }));
                }
                navigate(`/questionnaire/${questionnaire?.id}/participant/${username}`);
            });
        }
    };

    return (
        <div className="flex flex-col justify-between gap-8 h-[calc(100vh-112px)]">
            <div className="mt-8 flex-1 max-h-96 flex flex-col justify-center lg:justify-start gap-8">
                <PrimaryButton onClick={() => navigate('/questionnaire/create')}>
                    {t('homePage.createNewQuestionnaire')}
                </PrimaryButton>

                {username && (
                    <div>
                        <Title>{t('homePage.selectExistingQuestionnaire')}</Title>

                        <div className="flex gap-2">
                            <FormInput
                                placeholder={t('homePage.questionnaireName')}
                                inputRef={questionnaireNameInputRef}
                            />
                            <PrimaryButton onClick={handleQuestionnareLoad}>
                                {t('homePage.load')}
                            </PrimaryButton>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <LangSelector />
            </div>
        </div>
    );
};
