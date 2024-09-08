import { Modal } from "antd";
import React, { FC } from "react";
import { Form, Input } from "antd";
import { ButtonCommon } from "../Button";

interface PopupProfileProps {
  open: boolean;
  onClose: () => void;
}
const PopupProfile: FC<PopupProfileProps> = ({ open, onClose }) => {
  return (
    <Modal title="Manager Profile" open={open} onCancel={onClose} footer={null}>
      <div>
        <Form layout="vertical">
          <Form.Item label="NickName">
            <Input placeholder="NickName" name="NickName" />
          </Form.Item>
          <Form.Item label="Address">
            <Input placeholder="Address" name="Address" />
          </Form.Item>
          <Form.Item label="DayOfBirth">
            <Input placeholder="DayOfBirth" name="DayOfBirth" />
          </Form.Item>
          <Form.Item label="Gender">
            <Input placeholder="Gender" name="Gender" />
          </Form.Item>
          <Form.Item label="HashTag">
            <Input placeholder="HashTag" name="HashTag" />
          </Form.Item>
          <Form.Item label="LevelNumber">
            <Input placeholder="LevelNumber" name="LevelNumber" />
          </Form.Item>
          <Form.Item label="ExperiencePoint">
            <Input placeholder="ExperiencePoint" name="ExperiencePoint" />
          </Form.Item>
          <Form.Item label="NumberStar">
            <Input placeholder="NumberStar" name="NumberStar" />
          </Form.Item>
          <Form.Item label="SchoolName">
            <Input placeholder="SchoolName" name="SchoolName" />
          </Form.Item>
          <Form.Item label="ClassName">
            <Input placeholder="ClassName" name="ClassName" />
          </Form.Item>
          <div className="mt-5 flex items-center gap-5 justify-end">
            <div>
              <ButtonCommon title="Edit" />
            </div>
            <div>
              <ButtonCommon title="Delete" />
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default PopupProfile;
