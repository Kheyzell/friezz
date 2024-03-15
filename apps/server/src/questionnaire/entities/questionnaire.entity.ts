import { Questionnaire, SaveQuestionnaireDto } from '@friezz/common';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity({ name: 'Questionnaire' })
export class QuestionnaireEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    creatorName: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    participantNames: string[];

    // @Column('timestamp')
    // creationtimestamp: string;
    
    // @Column('timestamp')
    // lastmodified: string;

    @OneToMany(() => QuestionEntity, (question) => question.questionnaire, { cascade: true })
    questions: QuestionEntity[];

    toQuestionnaire(): Questionnaire {        
        return {
            id: this.id,
            name: this.name,
            creatorName: this.creatorName,
            participantNames: this.participantNames,
            questions: this.questions?.map(questionEntity => questionEntity.toQuestion()) ?? [],
        }
    }

    static createFromDto(saveQuestionnaireDto: SaveQuestionnaireDto): QuestionnaireEntity {
        const questionnaireEntity = new QuestionnaireEntity();
        questionnaireEntity.creatorName = saveQuestionnaireDto.creatorName;
        questionnaireEntity.name = saveQuestionnaireDto.name;
        questionnaireEntity.participantNames = saveQuestionnaireDto.participantNames;
        
        return questionnaireEntity;
    }
}