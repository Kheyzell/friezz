import { PrimaryButton } from '@freizz/client/shared/components/buttons/PrimaryButton';
import { FC, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader';
import { Title } from '../../shared/components/Title';
import { SecondaryButton } from '../../shared/components/buttons/SecondaryButton';
import { ReviewAnswers } from './components/AnswersReview/ReviewAnswers';
import { useReview } from './useReview.hook';

export const ReviewPage: FC = () => {
    const navigate = useNavigate();

    const { questionnaireId } = useParams();
    const [participantIndex, setParticipantIndex] = useState(0);

    const { questions, participantNames, isLoading } = useReview(Number(questionnaireId));
    const participantName = participantNames[participantIndex];

    const onGoPrevious = () => setParticipantIndex((i) => i - 1);
    const onGoNext = () => setParticipantIndex((i) => i + 1);

    const isFirstParticipant = participantIndex <= 0;
    const isLastParticipant = participantIndex >= participantNames.length - 1;

    const onShowScores = () => navigate(`/questionnaire/${questionnaireId}/scores`);

    return (
        <div className="grid gap-8">
            <Title> Review </Title>

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex justify-center gap-2">
                        <SecondaryButton
                            onClick={onGoPrevious}
                            className={`${isFirstParticipant ? 'invisible' : 'visible'}`}
                        >
                            <FiArrowLeft />
                        </SecondaryButton>

                        <ReviewAnswers
                            participantName={participantName!}
                            questions={questions}
                        />

                        <SecondaryButton
                            onClick={onGoNext}
                            className={`${isLastParticipant ? 'invisible' : 'visible'}`}
                        >
                            <FiArrowRight />
                        </SecondaryButton>
                    </div>

                    {isLastParticipant && (<div><PrimaryButton onClick={onShowScores}> Show scores </PrimaryButton></div>)}
                </>
            )}
        </div>
    );
};
