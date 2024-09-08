import { dataPost, dataToken } from "@/data/data";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const managerToken = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <div className="p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
          <span className="pl-5">User</span>
          <span className="sm:text-left text-right">Type</span>
          <span className="hidden md:grid">Token</span>
          <span className="hidden sm:grid">Scope</span>
        </div>
        <div
          className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto
      h-[calc(100vh-80px)]
    "
        >
          <ul>
            {dataToken.map((token, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="pl-4">
                    <p className="text-gray-800 text-sm">{token.user}</p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span>{token.type}</span>
                </p>
                <p className="hidden md:flex">{token.token}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{token.scope}</p>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default managerToken;
