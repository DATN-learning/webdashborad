import { IAnswerPayLoad } from "./Answer";
import { IImage } from "./Image";

export interface IQuestionPayLoad {
  id: number;
  id_question: string;
  id_question_query: string;
  title: string;
  description: string;
  answer_correct: string;
  level_question: string;
  number_question: number;
  created_at: string;
  updated_at: string;
  // imageQuestions: IImage[];
  image_question: string[];
  answers: IAnswerPayLoad[];
  disable?: boolean;
}

export interface IQuestionSuccessPayload {
  status: boolean;
  message: string;
  data: {
    question: IQuestionPayLoad[];
  };
}
