import { RemoveButton } from '@freizz/client/shared/components/buttons/RemoveButton';
import { Answer } from '@friezz/common';
import { FC } from 'react';
import { FiCheckCircle, FiThumbsDown, FiThumbsUp, FiX, FiXCircle } from 'react-icons/fi';
import { useAnswerReview } from './useAnswerReview.hook';

type AnswerProps = {
    answer: Answer,
    participantName: string,
};
export const AnswerReview: FC<AnswerProps> = ({ answer: answerProp, participantName }) => {
    const { answer, validate, reject, cancel } = useAnswerReview(answerProp);

    const handleValidateAnswer = () => validate();
    const handleRejectAnswer = () => reject();
    const handleCancelAnswer = () => cancel();

    const isUser = answer.creatorName === participantName;
    return (
        <div className='flex gap-2 items-center'>
            <div className={`flex gap-2 items-center ${isUser ? 'text-cyan-4w00 font-bold' : ''}`}>
                <div> {answer.creatorName}: </div>
                <div> {answer.value} </div>

                {!isUser && <>
                    {answer.isValid === true && (<div className='text-green-500'><FiCheckCircle /></div>)}
                    {answer.isValid === false && (<div className='text-red-500'><FiXCircle /></div>)}
                </>}
            </div>

            {!isUser &&
                <div className='ml-auto'>
                    {answer.isValid !== true && answer.isValid !== false
                        ? <div className='flex gap-1'>
                            <button onClick={handleValidateAnswer} className='p-1 rounded border-2 border-green-500 text-green-500'> <FiThumbsUp /> </button>
                            <button onClick={handleRejectAnswer} className='p-1 rounded border-2 border-red-500 text-red-500'> <FiThumbsDown /> </button>
                        </div>
                        : (<RemoveButton onClick={handleCancelAnswer}> <FiX /> </RemoveButton>)
                    }
                </div>
            }
        </div>
    );
};