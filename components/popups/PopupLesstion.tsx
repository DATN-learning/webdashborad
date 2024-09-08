import { IChapterSubject, ILessionByChapterPayLoad } from "@/interface/Chapter";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import Question from "../Question";
interface LessonProps {
  open: boolean;
  onClose: () => void;
  chooseLesstion: ILessionByChapterPayLoad | undefined;
  chooseChapter: IChapterSubject | undefined;
}
const PopupLesstion = ({
  open,
  onClose,
  chooseLesstion,
  chooseChapter,
}: LessonProps) => {
  const [dataLesson, setDataLesson] = React.useState({
    name_lesson: "",
    description: "",
    number_lesson: 0,
  });
  React.useEffect(() => {
    if (chooseLesstion) {
      setDataLesson({
        name_lesson: chooseLesstion.name_lesstion_chapter,
        description: chooseLesstion.description_lesstion_chapter,
        number_lesson: chooseLesstion.number_lesstion_chapter,
      });
    }
  }, [chooseLesstion]);
  const handleSubmit = async () => {};
  const handleChange = (e: any) => {
    setDataLesson({
      ...dataLesson,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal
      title="Thêm bài học"
      centered
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form layout="vertical">
        <Form.Item label="Tên chương">
          <Input
            placeholder={chooseChapter?.name_chapter_subject}
          />
        </Form.Item>
        <Form.Item label="Tên bài học">
          <Input
            placeholder="Tên bài học"
            value={dataLesson.name_lesson}
            name="name_lesson"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            placeholder="Mô tả"
            value={dataLesson.description}
            name="description"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Số lượng bài học">
          <Input
            placeholder="Số lượng bài học"
            value={dataLesson.number_lesson}
            name="number_lesson"
            onChange={handleChange}
          />
        </Form.Item>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          {[0, 1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="w-40 h-w-40 bg-white shadow-md p-5 rounded-md "
            >
              <img
                src={chooseChapter?.chapter_image}
                alt={chooseChapter?.chapter_image}
              />
              <p className="font-bold text-md xl:text-xl text-center mt-2">
                Dai so
              </p>
            </div>
          ))}
        </div>
        <div className="">
          <div className="text-center my-5">
            <span>
              Câu hỏi bài tập {chooseChapter?.name_chapter_subject}
            </span>
          </div>
          {/* <Question /> */}
        </div>
        <div className="flex justify-center mt-5">
          <Button
            type="text"
            className="mr-5 bg-teal-400"
            onClick={handleSubmit}
          >
            Chỉnh sửa
          </Button>
          <Button type="primary" danger>
            Hủy
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PopupLesstion;
