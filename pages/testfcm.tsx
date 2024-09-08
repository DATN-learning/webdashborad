import React from "react";
import { Button, Form, Input, Segmented, Tabs, TabsProps } from "antd";
import axios from "axios";
import Tab1 from "@/components/Fcm/Tab1";
import { FCMServerToken } from "@/utils/constant";
import TableCustomer from "@/components/customer/TableCustomer";
const testfcm = () => {
  const { TextArea } = Input;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Home`,
      children: <Tab1 />,
    },
    {
      key: "2",
      label: `List device`,
      children: <TableCustomer />,
    },
    {
      key: "3",
      label: `History notification`,
      children: `Content of Tab Pane 3`,
    },
  ];

  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState({
    serverKey: "",
    token: "",
    title: "",
    body: "",
  });

  const handleShow = () => {
    setShow(!show);
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClickPushNotification = async () => {
    try {
      const res = await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          notification: {
            title: data.title,
            body: data.body,
          },
          to: data.token,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${FCMServerToken}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex   h-screen">
      <div className="hidden md:block flex-1 bg-gray-50">
        <Tabs defaultActiveKey="1" items={items} centered />
      </div>
      <div className="flex-1 overflow-y-auto ">
        <div className="p-20">
          <Form layout="vertical">
            <Form.Item
              label="Server Key"
              required
              tooltip="This is a required field"
            >
              <Input
                placeholder="Server Key"
                onChange={handleChange}
                value={FCMServerToken}
                name="serverKey"
                disabled
              />
            </Form.Item>
            <Form.Item
              label="FCM Registration Token (Device Token)"
              required
              tooltip="This is a required field"
            >
              <Input
                placeholder="FCM Registration Token (Device Token)"
                onChange={handleChange}
                value={data.token}
                name="token"
              />
            </Form.Item>
            <Form.Item
              label="Title"
              required
              tooltip="This is a required field"
            >
              <Input
                placeholder="Notification title"
                onChange={handleChange}
                value={data.title}
                name="title"
              />
            </Form.Item>
            <Form.Item label="Body" required tooltip="This is a required field">
              <TextArea
                rows={4}
                placeholder="Notification body"
                onChange={handleChange}
                value={data.body}
                name="body"
              />
            </Form.Item>

            <div className="text-center">
              <button
                className="cursor-pointer  text-cyan-600 font-medium"
                onClick={handleShow}
              >
                Show Optional
              </button>
            </div>

            {show && (
              <>
                <Form.Item label="Click Action URL - (optional)">
                  <Input placeholder="URL to redirect" />
                </Form.Item>
                <Form.Item label="Icon URL - (optional)">
                  <Input placeholder="Icon url" />
                </Form.Item>
                <Form.Item label="Data - (optional)">
                  <TextArea
                    rows={4}
                    placeholder="Must be JSON Object like {'key' : 'value' }"
                  />
                </Form.Item>
              </>
            )}

            <div className="flex items-center mt-4">
              <button
                className="bg-[#9e80f2] text-white px-4 py-3 text-xl rounded-md flex-1 
              "
                onClick={handleClickPushNotification}
              >
                Push Notification
              </button>
              <button className=" text-[#69ebdd] border-[#69ebdd] border-[1px] px-4 py-3 text-xl rounded-md ml-6   ">
                Save Locally
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default testfcm;
