import { Answer, Questionnaire, SaveAnswersDto, SaveQuestionnaireDto } from '@friezz/common';
import { QuestionnaireService } from '@friezz/server/questionnaire/questionnaire.service';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { QuestionnaireEntity } from './entities/questionnaire.entity';

@Controller('/questionnaires')
export class QuestionsSetController {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
  ) { }

  @Get()
  async getAll(): Promise<QuestionnaireEntity[]> {
    return this.questionnaireService.findAll();
  }

  @Get('/:questionnaireId')
  async getById(@Param() { questionnaireId }: { questionnaireId: number }): Promise<Questionnaire | undefined> {
    const questionnaireEntity = await this.questionnaireService.findOneById(questionnaireId);
    return questionnaireEntity?.toQuestionnaire();
  }

  @Get('/name/:questionnaireName')
  async getByName(@Param() { questionnaireName }: { questionnaireName: string }): Promise<Questionnaire | undefined> {
    const questionnaireEntity = await this.questionnaireService.findOneByName(questionnaireName);
    return questionnaireEntity?.toQuestionnaire();
  }

  @Post('/create')
  async createQuestionnaire(@Body() saveQuestionnaireDto: SaveQuestionnaireDto): Promise<Questionnaire> {
    return (await this.questionnaireService.create(saveQuestionnaireDto))
      .unwrap({
        err: error => { throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR) }
      });
  }

  @Post('/update')
  async updateQuestionnaire(@Body() questionnaireData: QuestionnaireEntity): Promise<QuestionnaireEntity> {
    return (await this.questionnaireService.update(questionnaireData))
      .unwrap({
        err: error => { throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR) }
      });
  }

  @Post('/answers')
  async saveAnswers(@Body() saveAnswersDto: SaveAnswersDto): Promise<Answer[]> {
    return (await this.questionnaireService.saveAnswers(saveAnswersDto.answers))
      .unwrap({
        err: error => { throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR) }
      });
  }

  @Post('/answers/:answerId/validate')
  async validateAnswer(@Param() { answerId }: { answerId: number }): Promise<void> {
    return this.questionnaireService.validateAnswer(answerId);
  }

  @Post('/answers/:answerId/reject')
  async rejectAnswer(@Param() { answerId }: { answerId: number }): Promise<void> {
    return this.questionnaireService.rejectAnswer(answerId);
  }

  @Post('/answers/:answerId/cancel')
  async cancelAnswer(@Param() { answerId }: { answerId: number }): Promise<void> {
    return this.questionnaireService.cancelAnswer(answerId);
  }
}
