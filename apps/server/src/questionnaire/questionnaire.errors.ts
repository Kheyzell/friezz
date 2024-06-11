import { ResultError } from "@friezz/common";

export class QuestionnaireError extends ResultError {
    static creation = new QuestionnaireError("Questionnaire.creation", "Could not create questionnaire");
    static update = new QuestionnaireError("Questionnaire.update", "Could not update questionnaire");
    static saveAnswers = new QuestionnaireError("Questionnaire.saveAnswers", "Could not save answers");
}