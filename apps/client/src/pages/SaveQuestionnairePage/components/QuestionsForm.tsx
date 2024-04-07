import { MultipleTextarea } from '@freizz/client/shared/components/MultipleTextsInput';
import { Question } from '@friezz/common';
import { useTranslation } from 'react-i18next';

type QuestionsFormProps = {
    questions: Question[];
    onQuestionsChange: (questions: Question[]) => void;
};
export const QuestionsForm: React.FC<QuestionsFormProps> = ({ questions, onQuestionsChange }) => {
    const { t } = useTranslation();

    const initialQuestionValues = questions.map(({ value }) => value);

    const onTextChange = (questionValues: string[]) => {
        onQuestionsChange(questionValues.map((value, index) => ({ ...questions[index], value })));
    };

    return (
        <MultipleTextarea
            title={t('saveQuestionnairePage.questionsForm.formTitle')}
            initialTexts={initialQuestionValues}
            onTextsChange={onTextChange}
        />
    );
};
