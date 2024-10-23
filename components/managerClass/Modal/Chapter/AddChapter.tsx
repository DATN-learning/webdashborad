import React from "react";
import { Input } from "antd";
import { ButtonCommon } from "@/components/Button";
import { dataClass } from "@/data/dataCLass";
import { addChapter } from "@/api/chapter";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getSubjectClassRoomRequest } from "@/redux/classRoom/actions";
interface Props {
  classRoom: number;
  selectSubject: string;
  idSubject: number;
  onCancel: () => void;
}

const AddChapter = ({
  classRoom,
  selectSubject,
  idSubject,
  onCancel,
}: Props) => {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>("");
  const [nameChapter, setNameChapter] = React.useState("");
  const [file, setFile] = React.useState(null);
  const handleFileChange = (e: any) => {
    const type = e.target.files[0].type;
    if (type === "image/png" || type === "image/jpeg" || type === "image/jpg") {
      setFile(e.target.files[0]);
    } else {
      toast.error("File không đúng định dạng");
      e.target.value = null;
    }
  };

  const onchange = (value: string) => {
    value.length <= 1 && setValue(value);
  };

  const handleAddChapter = async () => {
    if (nameChapter.length <= 0 || value.length <= 0 || file === null) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateChapter = `${day}${month}${year}`;
    const number_chapter = value;
    const id_chapter_subject =
      "chapter-" + dateChapter+ "-" + classRoom + "-" +selectSubject+ "-" + value;
    const subject_id = idSubject;
    const name_chapter_subject = nameChapter;
    const chapter_image = file;
    try {
      const res = await addChapter(
        id_chapter_subject,
        subject_id,
        name_chapter_subject,
        chapter_image,
        number_chapter
      );
      if (res.status === 200) {
        if (res.data.status) {
          dispatch(getSubjectClassRoomRequest());
          toast.success("Thêm chương học thành công");
          onCancel();
        } else {
          toast.error("Thêm chương học thất bại");
          onCancel();
        }
      }
    } catch (error) {
      toast.error("Thêm chương học thất bại");
      onCancel();
    }
  };
  return (
    <div className="border-[0.5px] border-gray-200 rounded-md p-5 ">
      <div className="flex items-center w-full">
        <div
          className="flex-1 mr-6 bg-[#D9D9D9] p-2 rounded-md
            disabled: true
        "
        >
          <span>Lớp {classRoom ? classRoom : null}</span>
        </div>
        <div
          className="flex-1 ml-6 bg-[#D9D9D9] p-2 rounded-md
            disabled: true
        "
        >
          <span>Môn {selectSubject ? selectSubject : null}</span>
        </div>
      </div>
      <div className="my-4">
        <TextArea
          placeholder="Nhập tên chương học"
          rows={4}
          onChange={(e) => setNameChapter(e.target.value)}
          name="nameChapter"
        />
      </div>
      <div>
        <input
          type="number"
          value={value}
          placeholder="Nhập số chương ...."
          maxLength={1}
          onChange={(e) => onchange(e.target.value)}
          className="w-full h-full outline-none p-4 text-black  border mb-5"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-1/4">
          <input type="file" onChange={handleFileChange} name="file" />
        </div>
        <div className="" onClick={handleAddChapter}>
          <ButtonCommon title="Thêm chương học" />
        </div>
      </div>
    </div>
  );
};

export default AddChapter;
