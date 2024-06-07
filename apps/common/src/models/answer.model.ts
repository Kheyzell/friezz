export type Answer = {
    id?: number;
    questionId: number;
    value: string;
    creatorName: string;
    targetParticipantName: string;
    isValid: boolean | null;
};
