import { IAnswer, IQuestion } from "@/data/dataQuestion";
import { IAnswerPayLoad } from "@/interface/Answer";
import { Input, Radio, Space } from "antd";
import React, { FC } from "react";
import { TiTick } from "react-icons/ti";
interface IItemAnswer {
  items: IAnswerPayLoad[];
  idAnswerCorrect: string;
}

const ItemAnswer: FC<IItemAnswer> = (props) => {
  const { items, idAnswerCorrect } = props;
  const { TextArea } = Input;
  const [selectedAnswer, setSelectedAnswer] = React.useState(idAnswerCorrect);
  return (
    <>
      {items.map((ans, _) => (
        <div key={_} className="my-2 flex items-center">
          <TextArea defaultValue={ans.answer_text} />
          <Radio
            value={ans.id_answer}
            checked={ans.id_answer === selectedAnswer}
            className="ml-4"
            onClick={() => setSelectedAnswer(ans.id_answer)}
          />
        </div>
      ))}
    </>
  );
};
export default ItemAnswer;
