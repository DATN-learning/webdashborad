import React from "react";

const Slide = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-between flex-col
            items-center border-[2px] border-gray-200 rounded-lg p-2 mb-4"
            >
              <img
                src="https://i.pinimg.com/564x/3b/69/1c/3b691c83d1639c29d14f4986a65b2ff9.jpg"
                className="rounded-lg object-cover"
              />
              <div className="">
                <span className="font-bold">Chương 3.</span>
                <span>Biểu thức chính quy và Văn phạm chính quy</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slide;
