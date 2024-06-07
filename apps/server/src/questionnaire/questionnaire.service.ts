import { Answer, Questionnaire, SaveQuestionnaireDto } from '@friezz/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result, fail, succeed } from '@friezz/common';
import { AnswerEntity } from './entities/answer.entity';
import { QuestionEntity } from './entities/question.entity';
import { QuestionnaireEntity } from './entities/questionnaire.entity';
import { QuestionnaireError } from './questionnaire.errors';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(QuestionnaireEntity) private readonly questionnaireRepository: Repository<QuestionnaireEntity>,
    @InjectRepository(QuestionEntity) private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(AnswerEntity) private readonly answerRepository: Repository<AnswerEntity>,
  ) { }

  async findAll(): Promise<QuestionnaireEntity[]> {
    return this.questionnaireRepository.find();
  }

  async findOneById(id: number): Promise<QuestionnaireEntity | null> {
    return this.questionnaireRepository.findOne({
      where: { id },
      join: {
        alias: "questionnaire",
        leftJoinAndSelect: {
          "questions": "questionnaire.questions",
          "answers": "questions.answers",
        }
      }
    });
  }

  async findOneByName(name: string): Promise<QuestionnaireEntity | null> {
    return this.questionnaireRepository.findOne({
      where: { name },
      join: {
        alias: "questionnaire",
        leftJoinAndSelect: {
          "questions": "questionnaire.questions",
          "answers": "questions.answers",
        }
      }
    });
  }

  async create(saveQuestionnaireDto: SaveQuestionnaireDto): Promise<Result<Questionnaire, QuestionnaireError>> {
    try {
      const questionnaireEntity = await this.questionnaireRepository.save(QuestionnaireEntity.createFromDto(saveQuestionnaireDto));

      const questionEntities = await this.questionRepository.save(
        saveQuestionnaireDto.questions.map(
          saveQuestionDto => QuestionEntity.createFromDto(saveQuestionDto, questionnaireEntity.id)
        )
      );

      questionnaireEntity.questions = questionEntities;
      return succeed(questionnaireEntity.toQuestionnaire());
    } catch (error) {
      return fail(QuestionnaireError.creation);
    }
  }

  async update(updatedQuestionnaire: QuestionnaireEntity): Promise<Result<QuestionnaireEntity, QuestionnaireError>> {
    try {
      const existingQuestionnaire = await this.findOneById(updatedQuestionnaire.id);

      if (!existingQuestionnaire) {
        throw new NotFoundException(`Questionnaire with id '${updatedQuestionnaire.id}' and name '${updatedQuestionnaire.name}' not found`);
      }

      const updatedQuestionnaireInstance = this.questionnaireRepository.merge(existingQuestionnaire, updatedQuestionnaire);
      return succeed(await this.questionnaireRepository.save(updatedQuestionnaireInstance));
    } catch (error) {
      return fail(QuestionnaireError.update);
    }
  }

  async saveAnswers(answers: Answer[]): Promise<Result<Answer[], QuestionnaireError>> {
    try {
      const answerEntities = answers.map(answer => AnswerEntity.createFromDto(answer));
      const newAnswerEntities = await this.answerRepository.save(answerEntities);
      return succeed(newAnswerEntities.map(answerEntity => answerEntity.toAnswer()));
    } catch (error) {
      return fail(QuestionnaireError.saveAnswers);
    }
  }

  async validateAnswer(answerId: number): Promise<void> {
    return await this.evaluateAnswer(answerId, true);
  }

  async rejectAnswer(answerId: number): Promise<void> {
    return await this.evaluateAnswer(answerId, false);
  }

  async cancelAnswer(answerId: number): Promise<void> {
    return await this.evaluateAnswer(answerId, null);
  }

  private async evaluateAnswer(answerId: number, evaluationValue: boolean | null): Promise<void> {
    const answer = await this.answerRepository.findOneBy({ id: answerId });

    if (!answer) {
      throw new Error(`Answer with ID ${answerId} not found`);
    }

    answer.isValid = evaluationValue;
    await this.answerRepository.save(answer);
  }
}