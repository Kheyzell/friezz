import { Answer } from '@friezz/common';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionnaireEntity } from './questionnaire.entity';
import { QuestionEntity } from './question.entity';

@Entity({ name: 'Answer' })
export class AnswerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    questionId: number;

    @Column('varchar')
    creatorName: string;

    @Column('varchar')
    targetParticipantName: string;

    @Column('varchar')
    value: string;

    @Column('boolean')
    isValid: boolean;

    @ManyToOne(() => QuestionEntity, (question) => question.answers, { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    question: QuestionEntity;

    toAnswer(): Answer {
        return {
            id: this.id,
            questionId: this.questionId,
            creatorName: this.creatorName,
            targetParticipantName: this.targetParticipantName,
            value: this.value,
            isValid: this.isValid,
        }
    }

    static createFromDto({ id, questionId, creatorName, targetParticipantName, value }: Answer): AnswerEntity {
        const answerEntity = new AnswerEntity();
        answerEntity.id = id;
        answerEntity.questionId = questionId;
        answerEntity.creatorName = creatorName;
        answerEntity.targetParticipantName = targetParticipantName;
        answerEntity.value = value;
        return answerEntity;
    }
}