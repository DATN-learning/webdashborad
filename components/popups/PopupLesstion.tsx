import { IChapterSubject, ILessionByChapterPayLoad } from "@/interface/Chapter";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import Question from "../Question";
import { toast } from "react-toastify";
import { deleteLess, updateLess } from "@/api/chapter";
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
    id_lesstion_chapter: "",
    name_lesson: "",
    description: "",
    number_lesson: 0,
  });
  React.useEffect(() => {
    if (chooseLesstion) {
      setDataLesson({
        id_lesstion_chapter: chooseLesstion.id_lesstion_chapter,
        name_lesson: chooseLesstion.name_lesstion_chapter,
        description: chooseLesstion.description_lesstion_chapter,
        number_lesson: chooseLesstion.number_lesstion_chapter,
      });
    }
  }, [chooseLesstion]);
  const handleUpdate = async () => {
    try {
      const res = await updateLess(
        dataLesson?.id_lesstion_chapter, 
        dataLesson?.name_lesson,
        dataLesson?.description,
        dataLesson?.number_lesson.toString()
      );
  
      if (res) {
        toast.success("Cập nhật bài học thành công!");
        onClose();
      } else {
        toast.error("Cập nhật bài học thất bại");
      }
    } catch (error) {
      console.error("Error updating lesson:", error);
      toast.error("Có lỗi xảy ra khi cập nhật bài học");
    }
  };
  
  const handleDelete = async (id_lesstion_chapter:string) => {
      if (confirm("Bạn có chắc chắn muốn xóa môn học này?")) {
        try {
          const res = await deleteLess(id_lesstion_chapter);
          if(res) {
            onClose();
            setDataLesson(dataLesson)
            toast.success("Xóa môn học thành công!");
          }
        } catch (error) {
          toast.error("Xóa môn học thất bại!");
        }
      }
  };

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
        <div className="flex justify-center mt-5 gap-3">
          <Button
            className=" bg-teal-400"
            onClick={handleUpdate}
          >
            Chỉnh sửa
          </Button>
          <Button className="bg-orange-500">
            Hủy
          </Button>
          <Button
            type="text"
            className=" bg-red-500"
            onClick={() => handleDelete(dataLesson?.id_lesstion_chapter)}
          >
            Xóa
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PopupLesstion;