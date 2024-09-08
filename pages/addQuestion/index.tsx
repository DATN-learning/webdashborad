import { ButtonCommon } from "@/components/Button";
import { Button, Input, Modal, Radio, Select } from "antd";
import React from "react";
const level = [
  {
    label: "Dễ",
    value: "easy",
  },
  {
    label: "Trung bình",
    value: "medium",
  },
  {
    label: "Khó",
    value: "hard",
  },
];
interface IAnswer {
  id: string;
  answer_text: string;
}
const index = () => {
  const { TextArea } = Input;
  const [openModalAddQuestion, setOpenModalAddQuestion] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [answers, setAnswers] = React.useState<IAnswer[]>([]);
  const [checkAnswerCorrect, setCheckAnswerCorrect] =
    React.useState<string>("");
  console.log(checkAnswerCorrect);
  const handleAddAnswer = () => {
    setAnswers([
      ...answers,
      {
        id: `${answers.length + 1}`,
        answer_text: answer,
      },
    ]);
    setAnswer("");
  };

  return (
    <>
      <Button
        type="primary"
        className="bg-lime-600"
        onClick={() => setOpenModalAddQuestion(true)}
      >
        Hello
      </Button>
      <Modal
        title="Thêm câu hỏi"
        open={openModalAddQuestion}
        footer={null}
        onCancel={() => setOpenModalAddQuestion(false)}
      >
        <div className="space-y-4">
          <Input placeholder="label" />
          <TextArea
            placeholder="title"
            rows={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 justify-between my-3">
          <div>
            <Select options={level} placeholder="Chọn độ khó" />
            <input type="file" className="hidden" id="file" />
            <label
              htmlFor="file"
              className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md"
            >
              Chọn ảnh
            </label>
          </div>
          <div>
            <Input placeholder="Câu hỏi" type="number" className="w-24" />
          </div>
          <div>
            <Button
              type="primary"
              className={`
              bg-lime-600
                ${answers.length > 3 ? "hidden" : "block"}
              `}
              onClick={handleAddAnswer}
            >
              Thêm câu trả lời
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <input type="file" className="hidden " id="file" />
            <label
              htmlFor="file"
              className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md"
            >
              Chọn ảnh
            </label>
          </div>
          <TextArea
            placeholder="Câu trả lời"
            rows={3}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        <div className="border border-gray-200 rounded-md p-4 my-4">
          {answers.map((ans, _) => (
            <div className="my-2 flex items-center" key={_}>
              <TextArea defaultValue={ans.answer_text} />
              <Radio
                className="ml-4"
                checked={checkAnswerCorrect === ans.answer_text}
                onClick={() => setCheckAnswerCorrect(ans.answer_text)}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          {/* <Button type="primary" className="bg-lime-600">
            Thêm câu hỏi
          </Button> */}
          <div>
            <ButtonCommon title="Thêm câu hỏi" style="bg-[#69ebdd]" />
          </div>
          <div>
            <ButtonCommon title="Huỷ" style="bg-red-500" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default index;
