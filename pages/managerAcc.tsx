import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { fakeDataAcc } from "@/data/data";
import PopupAcc from "@/components/popups/PopupAcc";

const managerAcc = () => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [listAcc, setListAcc] = React.useState(fakeDataAcc);
  const onClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (position === "" || position === "Position") {
      setListAcc(fakeDataAcc);
    } else {
      setListAcc(fakeDataAcc.filter((acc) => acc.position === position));
    }
  }, [position]);

  React.useEffect(() => {
    if (status === "" || status === "Status") {
      setListAcc(fakeDataAcc);
    } else {
      setListAcc(fakeDataAcc.filter((acc) => acc.status === status));
    }
  }, [status]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <span>Welcome Back, Clint</span>
      </div>
      <div className="p-4">
        <div className="p-2 grid md:grid-cols-6 items-center justify-between cursor-pointer ">
          <span>FirstName</span>
          <span className="sm:text-left text-right">LastName</span>
          <span className="hidden md:grid">Email</span>
          <span className="hidden sm:grid">Password</span>
          <select
            className="hidden sm:flex w-fit"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="Position">Position</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <select
            className="hidden sm:flex w-fit"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Status">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto h-[calc(100vh-100px)]">
          <ul>
            {listAcc.map((acc, id) => (
              <li
                key={acc.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 items-center justify-between cursor-pointer"
              >
                <p>{acc.firstName}</p>
                <p className="sm:text-left text-right">{acc.lastName}</p>
                <p className="hidden md:flex">{acc.email}</p>
                <p className="hidden sm:flex">{acc.password}</p>
                <p className="hidden sm:flex">{acc.position}</p>
                <div className="flex justify-between items-center">
                  <p
                    className={
                      acc.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {acc.status}
                  </p>
                  <BsThreeDotsVertical onClick={() => setOpen(true)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PopupAcc open={open} onClose={onClose} />
    </div>
  );
};

export default managerAcc;
