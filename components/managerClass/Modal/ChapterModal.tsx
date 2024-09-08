import { Modal, Tabs } from "antd";
import React from "react";
import AddChapter from "./Chapter/AddChapter";
import AddLestionChapter from "./Chapter/AddLestionChapter";
import { useSelector } from "react-redux";
import { chooseClassRoom, getChooseSubject } from "@/redux/classRoom/selectors";
interface Props {
  open: boolean;
  onCancel: () => void;
}
const ChapterModal = ({ open, onCancel }: Props) => {
  const classRoom = useSelector(chooseClassRoom);
  const chooseSubject = useSelector(getChooseSubject);
  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Thêm chương học",
            key: "1",
            children: (
              <AddChapter
                classRoom={classRoom}
                selectSubject={chooseSubject.name}
                idSubject={chooseSubject.id_relation}
                onCancel={onCancel}
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default ChapterModal;
