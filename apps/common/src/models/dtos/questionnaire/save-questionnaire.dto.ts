import { Question, Questionnaire } from '../../questionnaire.model';

export type SaveQuestionnaireDto = Pick<
    Questionnaire,
    'id' | 'name' | 'creatorName' | 'participantNames'
> & {
    questions: Array<SaveQuestionDto>;
};
export type SaveQuestionDto = Pick<Question, 'id' | 'value'>;
