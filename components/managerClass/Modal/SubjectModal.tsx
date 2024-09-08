import React from "react";
import { Modal } from "antd";
import { ButtonCommon } from "@/components/Button";
import { dataClass } from "@/data/dataCLass";
import { dataSubject } from "@/data/dataSubject";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseClassRoom,
  getChooseSubject,
  getSubjectClass,
} from "@/redux/classRoom/selectors";
import { addSubjectApi } from "@/api/class/subjectApi";
import { getSubjectClassRoomRequest } from "@/redux/classRoom/actions";
interface Props {
  open: boolean;
  onCancel: () => void;
}

const SubjectModal = ({ open, onCancel }: Props) => {
  const classRoom = useSelector(chooseClassRoom);
  const listSubject = useSelector;
  const dispatch = useDispatch();
  const idClass = useSelector(getSubjectClass).listClass.find(
    (item) => item.class === classRoom
  )?.id;
  const [nameSubject, setNameSubject] = React.useState<string>("");
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
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setNameSubject(e.target.value);
  };
  const handleAddSubject = async () => {
    nameSubject === "" && toast.error("Vui lòng nhập tên môn học");
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dataSubject = `${day}${month}${year}`;
    const id_subject = `mon-${nameSubject}-${classRoom}-${nameSubject}`;
    const class_room_id = idClass;
    const name_subject = nameSubject;
    const logo_image = file;
    const slug = `mon-${classRoom}-${dataSubject}-${date.getHours}-'youcdi `;
    try {
      const res = await addSubjectApi(
        id_subject,
        class_room_id as number,
        name_subject,
        logo_image,
        slug
      );
      if (res.status === 200) {
        if (res.data.status) {
          toast.success("Thêm môn học thành công");
          onCancel();
          dispatch(getSubjectClassRoomRequest());
        } else {
          toast.error("Thêm môn học thất bại");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      <div>
        <div className="flex  items-center justify-center p-5">
          <span className="text-2xl font-bold">
            Thêm Môn {nameSubject} cho lớp {classRoom}
          </span>
        </div>
        <div className="w-full my-2 ">
          <input
            type="text"
            className="w-full p-2 border"
            placeholder="Nhập tên môn học"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <input
            type="file"
            className="w-1/2 shadow-lg"
            onChange={handleFileChange}
          />
          <div className="w-1/3" onClick={handleAddSubject}>
            <ButtonCommon title="Thêm môn học" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SubjectModal;
