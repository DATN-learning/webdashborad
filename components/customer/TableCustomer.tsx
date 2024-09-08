// import { data } from "@/data/data";
// import React from "react";
// import { BsEye, BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";

// const TableCustomer = () => {
//   return (
//     <div className="">
//       <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto hidden md:block">
//         <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
//           <span>Name</span>
//           <span className="sm:text-left text-right">Email</span>
//           <span className="hidden md:grid">Token</span>
//           <div className="flex items-center justify-between">
//             <span className="hidden sm:grid">Last Login</span>
//           </div>
//         </div>
//         <ul className="max-h-[200px] lg:max-h-[250px] overflow-y-scroll">
//           {data.map((item, id) => (
//             <li
//               key={id}
//               className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
//             >
//               <div className="flex items-center">

//                 <p className="pl-4">{item.name.first + " " + item.name.last}</p>
//               </div>
//               <p className="text-gray-600 sm:text-left text-right">
//                 {item.name.first}@gmail.com
//               </p>
//               <p className="hidden md:flex">{item.date}</p>
//               <div className="sm:flex hidden justify-between items-center">
//                 <p>{item.method}</p>
//                 <BsThreeDotsVertical />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="block md:hidden w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto ">
//         <div className=" flex items-center justify-between">
//           <span className="">Email</span>
//           <span className=""></span>
//         </div>
//         <div className="overflow-y-scroll max-h-[150px]">
//           {data.map((item, id) => (
//             <div className="flex items-center justify-between py-2" key={id}>
//               <p className="text-gray-600 sm:text-left text-right">
//                 {item.name.first}@gmail.com
//               </p>
//               <div className="bg-[#9e80f2] text-white p-1 rounded-lg">
//                 <BsEye />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableCustomer;

import React, { useState } from "react";
import { Divider, Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { data as dataUser } from "@/data/data";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "7",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "8",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "9",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "10",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "11",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "12",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    // console.log(
    //   `selectedRowKeys: ${selectedRowKeys}`,
    //   "selectedRows: ",
    //   selectedRows
    // );
  },
};

const TableCustomer: React.FC = () => {
  return (
    <div>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        // pagination 10 items
        pagination={{
          defaultPageSize: 9,
          showSizeChanger: false,
          pageSizeOptions: ["9", "18", "27", "36"],
        }}
      />
    </div>
  );
};

export default TableCustomer;
