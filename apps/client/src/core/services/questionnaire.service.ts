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

    async saveAnswers(answers: Answer[]): Promise<HttpResponse<void>> {
        const saveAnswerDto = this.createDtoFromAnswers(answers);
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}`, saveAnswerDto);
    }

    private async create(questionnaire: SaveQuestionnaireDto): Promise<HttpResponse<Questionnaire>> {
        return httpService.post(`${QUESTIONNAIRES_API}/create`, questionnaire);
    }

    private async update(questionnaire: SaveQuestionnaireDto): Promise<HttpResponse<Questionnaire>> {
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
}

const questionnaireService = new QuestionnaireService();
export default questionnaireService;
