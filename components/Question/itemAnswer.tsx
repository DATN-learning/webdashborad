// import { IAnswer, IQuestion } from "@/data/dataQuestion";
// import { IAnswerPayLoad } from "@/interface/Answer";
// import { Input, Radio, Space } from "antd";
// import React, { FC } from "react";
// import { TiTick } from "react-icons/ti";
// interface IItemAnswer {
//   items: IAnswerPayLoad[];
//   idAnswerCorrect: string;
// }

// const ItemAnswer: FC<IItemAnswer> = (props) => {
//   const { items, idAnswerCorrect } = props;
//   const { TextArea } = Input;
//   const [selectedAnswer, setSelectedAnswer] = React.useState(idAnswerCorrect);
//   return (
//     <>
//       {items.map((ans, _) => (
//         <div key={_} className="my-2 flex items-center">
//           <TextArea defaultValue={ans.answer_text} />
//           <Radio
//             value={ans.id_answer}
//             checked={ans.id_answer === selectedAnswer}
//             className="ml-4"
//             onClick={() => setSelectedAnswer(ans.id_answer)}
//           />
//         </div>
//       ))}
//     </>
//   );
// };
// export default ItemAnswer;


// import { IAnswerPayLoad } from "@/interface/Answer";
// import { Input, Radio } from "antd";
// import React, { FC } from "react";

// interface IItemAnswer {
//   items: IAnswerPayLoad[];
//   idAnswerCorrect: string;
//   onAnswerChange: (updatedAnswers: IAnswerPayLoad[]) => void;
// }

// const ItemAnswer: FC<IItemAnswer> = (props) => {
//   const { items, idAnswerCorrect, onAnswerChange } = props;
//   const { TextArea } = Input;
//   const [answers, setAnswers] = React.useState<IAnswerPayLoad[]>(items);
//   const [selectedAnswer, setSelectedAnswer] = React.useState(idAnswerCorrect);

//   const handleAnswerTextChange = (index: number, value: string) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[index].answer_text = value;
//     setAnswers(updatedAnswers);
//     onAnswerChange(updatedAnswers); 
//   };

//   const handleAnswerSelect = (id_answer: string) => {
//     setSelectedAnswer(id_answer);
//     const updatedAnswers = answers.map((ans) =>({
//       ...ans,
//       id_correct: ans.id_answer === idAnswerCorrect
//     }));
//     console.log(id_answer)
//     setAnswers(updatedAnswers);
//     onAnswerChange(updatedAnswers);
//   };

//   return (
//     <>
//       {answers.map((ans, index) => (
//         <div key={ans.id_answer} className="my-2 flex items-center">
//           <TextArea
//             value={ans.answer_text}
//             onChange={(e) => handleAnswerTextChange(index, e.target.value)}
//           />
//           <Radio
//             value={ans.id_answer}
//             checked={ans.id_answer === selectedAnswer}
//             className="ml-4"
//             onClick={() => handleAnswerSelect(ans.id_answer)} 
//           />
//         </div>
//       ))}
//     </>
//   );
// };

// export default ItemAnswer;


import { IAnswerPayLoad } from "@/interface/Answer";
import { Input, Radio } from "antd";
import React, { FC } from "react";

interface IItemAnswer {
  items: IAnswerPayLoad[];
  idAnswerCorrect: string;
  onAnswerChange: (updatedAnswers: IAnswerPayLoad[], correctAnswerId: string) => void;
}

const ItemAnswer: FC<IItemAnswer> = ({ items, idAnswerCorrect, onAnswerChange }) => {
  const { TextArea } = Input;
  const [answers, setAnswers] = React.useState<IAnswerPayLoad[]>(items);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string>(idAnswerCorrect);

  const handleAnswerTextChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].answer_text = value;
    setAnswers(updatedAnswers);
    onAnswerChange(updatedAnswers, selectedAnswer);
  };

  const handleAnswerSelect = (id_answer: string) => {
    setSelectedAnswer(id_answer);
    onAnswerChange(answers, id_answer);
  };

  return (
    <>
      {answers.map((ans, index) => (
        <div key={ans.id_answer} className="my-2 flex items-center">
          <TextArea
            value={ans.answer_text}
            onChange={(e) => handleAnswerTextChange(index, e.target.value)}
          />
          <Radio
            value={ans.id_answer}
            checked={ans.id_answer === selectedAnswer}
            className="ml-4"
            onClick={() => handleAnswerSelect(ans.id_answer)} 
          />
        </div>
      ))}
    </>
  );
};

export default ItemAnswer;
