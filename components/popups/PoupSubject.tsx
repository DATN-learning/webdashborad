import { Avatar, Modal } from "antd";
import React from "react";
import { Input } from "antd";
import { ButtonCommon } from "../Button";

const { TextArea } = Input;
interface Props {
  open: boolean;
  onCancel: () => void;
  selectClass?: any;
  selectSubject?: any;
}

const PopupSubject = ({
  open,
  onCancel,
  selectClass,
  selectSubject,
}: Props) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      <div className="mt-10">
        <div className="text-center">
          <Avatar
            size={64}
            src="https://teky.edu.vn/blog/wp-content/uploads/2020/12/tai-sao-phai-hoc-toan.jpg"
          />
        </div>
        <TextArea
          placeholder={`Lớp ${selectClass}`}
          autoSize
          disabled
          className="mt-5"
        />
        <TextArea placeholder={selectSubject} autoSize className="mt-5" />
        <TextArea placeholder="2 Chương" autoSize className="mt-5" disabled />

        <div className="flex justify-center mt-5">
          <ButtonCommon title="Something is wrong" />
        </div>
      </div>
    </Modal>
  );
};

export default PopupSubject;
