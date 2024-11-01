import { IQuestionPayLoad } from "@/interface/Question";
import { Button, Input } from "antd";
import React, { FC, useState } from "react";
import ItemAnswer from "./itemAnswer";
import { deleteQuestion, updateQuestion } from "@/api/chapter";
import { toast } from "react-toastify";
import { IAnswerPayLoad } from "@/interface/Answer";

interface IQuestionProps {
  listQuestion: IQuestionPayLoad[];
  onQuestionDeleted: (deletedQuestionId: string) => void;
  onQuestionUpdated: (updatedQuestion: IQuestionPayLoad) => void;
}

const Question: FC<IQuestionProps> = ({ listQuestion, onQuestionDeleted, onQuestionUpdated }) => {
  const { TextArea } = Input;
  const [editingQuestion, setEditingQuestion] = useState<IQuestionPayLoad | null>(null);
  const [title, setTitle] = useState<string>("");

  const handleAnswerChange = (questionId: string, updatedAnswers: IAnswerPayLoad[], correctAnswerId: string) => {
    const updatedQuestion = listQuestion.find((q) => q.id_question === questionId);
    if (updatedQuestion) {
      updatedQuestion.answers = updatedAnswers;
      updatedQuestion.answer_correct = correctAnswerId;
      onQuestionUpdated(updatedQuestion);
    }
  };

  const handleSaveQuestion = async (question: IQuestionPayLoad) => {
    try {
      const updatedQuestion = {
        ...question,
        title: title || question.title, 
      };

      const res = await updateQuestion(
        updatedQuestion.id_question,
        updatedQuestion.id_question_query,
        updatedQuestion.title,
        updatedQuestion.description,
        updatedQuestion.answer_correct, 
        updatedQuestion.level_question,
        updatedQuestion.number_question,
        updatedQuestion.answers
        // Có thể thêm hình ảnh nếu cần: updatedQuestion.imageQuestions[0] || ""
      );
      console.log(res.data)

      toast.success("Cập nhật câu hỏi thành công!");
      onQuestionUpdated(updatedQuestion);
      setEditingQuestion(null);
    } catch (error) {
      toast.error("Cập nhật câu hỏi thất bại!");
    }
  };

  const handleDeleteQuestion = async (id_question: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa câu hỏi này không?")) {
      try {
        await deleteQuestion(id_question);
        toast.success("Xóa câu hỏi thành công!");
        onQuestionDeleted(id_question);
      } catch (error) {
        toast.error("Xóa câu hỏi thất bại!");
      }
    }
  };

  return (
    <table className="w-full table-auto text-center">
      <thead>
        <tr className="text-center">
          <th className="border border-gray-400 px-4 py-2">Question</th>
          <th className="border border-gray-400 px-4 py-2">Title</th>
          <th className="border border-gray-400 px-4 py-2">Answer</th>
          <th className="border border-gray-400 px-4 py-2">Menu</th>
        </tr>
      </thead>
      <tbody>
        {listQuestion.map((item) => (
          <tr key={item.id_question}>
            <td className="border border-gray-400 px-4 py-2">
              {item.number_question}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <div className="my-2 space-y-2 items-center">
                <TextArea
                  defaultValue={editingQuestion?.id_question === item.id_question ? title : item.title}
                  autoSize={{ minRows: 10, maxRows: 15 }}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => {
                    setEditingQuestion(item);
                    setTitle(item.title);
                  }}
                />
                {item.image_question && (
                  <img src={item.image_question[0]} alt="" className="w-1/2" />
                )}
                {!item.image_question && (
                  <Button className="bg-green-500 text-white">
                    Thêm Image
                  </Button>
                )}
              </div>
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <ItemAnswer
                items={item.answers}
                idAnswerCorrect={item.answer_correct}
                onAnswerChange={(updatedAnswers, correctAnswerId) =>
                  handleAnswerChange(item.id_question, updatedAnswers, correctAnswerId)
                }
              />
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <div className="items-center flex space-x-3 justify-center">
                <Button
                  className="bg-yellow-500 text-white"
                  onClick={() => handleSaveQuestion(item)}
                >
                  Lưu
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  onClick={() => handleDeleteQuestion(item.id_question)}
                >
                  Xóa
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Question;
