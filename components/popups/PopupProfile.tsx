import { Modal } from "antd";
import React, { FC } from "react";
import { Form, Input } from "antd";
import { ButtonCommon } from "../Button";
import { UserPayload } from "@/models/login";

interface PopupProfileProps {
  open: boolean;
  onClose: () => void;
  handleDeleteUser: () => void;
  user: UserPayload | null;
}

const PopupProfile: FC<PopupProfileProps> = ({ open, onClose, handleDeleteUser, user }) => {
  return (
    <Modal title="Manager Profile" open={open} onCancel={onClose} footer={null}>
      <div>
        <Form layout="vertical">
          <Form.Item label="NickName">
            <Input placeholder="NickName" name="NickName" defaultValue={user?.profile?.nick_name} />
          </Form.Item>
          <Form.Item label="Address">
            <Input placeholder="Address" name="Address" defaultValue={user?.profile?.address} />
          </Form.Item>
          <Form.Item label="DayOfBirth">
            <Input placeholder="DayOfBirth" name="DayOfBirth" defaultValue={user?.profile?.date_of_birth} />
          </Form.Item>
          <Form.Item label="Gender">
            <Input placeholder="Gender" name="Gender" defaultValue={user?.profile?.gender} />
          </Form.Item>
          <Form.Item label="HashTag">
            <Input placeholder="HashTag" name="HashTag" defaultValue={user?.profile?.hashtag} />
          </Form.Item>
          <Form.Item label="LevelNumber">
            <Input placeholder="LevelNumber" name="LevelNumber" defaultValue={user?.profile?.level_number} />
          </Form.Item>
          <Form.Item label="ExperiencePoint">
            <Input placeholder="ExperiencePoint" name="ExperiencePoint" defaultValue={user?.profile?.experience_point} />
          </Form.Item>
          <Form.Item label="NumberStar">
            <Input placeholder="NumberStar" name="NumberStar" defaultValue={user?.profile?.number_stars} />
          </Form.Item>
          <Form.Item label="SchoolName">
            <Input placeholder="SchoolName" name="SchoolName" defaultValue={user?.profile?.school_name} />
          </Form.Item>
          <Form.Item label="ClassName">
            <Input placeholder="ClassName" name="ClassName" defaultValue={user?.profile?.class_name} />
          </Form.Item>
          <div className="mt-5 flex items-center gap-5 justify-end">
            <div>
              <ButtonCommon title="Edit" />
            </div>
            <div>
              <ButtonCommon title="Delete" onClick={handleDeleteUser} /> 
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default PopupProfile;
