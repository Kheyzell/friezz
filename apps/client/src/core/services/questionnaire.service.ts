import { HttpResponse } from '@freizz/client/models/http-response';
import { Answer, Questionnaire, SaveAnswersDto, SaveQuestionnaireDto } from '@friezz/common';
import httpService from './http.service';

const QUESTIONNAIRES_API = 'questionnaires';
const ANSWERS_API = 'answers';

class QuestionnaireService {
    async getByName(questionnaire: string): Promise<HttpResponse<Questionnaire>> {
        return httpService.get<Questionnaire>(`${QUESTIONNAIRES_API}/${questionnaire}`);
    }

    async save(questionnaire: Questionnaire): Promise<HttpResponse<void>> {
        const saveQuestionnaireDto = this.createDtoFromQuestionnaire(questionnaire);
        return questionnaire.id
            ? this.update(saveQuestionnaireDto)
            : this.create(saveQuestionnaireDto);
    }

    async saveAnswers(answers: Answer[]): Promise<HttpResponse<void>> {
        const saveAnswerDto = this.createDtoFromAnswers(answers);
        return httpService.post(`${QUESTIONNAIRES_API}/${ANSWERS_API}`, saveAnswerDto);
    }

    private async create(questionnaire: SaveQuestionnaireDto): Promise<HttpResponse<void>> {
        return httpService.post(`${QUESTIONNAIRES_API}/create`, questionnaire);
    }

    private async update(questionnaire: SaveQuestionnaireDto): Promise<HttpResponse<void>> {
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
