import React from "react";
import { Modal } from "antd";
import { Select } from "antd";
import { ButtonCommon } from "@/components/Button";
import { dataClass } from "@/data/dataCLass";
import { useDispatch, useSelector } from "react-redux";
import { chooseClassRoom, getSubjectClass } from "@/redux/classRoom/selectors";
import { addClassApi } from "@/api/class/subjectApi";
import { toast } from "react-toastify";
import { getSubjectClassRoomRequest } from "@/redux/classRoom/actions";
interface Props {
  open: boolean;
  onCancel: () => void;
}

const ClassModal = ({ open, onCancel }: Props) => {
  const [value, setValue] = React.useState<string>("");
  const dispatch = useDispatch();
  const handleOk = () => {
    onCancel();
  };
  
  const handleAddClass = () => {
    value.length <= 0 ? alert("Vui lòng nhập lớp học") : addClass();
  };

  const addClass = async () => {
    try {
      const nameClass = `Lớp ${value}`;
      const numberClass = value;
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateClass = `${day}${month}${year}`;
      const slug = `lop-${value}-${dateClass}`;
      const res = await addClassApi(nameClass, Number(numberClass), slug);
      if (res.status === 200) {
        if (res.data.status) {
          toast.success("Thêm lớp học thành công");
          dispatch(getSubjectClassRoomRequest());
          onCancel();
        } else {
          toast.error("Thêm lớp học thất bại");
          onCancel();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={open} onCancel={onCancel} onOk={handleOk} footer={null}>
      <div className="mt-7 px-3">
        <div className="flex items-center  rounded-md border bg-[#fafafa]  text-white text-base">
          <div className="flex-1 text-black py-2 px-4 border-r-[0.5px] border-white">
            <span>Lớp {value}</span>
          </div>
          <div className="flex-1  px-4">
            <input
              type="number"
              value={value}
              placeholder="Nhập lớp ...."
              maxLength={1}
              onChange={(e) => setValue(e.target.value) }
              className="w-full h-full outline-none p-4 text-black "
            />
          </div>
        </div>
        <div className="px-8 mt-4" onClick={handleAddClass}>
          <ButtonCommon title="Thêm lớp học ...." />
        </div>
      </div>
    </Modal>
  );
};

export default ClassModal;
