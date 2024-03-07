import { Answer, Questionnaire, SaveQuestionnaireDto } from '@friezz/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerEntity } from './entities/answer.entity';
import { QuestionEntity } from './entities/question.entity';
import { QuestionnaireEntity } from './entities/questionnaire.entity';

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
    return this.questionnaireRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<Questionnaire | null> {
    const questionnaireEntity = await this.questionnaireRepository.findOne({
      where: { name },
      join: {
        alias: "questionnaire",
        leftJoinAndSelect: {
          "questions": "questionnaire.questions",
          "answers": "questions.answers",
        }
      }
    });
    
    return questionnaireEntity.toQuestionnaire();
  }

  async create(saveQuestionnaireDto: SaveQuestionnaireDto): Promise<Questionnaire> {
    const questionnaireEntity = await this.questionnaireRepository.save(QuestionnaireEntity.createFromDto(saveQuestionnaireDto));
    const questionEntities = saveQuestionnaireDto.questions
      .map(saveQuestionnaireDto => QuestionEntity.createFromDto(saveQuestionnaireDto))
      .map(question => {
        question.questionnaireId = questionnaireEntity.id;
        return question;
      });
    await this.questionRepository.save(questionEntities);
    return questionnaireEntity.toQuestionnaire();
  }

  async update(updatedQuestionnaire: QuestionnaireEntity): Promise<QuestionnaireEntity> {
    const existingQuestionnaire = await this.findOneById(updatedQuestionnaire.id);

    if (!existingQuestionnaire) {
      throw new NotFoundException(`Questionnaire with id '${updatedQuestionnaire.id}' and name '${updatedQuestionnaire.name}' not found`);
    }

    const updatedQuestionnaireInstance = this.questionnaireRepository.merge(existingQuestionnaire, updatedQuestionnaire);
    return this.questionnaireRepository.save(updatedQuestionnaireInstance);
  }


  async saveAnswers(answers: Answer[]): Promise<AnswerEntity[]> {
    const answerEntities = answers.map(answer => AnswerEntity.createFromDto(answer));
    return this.answerRepository.save(answerEntities);
  }
}