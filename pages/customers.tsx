import { data } from "@/data/data";
import React from "react";
import TableCustomer from "@/components/customer/TableCustomer";

const customers = () => {
  return (
    <div className="h-screen overflow-y-scroll">
      <div className="lg:flex h-1/2 gap-4 p-2">
        <div className=" w-full lg:w-1/2 min-h-[1/4] ">
          <TableCustomer />
        </div>
        <div className=" w-full lg:w-1/2 min-h-[1/4] ">
          <TableCustomer />
        </div>
      </div>
      <div className="lg:flex h-1/2 gap-4 p-2">
        <div className=" w-full lg:w-1/2 min-h-[1/4] ">
          <TableCustomer />
        </div>
        <div className=" w-full lg:w-1/2 min-h-[1/4] ">
          <TableCustomer />
        </div>
      </div>
    </div>
  );
};

export default customers;
