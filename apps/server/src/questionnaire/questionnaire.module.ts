import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnaireEntity } from './entities/questionnaire.entity';
import { QuestionsSetController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionEntity } from './entities/question.entity';
import { AnswerEntity } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity, QuestionEntity, AnswerEntity])],
  controllers: [QuestionsSetController],
  providers: [QuestionnaireService],
})
export class QuestionnaireModule {}