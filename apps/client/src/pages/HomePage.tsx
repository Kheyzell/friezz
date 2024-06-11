import questionnaireService from '@freizz/client/core/services/questionnaire.service';
import { FormInput } from '@freizz/client/shared/components/FormInput';
import LangSelector from '@freizz/client/shared/components/LangSelector';
import { Title } from '@freizz/client/shared/components/Title';
import { PrimaryButton } from '@freizz/client/shared/components/buttons/PrimaryButton';
import { useUserStore } from '@freizz/client/store/user.store';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { HowToModal } from '../shared/components/HowToModal';
import { SecondaryButton } from '../shared/components/buttons/SecondaryButton';

export const HomePage: FC = () => {
    const { t } = useTranslation();
    const questionnaireNameInputRef = useRef<HTMLInputElement | null>(null);
    const { username } = useUserStore();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleQuestionnareLoad = async () => {
        const name = questionnaireNameInputRef.current?.value;
        if (name) {
            (await questionnaireService.getByName(name)).match({
                ok: (questionnaire) =>
                    navigate(`/questionnaire/${questionnaire.id}/participant/${username}`),
                err: () => toast.error(t('error.questionnaireNotFound', { name })),
            });
        }
    };

    const onOpenModal = () => setIsModalOpen(true);
    const onCloseModal = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col justify-between gap-8 h-[calc(100vh-112px)]">
            <div className="flex flex-col gap-4 items-center">
                <div className="border-2 rounded-xl border-gray-300 bg-gray-100 p-2">
                    {' '}
                    {t('homePage.description')}{' '}
                </div>
                <SecondaryButton className="w-fit" onClick={onOpenModal}>
                    {' '}
                    {t('homePage.howTo')}{' '}
                </SecondaryButton>
            </div>

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

            <HowToModal isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
        </div>
    );
};
