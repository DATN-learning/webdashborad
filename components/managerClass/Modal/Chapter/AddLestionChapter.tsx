// import { Input } from "antd";
import React from "react";
import { ButtonCommon } from "@/components/Button";
import { dataClass } from "@/data/dataCLass";
import { addSubjectOfChapter } from "@/api/class/subjectApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getChooseChapter,
  getChooseSubject,
} from "@/redux/classRoom/selectors";
import { addLesson } from "@/api/chapter";
import { toast } from "react-toastify";
import { getSubjectClassRoomRequest } from "@/redux/classRoom/actions";
import { Input } from "antd";
interface Props {
  classRoom: number;
  selectSubject: string;
  onCancel: () => void;
}
const AddLestionChapter = ({ classRoom, selectSubject, onCancel }: Props) => {
  const chapter = useSelector(getChooseChapter);
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const chooseSubject = useSelector(getChooseSubject);
  const [value, setValue] = React.useState<string>("");
  const [nameLession, setNameLession] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const onchange = (value: string) => {
    setValue(value);
  };

  const handleAddSubjectOfChapter = async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateLession = `${day}${month}${year}`;
    const id_lession_chapter =
      "lession-" +
      dateLession +
      classRoom +
      "-" +
      chooseSubject.id_relation +
      "-" +
      value;
    const chapter_subject_id = chapter.id_relation;
    const name_lession_chapter = nameLession;
    const description_lession_chapter = description;
    const number_lesstion_chapter = value;
    try {
      const res = await addLesson(
        id_lession_chapter,
        chapter_subject_id,
        name_lession_chapter,
        description_lession_chapter,
        number_lesstion_chapter
      );
      if (res.status === 200) {
        if (res.data.status) {
          dispatch(getSubjectClassRoomRequest()),
            toast.success("Thêm bài học thành công");
          onCancel();
        } else {
          toast.error("Thêm bài học thất bại");
          onCancel();
        }
      } else {
        toast.error("Thêm bài học thất bại");
        onCancel();
      }
    } catch (error) {
      console.log(error);
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
          <span>Lớp {classRoom ? classRoom : "6"}</span>
        </div>
        <div
          className="flex-1 ml-6 bg-[#D9D9D9] p-2 rounded-md
            disabled: true
        "
        >
          <span>Môn {selectSubject ? selectSubject : "Toán"}</span>
        </div>
      </div>
      <div className="my-4">
        <TextArea
          onChange={(e) => setNameLession(e.target.value)}
          placeholder="Tên Bài Học"
          rows={4}
        />
      </div>
      <div className="my-4">
        <TextArea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô Tả Bài Học"
          rows={4}
        />
      </div>
      <div className="flex-1 ">
        <input
          type="number"
          value={value}
          placeholder="Số bài ...."
          maxLength={1}
          onChange={(e) => onchange(e.target.value)}
          className="w-full h-full outline-none p-4  text-black border mb-5 "
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 " onClick={handleAddSubjectOfChapter}>
          <ButtonCommon title="Thêm Bài Học" />
        </div>
      </div>
    </div>
  );
};

export default AddLestionChapter;
