import { FC, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader';
import { Title } from '../../shared/components/Title';
import { SecondaryButton } from '../../shared/components/buttons/SecondaryButton';
import { ReviewAnswersForQuestion } from './AnswersReview';
import { useReview } from './useReview.hook';

export const ReviewPage: FC = () => {
    const { questionnaireId } = useParams();
    const [participantIndex, setParticipantIndex] = useState(0);

    const { questions, participantNames, isLoading } = useReview(Number(questionnaireId));
    const participantName = participantNames[participantIndex];

    const onGoPrevious = () => setParticipantIndex((i) => i - 1);
    const onGoNext = () => setParticipantIndex((i) => i + 1);

    const shouldLeftButtonHidden = participantIndex <= 0;
    const shouldRightButtonHidden = participantIndex >= participantNames.length - 1;

    return (
        <div className="grid gap-8">
            <Title> Review </Title>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex justify-center gap-2">
                    <SecondaryButton
                        onClick={onGoPrevious}
                        className={`${shouldLeftButtonHidden ? 'invisible' : 'visible'}`}
                    >
                        <FiArrowLeft />
                    </SecondaryButton>
                    <ReviewAnswersForQuestion
                        participantName={participantName!}
                        questions={questions}
                    />
                    <SecondaryButton
                        onClick={onGoNext}
                        className={`${shouldRightButtonHidden ? 'invisible' : 'visible'}`}
                    >
                        <FiArrowRight />
                    </SecondaryButton>
                </div>
            )}
        </div>
    );
};
