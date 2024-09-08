import { IQuestion, dataQuestion } from "@/data/dataQuestion";
import { BsEye } from "react-icons/bs";
import React, { FC } from "react";
import { Button, Input, Radio } from "antd";
import { IItemQuestionProps } from "./type";
import ItemAnswer from "./itemAnswer";
const Question: FC<IItemQuestionProps> = (props) => {
  const { TextArea } = Input;
  const { listQuestion } = props;
  const [selectedAnswer, setSelectedAnswer] = React.useState(0);
  const handleSelectAnswer = (answerId: number) => {
    setSelectedAnswer(answerId);
  };
  return (
    <table className="w-full table-auto text-center ">
      <thead>
        <tr className="text-center">
          <th className="border border-gray-400 px-4 py-2">Question</th>
          <th className="border border-gray-400 px-4 py-2">Title</th>
          <th
            className="border border-gray-400 px-4 py-2"
            rowSpan={dataQuestion
              .map((item) => item.answer.length)
              .reduce((a, b) => a + b, 0)}
          >
            Answer
          </th>
          <th className="border border-gray-400 px-4 py-2">Menu</th>
        </tr>
      </thead>
      <tbody>
        {listQuestion.map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-400 px-4 py-2">
              {item.number_question}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <div className="my-2 space-y-2 items-center">
                <TextArea
                  defaultValue={item.title}
                  autoSize={{ minRows: 10, maxRows: 15 }}
                />
                {item.imageQuestions[0] && (
                  <img src={item.imageQuestions[0]} alt="" className="w-1/2" />
                )}
                {!item.imageQuestions[0] && (
                  <Button className="bg-green-500 text-white">
                    Thêm Image
                  </Button>
                )}
              </div>
            </td>
            <td className="border border-gray-400 px-4 py-2 ">
              <ItemAnswer
                items={item.answers}
                idAnswerCorrect={item.answer_correct}
              />
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <div className="items-center flex space-x-3 justify-center ">
                <Button className="bg-yellow-500 text-white">Lưu</Button>
                <Button className="bg-red-500 text-white">Xóa</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Question;
