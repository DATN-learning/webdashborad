import React from "react";
import { Alert, Modal, Radio } from "antd";
import { toast } from "react-toastify";

interface IPopupQuestion {
  open: boolean;
  close: () => void;
}
interface IAnswers {
  answer: string;
  image: string;
}

const PopupQuestion = ({ open, close }: IPopupQuestion) => {
  const [imageAnswer, setImageAnswer] = React.useState<string>("");
  const [imageQuestion, setImageQuestion] = React.useState<string>("");
  const [answers, setAnswers] = React.useState<IAnswers[]>([]);
  const [answer, setAnswer] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [level, setLevel] = React.useState<string>("");
  const [question, setQuestion] = React.useState<string>("");
  const [answerCorrect, setAnswerCorrect] = React.useState<string>("");
  const handleFileImageQuestion = (e: any) => {
    const type = e.target.files[0].type;
    if (type === "image/png" || type === "image/jpeg" || type === "image/jpg") {
      setImageQuestion(e.target.files[0]);
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageQuestion(url);
    } else {
      toast.error("File không đúng định dạng");
      e.target.value = null;
    }
  };

  const handleFileImageAnswer = (e: any) => {
    setImageAnswer("");
    const type = e.target.files[0].type;
    if (type === "image/png" || type === "image/jpeg" || type === "image/jpg") {
      setImageAnswer(e.target.files[0]);
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageAnswer(url);
    } else {
      toast.error("File không đúng định dạng");
      e.target.value = null;
    }
  };

  const handleAddAnswer = () => {
    if (answer.trim() === "") return;
    const newAnswer = {
      answer: answer,
      image: imageAnswer,
    };
    setAnswers([...answers, newAnswer]);
    setAnswer("");
    setImageAnswer("");
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      title,
      description,
      level,
      question,
      answers,
      answerCorrect,
      imageQuestion,
    };
    if (
      title === "" ||
      description === "" ||
      level === "" ||
      question === "" ||
      answers.length === 0 ||
      answerCorrect === ""
    ){
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
      console.log(newQuestion);
  };
  return (
    <Modal
      width={1000}
      title="Manager question"
      open={open}
      onCancel={close}
      footer={null}
    >
      <div className="flex bg-[#ccc] rounded-lg">
        <div className="p-3  flex-1 space-y-5">
          <div className="w-full ">
            <input
              type="text"
              className="w-full p-3 outline-none rounded-lg "
              placeholder="Câu hoi"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full ">
            <textarea
              className="w-full p-3 outline-none rounded-lg "
              placeholder="Mô tả câu  trả lời"
              rows={4}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center  ">
            <div className="flex-1 ">
              <select
                name="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-32 border border-gray-300 rounded-md p-2"
              >
                <option value="">Chọn độ khó</option>
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
              </select>
            </div>
            <div className="flex-1 ">
              <input
                type="file"
                onChange={handleFileImageQuestion}
                name="imageQuestion"
                id="file1"
              />
            </div>
            <div className="flex-1 ">
              <input
                name="question"
                placeholder="Câu hỏi"
                type="number"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-24 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          {imageQuestion && (
            <div className="w-full ">
              <img
                src={imageQuestion}
                alt=""
                className="w-full h-[200px]
                object-contain
              "
              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="w-full p-3 outline-none rounded-lg "
              placeholder="Câu trả lời"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="">
              <input
                type="file"
                onChange={handleFileImageAnswer}
                name="imageAnswer"
                id="file2"
              />
            </div>
            <div className="">
              <button
                className="text-white w-36 bg-lime-400 rounded-md p-2"
                onClick={handleAddAnswer}
              >
                Thêm câu trả lời
              </button>
            </div>
          </div>
          {imageAnswer && (
            <div className="w-full flex items-center  ">
              <img
                src={imageAnswer}
                alt=""
                className="w-full h-[100px] object-contain"
              />
            </div>
          )}
        </div>
        <div className="p-3 flex-1 space-y-4 ">
          <div
            className="rounded-lg 
              h-full
            bg-neutral-200 overflow-y-auto p-3"
          >
            {answers.map((item, index) => (
              <div
                className="bg-stone-50 p-2 rounded-lg space-y-2 my-2"
                key={index}
              >
                <div className="flex items-center justify-between">
                  <span>
                    Câu trả lời : {index + 1} <span>{item.answer}</span>
                  </span>
                  <input
                    type="radio"
                    name="answerCorrect"
                    value={index}
                    onChange={(e) => setAnswerCorrect(e.target.value)}
                  />
                </div>
                <img
                  src={item.image}
                  alt=""
                  className="w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full mt-3">
        <button
          className="text-white w-full bg-lime-400 rounded-md p-2"
          onClick={handleAddQuestion}
        >
          Thêm câu hỏi
        </button>
      </div>
    </Modal>
  );
};

export default PopupQuestion;
