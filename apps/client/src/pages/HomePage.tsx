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

type HomePageProps = {};
export const HomePage: FC<HomePageProps> = () => {
    const { t } = useTranslation();
    const questionnaireNameInputRef = useRef<HTMLInputElement | null>(null);
    const { username, setUsername } = useUserStore();
    const navigate = useNavigate();

    const handleUserNameChange = (name: string) => {
        setUsername(name);
    };

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
        <div className="grid gap-8">
            <Title>{t('homePage.enterName')}</Title>
            <FormInput
                placeholder={t('homePage.yourName')}
                value={username}
                onChange={handleUserNameChange}
            />

            {username && (
                <>
                    <PrimaryButton onClick={() => navigate('/questionnaire/create')}>
                        {t('homePage.createNewQuestionnaire')}
                    </PrimaryButton>

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
                </>
            )}

            <div className="flex justify-end">
                <LangSelector />
            </div>
        </div>
    );
};
