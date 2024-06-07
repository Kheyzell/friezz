import {
    Answer,
    Questionnaire,
    Result,
    SaveAnswersDto,
    SaveQuestionnaireDto,
    fail,
    succeed,
} from '@friezz/common';
import { HttpResponseError } from '../errors/http-response.errors';
import { QuestionnaireError } from '../errors/questionnaire.errors';
import httpService from './http.service';

const QUESTIONNAIRES_API = 'questionnaires';
const ANSWERS_API = 'answers';

class QuestionnaireService {
    async getById(
        questionnaireId: number,
    ): Promise<Result<Questionnaire, HttpResponseError | QuestionnaireError>> {
        return (
            await httpService.get<Questionnaire>(`${QUESTIONNAIRES_API}/${questionnaireId}`)
        ).chain((questionnaire) => {
            if (!questionnaire) return fail(QuestionnaireError.notFound);

            return succeed(questionnaire);
        });
    }

    async getByName(
        questionnaireName: string,
    ): Promise<Result<Questionnaire, HttpResponseError | QuestionnaireError>> {
        return (
            await httpService.get<Questionnaire>(`${QUESTIONNAIRES_API}/name/${questionnaireName}`)
        ).chain((questionnaire) => {
            if (!questionnaire) return fail(QuestionnaireError.notFound);

            return succeed(questionnaire);
        });
    }

    async save(questionnaire: Questionnaire): Promise<Result<Questionnaire, HttpResponseError>> {
        const saveQuestionnaireDto = this.createDtoFromQuestionnaire(questionnaire);
        return questionnaire.id
            ? this.update(saveQuestionnaireDto)
            : this.create(saveQuestionnaireDto);
    }

    async saveAnswers(answers: Answer[]): Promise<Result<Answer[], HttpResponseError>> {
        const saveAnswerDto = this.createDtoFromAnswers(answers);
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}`, saveAnswerDto);
    }

    async validateAnswer(answerId: number): Promise<Result<void, HttpResponseError>> {
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}/${answerId}/validate`, null);
    }

    async rejectAnswer(answerId: number): Promise<Result<void, HttpResponseError>> {
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}/${answerId}/reject`, null);
    }

    async cancelAnswer(answerId: number): Promise<Result<void, HttpResponseError>> {
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}/${answerId}/cancel`, null);
    }

    async getQuestionnaireScores(
        questionnaireId: number,
    ): Promise<Result<Score[], HttpResponseError | QuestionnaireError>> {
        return (await this.getById(questionnaireId)).map((questionnaire) =>
            this.calculateScoreFromQuestionnaire(questionnaire),
        );
    }

    private async create(
        questionnaire: SaveQuestionnaireDto,
    ): Promise<Result<Questionnaire, HttpResponseError>> {
        return httpService.post(`${QUESTIONNAIRES_API}/create`, questionnaire);
    }

    private async update(
        questionnaire: SaveQuestionnaireDto,
    ): Promise<Result<Questionnaire, HttpResponseError>> {
        return httpService.post(`${QUESTIONNAIRES_API}/update`, questionnaire);
    }

    private createDtoFromQuestionnaire(questionnaire: Questionnaire): SaveQuestionnaireDto {
        return {
            ...questionnaire,
            questions: questionnaire.questions
                .filter(({ value }) => !!value)
                .map(({ id, value }) => ({ id, value })),
        };
    }

    private createDtoFromAnswers(answers: Answer[]): SaveAnswersDto {
        return { answers };
    }

    private calculateScoreFromQuestionnaire(questionnaire: Questionnaire): Score[] {
        const allAnswers = questionnaire.questions.map((question) => question.answers).flat();
        return questionnaire.participantNames.map((participantName) => ({
            participantName,
            value: allAnswers
                .filter((answer) => answer.creatorName === participantName)
                .filter((answer) => answer.isValid).length,
        }));
    }
}

const questionnaireService = new QuestionnaireService();
export default questionnaireService;
