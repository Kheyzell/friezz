import { MultipleTextsInput } from '@freizz/client/shared/components/MultipleTextsInput';
import { Question } from '@friezz/common';

type QuestionsFormProps = {
    questions: Question[];
    onQuestionsChange: (questions: Question[]) => void;
};
export const QuestionsForm: React.FC<QuestionsFormProps> = ({ questions, onQuestionsChange }) => {
    const initialQuestionValues = questions.map(({ value }) => value);

    const onTextChange = (questionValues: string[]) => {
        onQuestionsChange(
            questionValues.map((value, index) => ({ ...questions[index], value })),
        );
    };

    return (
        <MultipleTextsInput
            title="Questions:"
            initialTexts={initialQuestionValues}
            onTextsChange={onTextChange}
        />
    );
};
