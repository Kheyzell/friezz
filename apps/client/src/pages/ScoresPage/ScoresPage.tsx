import { useUserStore } from '@freizz/client/store/user.store';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader';
import { Title } from '../../shared/components/Title';
import { useScores } from './useScores.hook';

export const ScoresPage: FC = () => {
    const { t } = useTranslation();
    const { questionnaireId } = useParams();
    const { scores, isLoading } = useScores(Number(questionnaireId));

    return (
        <div className="grid gap-8">
            <Title> {t('scoresPage.title')} </Title>

            {isLoading ? <Loader /> : <ScoreTable scores={scores ?? []} />}
        </div>
    );
};

type ScoreTableProps = { scores: Score[] };
const ScoreTable: FC<ScoreTableProps> = ({ scores }) => {
    const { username } = useUserStore();
    return (
        <div className="p-4 border rounded-2xl border-cyan-800">
            {scores
                .sort((s1, s2) => s2.value - s1.value)
                .map((score, index) => (
                    <div
                        key={index}
                        className={`flex gap-2 items-center ${
                            score.participantName === username ? 'text-cyan-4w00 font-bold' : ''
                        }`}
                    >
                        <div className="font-bold"> {score.participantName}: </div>
                        <div className="text-green-500"> {score.value} </div>
                    </div>
                ))}
        </div>
    );
};
