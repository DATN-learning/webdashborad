import { IChapterSubject, ILessionByChapterPayLoad } from "@/interface/Chapter";
import { Button, Form, Input, List, Modal, Upload } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { addSlideLessions, deleteLess, deleteSlideLession, getSlideLession, updateLess } from "@/api/chapter";
import { IPdf, IPdfPayload } from "@/interface/Pdf";
import { MdDelete } from "react-icons/md";

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

  const [file, setFile] = React.useState<any>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [lessonCount, setLessonCount] = React.useState(0);
  const [existingPdfs, setExistingPdfs] = React.useState<IPdf[]>([]);

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

  const handleDelete = async (id_lesstion_chapter: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa môn học này?")) {
      try {
        const res = await deleteLess(id_lesstion_chapter);
        if (res) {
          onClose();
          setDataLesson(dataLesson);
          toast.success("Xóa môn học thành công!");
        }
      } catch (error) {
        toast.error("Xóa môn học thất bại!");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataLesson({
      ...dataLesson,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const id_pdf = `${dataLesson.id_lesstion_chapter}-${chooseLesstion?.number_lesstion_chapter}`;
  const slug = `${dataLesson.id_lesstion_chapter}-${dataLesson.name_lesson}`;

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Vui lòng chọn file trước khi tải lên!");
      return;
    }
    setIsUploading(true);
    try {
      const res = await addSlideLessions(
        dataLesson.id_lesstion_chapter,
        id_pdf,
        slug,
        file
      );
      if (res) {
        toast.success("Tải lên file PDF thành công!");
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setLessonCount(lessonCount + 1);
        fetchExistingPdfs(dataLesson.id_lesstion_chapter);
      } else {
        toast.error("Tải lên file PDF thất bại");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Có lỗi xảy ra khi tải lên file");
    } finally {
      setIsUploading(false);
    }
  };


  const fetchExistingPdfs = async (id_lesstion_chapter: string) => {
    try {
      const response = await getSlideLession(id_lesstion_chapter);

      if (response && response.data) {
        setExistingPdfs(response.data.pdfs);
      } else {
        toast.error("Có lỗi xảy ra khi lấy danh sách PDF");
        setExistingPdfs([]);
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
      toast.error("Có lỗi xảy ra khi lấy danh sách PDF");
      setExistingPdfs([]);
    }
  };

  const handleDeletePdf = async (id_pdf: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa PDF này?")) {
      try {
        // Gọi API để xóa PDF
        const response = await deleteSlideLession(id_pdf);
        if (response) {
          toast.success("Xóa PDF thành công!");
          fetchExistingPdfs(dataLesson.id_lesstion_chapter); // Load lại danh sách PDF
        }
      } catch (error) {
        console.error("Error deleting PDF:", error);
        toast.error("Có lỗi xảy ra khi xóa PDF.");
      }
    }
  };
  

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (chooseLesstion) {
      setDataLesson({
        id_lesstion_chapter: chooseLesstion.id_lesstion_chapter,
        name_lesson: chooseLesstion.name_lesstion_chapter,
        description: chooseLesstion.description_lesstion_chapter,
        number_lesson: chooseLesstion.number_lesstion_chapter,
      });
      fetchExistingPdfs(chooseLesstion.id_lesstion_chapter);
    }
  }, [chooseLesstion]);

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
          <Input placeholder={chooseChapter?.name_chapter_subject} />
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

        <div className="flex gap-5">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            ref={fileInputRef}
          />
          <Button className="bg-lime-500 text-white"
            onClick={handleFileUpload}
            disabled={isUploading || !file}
          >
            {isUploading ? "Đang tải..." : "Tải lên"}
          </Button>
        </div>
        {existingPdfs && existingPdfs.length > 0 ? (
          existingPdfs.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 mb-2 border rounded bg-gray-100">
              <div>
                <p className="text-lg font-semibold">{item.id_pdf}</p>
              </div>
              <div className="flex gap-4">
                <Button
                  type="primary"
                  className="bg-yellow-500"
                  onClick={() => window.open(item.pdf_file, '_blank')}
                >
                  Xem
                </Button>

                <Button
                  type="primary"
                  danger
                  icon={<MdDelete />}
                  onClick={() => handleDeletePdf(item?.id_pdf)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Không có PDF nào cho bài học này</div>
        )}
        <div className="flex justify-center mt-5 gap-3">
          <Button className="bg-teal-400" onClick={handleUpdate}>
            Chỉnh sửa
          </Button>
          <Button className="bg-orange-500" onClick={onClose}>
            Hủy
          </Button>
          <Button
            type="text"
            className="bg-red-500"
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