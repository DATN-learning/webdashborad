import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { dataQuestion } from "@/data/dataQuestion";

interface DataType {
  key: React.Key;
  question: string;
  title: string;
  answer: React.ReactNode;
  answerCorrect: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Question",
    dataIndex: "question",
    width: 100,
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Answer",
    dataIndex: "answer",
  },
  {
    title: "Answer Correct",
    dataIndex: "answerCorrect",
  },
];

const data: DataType[] = [];
dataQuestion.forEach((item, index) => {
  data.push({
    key: index,
    question: `${index + 1}`,
    title: item.title,
    answer: item.answer.map((item, index) => (
      <div key={index}>
        <span>{item.answer}</span>
      </div>
    )),
    answerCorrect: item.answerCorrect,
  });
});

const Question: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 240 }}
        pagination={false}
      />
    </>
  );
};

export default Question;
