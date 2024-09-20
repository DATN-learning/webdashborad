import { Avatar, Button, Form, Input, Modal } from "antd";
import React from "react";
import { IChapterSubject } from "@/interface/Chapter";
import Question from "../Question";
import { toast } from "react-toastify";
import { deleteChapter, getQuestionByID, updateChapter } from "@/api/chapter";
import { useDispatch } from "react-redux";
import { getSubjectClassRoomRequest } from "@/redux/classRoom/actions";
import { IQuestionPayLoad } from "@/interface/Question";
import PopupQuestion from "./PopupQuestion";
interface Props {
  open: boolean;
  onClose: () => void;
  chooseChapter: IChapterSubject | undefined;
}

interface DataChapter {
  chapter_image: string;
  name_chapter_subject: string;
  number_chapter: number;
  numberLesson: number;
}

const PopupChapter: React.FC<Props> = ({ open, onClose, chooseChapter }) => {
  const [showPopupQuestion, setShowPopupQuestion] =
    React.useState<boolean>(false);
  const [nameChapter, setNameChapter] = React.useState<string>("");
  const [numberChapter, setNumberChapter] = React.useState<number>(0);
  const [urlImage, setUrlImage] = React.useState<string>("");
  const [listQuestion, setListQuestion] = React.useState<IQuestionPayLoad[]>(
    []
  );
  const [isLoadingQuestion, setIsLoadingQuestion] =
    React.useState<boolean>(false);
  const dispatch = useDispatch();
  const [file, setFile] = React.useState<any>(null);
  React.useEffect(() => {
    if (chooseChapter) {
      setNameChapter(chooseChapter.name_chapter_subject);
      setNumberChapter(chooseChapter.number_chapter);
      setUrlImage(chooseChapter.chapter_image);
      getDataQuestion();
    }
  }, [chooseChapter]);

  const handleQuestionAdded = (newQuestion: IQuestionPayLoad) => {
    setListQuestion(prevQuestions => [...prevQuestions, newQuestion]);
  };

  const handleQuestionDeleted = (deletedQuestionId: string) => {
    setListQuestion(prevQuestions => prevQuestions.filter(q => q.id_question !== deletedQuestionId));
  };

  const onQuestionUpdated = (updatedQuestion: IQuestionPayLoad) => {
    setListQuestion(prevQuestions => 
      prevQuestions.map(q => q.id_question === updatedQuestion.id_question ? updatedQuestion : q)
    );
  };
  
  const getDataQuestion = async () => {
    setIsLoadingQuestion(true);
    try {
      const res = await getQuestionByID(
        chooseChapter?.id_chapter_subject
          ? chooseChapter?.id_chapter_subject
          : ""
      );
      if (res.status === 200 && res.data.status) {
        setListQuestion(res.data.data.question);
        setIsLoadingQuestion(false);
      } else {
        setIsLoadingQuestion(false);
        toast.error("Lấy dữ liệu thất bại");
      }
    } catch (error) {
      toast.error("Lấy dữ liệu thất bại");
    }
  };

  const hanldeFile = (e: any) => {
    const type = e.target.files[0].type;
    if (type === "image/png" || type === "image/jpeg" || type === "image/jpg") {
      setFile(e.target.files[0]);
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setUrlImage(url);
    } else {
      toast.error("File không đúng định dạng");
      e.target.value = null;
    }
  };
  const handleSubmit = async () => {
    if (nameChapter == "" || numberChapter <= 0) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      const res = await updateChapter(
        chooseChapter?.id_chapter_subject
          ? chooseChapter?.id_chapter_subject
          : "",
        nameChapter,
        numberChapter,
        file
      );
      res.status === 200 && res.data.status
        ? (dispatch(getSubjectClassRoomRequest()),
          toast.success("Cập nhật thành công"))
        : toast.error("Cập nhật thất bại");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteChapter(
        chooseChapter?.id_chapter_subject
          ? chooseChapter?.id_chapter_subject
          : ""
      );
      res.status === 200 && res.data.status
        ? (dispatch(getSubjectClassRoomRequest()),
          toast.success("Xóa thành công"))
        : toast.error("Xóa thất bại");
    } catch (error) {}
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={800} centered>
      <div className="w-full h-full bg-white rounded-lg mt-5">
        <div className="text-center text-xl "></div>
        <div>
          <Form layout="vertical">
            <div className="text-center">
              <Avatar size={64} src={urlImage} />
            </div>
            <Form.Item label="Tên chương">
              <Input
                placeholder="Tên chương"
                value={nameChapter}
                onChange={(e) => setNameChapter(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Số chương">
              <Input
                placeholder="2"
                type="number"
                value={numberChapter}
                onChange={(e) => setNumberChapter(Number(e.target.value))}
              />
            </Form.Item>
            <Form.Item label="Số bài học">
              <Input
                placeholder="2"
                disabled
                value={chooseChapter?.lessions.length}
                name="numberLesson"
              />
            </Form.Item>
            <input type="file" name="chapter_image" onChange={hanldeFile} />
            <div className="">
              <div className="text-center my-5">
                <span>Câu hỏi bài tập {nameChapter}</span>
              </div>
              <div className="my-2">
                <Button
                  type="text"
                  className="bg-teal-400 text-white"
                  onClick={() => setShowPopupQuestion(true)}
                >
                  Thêm câu hỏi
                </Button>
              </div>
              {isLoadingQuestion ? (
                <p>Đang tìm câu hỏi ...</p>
              ) : (
                <Question listQuestion={listQuestion} onQuestionDeleted={handleQuestionDeleted} onQuestionUpdated={onQuestionUpdated} />
              )}
            </div>
            <div className="flex justify-center mt-5 space-x-3">
              <Button
                type="text"
                className="bg-teal-400 text-white"
                onClick={handleSubmit}
              >
                Chỉnh sửa
              </Button>
              <Button
                onClick={onClose}
                type="primary"
                className="text-white bg-yellow-600"
              >
                Hủy
              </Button>
              <Button
                type="primary"
                danger
                className="text-white"
                onClick={handleDelete}
              >
                Xóa
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <PopupQuestion
        open={showPopupQuestion}
        close={() => setShowPopupQuestion(false)}
        chooseChapter = {chooseChapter}
        onQuestionAdded={handleQuestionAdded}
      />
    </Modal>
  );
};

export default PopupChapter;
