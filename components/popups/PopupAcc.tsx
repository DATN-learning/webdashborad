import { Modal } from "antd";
import React, { FC } from "react";
import { ButtonCommon } from "../Button";
import { Form, Input } from "antd";
interface PopupAccProps {
  open: boolean;
  onClose: () => void;
}

const PopupAcc: FC<PopupAccProps> = ({ open, onClose }) => {
  return (
    <Modal title="Manager User" open={open} onCancel={onClose} footer={null}>
      <div>
        <Form layout="vertical">
          <Form.Item label="FirstName">
            <Input placeholder="FirstName" name="FirstName" />
          </Form.Item>
          <Form.Item label="LastName">
            <Input placeholder="LastName" name="LastName" />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="Email" name="Email" />
          </Form.Item>
          <Form.Item label="Password">
            <Input placeholder="Password" name="Password" />
          </Form.Item>
          <Form.Item label="Position">
            <Input placeholder="Position" name="Position" />
          </Form.Item>
          <Form.Item label="Status">
            <Input placeholder="Status" name="Status" />
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

export default PopupAcc;
