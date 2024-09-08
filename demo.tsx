import React from "react";
import { Modal, Radio } from "antd";
interface IPopupQuestion {
  open: boolean;
  close: () => void;
}
interface IAnswers {
  answer: string;
  image: string;
}

const PopupQuestion = ({ open, close }: IPopupQuestion) => {
  const [answers, setAnswers] = React.useState<IAnswers[]>([]);
  const [answer, setAnswer] = React.useState<string>("");
  const [imageAnswer, setImageAnswer] = React.useState<any>(null);
  const [imageQuestion, setImageQuestion] = React.useState<any>(null);
  const [level, setLevel] = React.useState<string>("");
  const [question, setQuestion] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [answerCorrect, setAnswerCorrect] = React.useState(0);
  console.log("answerCorrect", answerCorrect);
  const handleFileImageQuestion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageQuestion(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleFileImageAnswer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageAnswer(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAnswer = () => {
    const data = {
      answer,
      image: imageAnswer,
    };
    setAnswers([...answers, data]);
    setAnswer("");
    setImageAnswer("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      title,
      description,
      level,
      question,
      imageQuestion,
      answerCorrect,
      answers,
    };
    console.log(data);
  };
  return (
    <Modal
      width={1000}
      title="Manager question"
      open={open}
      onCancel={close}
      footer={null}
    >
      <div className="flex  gap-6">
        <div className="flex-1 p-2">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <textarea
              placeholder="Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <div className="flex items-center gap-3 justify-between my-3">
              <div>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  name="level"
                  className="w-32 border border-gray-300 rounded-md p-2"
                >
                  <option value="">Chọn độ khó</option>
                  <option value="easy">Dễ</option>
                  <option value="medium">Trung bình</option>
                  <option value="hard">Khó</option>
                </select>
                <input
                  type="file"
                  onChange={handleFileImageQuestion}
                  name="imageQuestion"
                  className="hidden"
                  id="file"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md"
                >
                  Chọn ảnh
                </label>
              </div>
              <div>
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  name="question"
                  placeholder="Câu hỏi"
                  type="number"
                  className="w-24 border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            {imageQuestion && (
              <img
                src={imageQuestion}
                className="w-full object-cover rounded-md"
                alt="imageQuestion"
              />
            )}
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              name="answer"
              placeholder="Answer"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <div className="flex items-center justify-between">
              <input
                type="file"
                onChange={handleFileImageAnswer}
                name="imageAnswer"
                className="hidden"
                id="file"
              />
              <label
                htmlFor="file"
                className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md"
              >
                Chọn ảnh
              </label>
              <button
                onClick={handleAddAnswer}
                className="hover:opacity-60  bg-[#43e711] text-white rounded-md p-2"
              >
                Thêm câu trả lời
              </button>
            </div>
            {imageAnswer && (
              <img
                src={imageAnswer}
                className="w-full object-cover rounded-md"
                alt="imageAnswer"
              />
            )}
          </form>
        </div>
        <div className="flex-1 p-2 space-y-4">
          <div
            className="
              h-[calc(100%-50px)]
            bg-gray-300 rounded-md 
            overflow-y-scroll px-3
          "
          >
            {answers.map((item, index) => (
              <div
                className="flex flex-col border border-gray-400 p-3 rounded-lg my-3"
                key={index}
              >
                <div className="flex items-center justify-between text-base">
                  <span>
                    Câu trả lời {index + 1} :{" "}
                    <span className="ml-2">{item.answer}</span>
                  </span>

                  <input
                    type="radio"
                    name="answerCorrect"
                    value={index}
                    onChange={(e) => setAnswerCorrect(+e.target.value)}
                  />
                </div>
                {item.image && (
                  <img
                    src={item.image}
                    className="w-full object-cover rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
          <button className="hover:opacity-60 w-full bg-[#43e711] text-white rounded-md p-2">
            Thêm câu hỏi
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PopupQuestion;
