import { HttpResponse } from '@freizz/client/models/http-response';
import { Answer, Questionnaire, SaveAnswersDto, SaveQuestionnaireDto } from '@friezz/common';
import httpService from './http.service';

const QUESTIONNAIRES_API = 'questionnaires';
const ANSWERS_API = 'answers';

class QuestionnaireService {
    async getById(questionnaireId: number): Promise<HttpResponse<Questionnaire>> {
        return httpService.get<Questionnaire>(`${QUESTIONNAIRES_API}/${questionnaireId}`);
    }

    async getByName(questionnaireName: string): Promise<HttpResponse<Questionnaire>> {
        return httpService.get<Questionnaire>(`${QUESTIONNAIRES_API}/name/${questionnaireName}`);
    }

    async save(questionnaire: Questionnaire): Promise<HttpResponse<Questionnaire>> {
        const saveQuestionnaireDto = this.createDtoFromQuestionnaire(questionnaire);
        return questionnaire.id
            ? this.update(saveQuestionnaireDto)
            : this.create(saveQuestionnaireDto);
    }

    async saveAnswers(answers: Answer[]): Promise<HttpResponse<Answer[]>> {
        const saveAnswerDto = this.createDtoFromAnswers(answers);
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}`, saveAnswerDto);
    }

    async validateAnswer(answerId: number): Promise<HttpResponse<void>> {
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}/${answerId}/validate`, null);
    }

    async rejectAnswer(answerId: number): Promise<HttpResponse<void>> {
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}/${answerId}/reject`, null);
    }

    async cancelAnswer(answerId: number): Promise<HttpResponse<void>> {
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}/${answerId}/cancel`, null);
    }

    async getQuestionnaireScores(questionnaireId: number): Promise<HttpResponse<Score[]>> {
        const { data: questionnaire, error } = await this.getById(questionnaireId);
        if (!questionnaire || error) {
            return { data: [], error };
        }

        const scores = this.calculateScoreFromQuestionnaire(questionnaire);
        return { data: scores };
    }

    private async create(
        questionnaire: SaveQuestionnaireDto,
    ): Promise<HttpResponse<Questionnaire>> {
        return httpService.post(`${QUESTIONNAIRES_API}/create`, questionnaire);
    }

    private async update(
        questionnaire: SaveQuestionnaireDto,
    ): Promise<HttpResponse<Questionnaire>> {
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
