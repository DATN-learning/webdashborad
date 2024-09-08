import { MenuProps } from "antd";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
export const items: MenuProps["items"] = [
  {
    key: "1",
    icon: <AiOutlineEdit size={20} />,
    label: (
      <div className="text-lg">
        <span>Edit</span>
      </div>
    ),
  },
  {
    key: "2",
    icon: <AiFillDelete size={20} />,
    label: (
      <div
        className="text-lg"
        onClick={() => {
          confirm();
        }}
      >
        <span>Delete</span>
      </div>
    ),
  },
];
