import { FormInput } from '@freizz/client/shared/components/FormInput';
import { Title } from '@freizz/client/shared/components/Title';
import { PrimaryButton } from '@freizz/client/shared/components/buttons/PrimaryButton';
import { useUserStore } from '@freizz/client/store/user.store';
import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type HomePageProps = {};
export const HomePage: FC<HomePageProps> = () => {
    const questionnaireNameInputRef = useRef<HTMLInputElement | null>(null);

    const { username, setUsername } = useUserStore();

    const navigate = useNavigate();

    const handleUserNameChange = (name: string) => {
        setUsername(name);
    };

    const handleQuestionnareLoad = () => {
        const name = questionnaireNameInputRef.current?.value;
        navigate(`/answers/${name}/${username}`);
    };

    return (
        <div className="grid gap-8">
            <Title> Enter your name : </Title>
            <FormInput placeholder="Your name" value={username} onChange={handleUserNameChange} />

            {username && (
                <>
                    <PrimaryButton onClick={() => navigate('/questionnaire/create')}>
                        Create new questionnaire
                    </PrimaryButton>

                    <div>
                        <Title> Or select an existing questionnaire : </Title>

                        <div className="flex gap-2">
                            <FormInput
                                placeholder="Questionnaire's name"
                                inputRef={questionnaireNameInputRef}
                            />
                            <PrimaryButton onClick={handleQuestionnareLoad}>Load</PrimaryButton>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
