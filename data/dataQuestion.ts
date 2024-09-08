export interface IQuestion {
    id: number;
    title: string;
    answer: IAnswer[];
    answerCorrect: string;
}

export interface IAnswer {
    id: number;
    answer: string;
}

export const dataQuestion : IQuestion[] = 
[
    {
        id : 1,
        title : 'Các viết tập hợp nào sau đây đúng?',
        answer : [ 
            {id : 1, answer : 'A = [1; 2; 3; 4]'},
            {id : 2, answer : 'A = (1; 2; 3; 4)'},
            {id : 3, answer : 'A = { 1, 2, 3, 4}'},
            {id : 4, answer : 'A = {1; 2; 3; 4}'},
        ],
        answerCorrect : 'A = {1; 2; 3; 4}'

    },
    {   
        id : 2,
        title : 'Cho B = {a; b; c; d}. Chọn đáp án sai trong các đáp án sau?',
        answer : [
            {id : 1, answer : 'a ∈ B'},
            {id : 2, answer : 'b ∈ B'},
            {id : 3, answer : 'e ∉ B'},
            {id : 4, answer : 'g ∈ B'},
        ],
        answerCorrect : 'g ∈ B'
    },
    

]

export interface IQuestionState {
    id : number
    question : string,
    subject : string,
    chapter : string,
    lesson : string,
}