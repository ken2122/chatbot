export type AnswerType = {
    content: string;
    nextId: string;
};

export type ChatType = {
    text: string;
    type: 'question' | 'answer';
};

export type Dataset = {
    answers: AnswerType[];
    question: string;
};

export type InitDataset = {
    [id: string]: Dataset;
};

export type PageProps = {
    initDataset: InitDataset;
};

export type AnswersListProps = {
    answers: AnswerType[];
    select: (selectedAnswer: string, nextQuestionId: string) => void;
};

export type AnswerProps = {
    content: string;
    nextId: string;
    select: (selectedAnswer: string, nextQuestionId: string) => void;
};

export type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
};
