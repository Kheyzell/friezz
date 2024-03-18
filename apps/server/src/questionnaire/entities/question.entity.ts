import { Question, SaveQuestionDto } from '@friezz/common';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionnaireEntity } from './questionnaire.entity';
import { AnswerEntity } from './answer.entity';

@Entity({ name: 'Question' })
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    questionnaireId: number;

    @Column('varchar')
    value: string;

    @ManyToOne(() => QuestionnaireEntity, (questionnaire) => questionnaire.questions, { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    questionnaire: QuestionnaireEntity;

    @OneToMany(() => AnswerEntity, (answer) => answer.question, { cascade: true })
    answers: AnswerEntity[];

    toQuestion(): Question {
        return {
            id: this.id,
            value: this.value,
            answers: this.answers?.map(answerEntity => answerEntity.toAnswer()) ?? [],
        }
    }

    static createFromDto({ id, value }: SaveQuestionDto, questionnaireId?: number): QuestionEntity {
        const questionEntity = new QuestionEntity();
        questionEntity.id = id;
        questionEntity.value = value;
        questionEntity.questionnaireId = questionnaireId;
        return questionEntity;
    }
}