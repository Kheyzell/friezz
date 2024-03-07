import { Answer } from './answer.model';

export type Questionnaire = {
    id?: number;
    name: string;
    creatorName: string;
    participantNames: string[];
    questions: Question[];
};

export type Question = {
    id?: number;
    value: string;
    answers: Answer[];
};
