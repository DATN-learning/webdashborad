import React from "react";
import Link from "next/link";
import { RxDashboard, RxHome, RxPerson } from "react-icons/rx";
import { SiSmartthings, SiSocketdotio } from "react-icons/si";
import { TfiSharethis } from "react-icons/tfi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdNotifications,
  MdOutlineNotificationsActive,
  MdQuestionAnswer,
} from "react-icons/md";
import { SiNano } from "react-icons/si";
import { FiBook, FiLogOut, FiSettings } from "react-icons/fi";
import Login from "@/pages/auth/login";
import { authContext } from "@/context/AuthContext";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";

const listLogoSideBar = [
  {
    link: "/",
    icon: <RxDashboard size={20} />,
  },
  {
    link: "/customers",
    icon: <RxPerson size={20} />,
  },
  {
    link: "/managerPost",
    icon: <BsFillFileEarmarkPostFill size={20} />,
  },
  {
    link: "/managerClass",
    icon: <FiBook size={20} />,
  },
  {
    link: "/testfcm",
    icon: <MdOutlineNotificationsActive size={20} />,
  },
  {
    link: "/",
    icon: <TfiSharethis size={20} />,
  },
  {
    link: "/",
    icon: <MdQuestionAnswer size={20} />,
  },
  {
    link: "/",
    icon: <SiNano size={20} />,
  },
  {
    link: "/",
    icon: <MdQuestionAnswer size={20} />,
  },
  {
    link: "/",
    icon: <SiNano size={20} />,
  },
];

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [activeLogo, setActiveLogo] = React.useState(0);
  const { isLoadingLogin, logout, user } = authContext();
  const handleLogout = () => {
    logout(user?.email);
  };
  return (
    <>
      {isLoadingLogin ? (
        <div className="flex">
          <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
            <div className="flex flex-col items-center overflow-y-auto">
              <Link href="/">
                <div className="bg-[#9e80f2] text-white p-3 rounded-lg inline-block">
                  <RxHome size={20} />
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#e5f501] text-white my-4 p-3 rounded-lg inline-block">
                  <MdNotifications size={20} />
                </div>
              </Link>
              <Link href="/">
                <div className="bg-[#43e711] text-white mb-4 p-3 rounded-lg inline-block">
                  <SiSocketdotio size={20} />
                </div>
              </Link>
              {listLogoSideBar.map((item, index) => (
                <Link href={item.link} key={index}>
                  <div
                    className={`
                p-3 rounded-lg inline-block  cursor-pointer hover:bg-[#69ebdd] hover:text-white
              ${index > 0 && "my-4"}
              ${
                activeLogo === index ? "bg-[#69ebdd] text-white" : "bg-gray-100"
              }
              `}
                    onClick={() => setActiveLogo(index)}
                  >
                    {item.icon}
                  </div>
                </Link>
              ))}
              <div
                className="text-black bg-red-500 mb-4 p-3 rounded-lg inline-block cursor-pointer"
                onClick={handleLogout}
              >
                <FiLogOut />
              </div>
            </div>
          </div>

          <main className="ml-20 w-full">{children}</main>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Sidebar;
