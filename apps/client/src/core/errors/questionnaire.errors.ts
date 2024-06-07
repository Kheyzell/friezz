import { ResultError } from '@friezz/common';

export class QuestionnaireError extends ResultError {
    static notFound = new QuestionnaireError(
        'QuestionnaireError.notFound',
        'Questionnaire not found',
    );
}
