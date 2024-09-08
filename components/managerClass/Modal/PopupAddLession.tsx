import { Modal, Tabs } from "antd";
import React from "react";
import AddChapter from "./Chapter/AddChapter";
import AddLestionChapter from "./Chapter/AddLestionChapter";
import { useSelector } from "react-redux";
import { chooseClassRoom, getChooseChapter, getChooseSubject } from "@/redux/classRoom/selectors";
interface Props {
  open: boolean;
  onCancel: () => void;
}
const PopupAddLession = ({ open, onCancel }: Props) => {
  const classRoom = useSelector(chooseClassRoom);
  const chooseSubject = useSelector(getChooseSubject);
  const chapter=useSelector(getChooseChapter);
  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Thêm bài học cho chương ${chapter.name}`,
            key: "1",
            children: (
              <AddLestionChapter
                classRoom={classRoom}
                selectSubject={chooseSubject.name}
                onCancel={onCancel}
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default PopupAddLession;
