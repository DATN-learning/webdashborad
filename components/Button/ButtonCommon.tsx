import React from "react";

interface Props {
  title: string | undefined;
  style?: string;
  onClick?: () => void;
}

const ButtonCommon = (Props: Props) => {
  return (
    <div
      className={`w-full cursor-pointer hover:bg-opacity-70   p-2 text-white text-center rounded-lg ${
        Props.style ? Props.style : "bg-green-400"
      } `}
      onClick={Props.onClick}
      >
      {Props.title}
    </div>
  );
};

export default ButtonCommon;
