import { Questionnaire, SaveAnswersDto, SaveQuestionnaireDto } from '@friezz/common';
import { QuestionnaireService } from '@friezz/server/questionnaire/questionnaire.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AnswerEntity } from './entities/answer.entity';
import { QuestionnaireEntity } from './entities/questionnaire.entity';

@Controller('/questionnaires')
export class QuestionsSetController {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  @Get()
  async getAll(): Promise<QuestionnaireEntity[]> {
    return this.questionnaireService.findAll();
  }
  
  @Get('/:questionnaireId')
  async getById(@Param() { questionnaireId }: { questionnaireId: number }): Promise<Questionnaire> {
    return await this.questionnaireService.findOneById(questionnaireId);
  }
  
  @Get('/name/:questionnaireName')
  async getByName(@Param() { questionnaireName }: { questionnaireName: string }): Promise<Questionnaire> {
    return await this.questionnaireService.findOneByName(questionnaireName);
  }

  @Post('/create')
  async createQuestionnaire(@Body() saveQuestionnaireDto: SaveQuestionnaireDto): Promise<Questionnaire> {
    return this.questionnaireService.create(saveQuestionnaireDto);
  }
  
  @Post('/update')
  async updateQuestionnaire(@Body() questionnaireData: QuestionnaireEntity): Promise<QuestionnaireEntity> {
    return this.questionnaireService.update(questionnaireData);
  }

  @Post('/answers')
  async saveAnswers(@Body() saveAnswersDto: SaveAnswersDto): Promise<void> {
    return this.questionnaireService.saveAnswers(saveAnswersDto.answers);
  }
}
