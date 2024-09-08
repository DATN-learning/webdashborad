import PopupProfile from "@/components/popups/PopupProfile";
import { fakeDataPro } from "@/data/data";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const managerProfile = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <span>Welcome Back, Clint</span>
      </div>
      <div className="p-4">
        <div className="p-2 grid md:grid-cols-10 items-center justify-between cursor-pointer gap-2">
          <span>Nick Name</span>
          <span className="sm:text-left text-right">Address</span>
          <span className="hidden md:grid">Day of birth</span>
          <span className="hidden sm:grid">Gender</span>
          <span className="hidden sm:grid">Hashtag</span>
          <span className="hidden sm:grid">Level Number</span>
          <span className="hidden sm:grid">Experience point</span>
          <span className="hidden sm:grid">Number star</span>
          <span className="hidden sm:grid">School Name</span>
          <span className="hidden sm:grid">Class Name</span>
        </div>
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto h-[calc(100vh-100px)]">
          <ul>
            {fakeDataPro.map((pro, id) => (
              <li
                key={pro.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-10 items-center justify-between cursor-pointer gap-2"
              >
                <p>{pro.nickName}</p>
                <p className="sm:text-left text-right">{pro.address}</p>
                <p className="hidden md:flex">{pro.date_of_birth}</p>
                <p className="hidden sm:flex">{pro.gender}</p>
                <p className="hidden sm:flex">{pro.hashtag}</p>
                <p className="hidden sm:flex">{pro.levelNumber}</p>
                <p className="hidden sm:flex">{pro.experience_point}</p>
                <p className="hidden sm:flex">{pro.nickName}</p>
                <p className="hidden sm:flex">{pro.school_name}</p>
                <div className="flex justify-between items-center">
                  <p>{pro.class_name}</p>
                  <BsThreeDotsVertical onClick={() => setOpen(true)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PopupProfile open={open} onClose={onClose} />
    </div>
  );
};

export default managerProfile;
